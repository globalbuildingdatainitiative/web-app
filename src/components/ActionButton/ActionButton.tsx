import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'

export const ActionButton = ({ buttonName, navigateTo }: { buttonName: string; navigateTo: string }) => {
  const navigate = useNavigate()
  return (
    <Button
      color='green'
      radius='sm'
      px={16}
      onClick={() => navigate(navigateTo)}
      styles={(theme) => ({
        root: {
          boxShadow: theme.shadows.sm,
        },
      })}
    >
      {buttonName}
    </Button>
  )
}
