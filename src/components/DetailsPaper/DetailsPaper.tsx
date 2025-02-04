import { ErrorMessage, Loading, Paper } from '@components'
import { Select } from '@mantine/core'
import { useGetContributionsQuery } from '@queries'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const DetailsPaper = () => {
  const navigate = useNavigate()
  const { data, loading, error } = useGetContributionsQuery({
    variables: {
      limit: null,
      offset: 0,
    },
  })

  const contributions = useMemo(
    () =>
      data?.contributions?.items?.map((contribution) => ({
        value: contribution.id,
        label: `${contribution.id} - ${contribution.project?.name || 'Unnamed Project'}`,
      })) || [],
    [data],
  )

  const handleContributionSelect = (value: string | null) => {
    if (!value) return
    navigate(`/details/${value}/project`)
  }

  return (
    <Paper data-testid='DetailsPaper'>
      <Select
        label='Select Contribution'
        placeholder='Search contributions by ID or name'
        data={contributions}
        onChange={handleContributionSelect}
        searchable
        nothingFoundMessage='No contributions found'
        disabled={loading || !!error}
      />
      {loading && <Loading />}
      <ErrorMessage error={error} mt='md' />
    </Paper>
  )
}
