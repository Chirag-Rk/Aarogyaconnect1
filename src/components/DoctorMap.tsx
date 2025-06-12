import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Doctor } from '@/types'; // Or define Doctor inline if not shared
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const doctorIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface DoctorMapProps {
  doctors: Doctor[];
}

const DoctorMap = ({ doctors }: DoctorMapProps) => {
  const center = [12.9716, 77.5946]; // Default to Bangalore or current user location

  return (
    <MapContainer center={center} zoom={12} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {doctors.map((doctor) =>
        doctor.latitude && doctor.longitude ? (
          <Marker
            key={doctor.id}
            position={[doctor.latitude, doctor.longitude]}
            icon={doctorIcon}
          >
            <Popup>
              <strong>{doctor.name}</strong><br />
              {doctor.specialty}<br />
              📍 {doctor.location}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default DoctorMap;
