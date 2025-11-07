import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PontoArtistico = () => {
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const obraId = params.get("id");
  const { user } = useContext(UserContext);
  const [canAdd, setCanAdd] = useState(false);
  const [alreadyCollected, setAlreadyCollected] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [comentario, setComentario] = useState(null);


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

useEffect(() => {
  if (obraId) {
    fetch(
      `https://trajeto-cultural-backend.onrender.com/acervo/get_obra/${obraId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setObra(data);
        console.log("📍 Localização da obra:", {
          latitude: data.latitude,
          longitude: data.longitude,
        });
        setLoading(false);

if (data.thumbnail) {
  fetch("https://trajeto-cultural-backend.onrender.com/analise/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: data.thumbnail }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.resposta) {
        setComentario(json.resposta);
      }
    })
    .catch((err) => {
      console.error("Erro ao gerar comentário:", err);
    });
}

      })
      .catch((err) => {
        console.error("Erro ao carregar obra:", err);
        setLoading(false);
      });
  }
}, [obraId]);


useEffect(() => {
  if (obra && user) {
    fetch(
      `https://trajeto-cultural-backend.onrender.com/obravisitada/get_obra_visitada?id_obra=${obra.id}&id_usuario=${user.user_id}`
    )
      .then((res) => {
        if (res.ok) {
          setAlreadyCollected(true);
        } else {
          setAlreadyCollected(false);
        }
      })
      .catch((err) => {
        console.error("Erro ao verificar obra visitada:", err);
        setAlreadyCollected(false);
      });
  }
}, [obra, user]);



// teste localização fixa
/*useEffect(() => {
  if (obra) {
    const mockLocation = {
      latitude: -29.71728892609059,
      longitude: -53.716045683532826
    };
    setUserLocation(mockLocation);

    console.log("📍 Localização mockada do usuário:", mockLocation);
    console.log("🎨 Localização da obra:", {
      latitude: parseFloat(obra.latitude),
      longitude: parseFloat(obra.longitude)
    });
  }
}, [obra]);*/

    useEffect(() => {
      if (obra?.latitude && obra?.longitude) {
        const obraLat = parseFloat(obra.latitude);
        const obraLon = parseFloat(obra.longitude);

        if (userLocation) {
          const dist = getDistanceFromLatLonInMeters(
            userLocation.latitude,
            userLocation.longitude,
            obraLat,
            obraLon
          );
          console.log("📏 Distância mockada até a obra:", dist, "m");
          setDistance(dist);
          setCanAdd(dist <= 30);
        } else {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const userLat = pos.coords.latitude;
              const userLon = pos.coords.longitude;
              const dist = getDistanceFromLatLonInMeters(
                userLat,
                userLon,
                obraLat,
                obraLon
              );
              console.log("📏 Distância real até a obra:", dist, "m");

              setUserLocation({ latitude: userLat, longitude: userLon });
              setDistance(dist);
              setCanAdd(dist <= 10);
            },
            (err) => {
              console.error("Erro ao obter geolocalização:", err);
            }
          );
        }
      }
    }, [obra, userLocation]);




    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-bg p-10">
          <div className="flex space-x-2 mb-6">
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
          <p className="mt-6 text-xl font-bold text-gray-800">
            Carregando obra...
          </p>
        </div>
      );
    }


  if (!obra) {
    return (
      <div className="flex h-screen items-center justify-center bg-primary text-bg">
        Não foi possível carregar a obra.
      </div>
    );
  }

  const imageUrl = obra?.thumbnail || "https://via.placeholder.com/300";

  const handleAddObraVisitada = async () => {
      if (!user) {
        alert("Você precisa estar logado para registrar a obra.");
        return;
      }

      try {
        const response = await fetch("https://trajeto-cultural-backend.onrender.com/obravisitada/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_obra: obra.id,
            id_usuario: user.user_id,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao registrar obra visitada");
        }

        alert("Obra adicionada ao trajeto com sucesso!");
      } catch (err) {
        console.error(err);
        alert("Erro ao adicionar obra.");
      }
    };


  return (
    <div className="relative flex h-screen flex-col bg-primary">
      <Header section="Ponto Artístico" />
      <div className="flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-gray-100 px-6 py-6">
        <img
          src={imageUrl}
          alt={obra.title}
          className="mb-6 w-64 max-w-full rounded-md shadow-lg"
        />
        <h2 className="text-center text-xl font-bold text-accent">
          {obra.title}
        </h2>

        <p className="mb-6 text-center text-sm text-primary">
          {obra.author_name}
        </p>
      {comentario && (
          <p className="mt-4 text-center text-sm text-gray-600 italic">
            💬 {comentario}
          </p>
        )}
        <Button
          className={`py-3 px-6 rounded-full text-base w-full max-w-xs ${
            alreadyCollected
              ? "bg-gray-500 text-gray-200 cursor-not-allowed"
              : canAdd
              ? "bg-accent text-bg hover:bg-accent"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          onClick={handleAddObraVisitada}
          disabled={alreadyCollected || !canAdd}
        >
          {alreadyCollected
            ? "Obra já coletada"
            : canAdd
            ? "Adicionar ao Trajeto"
            : `Chegue mais perto da obra (${distance ? distance.toFixed(1) : "?"} m)`}
        </Button>



      </div>
      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
