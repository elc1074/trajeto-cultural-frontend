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
      },
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
    <div className="relative flex h-screen flex-col bg-purple-600">
      <Header section="Perfil" />

      <div className="relative flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-gray-100 px-6 py-10">
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
        <p className="mb-8 text-sm text-gray-500">Curso de Graduação</p>

        <div className="mb-10 flex h-6 w-full max-w-xs items-center justify-start rounded-full bg-purple-200">
          <div
            className="flex h-6 items-center justify-center rounded-full bg-purple-500 px-4 text-sm font-semibold text-white"
            style={{ width: "75%" }}
          >
            3752 / 5000
          </div>
        </div>

        {/* Conquistas */}
        <div className="mb-12 flex w-full justify-center gap-4">
          <div className="flex items-center justify-center rounded-xl bg-purple-400 px-4 py-3 text-white shadow-md">
            Conquista X
          </div>
          <div className="flex items-center justify-center rounded-xl bg-purple-400 px-4 py-3 text-white shadow-md">
            Conquista Y
          </div>
          <div className="flex items-center justify-center rounded-xl bg-purple-400 px-4 py-3 text-white shadow-md">
            Conquista Z
          </div>
        </div>

        <Button
          className="w-full max-w-xs rounded-full bg-orange-500 py-3 text-base font-bold text-white shadow-md hover:bg-orange-600"
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
