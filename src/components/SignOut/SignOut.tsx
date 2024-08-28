import { Button, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { useUserContext } from '@context'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

export const SignOut = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const client = useApolloClient()
  const [isHovered, setIsHovered] = useState(false)

  async function onLogout() {
    await client.resetStore()
    await signOut()
    localStorage.removeItem('userId')
    navigate('/auth')
  }

  return (
    <>
      <Button
        variant='outline'
        c='gray'
        size='lg'
        radius='lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onLogout}
      >
        {isHovered ? (
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
