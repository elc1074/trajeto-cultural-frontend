import {
  Home,
  Star,
  MapPin,
  BookOpen,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 rounded-full px-6 py-3 shadow-lg z-[9999]">
      <nav className="flex justify-between items-center gap-6">
        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/home")}
        >
          <Home />
        </button>

        <button className="text-white text-2xl hover:opacity-80">
          <Star />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/ponto-artistico")}
        >
          <MapPin />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/eventos-details")}
        >
          <BookOpen />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/perfil")}
        >
          <User />
        </button>
      </nav>
    </div>
  );
}
