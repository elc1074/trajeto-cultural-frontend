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
      .catch(() => {
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

  const imageUrl = obra?.thumbnail?.medium?.[0] || "https://via.placeholder.com/300";

  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      <Header section="Ponto Artístico" />
      <div className="flex-1 bg-gray-100 rounded-t-3xl flex flex-col items-center px-6 py-6 overflow-y-auto">
        <img
          src={imageUrl}
          alt={obra.title}
          className="w-64 max-w-full rounded-md shadow-lg mb-6"
        />
        <h2 className="text-orange-500 font-bold text-xl text-center">
          {obra.title}
        </h2>
        <p className="text-purple-600 text-center text-sm mt-1">
          Localização Acervo CAL
        </p>
        <p className="text-purple-600 text-center text-sm mb-6">
          {obra.author_name}
        </p>
        <Button className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 text-base w-full max-w-xs">
          Adicionar ao Trajeto
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
