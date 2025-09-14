import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      <Header section="Home " />

      {/* Wrapper com bordas arredondadas */}
      <div className="w-full h-full rounded-t-2xl overflow-hidden bg-white">
        <MapContainer
          center={[-29.7206, -53.7165]}
          zoom={15}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

          <Marker
            position={[-29.7206, -53.7165]}
            eventHandlers={{
              click: () => {
                navigate("/ponto-artistico");
              },
            }}
          >
            <Popup>Planetário da UFSM 🌌</Popup>
          </Marker>

          <Marker position={[-29.718, -53.715]}>
            <Popup>Outro Ponto Cultural 🎭</Popup>
          </Marker>

          <Marker position={[-29.722, -53.717]}>
            <Popup>Museu 📚</Popup>
          </Marker>
        </MapContainer>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
