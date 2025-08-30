import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import planetario from "../assets/planetario.png"

const PontoArtistico = () => {
  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      {/* Header fixo */}
      <Header section="Ponto Artístico" />
      {/*Conteúdo do Ponto Artístico*/}
      <div className="flex justify-center items-center gap-4 flex-col">
        {/*TODO: Dados a seguir devem ser puxados do DB
            1º ideia :
              Na página Home, ao clicar em um ponto artístico, o ID desse ponto
              é enviado pela URL. Então este componente correspondente recebe esse 
              ID como parâmetro e, a partir dele, renderiza dinamicamente as 
              informações relacionadas ao ponto selecionado, como imagem, título
              e descrição. Assim, cada ponto artístico exibe seu conteúdo
              específico de forma personalizada.
        */}
        <img src={planetario} alt="planetario" />
        <h2 className="text-white font-semibold">Planetario</h2>
        <p className="text-justify px-4">
          O Planetário é o local idealizado para que se possa reproduzir o céu
          visando à educação complementar, o enriquecimento da cultura
          científica e intelectual de seus visitantes. A educação através de um
          planetário desenvolve a consciência visual, facilitando o entendimento
          da Astronomia.
        </p>
        <Button className="bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 text-lg">Adicionar ao trajeto</Button>
      </div>
      {/* BottomNav fixo */}
      <BottomNav />
    </div>
  );
};

export default PontoArtistico;
