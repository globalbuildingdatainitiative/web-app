import { Group, Title, Text, Stack, Badge, ActionIcon } from '@mantine/core'
import { useUserContext } from '@context'
import { AsanaHelpModal } from './AsanaForm'
import gbdi_logo from 'assets/logo.png'
import globe_logo from 'assets/globe_logo.png'
import { useState } from 'react'
import { IconQuestionMark } from '@tabler/icons-react'

export const Greeting = () => {
  const { user } = useUserContext()
  const [helpModalOpened, setHelpModalOpened] = useState(false)

  return (
    <header>
      <Group justify='space-between' align='flex-start' w='100%'>
        <Group pt='md'>
          <Title order={3} style={{ paddingLeft: '10px', marginTop: '10px' }}>
            {/* <!-- Add same space before than after-->  */}
            👋🏼 <span style={{ marginLeft: '10px' }}>Hello {user?.firstName}</span>
          </Title>
          <Badge color='purple' variant='light' size='lg' style={{ marginTop: '12px' }}>
            Beta
          </Badge>
          {user?.isImpersonation && (
            <Title order={3} c='red'>
              {' '}
              (Impersonating as Admin)
            </Title>
          )}
          <ActionIcon
            onClick={() => setHelpModalOpened(true)}
            color='orange'
            variant='light'
            size='24px'
            radius='50%'
            style={{ marginTop: '12px' }}
            aria-label='Toggle color scheme'
          >
            <IconQuestionMark />
          </ActionIcon>
          <AsanaHelpModal
            opened={helpModalOpened}
            onClose={() => setHelpModalOpened(false)}
            formUrl='https://form.asana.com/?k=xh0ZrlKv2-gVplAEqvkKHQ&d=657131673058940&embed=true'
          />
        </Group>

        <Stack align='flex-end' pr='30px' gap='xs' style={{ marginRight: '10px', marginTop: '5px' }}>
          <Text size='sm' c='dimmed'>
            Open-source, Open Data, Powered by
          </Text>
          <Group gap='md'>
            <img src={gbdi_logo} alt='Global Building Data Initiative' height={30} />
            <img src={globe_logo} alt='GLOBE' height={30} />
          </Group>
        </Stack>
      </Group>
    </header>
  )
}
