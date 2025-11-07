import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Trophy } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Loader = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-bg p-10 min-h-64">
    <div className="flex space-x-2 mb-6">
      <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
      <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
      <div className="h-4 w-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
    </div>
    <p className="mt-6 text-xl font-bold text-gray-800">{message}</p>
  </div>
);

const ConquistasPage = () => {
  const { user } = useContext(UserContext);
  const [userConquistas, setUserConquistas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [conquistasDisponiveis, setConquistasDisponiveis] = useState([]);


useEffect(() => {
  const fetchConquistas = async () => {
    setLoading(true);
    try {
      const resConquistas = await fetch(
        "https://trajeto-cultural-backend.onrender.com/conquista/get_lista"
      );
      const todas = await resConquistas.json();
      setConquistasDisponiveis(todas);

      if (user) {
        const resObtidas = await fetch(
          `https://trajeto-cultural-backend.onrender.com/conquistaobtida/get_lista?id_usuario=${user.user_id}`
        );
        const obtidas = await resObtidas.json();
        setUserConquistas(obtidas);
      } else {
        setUserConquistas([]);
      }
    } catch (err) {
      console.error("Erro ao carregar conquistas:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchConquistas();
}, [user]);


  const conquistadasNomes = userConquistas.map(c => c.nome_conquista);


  return (
    <div className="relative flex min-h-screen flex-col bg-bg">
      <Header section="Conquistas" />

      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-bg p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Conquistas</h1>

        {loading ? (
          <Loader message="Carregando conquistas..." />
        ) : (
          <ul className="space-y-6">
            {conquistasDisponiveis.map((c) => {
              const conquistada = conquistadasNomes.includes(c.nome);
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