import { Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useGetUsersQuery } from '@queries'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export const Greeting = () => {
  const [firstName, setFirstName] = useState('Unknown')
  const session = useSessionContext()
  const { data: usersData } = useGetUsersQuery()
  const users = usersData?.users
  useEffect(() => {
    async function fetchFirstName() {
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
        }
      } catch (error) {
        console.error('Failed to fetch user name:', error)
      }
    }
    fetchFirstName()
  }, [session, users])

  return (
    <Title order={3} style={{ paddingTop: 16 }}>
      Hello {firstName} 👋🏼
    </Title>
  )
}
