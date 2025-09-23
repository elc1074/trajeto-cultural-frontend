import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import { Calendar, Filter } from "lucide-react";

const EventoItem = ({ title, date, price }) => {
  return (
    <div className="my-2 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm">
      <div className="flex items-center">
        <Calendar className="mr-4 text-purple-500" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{title}</span>
          <div className="mt-1 flex items-center">
            <span className="mr-4 text-sm text-gray-500">{date}</span>
            <span className="text-sm text-gray-500">${price}</span>
          </div>
        </div>
      </div>
      <Button className="rounded-full bg-orange-500 px-4 py-2 text-xs text-white hover:bg-orange-600">
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
      {
        id: 1,
        title: "Sarau Cultural",
        date: "xx/xx/xxxx",
        price: "alba mala",
      },
      { id: 2, title: "Visita guiada", date: "xx/xx/xxxx", price: "alba mala" },
      {
        id: 3,
        title: "Semana da arte",
        date: "xx/xx/xxxx",
        price: "alba mala",
      },
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
      <div className="flex h-screen items-center justify-center bg-purple-600 text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-purple-500">
      <Header section="Eventos" />
      <div className="z-10 flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-white px-6 py-6">
        <div className="mb-4 flex w-full max-w-xl items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Eventos</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-purple-600">Filtrar</span>
            <Filter className="text-purple-600" size={18} />
          </div>
        </div>
        <div className="w-full max-w-xl">
          {eventos.map((evento) => (
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
