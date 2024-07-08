import { ContributionHeader, ContributionPaper } from '@components'
import { Stack } from '@mantine/core'
import { useUserContext } from '@context'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const ContributionPage = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.organization) {
      navigate('/organization/new')
    }
  }, [user, navigate])

  return (
    <Stack>
      <ContributionHeader />
      <ContributionPaper />
    </Stack>
  )
}
