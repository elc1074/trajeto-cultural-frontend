import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (user?.nome) formData.append("nome", user.nome);
    if (user?.email) formData.append("email", user.email);

    const response = await fetch(
      `https://trajeto-cultural-backend.onrender.com/usuario/update/${user.user_id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.avatar_url) {
      const updatedUser = { ...user, avatar_url: data.avatar_url };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      <Header section="Perfil" />

      <div className="flex-1 relative bg-gray-100 rounded-t-3xl flex flex-col items-center px-6 py-10 overflow-y-auto">
        <img
          className="absolute w-[250px] top-2"
          src="/profile.png"
          alt="ink"
        />
        <div className=" w-40 h-40 flex items-center justify-center mb-8 mt-6">
          <img
            src={
              user?.avatar_url ||
              "https://placehold.co/128x128/D8BFD8/000000?text=Avatar"
            }
            alt="Avatar do Usuário"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer z-10"
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

        <h3 className="text-purple-600 font-bold text-xl mb-2">
          {user?.nome || "Nome do Usuário"}
        </h3>
        <p className="text-gray-500 text-sm mb-8">Curso de Graduação</p>

        <div className="w-full max-w-xs bg-purple-200 rounded-full h-6 flex items-center justify-start mb-10">
          <div
            className="bg-purple-500 h-6 rounded-full flex items-center justify-center px-4 text-white text-sm font-semibold"
            style={{ width: "75%" }}
          >
            3752 / 5000
          </div>
        </div>

        {/* Conquistas */}
        <div className="flex justify-center gap-4 mb-12 w-full">
          <div className="bg-purple-400 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-center">
            Conquista X
          </div>
          <div className="bg-purple-400 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-center">
            Conquista Y
          </div>
          <div className="bg-purple-400 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-center">
            Conquista Z
          </div>
        </div>

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full max-w-xs py-3 rounded-full text-base shadow-md"
          onClick={logout}
        >
          Sair
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
