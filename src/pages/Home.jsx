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
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
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
      <div
        className="h-4 w-4 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0s", animationDuration: "1.5s" }}
      ></div>
      <div
        className="h-4 w-4 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0.3s", animationDuration: "1.5s" }}
      ></div>
      <div
        className="h-4 w-4 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0.6s", animationDuration: "1.5s" }}
      ></div>
    </div>
    <p className="mt-6 text-lg font-medium text-gray-700">
      Carregando mapa...
    </p>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState(() => {
    const saved = localStorage.getItem("obras");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(obras.length === 0);
  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState("padrao"); 

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
    if (obras.length > 0) {
      setLoading(false);
      return;
    }

    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      let page = 1;
      let allObras = [];

      const refLat = -29.715771277866914;
      const refLon = -53.71488398459059;

      function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
        const R = 6371000;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      while (true) {
        try {
          const res = await fetch(
            `https://trajeto-cultural-backend.onrender.com/acervo/get_lista?page=${page}&per_page=100`
          );
          const data = await res.json();
          if (!data || data.length === 0) break;

          const filtradas = data.filter((obra) => {
            if (!obra.latitude || !obra.longitude) return true;
            const dist = getDistanceFromLatLonInMeters(
              parseFloat(obra.latitude),
              parseFloat(obra.longitude),
              refLat,
              refLon
            );
            return dist > 40;
          });

          allObras = [...allObras, ...filtradas];
          if (cancel) break;

          page++;
        } catch (err) {
          console.error("Erro ao carregar obras:", err);
          break;
        }
      }

      if (!cancel) {
        console.log("🗺️ Total de obras carregadas:", allObras.length);
        setObras(allObras);
        localStorage.setItem("obras", JSON.stringify(allObras));
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [obras]);

  return (
    <div className="relative flex h-screen flex-col bg-primary">
      <Header section="Trajeto Cultural" />

      <div className="h-full w-full overflow-hidden rounded-t-2xl bg-white relative">
        {loading ? (
          <MapLoadingAnimation />
        ) : (
          <>
            <div className="absolute top-4 right-4 z-[1000] bg-white rounded-full shadow-md flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
              <button
                onClick={() =>
                  setMapType((prev) =>
                    prev === "padrao" ? "satelite" : "padrao"
                  )
                }
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                {mapType === "padrao" ? (
                  <>
                    🌎 <span>Ver Satélite</span>
                  </>
                ) : (
                  <>
                    🗺️ <span>Ver Mapa</span>
                  </>
                )}
              </button>
            </div>

            <MapContainer
              center={[-29.7206, -53.7165]}
              zoom={15}
              minZoom={3}
              maxZoom={22}
              zoomControl={true}
              className="h-full w-full"
            >
              <TileLayer
                url={
                  mapType === "padrao"
                    ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                }
                maxZoom={22}
                attribution={
                  mapType === "padrao"
                    ? '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    : 'Tiles &copy; Esri'
                }
              />

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
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
