import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Calendar } from "lucide-react";

import { useNavigate } from "react-router-dom";


const Loader = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64">
      <div className="flex space-x-2 mb-6">
        <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
      </div>
      <p className="mt-6 text-xl font-bold text-gray-800">
        {message}
      </p>
    </div>
);


const PontoVisitadoItem = ({ title, date, location, image, onClick }) => {
  return (
    <div
      className="flex items-center bg-gray-100 p-4 my-2 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
      onClick={onClick}
    >
      <div className="flex flex-col flex-1">
        <span className="text-gray-800 font-medium">{title}</span>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{location}</p>
      </div>
      <img
        src={image}
        alt={title}
        className="h-20 w-32 object-cover rounded-md ml-4"
      />
    </div>
  );
};


const PontosVisitados = () => {
  const [pontos, setPontos] = useState(() => {
      const saved = localStorage.getItem("pontosVisitados");
      return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(pontos.length === 0);


  const { user } = useContext(UserContext);
  const navigate = useNavigate();


useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

  const fetchPontos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://trajeto-cultural-backend.onrender.com/obravisitada/get_lista?id_usuario=${user.user_id}`
      );
      const visitadas = await res.json();

      if (!visitadas || visitadas.length === 0) {
        setPontos([]);
        localStorage.removeItem("pontosVisitados");
        setLoading(false);
        return;
      }

      const obrasDetalhadas = await Promise.all(
        visitadas.map(async (o) => {
          const obraRes = await fetch(
            `https://trajeto-cultural-backend.onrender.com/acervo/get_obra/${o.id_obra}`
          );
          const obra = await obraRes.json();

          return {
            id: obra.id,
            title: obra.title || "Sem título",
            location:
              obra.latitude && obra.longitude
                ? `${obra.latitude}, ${obra.longitude}`
                : "Localização não disponível",
            date: new Date(o.data_obtida || Date.now()).toLocaleDateString("pt-BR"),
            image:
              obra?.thumbnail ||
              "https://via.placeholder.com/300x200?text=Sem+Imagem",
          };
        })
      );

      setPontos(obrasDetalhadas);
      localStorage.setItem("pontosVisitados", JSON.stringify(obrasDetalhadas));
    } catch (err) {
      console.error("Erro ao carregar pontos visitados:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPontos();
}, [user]);




  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Header section="Pontos Visitados" />
      <div className="flex-1 bg-white rounded-t-3xl flex flex-col items-center px-6 py-6 overflow-y-auto z-10">
        <div className="w-full max-w-xl">

          
          {loading ? (
            <Loader message="Carregando Pontos Visitados..." />
          ) : pontos.length > 0 ? (
            pontos.map((ponto) => (
            <PontoVisitadoItem
              key={ponto.id}
              title={ponto.title}
              date={ponto.date}
              location={ponto.location}
              image={ponto.image}
              onClick={() => navigate(`/ponto-artistico?id=${ponto.id}`)}
            />

            ))
          ) : (
            <p className="text-text text-center mt-8">
              Você ainda não visitou nenhum ponto.
            </p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PontosVisitados;
