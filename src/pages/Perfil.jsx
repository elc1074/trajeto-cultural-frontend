import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Palette } from "lucide-react";

const Loader = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64 rounded-xl">
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

const themeColors = [
    { name: 'Roxo', value: 'purple', class: 'bg-primary' },
    { name: 'Azul', value: 'blue', class: 'bg-blue-500' },
    { name: 'Verde', value: 'green', class: 'bg-green-500' },
];


const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout, setUser, theme, setTheme } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [conquistas, setConquistas] = useState([]);
  const [loading, setLoading] = useState(true);


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
      } else {
        setLoading(false);
      }
  }, [user]);


  return (
    <div className="relative flex h-screen flex-col bg-primary">
      <Header section="Perfil" />

      <div className="relative flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-gray-100 px-6 pt-10 pb-40">
        
        {loading ? (
            <div className="flex flex-1 items-center justify-center w-full h-full"> 
                <Loader message="Carregando perfil..." />
            </div>
        ) : (
            <>
                
                <div className="mb-8 mt-6 flex h-40 w-40 items-center justify-center">
                    <img
                      src={
                        user?.avatar_url ||
                        "https://placehold.co/128x128/D8BFD8/000000?text=Avatar"
                      }
                      alt="Avatar do Usuário"
                      className="z-10 h-40 w-40 cursor-pointer rounded-full border-4 border-bg object-cover shadow-lg"
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

                <h3 className="mb-2 text-xl font-bold text-primary">
                  {user?.nome || "Nome do Usuário"}
                </h3>
                
                <h4 className="mt-4 mb-2 text-lg font-semibold text-gray-700 w-full max-w-xs text-center">Nível</h4>

                <div className="mb-4 flex h-6 w-full max-w-xs items-center justify-start rounded-full bg-purple-200">
                  <div
                    className="flex h-6 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white"
                    style={{ width: "75%" }}
                  >
                    3752 / 5000
                  </div>
                </div>
                
                <h4 className="mb-4 text-lg font-semibold text-gray-700 w-full max-w-xs text-center">Conquistas</h4>

                <div className="mb-12 flex w-full justify-center gap-4">
                  {conquistas.slice(-3).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-white shadow-md text-center text-sm"
                    >
                      {c.nome_conquista}
                    </div>
                  ))}
                  {conquistas.length === 0 && (
                    <p className="text-gray-500">Nenhuma conquista ainda.</p>
                  )}
                </div>

                <div className="w-full max-w-xs mb-10 p-4 bg-white rounded-xl shadow-md border border-gray-200">
                    <h4 className="flex items-center text-md font-semibold text-gray-700 mb-3">
                        <Palette className="w-4 h-4 mr-2 text-primary" />
                        Mudar Tema
                    </h4>
                    <div className="flex justify-between space-x-2">
                        {themeColors.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => setTheme(color.value)}
                                className={`flex-1 py-2 rounded-lg font-medium text-xs text-white transition-all transform hover:scale-105 ${color.class} ${
                                    theme === color.value ? 'ring-4 ring-offset-2 ring-primary' : ''
                                }`}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                  className="w-full max-w-xs rounded-full bg-accent py-3 text-base font-bold text-white shadow-md hover:bg-accent"
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
