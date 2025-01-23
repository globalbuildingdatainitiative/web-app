import { GetProjectDetailsQuery, LifeCycleStage } from '@queries'
import { Box, Center, Divider, Group, Stack, Text } from '@mantine/core'
import { useElementSize, useViewportSize } from '@mantine/hooks'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectDetailsScopeProps {
  project: Project | null
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

interface ScopeBoxProps {
  name: string
  stages: string[]
  projectScopes: LifeCycleStage[]
}

const ScopeBox = (props: ScopeBoxProps) => {
  const { name, stages, projectScopes } = props
  const { height: viewportHeight } = useViewportSize()
  const { ref: b6Ref, height: b6Height } = useElementSize()
  const { ref: b1Ref, width: b1Width } = useElementSize()

  return (
    <Stack>
      <Center>
        <Text fw={700}>{name}</Text>
      </Center>
      <Divider />
      <Group justify={'center'} grow gap='xs'>
        {stages
          .filter((stage) => ['b6', 'b7'].indexOf(stage) < 0)
          .map((stage) => (
            <Box
              ref={b1Ref}
              key={stage}
              w={{ base: 'sm' }}
              h={{ base: viewportHeight * 0.3 - (b6Height > 0 ? b6Height + 16 : 0) }}
              bg={projectScopes?.indexOf(stage as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
              style={{ borderRadius: 8 }}
            >
              <Center h='100%'>
                <Text>{stage.toUpperCase()}</Text>
              </Center>
            </Box>
          ))}
      </Group>
      {name === 'Use' ? (
        <Stack gap='xs' ref={b6Ref}>
          <Box
            w={{ base: '100%' }}
            h={{ base: b1Width }}
            bg={projectScopes?.indexOf('b6' as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
            style={{ borderRadius: 8 }}
          >
            <Center h='100%'>
              <Text>B6</Text>
            </Center>
          </Box>
          <Box
            w={{ base: '100%' }}
            h={{ base: b1Width }}
            bg={projectScopes?.indexOf('b7' as LifeCycleStage) < 0 ? 'green.1' : 'green.9'}
            style={{ borderRadius: 8 }}
          >
            <Center h='100%'>
              <Text>B7</Text>
            </Center>
          </Box>
        </Stack>
      ) : null}
    </Stack>
  )
}
