import { Paper } from '@components'
import { Group, rem, Title, Text, Button } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { InputContribution, useAddContributionMutation } from '@queries'
import { useNavigate } from 'react-router-dom'

export const ContributionUploadPaper = () => {
  const [addContributions, { loading, error }] = useAddContributionMutation({ refetchQueries: ['getContributions'] })
  const [contributionData, setContributionData] = useState<InputContribution | null>(null)
  const navigate = useNavigate()

  const onContribute = async () => {
    if (!contributionData) {
      return
    }
    await addContributions({ variables: { contributions: [contributionData] } })
    navigate('/contributions')
  }


  return (
    <Paper data-testid='ContributionUploadPaper'>
      <Title order={3}>Contribute Now</Title>
      <Text>In order to process the data correctly, please follow the steps below:</Text>
      <Text>
        <ol>
          <li>Download the data template file here:</li>
          <li>Paste your data as per template's format</li>
          <li>Export the file as .xlsx</li>
          <li>Upload the file below</li>
        </ol>
      </Text>
      <Dropzone
        data-testid='contributionDropzone'
        disabled={!!contributionData}
        onDrop={(files) => setContributionData(processUploadedFile(files))}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={['text/csv']}
        inputProps={{
          // @ts-expect-error data-testid is valid
          'data-testid': 'dropzoneInput'
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
          <Text>Upload {contributionData?.project.name}?</Text>
          <Button loading={loading} color='green' onClick={onContribute}>
            Contribute
          </Button>
        </Group>
      ) : null}
    </Paper>
  )
}

const processUploadedFile = (files: File[]): InputContribution => {
  const file = files[0]
  return { project: { name: file.name } }
}
