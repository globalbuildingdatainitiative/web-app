import { Text, Tooltip } from '@mantine/core'
import { IconChartBar } from '@tabler/icons-react'
import React from 'react'
import { theme } from '@components'
import { ChartTab } from '@components'

interface HighlightedHeaderProps {
  column: string
  isVisible: boolean
  isChartable: boolean
  activeTab: ChartTab
  columnId: string
}

export const HighlightedHeader: React.FC<HighlightedHeaderProps> = ({ column, isVisible, isChartable, activeTab }) => {
  // Get tooltip message based on chart type
  const getTooltipMessage = () => {
    if (!isChartable) {
      return activeTab === 'intensity'
        ? 'This column is not supported in Carbon Intensity chart'
        : 'This column cannot be shown in charts'
    }
    return isVisible ? 'Shown in charts' : 'Toggle to show in charts'
  }

  return (
    <Tooltip label={getTooltipMessage()} position='top'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text>{column}</Text>
        {isChartable && isVisible && <IconChartBar size={16} style={{ color: theme?.colors?.green?.[9] }} />}
      </div>
    </Tooltip>
  )
}
