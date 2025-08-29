import { MapPin } from "lucide-react";

import "./css/Header.css"

export function Header({ section }) {
  return (
    <header className="w-full shadow-md">
      {/* Barra superior */}
      <div className="flex items-center gap-2 bg-color px-4 py-2">
        <MapPin className="h-5 w-5 bg-color" color="white" />
        <span className="font-semibold bg-color text-color-white">
          Trajeto Cultural
        </span>
      </div>

      {/* Barra inferior */}
      <div className="bg-color-secundary px-4 py-3 border-b">
        <h1 className="bg-color-secundary text-color-white text-center text-lg font-medium">
          {section}
        </h1>
      </div>
    </header>
  );
}
