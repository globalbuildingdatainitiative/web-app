import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useGetProjectsCountsByCountryQuery } from '@queries'
import 'leaflet/dist/leaflet.css'
import { Center, useMantineTheme, Text } from '@mantine/core'
import { Loading } from '@components'
import { useViewportSize } from '@mantine/hooks'

export const GlobalMap = () => {
  const { data, loading, error } = useGetProjectsCountsByCountryQuery()
  const { height } = useViewportSize()
  const theme = useMantineTheme()

  if (loading)
    return (
      <Center style={{ height: '600px' }}>
        <Loading />
      </Center>
    )
  if (error) return <p>Error: {error.message}</p>

  // Calculate the maximum project count to normalize circle sizes
  const maxCount = Math.max(...(data?.projects.groups.map((group) => group.count) || [1]))

  // Function to calculate circle radius based on project count
  const getRadius = (count: number) => {
    // Minimum radius of 1, maximum of 10
    // Scale logarithmically to prevent huge circles for large counts
    const minRadius = 1
    const maxRadius = 10
    return minRadius + (Math.log(count) / Math.log(maxCount)) * (maxRadius - minRadius)
  }

  return (
    <div style={{ height: height * 0.9 }} data-testid='GlobalMap'>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {data?.projects.groups.map((projectGroup, index) => (
          <CircleMarker
            key={index}
            radius={getRadius(projectGroup.count)}
            pathOptions={{
              color: theme.primaryColor,
              fillOpacity: 1,
            }}
            center={[projectGroup.items[0].location.latitude, projectGroup.items[0].location.longitude]}
          >
            <Popup>
              <Text>{projectGroup.items[0].location.countryName}</Text>
              <Text>Number of Projects: {projectGroup.count}</Text>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
