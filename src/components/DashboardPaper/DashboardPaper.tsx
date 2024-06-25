import { ErrorBoundary, Paper } from '@components'
import { Title } from '@mantine/core'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useGetProjectsCountsByCountryQuery } from '@queries'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'


interface Project {
  count: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const DashboardPaper = () => {
  const { data, loading, error } = useGetProjectsCountsByCountryQuery();
  console.log("Data:", data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Paper data-testid='DashboardPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        GWP Intensity (Global Level - Building Type)
      </Title>
      <ErrorBoundary>
        <div style={{ height: '600px' }}>
          <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data?.projectsCountsByCountry.map((project: Project, index: number) => (
              Array.from({ length: project.count }).map((_, dotIndex) => (
                <Marker
                  key={`${index}-${dotIndex}`}
                  position={[project.location.latitude, project.location.longitude]}
                  icon={L.divIcon({ className: 'custom-icon', html: '<div class="dot"></div>' })}
                >
                  <Popup>
                    Number of Projects: {project.count}
                  </Popup>
                </Marker>
              ))
            ))}
          </MapContainer>
        </div>
      </ErrorBoundary>
      <style>{`
        .dot {
          background-color: red;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          display: inline-block;
        }

        .custom-icon {
          background: none;
          border: none;
        }
      `}</style>
    </Paper>
  );
}
