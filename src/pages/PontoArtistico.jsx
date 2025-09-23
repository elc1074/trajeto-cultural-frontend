import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";
import { useLocation } from "react-router-dom";

const PontoArtistico = () => {
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const obraId = params.get("id");

  useEffect(() => {
    if (obraId) {
      fetch(
        `https://trajeto-cultural-backend.onrender.com/acervo/get_obra/${obraId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setObra(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao carregar obra:", err);
          setLoading(false);
        });
    }
  }, [obraId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-purple-600 text-white">
        Carregando...
      </div>
    );
  }

  if (!obra) {
    return (
      <div className="flex h-screen items-center justify-center bg-purple-600 text-white">
        Não foi possível carregar a obra.
      </div>
    );
  }

  const imageUrl =
    obra?.thumbnail?.medium?.[0] || "https://via.placeholder.com/300";

  return (
    <div className="relative flex h-screen flex-col bg-purple-600">
      <Header section="Ponto Artístico" />
      <div className="flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-gray-100 px-6 py-6">
        <img
          src={imageUrl}
          alt={obra.title}
          className="mb-6 w-64 max-w-full rounded-md shadow-lg"
        />
        <h2 className="text-center text-xl font-bold text-orange-500">
          {obra.title}
        </h2>
        <p className="mt-1 text-center text-sm text-purple-600">
          {obra.localizacao || "Localização não informada"}
        </p>
        <p className="mb-6 text-center text-sm text-purple-600">
          {obra.author_name}
        </p>
        <Button className="w-full max-w-xs rounded-full bg-orange-500 px-6 py-3 text-base text-white hover:bg-orange-600">
          Adicionar ao Trajeto
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
