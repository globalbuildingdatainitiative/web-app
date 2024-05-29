import { useState, useEffect } from 'react'
import { Text, Button } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { useGetUsersQuery, useGetOrganizationsQuery } from '@queries'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export const SignOut = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('User')
  const [organization, setOrganization] = useState('<Unknown>')
  const session = useSessionContext()
  const { data: usersData } = useGetUsersQuery()
  const { data: organizationsData } = useGetOrganizationsQuery()
  const [isHovered, setIsHovered] = useState(false)

  const users = usersData?.users
  const organizations = organizationsData?.organizations

  useEffect(() => {
    async function fetchFirstNameAndOrganization() {
      if (session.loading || !session.doesSessionExist) {
        return
      }

      const currentUserID = session.userId

      try {
        if (currentUserID) {
          const currentUser = users?.find((user) => user.id === currentUserID)
          if (currentUser && currentUser.firstName) {
            setFirstName(currentUser.firstName)
          }

          if (currentUser && currentUser.organizationId) {
            const currentOrganization = organizations?.find(
              (organization) => organization.id === currentUser.organizationId,
            )
            if (currentOrganization && currentOrganization.name) {
              setOrganization(currentOrganization.name)
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch user metadata:', error)
      }
    }
    fetchFirstNameAndOrganization()
  }, [session, users, organizations])

  async function onLogout() {
    await signOut()
    navigate('/auth')
  }
  return (
    <>
      <Button
        variant='outline'
        color='green'
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
            {firstName} from {organization}
          </Text>
        )}
      </Button>
    </>
  )
}
