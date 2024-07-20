import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useGetProjectsCountsByCountryQuery } from '@queries'
import 'leaflet/dist/leaflet.css'
import { Center, useMantineTheme, Text } from '@mantine/core'
import { Loading } from '@components'

export const GlobalMap = () => {
  const { data, loading, error } = useGetProjectsCountsByCountryQuery()

  const theme = useMantineTheme()

  if (loading)
    return (
      <Center style={{ height: '600px' }}>
        <Loading />
      </Center>
    )
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={{ height: '600px' }} data-testid='GlobalMap'>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {data?.projects.groups.map((projectGroup, index) =>
          Array.from({ length: projectGroup.count }).map((_, dotIndex) => (
            <CircleMarker
              key={`${index}-${dotIndex}`}
              radius={5}
              pathOptions={{ color: theme.primaryColor }}
              center={[projectGroup.items[0].location.latitude, projectGroup.items[0].location.longitude]}
            >
              <Popup>
                <Text>{projectGroup.items[0].location.countryName}</Text>
                <Text>Number of Projects: {projectGroup.count}</Text>
              </Popup>
            </CircleMarker>
          )),
        )}
      </MapContainer>
    </div>
  )
}
