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
            {/* Header fixo */}
            <Header section="Perfil" />

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 overflow-y-auto text-center space-y-8">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                        src={user?.avatar_url || "https://placehold.co/128x128/D8BFD8/000000?text=Avatar"}
                        alt="Avatar do Usuário"
                        className="w-full h-full object-cover"
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

                {/* Nome e descrição */}
                <div className="space-y-1">
                    <h3 className="text-white font-semibold text-xl">{user?.nome || "Usuário"}</h3>
                    <p className="text-purple-200 text-sm">
                        Graduanda em Sistemas de Informação
                    </p>
                </div>

                {/* Barra de progresso */}
                <div className="w-full max-w-sm bg-purple-800 rounded-full h-8 overflow-hidden relative shadow-inner">
                    <div
                        className="bg-orange-500 h-8 rounded-full text-white text-xs font-semibold flex items-center justify-end pr-3 transition-all duration-500"
                        style={{ width: "75%" }}
                    >
                        3752/5000
                    </div>
                </div>

                {/* Conquistas */}
                <div className="flex justify-center gap-3 flex-wrap max-w-sm">
                    <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-sm shadow-md">
                        Primeira visita
                    </div>
                    <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-sm shadow-md">
                        10 obras descobertas
                    </div>
                    <div className="bg-purple-800 text-white px-3 py-2 rounded-lg text-sm shadow-md">
                        Participou de um evento
                    </div>
                </div>

                {/* Botão sair */}
                <Button 
                    className="bg-purple-800 hover:bg-purple-700 text-white w-full max-w-sm py-3 rounded-lg text-base shadow-lg transition-colors duration-300 mt-6"
                    onClick={logout}
                >
                    Sair
                </Button>
            </div>

            {/* BottomNav fixo */}
            <BottomNav />
        </div>
    );
};

export default Perfil;