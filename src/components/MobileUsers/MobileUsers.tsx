import React from 'react'
import { Text, Stack, Image, Box, Container } from '@mantine/core'
import { IconDeviceMobile, IconDeviceDesktop } from '@tabler/icons-react'
import logo from 'assets/logo.png'

export const MobileUsers: React.FC = () => {
  return (
    <Box
      style={(theme) => ({
        backgroundColor: theme.other.backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing.md,
      })}
    >
      <Container size='xs'>
        <Stack align='center' gap='md'>
          <Image
            src={logo}
            alt='Globe Logo'
            width={180}
            fit='contain'
            style={(theme) => ({
              marginBottom: theme.spacing.md,
              marginTop: theme.spacing.xl,
            })}
          />
          <Box
            style={(theme) => ({
              backgroundColor: theme.white,
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.green[2]}`,
              width: '100%',
              boxShadow: theme.shadows.sm,
            })}
          >
            <Stack gap='md' align='center'>
              <Text size='xl' fw={700} ta='center' c='green.9'>
                Mobile Access Unavailable
              </Text>
              <IconDeviceMobile size={40} color='gray' />
              <Text ta='center' size='sm' c='gray.7'>
                You are accessing this website from a mobile device or a device with a smaller screen. The contents of
                this website are unable to be displayed on such a device.
              </Text>
              <Text ta='center' fw={500} size='sm' c='gray.7'>
                We kindly request you to please use a device with a larger screen for the best experience.
              </Text>
              <IconDeviceDesktop size={40} color='green' />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
