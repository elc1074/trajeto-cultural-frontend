import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden">
      <div className="h-screen relative bg-neutral-100 flex flex-col items-center justify-center">
        <img
          className="absolute  w-[250px] -top-16 -right-14"
          src="/start-1.png"
          alt="map"
        />
        <img
          className="absolute  w-[250px] top-20 -left-16"
          src="/start-2.png"
          alt="map"
        />
        <img
          className="absolute  w-[150px] top-1/2 -right-10"
          src="/start-3.png"
          alt="map"
        />
        <img
          className="absolute  w-[250px] bottom-4 -left-16"
          src="/start-4.png"
          alt="map"
        />
        <img className="w-[200px] z-10" src="/favicon.png" alt="favicon" />
        <p className="text-purple-400 text-2xl z-10">Bem-vindo ao</p>
        <h1 className="text-purple-600 text-3xl font-bold z-10 pb-8">
          Trajeto Cultural
        </h1>
        <Button className="bg-orange-500 text-white py-3 rounded-full w-[200px] z-10 hover:bg-orange-400 text-lg flex justify-center items-center" onClick= {() => navigate("/register")}>
          Cadastre - se
        </Button>
        <Button className="mt-4 bg-white text-gray-700 py-3 rounded-full w-[200px] z-10 hover:bg-purple-200 hover:text-white text-lg flex justify-center items-center" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Start;
