import { Paper } from '@components'
import {
  mapJsonToInputContribution,
  parseLcaxToContribution,
  parseXlsxToContribution,
  validateContributions,
  ValidationResult,
} from '@lib'
import { Button, Checkbox, Group, rem, Stack, Text, Title, Tooltip } from '@mantine/core'
import { Dropzone, FileRejection } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { InputContribution, InputProject, useAddContributionMutation, GetContributionsDocument } from '@queries'
import { useNavigate } from 'react-router-dom'

export const ContributionUploadPaper = () => {
  const [addContributions, { loading, error }] = useAddContributionMutation({
    refetchQueries: [{ query: GetContributionsDocument }],
    errorPolicy: 'all',
  })
  const [contributionData, setContributionData] = useState<InputContribution[] | null>(null)
  const [contributionWarnings, setContributionWarnings] = useState<ValidationResult[] | null>(null)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [fileErrors, setFileErrors] = useState<FileRejection[] | null>(null)
  const [fileLoading, setFileLoading] = useState(false)
  const navigate = useNavigate()

  const onContribute = async () => {
    if (!contributionData) {
      return
    }

    const chunkSize = 10
    let errors: object[] = []
    if (contributionData.length > chunkSize) {
      console.warn(
        `Attempting to upload ${contributionData.length} contributions. Will batch it to ${chunkSize} contributions per request.`,
      )
      for (let i = 0; i < contributionData.length; i += chunkSize) {
        const contributionChunk = contributionData.slice(i, i + chunkSize)
        const { errors: contributionErrors } = await addContributions({
          variables: { contributions: contributionChunk },
        })
        if (contributionErrors) {
          errors = [...errors, ...contributionErrors]
        }
      }
    } else {
      const { errors: contributionErrors } = await addContributions({ variables: { contributions: contributionData } })
      if (contributionErrors) {
        errors = [...errors, ...contributionErrors]
      }
    }
    if (!errors.length) {
      navigate('/contributions')
    } else {
      setContributionData(null)
    }
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
    const validExtension = file.name.endsWith('.json') || file.name.endsWith('.xlsx')
    if (!validExtension) {
      return {
        code: 'file-invalid-type',
        message: 'Invalid file type. Only .xlsx and .json files are allowed.',
      }
    }
    return null
  }

  const processUploadedFile = async (files: File[]): Promise<InputContribution[]> => {
    setFileErrors(null)
    setFileLoading(true)
    setFileNames([])

    const contributions = await Promise.all(
      files.map(async (file) => {
        setFileNames((prev) => [...prev, file.name])
        try {
          if (file.name.endsWith('.json')) {
            const contributions = parseLcaxToContribution(JSON.parse(await file.text()))
            const { warnings } = validateContributions(contributions)
            if (warnings.length > 0) {
              setContributionWarnings(warnings)
            }
            return contributions
          } else if (file.name.endsWith('.xlsx')) {
            const json = await parseXlsxToContribution(file)
            return mapJsonToInputContribution(json as never)
          }
        } catch (e) {
          setFileErrors([
            {
              file: file,
              errors: [
                {
                  message:
                    'Unexpected Error While Processing the File. Contact the GBDI team if error persists at office@gbdi.io.',
                  code: 'parsing-error',
                },
              ],
            },
          ])
          console.error('Error in file parsing', e)
        }
      }),
    )
    const _contributions = contributions.reduce((prev, current) => [...(prev || []), ...(current || [])], [])
    setFileLoading(false)
    if (_contributions) {
      return _contributions
    }

    return [{ project: { name: files[0].name } as InputProject }]
  }

  return (
    <Paper data-testid='ContributionUploadPaper'>
      <Title order={3}>Contribute Now</Title>
      <Text>In order to process your data correctly, please read the following:</Text>
      <Text mt='sm'>There are 3 ways to contribute data to the platform.</Text>
      <Stack pl='md' py='md' gap='sm'>
        <Text>
          A. Convert your data into an openBDF JSON and upload the JSON file below. Examples of converters can be found{' '}
          <a href='https://github.com/globalbuildingdatainitiative/converters' target='_blank'>
            here
          </a>
        </Text>
        <Text>
          B. Fill out{' '}
          <a
            href='https://docs.google.com/document/d/1s26L-xBlrY6FNIB-rSwhL_mdeC6dbNos/edit?usp=sharing&ouid=102146692042378549668&rtpof=true&sd=true'
            target='_blank'
          >
            this contribution form
          </a>{' '}
          and submit it to us on office@gbdi.io and we will get in contact to help you.
        </Text>
        <Text>C. Use the Excel Upload Template and follow the steps below:</Text>
        <Stack pl='md' py='md' gap={0}>
          <Text>
            1. Download the data template file here:{' '}
            <a href='/GBDI_Data_Template_v0.2.0.xlsx' download>
              Download file
            </a>
          </Text>
          <Text>2. Fill your data as per template's format</Text>
          <Text>3. Save as .xlsx</Text>
          <Text>4. Upload the file below</Text>
        </Stack>
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
      <Stack>
        <Group justify='flex-end' style={{ marginTop: 16 }}>
          {error ? (
            <Text c='red'>
              Unable to upload your contribution. This is most likely due to inconsistent data. Please check your upload
              file ({error.message})
            </Text>
          ) : null}
          {contributionData ? (
            <>
              <Text>Upload {fileNames.join(', ')}?</Text>
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
            </>
          ) : null}
        </Group>
        {contributionWarnings ? (
          <Stack gap={0}>
            <Text fw={700}>Warnings:</Text>
            {contributionWarnings.map((warning, index) => (
              <Text c='yellow' key={index}>{`Project Id: ${warning.projectId} - ${warning.message}`}</Text>
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  )
}
