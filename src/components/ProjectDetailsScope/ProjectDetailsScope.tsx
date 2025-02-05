import { GetProjectDetailsQuery, LifeCycleStage } from '@queries'
import { Box, Center, Divider, Group, Stack, Text } from '@mantine/core'
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
  const { height: viewportHeight } = useViewportSize()
  const { ref: b6Ref, height: b6Height } = useElementSize()
  const { ref: b1Ref, width: b1Width } = useElementSize()

  const boxHeight = viewportHeight * 0.2 - (b6Height > 0 ? b6Height + 16 : 0)

  return (
    <Stack>
      <Center>
        <Text fw={700}>{name}</Text>
      </Center>
      <Divider />
      <Group justify='center' grow gap='xs'>
        {stages
          .filter((stage) => ['b6', 'b7'].indexOf(stage) < 0)
          .map((stage) => (
            <Box
              ref={b1Ref}
              key={stage}
              w={{ base: 'sm' }}
              h={{ base: boxHeight }}
              bg={projectScopes?.indexOf(stage as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
              style={{ borderRadius: 8 }}
            >
              <Stack h='100%' justify='center' gap='xs'>
                <Center>
                  <Text>{stage.toUpperCase()}</Text>
                </Center>
                <Center>
                  <Text size='xs' ta='center' px='xs' style={{ wordBreak: 'break-word' }}>
                    {stage === 'a1a3' ? 'Product stage' : moduleNames[stage]}
                  </Text>
                </Center>
              </Stack>
            </Box>
          ))}
      </Group>
      {name === 'Use' ? (
        <Stack gap='xs' ref={b6Ref}>
          <Box
            w={{ base: '100%' }}
            h={{ base: b1Width * 0.6 }} // Reduced height for B6 and B7
            bg={projectScopes?.indexOf('b6' as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
            style={{ borderRadius: 8 }}
          >
            <Stack h='100%' justify='center' gap={4}>
              <Center>
                <Text>B6</Text>
              </Center>
              <Center>
                <Text size='xs' ta='center' px='xs'>
                  {moduleNames.b6}
                </Text>
              </Center>
            </Stack>
          </Box>
          <Box
            w={{ base: '100%' }}
            h={{ base: b1Width * 0.6 }} // Reduced height for B6 and B7
            bg={projectScopes?.indexOf('b7' as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
            style={{ borderRadius: 8 }}
          >
            <Stack h='100%' justify='center' gap={4}>
              <Center>
                <Text>B7</Text>
              </Center>
              <Center>
                <Text size='xs' ta='center' px='xs'>
                  {moduleNames.b7}
                </Text>
              </Center>
            </Stack>
          </Box>
        </Stack>
      ) : null}
    </Stack>
  )
}
