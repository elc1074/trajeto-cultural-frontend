import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { MapPin, Calendar } from "lucide-react";

import planetarioImage from "../assets/planetario.png";

const PontoVisitadoItem = ({ title, date, location }) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 my-2 rounded-lg shadow-sm">
      <div className="flex flex-col flex-1">
        <span className="text-gray-800 font-medium">{title}</span>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
      </div>
      <img
        src={planetarioImage}
        alt="Imagem do Ponto Visitado"
        className="h-20 w-32 object-cover rounded-md ml-4"
      />
    </div>
  );
};

const PontosVisitados = () => {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedPontos = [
      { id: 1, title: "Obra de Arte", date: "24/09/2025", location: "Localização A" },
      { id: 2, title: "Escultura", date: "23/09/2025", location: "Localização B" },
      { id: 3, title: "Mural", date: "22/09/2025", location: "Localização C" },
    ];
    
    setTimeout(() => {
      setPontos(fetchedPontos);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-purple-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-purple-600 relative">
      <Header section="Pontos Visitados" />
      <div className="flex-1 bg-white rounded-t-3xl flex flex-col items-center px-6 py-6 overflow-y-auto z-10">
        <div className="w-full max-w-xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Pontos Visitados</h1>
          {pontos.length > 0 ? (
            pontos.map(ponto => (
              <PontoVisitadoItem key={ponto.id} title={ponto.title} date={ponto.date} location={ponto.location} />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-8">Você ainda não visitou nenhum ponto.</p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PontosVisitados;
