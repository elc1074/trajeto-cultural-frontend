import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Zap, MapPin, BookOpen } from 'lucide-react'; 

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-purple-600 relative"> 
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="Trajeto Cultural"
          className="w-80 h-80 text-white"
        />
      </div>

      <h2 className="text-gray-300 text-xl font-medium mb-6">Login</h2> 

      <div className="flex flex-col w-80 gap-4">
       <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-gray-200 focus:outline-none placeholder-[#534C4C]" 
        />
        <input
            type="password"
            placeholder="Senha"
            className="p-3 rounded-md bg-gray-200 focus:outline-none placeholder-[#534C4C]" 
        />
        <Button
          className="mt-2 bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 text-lg" 
          onClick={() => navigate("/home")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;