import { useNavigate } from "react-router-dom";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

const Perfil = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col bg-purple-600 relative">
            {/* Header fixo */}
            <Header section="Perfil" />

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 overflow-y-auto text-center space-y-8">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                        src="https://placehold.co/128x128/D8BFD8/000000?text=Avatar"
                        alt="Avatar do Usuário"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Nome e descrição */}
                <div className="space-y-1">
                    <h3 className="text-white font-semibold text-xl">Vitória</h3>
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
                    onClick={() => navigate("/")}
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