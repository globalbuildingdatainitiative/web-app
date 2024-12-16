import { useMemo, ReactNode } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetProjectsCountsByCountryQuery, useGetProjectPortfolioQuery, GetProjectPortfolioQuery } from '@queries'
import { Text, Paper, SimpleGrid } from '@mantine/core'
import { countryNameToAlpha3 } from './countryCodesMapping'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { theme } from '@components'

interface ChartData {
  count: number
  [key: string]: string | number
}

interface ChartContainerProps {
  children: ReactNode
  title: string
}

interface AttributeChartProps {
  visibleColumns: MRT_VisibilityState
}

interface ChartConfig {
  dataKey: string
  color: string
  title: string
}

const ChartContainer = ({ children, title }: ChartContainerProps) => (
  <Paper p='xs' shadow='sm' h='100%' style={{ minHeight: '250px' }}>
    <Text size='sm' fw={500} mb='xs'>
      {title}
    </Text>
    <div style={{ height: 'calc(100% - 24px)' }}>{children}</div>
  </Paper>
)

const renderChart = (data: ChartData[], dataKey: string, fill: string, title: string) => (
  <ChartContainer title={title}>
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 40, bottom: 50 }}>
        <XAxis dataKey={dataKey} angle={45} textAnchor='start' interval={0} height={60} tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip contentStyle={{ fontSize: '10px' }} />
        <Bar dataKey='count' fill={fill} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
)

const getColor = (colorName: string, shade: number, fallback: string): string => {
  return theme.colors?.[colorName]?.[shade] || fallback
}

const getChartConfig = (columnKey: string): ChartConfig => {
  const configs: { [key: string]: ChartConfig } = {
    'location.countryName': { dataKey: 'country', color: getColor('green', 6, '#40C057'), title: 'Countries' },
    'projectInfo.buildingType': { dataKey: 'type', color: getColor('blue', 6, '#228BE6'), title: 'Building Types' },
    'softwareInfo.lcaSoftware': {
      dataKey: 'software',
      color: getColor('light_green', 6, '#7950F2'),
      title: 'LCA Software',
    },
    'projectInfo.buildingTypology': {
      dataKey: 'typology',
      color: getColor('orange', 6, '#FF6B6B'),
      title: 'Building Typology',
    },
    'metaData.source.name': { dataKey: 'source', color: getColor('light_orange', 6, '#20C997'), title: 'Data Sources' },
    'projectInfo.generalEnergyClass': {
      dataKey: 'energyClass',
      color: getColor('yellow', 6, '#FCC419'),
      title: 'Energy Classes',
    },
    'projectInfo.frameType': { dataKey: 'frame', color: getColor('green', 4, '#BE4BDB'), title: 'Frame Types' },
    'projectInfo.roofType': { dataKey: 'roof', color: getColor('red', 6, '#FA5252'), title: 'Roof Types' },
    'projectInfo.grossFloorArea.value': {
      dataKey: 'range',
      color: getColor('blue', 4, '#FA5252'),
      title: 'Gross Floor Area',
    },
    'projectInfo.buildingCompletionYear': {
      dataKey: 'year',
      color: getColor('light_green', 4, '#FD7E14'),
      title: 'Building Completion Year',
    },
    'projectInfo.buildingFootprint.value': {
      dataKey: 'range',
      color: getColor('orange', 4, '#FF9F1C'),
      title: 'Building Footprint',
    },
    'projectInfo.buildingHeight.value': {
      dataKey: 'range',
      color: getColor('light_orange', 4, '#E63946'),
      title: 'Building Height',
    },
    'projectInfo.buildingMass.value': {
      dataKey: 'range',
      color: getColor('yellow', 4, '#2D3A8C'),
      title: 'Building Mass',
    },
    'projectInfo.buildingPermitYear': {
      dataKey: 'range',
      color: getColor('green', 7, '#6C757D'),
      title: 'Building Permit Year',
    },
    'projectInfo.buildingUsers': { dataKey: 'range', color: getColor('blue', 7, '#5C940D'), title: 'Building Users' },
    'projectInfo.floorsAboveGround': {
      dataKey: 'range',
      color: getColor('orange', 7, '#364FC7'),
      title: 'Floors Above Ground',
    },
    'projectInfo.floorsBelowGround': {
      dataKey: 'range',
      color: getColor('light_orange', 7, '#C92A2A'),
      title: 'Floors Below Ground',
    },
    'projectInfo.heatedFloorArea.value': {
      dataKey: 'range',
      color: getColor('yellow', 7, '#868E96'),
      title: 'Heated Floor Area',
    },
    results: { dataKey: 'range', color: getColor('red', 7, '#F06595'), title: 'GWP Intensity' },
  }

  return configs[columnKey] || { dataKey: 'unknown', color: '#999', title: 'Unknown' }
}

const useChartData = (portfolioData: GetProjectPortfolioQuery | undefined) => {
  const items = portfolioData?.projects?.items || []

  const buildingTypeData = useMemo(() => {
    const typeCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const type = item.projectInfo.buildingType || 'Unknown'
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(typeCount).map(([type, count]) => ({
      type: type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      count,
    }))
  }, [items])

  const grossFloorAreaData = useMemo(() => {
    const floorAreas = items.map((item) => item.projectInfo.grossFloorArea?.value || 0).filter((value) => value > 0)

    if (floorAreas.length === 0) return []

    const min = Math.min(...floorAreas)
    const max = Math.max(...floorAreas)
    const binSize = (max - min) / 10
    return Array.from({ length: 10 }, (_, i) => {
      const start = min + i * binSize
      const end = start + binSize
      const count = floorAreas.filter((area) => area >= start && area < end).length
      return {
        range: `${Math.round(start)}-${Math.round(end)}`,
        count,
      }
    })
  }, [items])

  const softwareData = useMemo(() => {
    const softwareCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const software = item.softwareInfo?.lcaSoftware || 'Unknown'
        acc[software] = (acc[software] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(softwareCount).map(([software, count]) => ({ software, count }))
  }, [items])

  const typologyData = useMemo(() => {
    const typologyCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const typology = String(item.projectInfo.buildingTypology || 'Unknown')
        acc[typology] = (acc[typology] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(typologyCount).map(([typology, count]) => ({
      typology: typology.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      count,
    }))
  }, [items])

  const sourceData = useMemo(() => {
    const sourceCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const source = item.metaData?.source?.name || 'Unknown'
        acc[source] = (acc[source] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(sourceCount).map(([source, count]) => ({ source, count }))
  }, [items])

  const energyClassData = useMemo(() => {
    const energyCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const energyClass = item.projectInfo.generalEnergyClass || 'Unknown'
        acc[energyClass] = (acc[energyClass] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(energyCount).map(([energyClass, count]) => ({
      energyClass: energyClass.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      count,
    }))
  }, [items])

  const frameTypeData = useMemo(() => {
    const frameCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const frame = item.projectInfo.frameType || 'Unknown'
        acc[frame] = (acc[frame] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(frameCount).map(([frame, count]) => ({
      frame: frame.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      count,
    }))
  }, [items])

  const roofTypeData = useMemo(() => {
    const roofCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const roof = item.projectInfo.roofType || 'Unknown'
        acc[roof] = (acc[roof] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(roofCount).map(([roof, count]) => ({
      roof: roof.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      count,
    }))
  }, [items])

  const completionYearData = useMemo(() => {
    const yearCount: { [key: string]: number } = items.reduce(
      (acc, item) => {
        const year = item.projectInfo.buildingCompletionYear || 'Unknown'
        acc[year] = (acc[year] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(yearCount)
      .filter(([year]) => year !== 'Unknown')
      .map(([year, count]) => ({
        year: parseInt(year),
        count,
      }))
      .sort((a, b) => a.year - b.year)
  }, [items])

  const buildingFootprintData = useMemo(() => {
    const footprints = items.map((item) => item.projectInfo.buildingFootprint?.value || 0).filter((value) => value > 0)

    if (footprints.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = footprints.filter((area) => area >= start && area < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const buildingHeightData = useMemo(() => {
    const heights = items.map((item) => item.projectInfo.buildingHeight?.value || 0).filter((value) => value > 0)

    if (heights.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = heights.filter((height) => height >= start && height < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const buildingMassData = useMemo(() => {
    const masses = items.map((item) => item.projectInfo.buildingMass?.value || 0).filter((value) => value > 0)

    if (masses.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = masses.filter((mass) => mass >= start && mass < end).length

      return {
        range: `${start}-${end}`,
        count,
      }
    })

    return bins
  }, [items])

  const permitYearData = useMemo(() => {
    const years = items.map((item) => item.projectInfo.buildingPermitYear || 0).filter((value) => value > 0)

    if (years.length === 0) return []

    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    const binSize = Math.ceil((maxYear - minYear) / 5) // 5 bins

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = minYear + i * binSize
      const end = start + binSize - 1
      const count = years.filter((year) => year >= start && year <= end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const buildingUsersData = useMemo(() => {
    const users = items.map((item) => item.projectInfo.buildingUsers || 0).filter((value) => value > 0)

    if (users.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = users.filter((value) => value >= start && value < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const floorsAboveGroundData = useMemo(() => {
    const floors = items.map((item) => item.projectInfo.floorsAboveGround || 0).filter((value) => value > 0)

    if (floors.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = floors.filter((value) => value >= start && value < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const floorsBelowGroundData = useMemo(() => {
    const floors = items.map((item) => item.projectInfo.floorsBelowGround || 0).filter((value) => value > 0)

    if (floors.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = floors.filter((value) => value >= start && value < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const heatedFloorAreaData = useMemo(() => {
    const areas = items.map((item) => item.projectInfo.heatedFloorArea?.value || 0).filter((value) => value > 0)

    if (areas.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = areas.filter((value) => value >= start && value < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  const gwpIntensityData = useMemo(() => {
    const intensities = items
      .map((item) => {
        const gwp = item.results?.gwp
        const footprint = item.projectInfo.grossFloorArea?.value || 0
        if (!gwp?.total || !footprint) return 0
        return gwp.total / footprint
      })
      .filter((value) => value > 0)

    if (intensities.length === 0) return []

    const bins = Array.from({ length: 5 }, (_, i) => {
      const start = i * 200
      const end = start + 200
      const count = intensities.filter((value) => value >= start && value < end).length
      return {
        range: `${start}-${end}`,
        count,
      }
    })
    return bins
  }, [items])

  return {
    buildingTypeData,
    softwareData,
    typologyData,
    sourceData,
    energyClassData,
    frameTypeData,
    roofTypeData,
    grossFloorAreaData,
    completionYearData,
    buildingFootprintData,
    buildingHeightData,
    buildingMassData,
    permitYearData,
    buildingUsersData,
    floorsAboveGroundData,
    floorsBelowGroundData,
    heatedFloorAreaData,
    gwpIntensityData,
  }
}

export const AttributeChart = ({ visibleColumns }: AttributeChartProps) => {
  const { data: countryData, loading: countryLoading, error: countryError } = useGetProjectsCountsByCountryQuery()
  const {
    data: portfolioData,
    loading: portfolioLoading,
    error: portfolioError,
  } = useGetProjectPortfolioQuery({
    variables: { limit: 1000, offset: 0 },
  })

  const countryChartData = useMemo(() => {
    if (!countryData?.projects.groups) return []
    return countryData.projects.groups.map((group) => ({
      country: countryNameToAlpha3[group.items[0]?.location.countryName || 'Unknown'] || 'Unknown',
      count: group.count,
    }))
  }, [countryData])

  const {
    buildingTypeData,
    softwareData,
    typologyData,
    sourceData,
    energyClassData,
    frameTypeData,
    roofTypeData,
    grossFloorAreaData,
    completionYearData,
    buildingFootprintData,
    buildingHeightData,
    buildingMassData,
    permitYearData,
    buildingUsersData,
    floorsAboveGroundData,
    floorsBelowGroundData,
    heatedFloorAreaData,
    gwpIntensityData,
  } = useChartData(portfolioData)

  const columnToChartData = {
    'location.countryName': countryChartData,
    'projectInfo.buildingType': buildingTypeData,
    'softwareInfo.lcaSoftware': softwareData,
    'projectInfo.buildingTypology': typologyData,
    'metaData.source.name': sourceData,
    'projectInfo.generalEnergyClass': energyClassData,
    'projectInfo.frameType': frameTypeData,
    'projectInfo.roofType': roofTypeData,
    'projectInfo.grossFloorArea.value': grossFloorAreaData,
    'projectInfo.buildingCompletionYear': completionYearData,
    'projectInfo.buildingFootprint.value': buildingFootprintData,
    'projectInfo.buildingHeight.value': buildingHeightData,
    'projectInfo.buildingMass.value': buildingMassData,
    'projectInfo.buildingPermitYear': permitYearData,
    'projectInfo.buildingUsers': buildingUsersData,
    'projectInfo.floorsAboveGround': floorsAboveGroundData,
    'projectInfo.floorsBelowGround': floorsBelowGroundData,
    'projectInfo.heatedFloorArea.value': heatedFloorAreaData,
    results: gwpIntensityData,
  }

  if (countryLoading || portfolioLoading) return <Text size='xs'>Loading...</Text>
  if (countryError || portfolioError) {
    return (
      <Text size='xs' c='red'>
        Error: {countryError?.message || portfolioError?.message}
      </Text>
    )
  }

  const visibleCharts = Object.entries(columnToChartData)
    .filter(([columnKey]) => visibleColumns[columnKey])
    .map(([columnKey, data]) => {
      const chartConfig = getChartConfig(columnKey)
      return renderChart(data, chartConfig.dataKey, chartConfig.color, chartConfig.title)
    })

  const visibleChartCount = visibleCharts.length

  const gridColumns = visibleChartCount > 4 ? 3 : 2

  return (
    <SimpleGrid cols={gridColumns} spacing='md' style={{ height: '100%' }} verticalSpacing='md'>
      {visibleCharts}
    </SimpleGrid>
  )
}
