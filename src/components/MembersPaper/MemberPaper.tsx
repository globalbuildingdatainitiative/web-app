import { ErrorBoundary, Paper } from '@components'
import { Title } from '@mantine/core'
import { MemberTable, CreateOrganizationPaper } from '@components'
import { useGetUsersQuery } from '@queries'
import { doesSessionExist, getUserId } from 'supertokens-auth-react/recipe/session'
import { useEffect, useState } from 'react'

type UserFilters = {
  id?: {
    equal?: string | null
  }
}

export const MemberPaper = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      if (await doesSessionExist()) {
        const id = await getUserId()
        setCurrentUserId(id)
      }
    }
    fetchCurrentUserId()
  }, [])

  const { data: usersData } = useGetUsersQuery({
    variables: {
      filters: {
        id: {
          equal: currentUserId,
        },
      } as UserFilters,
    },
    skip: !currentUserId,
  })

  const currentUser = usersData?.users.find((user) => user.id === currentUserId)
  const currentOrganizationId = currentUser?.organizationId

  return (
    <Paper data-testid='MemberPaper'>
      <ErrorBoundary>
        <Title order={2}>All Members</Title>
        {currentOrganizationId ? <MemberTable organizationId={currentOrganizationId} /> : <CreateOrganizationPaper />}
      </ErrorBoundary>
    </Paper>
  )
}
