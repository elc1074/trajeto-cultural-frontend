import { MapPin } from "lucide-react";

export function Header({ section }) {
  return (
    <header className="w-full pl-2 pt-2">
      {/* Logo + título alinhados à esquerda */}
      <div className="flex items-center gap-2">
        <MapPin className="h-6 w-6 text-white" />
        <span className="font-semibold text-white text-lg">
          Trajeto Cultural
        </span>
      </div>

      {/* Subtítulo da seção centralizado */}
      {section && (
        <h1 className="text-white text-center text-xl font-semibold p-1">
          {section}
        </h1>
      )}
    </header>
  );
}
