import { useState, useEffect } from "react";
import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Button } from "@/components/ui/button.jsx";

import { Calendar, Filter } from "lucide-react";

const Loader = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white p-10 min-h-64">
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

const EventoItem = ({ title, date, price }) => {
  return (
    <div className="my-2 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm">
      <div className="flex items-center">
        <Calendar className="mr-4 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{title}</span>
          <div className="mt-1 flex items-center">
            <span className="mr-4 text-sm text-gray-500">{date}</span>
            <span className="text-sm text-gray-500">${price}</span>
          </div>
        </div>
      </div>
      <Button className="rounded-full bg-accent px-4 py-2 text-xs text-white hover:bg-accent">
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

  return (
    <div className="relative flex min-h-screen flex-col bg-primary">
      <Header section="Eventos" />
      <div className="z-10 flex flex-1 flex-col items-center overflow-y-auto rounded-t-3xl bg-white px-6 py-6">
        <div className="mb-4 flex w-full max-w-xl items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Eventos</h2>
          
          {loading ? null : (
            <div className="flex items-center">
              <span className="mr-2 text-sm text-primary">Filtrar</span>
              <Filter className="text-primary" size={18} />
            </div>
          )}
        </div>
        
        <div className="w-full max-w-xl">
          {loading ? (
            <Loader message="Buscando Eventos Culturais..." />
          ) : (
            eventos.map((evento) => (
              <EventoItem
                key={evento.id}
                title={evento.title}
                date={evento.date}
                price={evento.price}
              />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default EventosDetails;
