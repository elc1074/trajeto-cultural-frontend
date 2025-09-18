import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import { Calendar, Filter } from "lucide-react";

const EventoItem = ({ title, date, price }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 my-2 rounded-lg shadow-sm">
      <div className="flex items-center">
        <Calendar className="text-purple-500 mr-4" />
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium">{title}</span>
          <div className="flex items-center mt-1">
            <span className="text-gray-500 text-sm mr-4">{date}</span>
            <span className="text-gray-500 text-sm">${price}</span>
          </div>
        </div>
      </div>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs">
        Saiba mais
      </Button>
    </div>
  );
};

const EventosDetails = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedEvents = [
      { id: 1, title: "Sarau Cultural", date: "xx/xx/xxxx", price: "alba mala" },
      { id: 2, title: "Visita guiada", date: "xx/xx/xxxx", price: "alba mala" },
      { id: 3, title: "Semana da arte", date: "xx/xx/xxxx", price: "alba mala" },
      { id: 4, title: "Viva o campus", date: "xx/xx/xxxx", price: "alba mala" },
      { id: 5, title: "Exposição A", date: "xx/xx/xxxx", price: "alba mala" },
      { id: 6, title: "Exposição B", date: "xx/xx/xxxx", price: "alba mala" },
    ];
    
    setTimeout(() => {
      setEventos(fetchedEvents);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-purple-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-purple-500 relative">
      <Header section="Eventos"/>
      <div className="flex-1 bg-white rounded-t-3xl flex flex-col items-center px-6 py-6 overflow-y-auto z-10">
        <div className="w-full max-w-xl flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Eventos</h2>
          <div className="flex items-center">
            <span className="text-purple-600 mr-2 text-sm">Filtrar</span>
            <Filter className="text-purple-600" size={18} />
          </div>
        </div>
        <div className="w-full max-w-xl">
          {eventos.map(evento => (
            <EventoItem 
              key={evento.id} 
              title={evento.title} 
              date={evento.date} 
              price={evento.price} 
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default EventosDetails;