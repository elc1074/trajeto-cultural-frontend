import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

const PontoArtistico = () => {
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);
  const obraId = 27187;

  useEffect(() => {
    fetch(`https://trajeto-cultural-backend.onrender.com/acervo/get_obra/${obraId}`)
      .then(res => res.json())
      .then(data => {
        setObra(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar obra:", err);
        setLoading(false);
      });
  }, [obraId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-purple-600">
        Carregando...
      </div>
    );
  }

  if (!obra) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-purple-600">
        Não foi possível carregar a obra.
      </div>
    );
  }

  // Pega a imagem medium ou fallback
  const imageUrl = obra?.thumbnail?.medium?.[0] || "https://via.placeholder.com/300";

  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      <Header section="Ponto Artístico" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto space-y-6">
        <img
          src={imageUrl}
          alt={obra.title}
          className="w-56 max-w-full rounded-xl shadow-lg"
        />

        <h2 className="text-white font-semibold text-2xl text-center">
          {obra.title}
        </h2>

        <p className="text-white text-center max-w-sm leading-relaxed text-base">
          {obra.description}
        </p>

        <p className="text-white text-center max-w-sm leading-relaxed text-sm italic">
          Autor: {obra.author_name}
        </p>

        <Button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 text-base w-full max-w-xs">
          Adicionar ao trajeto
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
