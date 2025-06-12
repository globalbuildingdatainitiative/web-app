import { AsyncAutocomplete, Paper } from '@components'
import { useGetContributionsForDetailsLazyQuery } from '@queries'
import { useNavigate } from 'react-router-dom'

export const DetailsPaper = () => {
  const navigate = useNavigate()

  const [getContributions] = useGetContributionsForDetailsLazyQuery({ variables: { limit: 20 } })

  const handleContributionSelect = (value: string | null) => {
    if (!value) return
    navigate(`/details/${value}/project`)
  }

  const processData = (data: object) =>
    // @ts-expect-error simplified types
    data?.contributions?.items?.map((contribution) => ({
      value: contribution.id,
      label: `${contribution.id} - ${contribution.project?.name || 'Unnamed Project'}`,
    })) || []

  return (
    <Paper data-testid='DetailsPaper' width={500}>
      <AsyncAutocomplete
        label='Search Contributions'
        placeholder='Search contributions by ID or name'
        // @ts-expect-error simplified types
        dataQuery={getContributions}
        processData={processData}
        onSelect={handleContributionSelect}
      />
    </Paper>
  )
}
