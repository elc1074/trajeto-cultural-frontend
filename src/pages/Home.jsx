import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/containers/BottomNav";
import { Header } from "@/components/containers/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Header fixo no topo */}
      <Header section="Localização" />

      {/* Mapa ocupa o espaço restante */}
      <div className="flex-1">
        <MapContainer
          center={[-29.6842, -53.8069]}
          zoom={15}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-29.6842, -53.8069]}>
            <Popup>
              🎨 Ponto Cultural <br /> Aqui tem um evento!
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* BottomNav fixo no rodapé */}
      <BottomNav />
    </div>
  );
};

export default Home;
