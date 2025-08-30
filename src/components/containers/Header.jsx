import { MapPin } from "lucide-react";

export function Header({ section }) {
  return (
    <header className="w-full shadow-md">
      {/* Barra superior */}
      <div className="flex items-center gap-2 bg-[#A457C7] px-4 py-6">
        <MapPin className="h-5 w-5" color="white" />
        <span className="font-semibold text-white">Trajeto Cultural</span>
      </div>

      {/* Barra inferior */}
      <div className="bg-[#C79CD1] px-4 py-3 border-b">
        <h1 className="text-white text-center text-lg font-medium">
          {section}
        </h1>
      </div>
    </header>
  );
}
