import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Star } from "lucide-react";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ConquistasPage = () => {

  const { user } = useContext(UserContext);
  const [conquistas, setConquistas] = useState([]);

  useEffect(() => {
      if (user) {
        fetch(`https://trajeto-cultural-backend.onrender.com/conquistaobtida/get_lista?id_usuario=${user.user_id}`)
          .then(res => res.json())
          .then(data => setConquistas(data))
          .catch(err => console.error("Erro ao carregar conquistas:", err));
      }
  }, [user]);


  return (
    <div className="relative flex min-h-screen flex-col bg-purple-500">
      <Header section="Conquistas" />

      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Conquistas</h1>

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

      </div>

      <BottomNav />
    </div>
  );
};

export default ConquistasPage;
