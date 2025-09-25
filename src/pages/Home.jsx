import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});



const HomePage = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetch("https://trajeto-cultural-backend.onrender.com/acervo/get_lista")
      .then((res) => res.json())
      .then((data) => {
        setObras(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar obras:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative flex h-screen flex-col bg-purple-600">
      <Header section="Trajeto Cultural " />

      {/* Wrapper com bordas arredondadas */}
      <div className="h-full w-full overflow-hidden rounded-t-2xl bg-white">
        <MapContainer
          center={[-29.7206, -53.7165]}
          zoom={15}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />


          {!loading &&
            obras
              .filter((obra) => obra.latitude && obra.longitude)
              .map((obra) => (
                <Marker
                  key={obra.id}
                  position={[
                    parseFloat(obra.latitude),
                    parseFloat(obra.longitude),
                  ]}
                  eventHandlers={{
                    click: () => {
                      navigate(`/ponto-artistico?id=${obra.id}`);
                    },
                  }}
                >
                  <Popup>{obra.title}</Popup>
                </Marker>
              ))}
        </MapContainer>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
