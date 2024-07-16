import { Paper } from '@components'
import { Button, Group, rem, Stack, Text, Title } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { InputAssembly, InputContribution, InputProduct, InputProject, useAddContributionMutation } from '@queries'
import { useNavigate } from 'react-router-dom'
import { convertSLiCE } from 'lcax'

export const ContributionUploadPaper = () => {
  const [addContributions, { loading, error }] = useAddContributionMutation({ refetchQueries: ['getContributions'] })
  const [contributionData, setContributionData] = useState<InputContribution[] | null>(null)
  const [fileName, setFileName] = useState('')
  const [fileLoading, setFileLoading] = useState(false)
  const navigate = useNavigate()

  const onContribute = async () => {
    if (!contributionData) {
      return
    }
    const chunkSize = 10
    if (contributionData.length > chunkSize) {
      console.warn(
        `Attempting to upload ${contributionData.length} contributions. Will batch it to ${chunkSize} contributions per request.`,
      )
      for (let i = 0; i < contributionData.length; i += chunkSize) {
        const contributionChunk = contributionData.slice(i, i + chunkSize)
        await addContributions({ variables: { contributions: contributionChunk } })
      }
    } else {
      await addContributions({ variables: { contributions: contributionData } })
    }

    navigate('/contributions')
  }

  const fileValidator = (file: File) => {
    const validExtension = file.name.endsWith('.parquet') || file.name.endsWith('.json')
    if (!validExtension) {
      return {
        code: 'file-invalid-type',
        message: 'Invalid file type. Only .parquet and .json files are allowed.',
      }
    }
    return null
  }

  const processUploadedFile = async (files: File[]): Promise<InputContribution[]> => {
    const file = files[0]
    setFileName(file.name)

    if (file.name.endsWith('.parquet')) {
      setFileLoading(true)
      const contributions = parseSLiCEtoContribution(new Uint8Array(await file.arrayBuffer()))
      setFileLoading(false)
      return contributions
    } else if (file.name.endsWith('.json')) {
      return JSON.parse(await file.text()).map((project: InputProject) => ({ project }))
    }
    return [{ project: { name: file.name } as InputProject }]
  }

  return (
    <Paper data-testid='ContributionUploadPaper'>
      <Title order={3}>Contribute Now</Title>
      <Text>In order to process the data correctly, please follow the steps below:</Text>
      <Stack pl='md' py='md' gap={0}>
        <Text>1. Download the data template file here:</Text>
        <Text>2. Paste your data as per template's format</Text>
        <Text>3. Export the file as .xlsx</Text>
        <Text>4. Upload the file below</Text>
      </Stack>
      <Dropzone
        data-testid='contributionDropzone'
        disabled={!!contributionData}
        loading={fileLoading}
        onDrop={async (files) => setContributionData(await processUploadedFile(files))}
        onReject={(files) => console.error('rejected files', files)}
        maxSize={50 * 1024 ** 2}
        validator={fileValidator}
        inputProps={{
          // @ts-expect-error data-testid is valid
          'data-testid': 'dropzoneInput',
        }}
      >
        <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Drag Excel files here or click to select files
            </Text>
            <Text size='sm' c='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {contributionData ? (
        <Group justify='flex-end' style={{ marginTop: 16 }}>
          {error ? <Text c='red'>{error.message}</Text> : null}
          <Text>Upload {fileName}?</Text>
          <Button loading={loading} color='green' onClick={onContribute}>
            Contribute
          </Button>
        </Group>
      ) : null}
    </Paper>
  )
}

const parseSLiCEtoContribution = (uint8Array: Uint8Array): InputContribution[] => {
  const projects = convertSLiCE(uint8Array)

  return projects.map((project) => {
    const assemblies = Object.values(project.assemblies).map((assembly) => {
      const products = Object.values(assembly.products) as InputProduct[]
      return { ...assembly, products }
    }) as InputAssembly[]
    return { project: { ...project, assemblies } as InputProject }
  })
}
