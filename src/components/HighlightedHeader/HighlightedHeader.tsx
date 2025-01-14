import { Text } from '@mantine/core'
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

export const HighlightedHeader: React.FC<HighlightedHeaderProps> = ({ column, isVisible, isChartable }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Text>{column}</Text>
      {isChartable && isVisible && <IconChartBar size={16} style={{ color: theme?.colors?.green?.[9] }} />}
    </div>
  )
}
