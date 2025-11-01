import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'

export interface CircleMapDataPoint {
  id: string;
  lat: number;
  lon: number;
  value: number;
  name: string;
  disabled?: boolean;
}

export interface CircleMapData {
  points: CircleMapDataPoint[];
}

interface CircleMapProps {
  minPointRadius: number;
  maxPointRadius: number;
  data: CircleMapData;
  makePopup?: (point: CircleMapDataPoint) => React.ReactNode;
}

export const CircleMap = (props: CircleMapProps) => {
  const { data, minPointRadius, maxPointRadius, makePopup } = props
  const theme = useMantineTheme()

  const maxValue = useMemo(() => {
    return Math.max(...data.points.map(point => point.value));
  }, [data]);

  // Calculate circle color based on filter state
  const getCircleColor = (point: CircleMapDataPoint) => {
    return point.disabled ? theme.colors.gray[5] : theme.colors.green[9] // Grayed out color for filtered countries
  }

  // Calculate circle radius based on project count
  const getRadius = (point: CircleMapDataPoint) => {
    return minPointRadius + (Math.log(point.value) / Math.log(maxValue)) * (maxPointRadius - minPointRadius)
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {data.points.map((point, index) => {
        return (
          <CircleMarker
            key={index}
            radius={getRadius(point)}
            pathOptions={{
              color: 'white',
              weight: 1,
              fillColor: getCircleColor(point),
              fillOpacity: 1,
            }}
            center={[point.lat, point.lon]}
          >
            <Popup>
              {makePopup ? makePopup(point) : (
                <>
                  <Text>{point.name}</Text>
                </>
              )}
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
