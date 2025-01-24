import {
  ErrorBoundary,
  ErrorMessage,
  Paper,
  ProjectDetailsChart,
  ProjectDetailsReference,
  ProjectDetailsScope,
  ProjectMetadataTable,
} from '@components'
import { Button, Divider, Group, Title } from '@mantine/core'
import { useGetProjectDetailsQuery } from '@queries'
import { useMemo, useState } from 'react'
import { IconPrinter } from '@tabler/icons-react'
import domtoimage from 'dom-to-image'

interface ProjectDetailsPaperProps {
  projectId: string
}

export const ProjectDetailsPaper = (props: ProjectDetailsPaperProps) => {
  const { projectId } = props

  const { data, loading, error } = useGetProjectDetailsQuery({ variables: { id: projectId } })
  const [printLoading, setPrintLoading] = useState(false)
  const [printError, setPrintError] = useState<{ message: string } | null>(null)

  const project = useMemo(() => data?.contributions.items?.[0].project || null, [data])

  const handlePrint = async () => {
    const node = document.getElementById('ProjectDetailsPaper'!)
    setPrintLoading(true)
    try {
      const dataUrl = await domtoimage.toPng(node!, { bgcolor: 'white' })
      const link = document.createElement('a')
      link.download = `${project?.name}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error printing Project Details:', error)
      setPrintError({ message: 'Error printing Project Details. If the error persist, try using Chrome.' })
    }
    setPrintLoading(false)
  }

  return (
    <Paper data-testid='ProjectDetailsPaper'>
      <div id='ProjectDetailsPaper'>
        <Group justify='space-between'>
          <Title order={3} style={{ marginBottom: 8 }}>
            Details for {project?.name}
          </Title>
          <Button
            onClick={handlePrint}
            disabled={loading}
            variant='subtle'
            color='black'
            leftSection={<IconPrinter />}
            loading={printLoading}
          >
            Print Page
          </Button>
        </Group>
        <Divider />
        <Title order={4} my='md'>
          Dataset Reference
        </Title>
        <ErrorBoundary>
          <ProjectDetailsReference project={project} loading={loading} />
        </ErrorBoundary>
        <Divider mt='md' />
        <Title order={4} my='md'>
          GWP Intensity Benchmark
        </Title>
        <ErrorBoundary>
          <ProjectDetailsChart project={project} loading={loading} />
        </ErrorBoundary>
        <Divider mt='md' />
        <Title order={4} my='md'>
          Life Cycle Scopes
        </Title>
        <ErrorBoundary>
          <ProjectDetailsScope project={project} />
        </ErrorBoundary>
      </div>
      <Divider mt='md' />
      <Title order={4} my='md'>
        Metadata
      </Title>
      <ErrorBoundary>
        <ProjectMetadataTable project={project} loading={loading} />
      </ErrorBoundary>
      <ErrorMessage error={error || printError} mt='lg' />
    </Paper>
  )
}
