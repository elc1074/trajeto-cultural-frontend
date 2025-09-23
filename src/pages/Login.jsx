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
      const response = await fetch(
        "https://trajeto-cultural-backend.onrender.com/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha, nome: "" }),
        },
      );

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
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="relative flex h-1/3 flex-col items-start justify-center bg-purple-600 pl-6 text-white">
        <img
          className="absolute -left-6 -top-4 w-[90px]"
          src="/login-header.png"
          alt="ink"
        />
        <h1 className="text-4xl font-bold">Olá !</h1>
        <p className="text-md mt-2">Bem-vindo ao Trajeto Cultural</p>
      </div>

      <div className="z-10 -mt-12 flex flex-1 flex-col items-center justify-start">
        <div className="relative flex h-full w-full flex-col items-center rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-6 self-start text-2xl font-semibold text-purple-600">
            Login
          </h2>
          <img
            className="absolute -top-20 right-6 w-[140px]"
            src="/login-pin.png"
            alt=""
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded-full bg-gray-100 p-3 text-gray-700 placeholder-gray-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mb-4 w-full rounded-full bg-gray-100 p-3 text-gray-700 placeholder-gray-500 focus:outline-none"
          />

          <Button
            className="flex w-full items-center justify-center rounded-full bg-purple-600 py-3 text-base text-white hover:bg-purple-700"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Entrar"
            )}
          </Button>

          {erro && (
            <p className="mt-2 text-center text-sm text-red-500">{erro}</p>
          )}

          <p className="mt-6 text-sm text-gray-600">
            Não tem uma conta?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer font-semibold text-purple-600"
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
