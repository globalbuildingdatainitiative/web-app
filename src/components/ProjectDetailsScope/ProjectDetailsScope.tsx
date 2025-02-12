import { GetProjectDetailsQuery, LifeCycleStage } from '@queries'
import { Box, Center, Divider, Group, Stack, Text, Tooltip } from '@mantine/core'
import { useElementSize, useViewportSize } from '@mantine/hooks'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectDetailsScopeProps {
  project: Project | null
}

interface ScopeBoxProps {
  name: string
  stages: string[]
  projectScopes: LifeCycleStage[]
}

const moduleNames: Record<string, string> = {
  a1a3: 'Product stage',
  a4: 'Transport',
  a5: 'Construction-installation\nprocess',
  b1: 'Use',
  b2: 'Maintenance',
  b3: 'Repair',
  b4: 'Refurbishment',
  b5: 'Replacement',
  b6: 'Operational energy use',
  b7: 'Operational water use',
  c1: 'De-construction\ndemolition',
  c2: 'Transport',
  c3: 'Waste\nprocessing',
  c4: 'Disposal',
  d: 'Benefits and loads beyond the system boundary',
}

export const ProjectDetailsScope = (props: ProjectDetailsScopeProps) => {
  const { project } = props

  return (
    <Group justify='center' grow>
      <ScopeBox name='Production' stages={['a1a3']} projectScopes={project?.lifeCycleStages || []} />
      <ScopeBox name='Construction' stages={['a4', 'a5']} projectScopes={project?.lifeCycleStages || []} />
      <ScopeBox
        name='Use'
        stages={['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7']}
        projectScopes={project?.lifeCycleStages || []}
      />
      <ScopeBox name='End of Life' stages={['c1', 'c2', 'c3', 'c4']} projectScopes={project?.lifeCycleStages || []} />
      <ScopeBox name='Other' stages={['d']} projectScopes={project?.lifeCycleStages || []} />
    </Group>
  )
}

const ScopeBox = (props: ScopeBoxProps) => {
  const { name, stages, projectScopes } = props
  const { width: viewportWidth, height: viewportHeight } = useViewportSize()
  const { ref: b6Ref, height: b6Height } = useElementSize()
  const { ref: b1Ref, width: b1Width } = useElementSize()

  const isSmallScreen = viewportWidth < 2200 // Enable tooltips only for smaller screens
  const boxHeight = Math.max(60, viewportHeight * 0.2 - (b6Height > 0 ? b6Height + 16 : 0)) // Ensure min height

  return (
    <Stack>
      {/* Headings Always Visible */}
      <Center>
        <Text fw={700}>{name}</Text>
      </Center>
      <Divider />

      <Group justify='center' grow wrap='wrap' gap='xs'>
        {stages
          .filter((stage) => ['b6', 'b7'].indexOf(stage) < 0)
          .map((stage) => {
            const content = (
              <Box
                ref={b1Ref}
                key={stage}
                w={{ base: '100%', md: 'sm' }} // Keep proper width on smaller screens
                h={{ base: boxHeight }}
                bg={projectScopes?.includes(stage as LifeCycleStage) ? 'green.9' : 'green.1'}
                style={{
                  borderRadius: 8,
                  padding: 8,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text size='sm'>{stage.toUpperCase()}</Text> {/* Always Uppercase */}
                {!isSmallScreen && (
                  <Text size='xs' ta='center' px='xs' style={{ wordBreak: 'break-word' }}>
                    {moduleNames[stage]} {/* Show full scope name when screen is big */}
                  </Text>
                )}
              </Box>
            )

            return isSmallScreen ? (
              <Tooltip key={stage} label={moduleNames[stage]} withArrow>
                {content}
              </Tooltip>
            ) : (
              content
            )
          })}
      </Group>

      {name === 'Use' ? (
        <Stack gap='xs' ref={b6Ref}>
          {['b6', 'b7'].map((stage) => {
            const content = (
              <Box
                key={stage}
                w='100%'
                h={{ base: Math.max(40, b1Width * 0.6) }} // Ensure proper height
                bg={projectScopes?.includes(stage as LifeCycleStage) ? 'green.9' : 'green.1'}
                style={{
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 40, // Prevent extreme shrinking
                }}
              >
                <Text size='sm'>{stage.toUpperCase()}</Text> {/* Always Uppercase */}
                {!isSmallScreen && (
                  <Text size='xs' ta='center' px='xs' style={{ wordBreak: 'break-word' }}>
                    {moduleNames[stage]} {/* Show full scope name when screen is big */}
                  </Text>
                )}
              </Box>
            )

            return isSmallScreen ? (
              <Tooltip key={stage} label={moduleNames[stage]} withArrow>
                {content}
              </Tooltip>
            ) : (
              content
            )
          })}
        </Stack>
      ) : null}
    </Stack>
  )
}
