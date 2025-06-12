import { Button, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { useUserContext } from '@context'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

interface SignOutProps {
  collapsed: boolean
}

export const SignOut = ({ collapsed }: SignOutProps) => {
  const { user } = useUserContext()
  const client = useApolloClient()
  const [isHovered, setIsHovered] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  async function onLogout() {
    setIsProcessing(true)
    await client.resetStore()
    await signOut()
    localStorage.removeItem('userId')
    window.location.pathname = '/auth'
  }

  return (
    <>
      <Button
        variant='outline'
        c='gray'
        size='lg'
        radius='lg'
        disabled={isProcessing}
        loading={isProcessing}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onLogout}
      >
        {collapsed ? (
          <IconLogout size={20} />
        ) : isHovered ? (
          <>
            <IconLogout size={16} />
            <Text style={{ marginLeft: 8 }}>Sign Out</Text>
          </>
        ) : (
          <Text
            style={{
              whiteSpace: 'normal',
              width: '200px',
            }}
          >
            {user?.firstName || 'Nobody'} from {user?.organization?.name || 'Unknown'}
          </Text>
        )}
      </Button>
    </>
  )
}
