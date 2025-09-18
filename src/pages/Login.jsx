import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://trajeto-cultural-backend.onrender.com/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, nome: "" }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      login(data);
      navigate("/home");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-purple-600 relative h-1/3 flex flex-col items-start pl-6 justify-center text-white">
        <img
          className="w-[130px] absolute -top-8 -left-6"
          src="/login-header.png"
          alt="ink"
        />
        <h1 className="text-4xl font-bold">Olá !</h1>
        <p className="mt-2 text-md">Bem-vindo ao Trajeto Cultural</p>
      </div>

      <div className="flex-1 z-10 flex flex-col items-center justify-start -mt-12">
        <div className="bg-white relative rounded-3xl shadow-md w-full h-full p-6 flex flex-col items-center">
          <h2 className="text-purple-600 text-2xl font-semibold mb-6 self-start">
            Login
          </h2>
          <img
            className="w-[140px] absolute -top-20 right-6"
            src="/login-pin.png"
            alt=""
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-100 text-gray-700 focus:outline-none placeholder-gray-500 mb-3"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-100 text-gray-700 focus:outline-none placeholder-gray-500 mb-4"
          />

          <Button
            className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 text-base flex justify-center items-center"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Entrar"
            )}
          </Button>

          {erro && (
            <p className="text-red-500 text-sm text-center mt-2">{erro}</p>
          )}

          <p className="text-sm text-gray-600 mt-6">
            Não tem uma conta?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
