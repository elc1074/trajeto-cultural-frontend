import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Star } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Loader = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64">
      <div className="flex space-x-2 mb-6">
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
        <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
      </div>
      <p className="mt-6 text-xl font-bold text-gray-800">
        {message}
      </p>
    </div>
);

const ConquistasPage = () => {

  const { user } = useContext(UserContext);
  const [conquistas, setConquistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (user) {
        setLoading(true);
        fetch(`https://trajeto-cultural-backend.onrender.com/conquistaobtida/get_lista?id_usuario=${user.user_id}`)
          .then(res => res.json())
          .then(data => {
            setConquistas(data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Erro ao carregar conquistas:", err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
  }, [user]);


  return (
    <div className="relative flex min-h-screen flex-col bg-purple-500">
      <Header section="Conquistas" />

      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Conquistas</h1>

        {loading ? (
           <Loader message="Carregando conquistas..." />
        ) : (
            <ul className="space-y-6">
              {conquistas.length > 0 ? (
                conquistas.map((c, idx) => (
                  <li
                    key={c.id}
                    className="flex items-start border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <Star
                      className={`mr-3 mt-1 h-6 w-6 ${
                        idx % 2 === 0 ? "text-orange-500" : "text-purple-500"
                      }`}
                      fill={idx % 2 === 0 ? "#f97316" : "#a855f7"}
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {c.nome_conquista}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(c.data_obtida).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Você ainda não possui conquistas.</p>
              )}
            </ul>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ConquistasPage;
