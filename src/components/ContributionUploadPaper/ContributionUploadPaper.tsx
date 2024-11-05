import {
  Paper,
  parseXlsxToContribution,
  mapJsonToInputContribution,
  parseLcaxToContribution,
  parseSLiCEtoContribution,
} from '@components'
import { Button, Checkbox, Group, rem, Stack, Text, Title, Tooltip } from '@mantine/core'
import { Dropzone, FileRejection } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { InputContribution, InputProject, useAddContributionMutation } from '@queries'
import { useNavigate } from 'react-router-dom'

export const ContributionUploadPaper = () => {
  const [addContributions, { loading, error }] = useAddContributionMutation({ refetchQueries: ['getContributions'] })
  const [contributionData, setContributionData] = useState<InputContribution[] | null>(null)
  const [fileName, setFileName] = useState('')
  const [fileErrors, setFileErrors] = useState<FileRejection[] | null>(null)
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

  const handlePublicToggle = (checked: boolean) => {
    if (contributionData) {
      const updatedData = contributionData.map((item) => ({
        ...item,
        public: checked,
      }))
      setContributionData(updatedData)
    }
  }

  const fileValidator = (file: File) => {
    const validExtension = file.name.endsWith('.parquet') || file.name.endsWith('.json') || file.name.endsWith('.xlsx')
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

    try {
      if (file.name.endsWith('.parquet')) {
        setFileLoading(true)
        const contributions = parseSLiCEtoContribution(new Uint8Array(await file.arrayBuffer()))
        setFileLoading(false)
        return contributions
      } else if (file.name.endsWith('.json')) {
        setFileLoading(true)
        const contributions = parseLcaxToContribution(JSON.parse(await file.text()))
        setFileLoading(false)
        return contributions
      } else if (file.name.endsWith('.xlsx')) {
        setFileLoading(true)
        const json = await parseXlsxToContribution(file)
        const contributions = mapJsonToInputContribution(json as never)
        setFileLoading(false)
        return contributions
      }
    } catch (e) {
      setFileErrors([{file: file, errors: [{message: 'Unexpected Error While Processing the File. Contact the GBDI team if error persists.', code: 'parsing-error'}]}])
      setFileLoading(false)
      console.error('Error in file parsing', e)
    }

    return [{ project: { name: file.name } as InputProject }]
  }

  return (
    <Paper data-testid='ContributionUploadPaper'>
      <Title order={3}>Contribute Now</Title>
      <Text>In order to process the data correctly, please follow the steps below:</Text>
      <Stack pl='md' py='md' gap={0}>
        <Text>
          1. Download the data template file here:
          <a href='/GBDI_Data_Template_v0.2.0.xlsx' download>
            Download file
          </a>
        </Text>
        <Text>2. Fill your data as per template's format</Text>
        <Text>3. Save as .xlsx</Text>
        <Text>4. Upload the file below</Text>
      </Stack>
      <Dropzone
        data-testid='contributionDropzone'
        disabled={!!contributionData}
        loading={fileLoading}
        onDrop={async (files) => setContributionData(await processUploadedFile(files))}
        onReject={(files) => setFileErrors(files)}
        maxSize={75 * 1024 ** 2}
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
      {fileErrors?.map((_error, index) => (
        <Text key={index} c='red'>
          {_error.file.name}: {_error.errors[0].message}
        </Text>
      ))}
      {contributionData ? (
        <Group justify='flex-end' style={{ marginTop: 16 }}>
          {error ? <Text c='red'>{error.message}</Text> : null}
          <Text>Upload {fileName}?</Text>
          <Group>
            <Tooltip label='Make these contributions visible to other organizations' position='top' withArrow>
              <Checkbox
                label='Make contributions public'
                onChange={(event) => handlePublicToggle(event.currentTarget.checked)}
                disabled={loading}
              />
            </Tooltip>
            <Button loading={loading} color='green' onClick={onContribute}>
              Contribute
            </Button>
          </Group>
        </Group>
      ) : null}
    </Paper>
  )
}
