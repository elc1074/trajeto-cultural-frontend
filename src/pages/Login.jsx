import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // efeito para animar a barra
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 10; // vai até 90%
          return prev;
        });
      }, 300);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500); // reseta depois de completar
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
          src="/images/login-header.png"
          alt="ink"
        />
        <h1 className="text-4xl font-bold">Olá !</h1>
        <p className="text-md mt-2">Bem-vindo ao Trajeto Cultural</p>
      </div>

      <div className="z-10 -mt-12 flex flex-1 flex-col items-center justify-start">
        <div className="relative flex h-full w-full flex-col items-center rounded-3xl bg-white p-6 shadow-md">
          <button
            className="mb-4 flex self-start text-sm text-purple-600"
            onClick={() => navigate("/")}
          >
            ← Voltar para tela inicial
          </button>
          <h2 className="mb-6 self-start text-2xl font-semibold text-purple-600">
            Login
          </h2>
          <img
            className="absolute -top-20 right-6 w-[140px]"
            src="/images/login-pin.png"
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

          <div className="relative w-full">
            <Button
              className="flex w-full items-center justify-center rounded-full bg-purple-600 py-3 text-base text-white hover:bg-purple-700"
              onClick={handleLogin}
              disabled={loading}
            >
              Entrar
            </Button>

            {/* Barra de progresso */}
            {loading && (
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-1 bg-orange-500 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

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
