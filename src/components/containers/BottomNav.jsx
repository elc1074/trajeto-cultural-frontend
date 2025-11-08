import {
  Home,
  MapPin,
  Star,
  Trophy,
  User,
  LogIn
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export function BottomNav() {
  const user = useContext(UserContext);
  const isLoggedIn = !!user && !!user?.user?.user_id; 

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary rounded-full px-6 py-3 shadow-lg z-[9999]">
      <nav className="flex justify-between items-center gap-6">
        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/home")}
        >
          <Home />
        </button>

        <button 
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/conquistas")}
        >
          <Trophy />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/pontos-visitados")}
        >
          <MapPin />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/avaliacao")}
        >
          <Star />
        </button>

        <button
          className="text-white text-2xl hover:opacity-80"
          onClick={() => navigate("/perfil")}
        >
          { isLoggedIn ? <User /> : <LogIn /> }
        </button>
      </nav>
    </div>
  );
}
