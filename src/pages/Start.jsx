import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Start = () => {
  const navigate = useNavigate();

  const handleAcessarSemLogin = () => {
    localStorage.removeItem("user");

    console.log("🧹 Login removido, acessando sem login.");
    navigate("/home");
  };

  return (
    <div className="overflow-hidden">
      <div className="relative flex h-screen flex-col items-center justify-center bg-neutral-100">
        <img
          className="absolute -right-14 -top-16 w-[250px]"
          src="/images/start-1.png"
          alt="map"
        />
        <img
          className="absolute -left-16 top-20 w-[250px]"
          src="/images/start-2.png"
          alt="map"
        />
        <img
          className="absolute -right-10 top-1/2 w-[150px]"
          src="/images/start-3.png"
          alt="map"
        />
        <img
          className="absolute -left-16 bottom-4 w-[250px]"
          src="/images/start-4.png"
          alt="map"
        />
        <img className="z-10 w-[200px]" src="/favicon.png" alt="favicon" />
        <p className="z-10 text-2xl text-purple-400">Bem-vindo ao</p>
        <h1 className="z-10 pb-8 text-3xl font-bold text-purple-600">
          Trajeto Cultural
        </h1>

        <Button
          className="z-10 flex w-[200px] items-center justify-center rounded-full bg-orange-500 py-3 text-lg text-white hover:bg-orange-400"
          onClick={() => navigate("/register")}
        >
          Cadastre - se
        </Button>

        <Button
          className="z-10 mt-4 flex w-[200px] items-center justify-center rounded-full bg-orange-500 py-3 text-lg text-white hover:bg-orange-400"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Button
          className="z-10 mt-4 flex w-[200px] items-center justify-center rounded-full bg-white py-3 text-lg text-gray-700 hover:bg-purple-200 hover:text-white"
          onClick={handleAcessarSemLogin}
        >
          Acessar sem login
        </Button>
      </div>
    </div>
  );
};

export default Start;
