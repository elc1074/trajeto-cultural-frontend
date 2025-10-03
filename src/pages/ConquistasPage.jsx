import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Trophy } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Loader = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64">
    <div className="flex space-x-2 mb-6">
      <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
      <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
      <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
    </div>
    <p className="mt-6 text-xl font-bold text-gray-800">{message}</p>
  </div>
);

const ConquistasPage = () => {
  const { user } = useContext(UserContext);
  const [userConquistas, setUserConquistas] = useState([]);
  const [loading, setLoading] = useState(true);

  const conquistasDisponiveis = [
    { id: 1, nome: "Primeira Visita", pontos: 10 },
    { id: 2, nome: "Explorador Cultural", pontos: 30 },
    { id: 3, nome: "Conhecedor da Cidade", pontos: 50 },
    { id: 4, nome: "Maratonista de Arte", pontos: 100 },
  ];

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`https://trajeto-cultural-backend.onrender.com/conquistaobtida/get_lista?id_usuario=${user.user_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.length === 0) {
            setUserConquistas([
              { id_conquista: 1, data_obtida: new Date().toISOString() }
            ]);
          } else {
            setUserConquistas(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro ao carregar conquistas:", err);
          setUserConquistas([
            { id_conquista: 1, data_obtida: new Date().toISOString() }
          ]);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUserConquistas([
        { id_conquista: 1, data_obtida: new Date().toISOString() }
      ]);
    }
  }, [user]);

  const conquistadasIds = userConquistas.map(c => c.id_conquista);

  return (
    <div className="relative flex min-h-screen flex-col bg-purple-500">
      <Header section="Conquistas" />

      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Conquistas</h1>

        {loading ? (
          <Loader message="Carregando conquistas..." />
        ) : (
          <ul className="space-y-6">
            {conquistasDisponiveis.map((c) => {
              const conquistada = conquistadasIds.includes(c.id);
              return (
                <li
                  key={c.id}
                  className="flex items-start border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <Trophy
                    className={`mr-3 mt-1 h-7 w-7 ${
                      conquistada ? "text-yellow-500" : "text-gray-400"
                    }`}
                    fill={conquistada ? "#eab308" : "none"}
                  />
                  <div>
                    <p className={`text-lg font-medium ${conquistada ? "text-gray-800" : "text-gray-400"}`}>
                      {c.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {c.pontos} pontos
                    </p>
                    {conquistada && (
                      <p className="mt-1 text-xs text-green-600">
                        ✅ Conquistada em {new Date(userConquistas.find(u => u.id_conquista === c.id)?.data_obtida).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ConquistasPage;