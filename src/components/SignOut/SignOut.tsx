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
      {!collapsed && (
        <Text
          style={{
            whiteSpace: 'normal',
            marginBottom: 8,
          }}
        >
          <div>
            {user?.firstName || '(No first name)'} {user?.lastName || '(No last name)'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.25 }}>{user?.email || '(No email)'}</div>
          <div style={{ fontSize: 14, lineHeight: 1.25 }}>{user?.organization?.name || 'No organization'}</div>
        </Text>
      )}
      <Button
        variant='outline'
        c='gray'
        size='lg'
        radius='lg'
        disabled={isProcessing}
        loading={isProcessing}
        onClick={onLogout}
      >
        <IconLogout size={20} />
        {!collapsed && <Text style={{ marginLeft: 8 }}>Sign Out</Text>}
      </Button>
    </>
  )
}
