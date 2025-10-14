import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";

const Loader = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64 rounded-xl">
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


const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [conquistas, setConquistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pontos, setPontos] = useState(0);


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true); 
    const formData = new FormData();
    formData.append("file", file);
    if (user?.nome) formData.append("nome", user.nome);
    if (user?.email) formData.append("email", user.email);

    try {
        const response = await fetch(
          `https://trajeto-cultural-backend.onrender.com/usuario/update/${user.user_id}`,
          {
            method: "PUT",
            body: formData,
          },
        );

        const data = await response.json();
        if (data.avatar_url) {
          const updatedUser = { ...user, avatar_url: data.avatar_url };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
    } catch (error) {
        console.error("Erro ao atualizar avatar:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
      fetch(`https://trajeto-cultural-backend.onrender.com/usuario/get_pontos?id=${user.user_id}`)
          .then(res => res.json())
          .then(data => {
            setPontos(data);
          })
          .catch(err => {
            console.error("Erro ao carregar pontos:", err);
      });
      } else {
        setLoading(false);
      }
  }, [user]);


  return (
    <div className="relative flex h-screen flex-col bg-purple-600">
      <Header section="Perfil" />

      <div className="relative flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-gray-100 px-6 py-10">
        
        {loading ? (
            <div className="flex flex-1 items-center justify-center w-full h-full"> 
                <Loader message="Carregando perfil..." />
            </div>
        ) : (
            <>
                <img
                    className="absolute top-2 w-[250px]"
                    src="/profile.png"
                    alt="ink"
                />
                
                <div className="mb-8 mt-6 flex h-40 w-40 items-center justify-center">
                    <img
                      src={
                        user?.avatar_url ||
                        "https://placehold.co/128x128/D8BFD8/000000?text=Avatar"
                      }
                      alt="Avatar do Usuário"
                      className="z-10 h-40 w-40 cursor-pointer rounded-full border-4 border-white object-cover shadow-lg"
                      onClick={handleAvatarClick}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                </div>

                <h3 className="mb-2 text-xl font-bold text-purple-600">
                  {user?.nome || "Nome do Usuário"}
                </h3>
                <div className="mb-10 flex h-6 w-full max-w-xs items-center justify-start rounded-full bg-purple-200">
                <div className="relative w-full max-w-xs h-6 rounded-full bg-purple-200">
                  <div
                    className="absolute top-0 left-0 h-6 rounded-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${Math.min((pontos / 50) * 100, 100)}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                    {pontos} / 50
                  </div>
                </div>



                </div>

                <div className="mb-12 flex w-full justify-center gap-4">
                  {conquistas.slice(-3).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-center rounded-xl bg-purple-400 px-4 py-3 text-white shadow-md text-center text-sm"
                    >
                      {c.nome_conquista}
                    </div>
                  ))}
                  {conquistas.length === 0 && (
                    <p className="text-gray-500">Nenhuma conquista ainda.</p>
                  )}
                </div>


                <Button
                  className="w-full max-w-xs rounded-full bg-orange-500 py-3 text-base font-bold text-white shadow-md hover:bg-orange-600"
                  onClick={logout}
                >
                  Sair
                </Button>
            </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
