import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Calendar } from "lucide-react";

const PontoVisitadoItem = ({ title, date, location, image }) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 my-2 rounded-lg shadow-sm">
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
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const fetchPontos = async () => {
      try {
        const res = await fetch(
          `https://trajeto-cultural-backend.onrender.com/obravisitada/get_lista?id_usuario=${user.user_id}`
        );
        const visitadas = await res.json();

        const obrasDetalhadas = await Promise.all(
          visitadas.map(async (o) => {
            const obraRes = await fetch(
              `https://trajeto-cultural-backend.onrender.com/acervo/get_obra/${o.id_obra}`
            );
            const obra = await obraRes.json();


            const imageUrl =
              obra?.thumbnail ||
              "https://via.placeholder.com/300x200?text=Sem+Imagem";



            return {
              id: obra.id,
              title: obra.title || "Sem título",
              location:
                obra.latitude && obra.longitude
                  ? `${obra.latitude}, ${obra.longitude}`
                  : "Localização não disponível",
              date: new Date(o.data_obtida || Date.now()).toLocaleDateString("pt-BR"),
              image: imageUrl,
            };
          })
        );

        setPontos(obrasDetalhadas);
      } catch (err) {
        console.error("Erro ao carregar pontos visitados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPontos();
  }, [user]);

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
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Pontos Visitados
          </h1>
          {pontos.length > 0 ? (
            pontos.map((ponto) => (
              <PontoVisitadoItem
                key={ponto.id}
                title={ponto.title}
                date={ponto.date}
                location={ponto.location}
                image={ponto.image}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-8">
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
