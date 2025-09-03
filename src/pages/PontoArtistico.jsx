import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import planetario from "../assets/planetario.png"

const PontoArtistico = () => {
  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      {/* Header fixo */}
      <Header section="Ponto Artístico" />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto space-y-6">
        <img 
          src={planetario} 
          alt="planetario" 
          className="w-56 max-w-full rounded-xl shadow-lg" 
        />

        <h2 className="text-white font-semibold text-2xl text-center">
          Planetário
        </h2>

        <p className="text-white text-center max-w-sm leading-relaxed text-base">
          O Planetário é o local idealizado para que se possa reproduzir o céu
          visando à educação complementar, o enriquecimento da cultura
          científica e intelectual de seus visitantes. A educação através de um
          planetário desenvolve a consciência visual, facilitando o entendimento
          da Astronomia.
        </p>

        <Button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 text-base w-full max-w-xs">
          Adicionar ao trajeto
        </Button>
      </div>

      {/* BottomNav fixo */}
      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
