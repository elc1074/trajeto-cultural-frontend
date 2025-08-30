import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import { CalendarClock, MapPin, List } from "lucide-react";

import viva from "../assets/viva-campus.png";

const EventosDetails = () => {
  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      {/* Header fixo */}
      <Header section="Detalhes do Evento" />
      {/*Conteúdo do Ponto Artístico*/}
      <div className="flex justify-center items-center gap-4 flex-col">
        {/*TODO: Mesma ideia de buscar os dados do eventos pelo ID recebendo 
        via URL neste componente*/}
        <img src={viva} alt="viva-campus" />
        <h2 className="text-white font-semibold">Viva o Câmpus</h2>
        <p className="text-center px-4">
          Um encontro aberto à comunidade com apresentações musicais e feira
          gastronômica.
        </p>
        <div className="flex gap-4 bg-[#f3f3f3] text-black p-4">
          <CalendarClock />
          <span>23/08, às 16h</span>
        </div>
        <div className="flex gap-4 bg-[#f3f3f3] text-black p-4">
          <MapPin />
          <span>Planetário da UFSM</span>
        </div>
        <div className="flex gap-4 bg-[#f3f3f3] text-black p-4">
          <List />
          <span>Exposição</span>
        </div>
        <Button className="bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 text-lg">
          Adicionar ao calendário
        </Button>
      </div>
      {/* BottomNav fixo */}
      <BottomNav />
    </div>
  );
};

export default EventosDetails;
