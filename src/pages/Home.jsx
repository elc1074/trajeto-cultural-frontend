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

const userIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapLoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">
       Carregando mapa...
      </p>
    </div>
);


const HomePage = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Erro ao obter localização do usuário:", err);
      }
    );
  }, []);


  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      let page = 1;
      let allObras = [];

      while (true) {
        try {
          const res = await fetch(`https://trajeto-cultural-backend.onrender.com/acervo/get_lista?page=${page}&per_page=100`);
          const data = await res.json();
          if (!data || data.length === 0) break;

          allObras = [...allObras, ...data];
          if (cancel) break;

          setObras([...allObras]);
          page++;
        } catch (err) {
          console.error("Erro ao carregar obras:", err);
          break;
        }
      }

      if (!cancel) setLoading(false);
    };

    fetchData();
    return () => { cancel = true; };
  }, []);


  return (
    <div className="relative flex h-screen flex-col bg-purple-600">
      <Header section="Trajeto Cultural" />

      <div className="h-full w-full overflow-hidden rounded-t-2xl bg-white">

        {loading ? (
          <MapLoadingAnimation />
        ) : (
          <MapContainer
            center={[-29.7206, -53.7165]}
            zoom={15}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

            {userLocation && (
              <Marker position={userLocation} icon={userIcon}>
                <Popup>📍 Você está aqui</Popup>
              </Marker>
            )}

            {obras
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
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
