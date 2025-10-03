import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const officePosition = [16.654002, 74.264180]; // Coordinates for Los Angeles

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const StudioMap = () => {
  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={officePosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={officePosition}>
          <Popup>
            <div className="text-center">
              <h4 className="font-semibold text-gray-800">CineCraft Media Studio</h4>
              <p className="text-sm text-gray-600">123 Creative Avenue</p>
              <p className="text-sm text-gray-600">Gokul Shirgao, Kolhapur</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StudioMap;