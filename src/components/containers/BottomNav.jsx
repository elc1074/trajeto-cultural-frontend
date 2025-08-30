import {
  Home,
  BatteryCharging,
  MapPin,
  BookOpenText,
  Delete,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-800">
      <nav className="flex justify-around items-center h-16">
        <button
          className="text-white text-2xl p-2 hover:cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <Home />
        </button>

        <button className="text-white text-2xl p-2 hover:cursor-pointer">
          <BatteryCharging />
        </button>

        <button
          className="text-white text-2xl p-2 hover:cursor-pointer"
          onClick={() => navigate("/ponto-artistico")}
        >
          <MapPin />
        </button>

        <button className="text-white text-2xl p-2 hover:cursor-pointer" onClick={() => navigate("/eventos-details")}>
          <BookOpenText />
        </button>

        <button className="text-white text-2xl p-2 hover:cursor-pointer">
          <Delete />
        </button>
      </nav>
    </div>
  );
}
