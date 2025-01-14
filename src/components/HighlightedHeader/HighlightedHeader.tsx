import { Text, Tooltip } from '@mantine/core'
import { IconChartBar } from '@tabler/icons-react'
import React from 'react'
import { theme } from '@components'

interface HighlightedHeaderProps {
  column: string
  isVisible: boolean
  isChartable: boolean
}

export const HighlightedHeader: React.FC<HighlightedHeaderProps> = ({ column, isVisible, isChartable }) => {
  return (
    <Tooltip
      label={
        isChartable
          ? isVisible
            ? 'Shown in charts'
            : 'Toggle to show in charts'
          : 'This column cannot be shown in charts'
      }
      position='top'
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text>{column}</Text>
        {isChartable && isVisible && <IconChartBar size={16} style={{ color: theme?.colors?.green?.[9] }} />}
      </div>
    </Tooltip>
  )
}
