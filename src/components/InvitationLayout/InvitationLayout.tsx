import { Paper, theme } from '@components'
import { Stack, Title, Container, MantineProvider } from '@mantine/core'
import logo from 'assets/logo.png'
import React from 'react'

interface InvitationLayoutProps {
  title: string
  children: React.ReactNode
  testId: string
}

export const InvitationLayout = ({ title, children, testId }: InvitationLayoutProps) => (
  <MantineProvider theme={theme}>
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafbff',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container size='md' style={{ margin: '0 auto' }}>
        <Paper data-testid={testId}>
          <Stack gap='xl' align='center'>
            <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
            <Title order={2} ta='center' mt='md'>
              {title}
            </Title>
            {children}
          </Stack>
        </Paper>
      </Container>
    </div>
  </MantineProvider>
)
