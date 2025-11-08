import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

const Register = () => {
  const { theme } = useContext(UserContext);

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 300);
    } else if (!loading && progress > 0) {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://trajeto-cultural-backend.onrender.com/usuario/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      await response.json();
      navigate("/");
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-primary">
      <img
        className="absolute -left-6 -top-8 w-[150px]"
        src={`/themes/${theme}/login-header.png`}
        alt="ink"
      />
      <div className="mt-32 h-full w-full rounded-3xl bg-gray-100 p-8 shadow-lg">
        <button
          className="mb-4 flex items-center text-sm text-primary"
          onClick={() => navigate("/login")}
        >
          ← Voltar para login
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-primary">
          Cadastre-se
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-primary placeholder-primary opacity-60 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-primary placeholder-primary opacity-60 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-primary placeholder-primary opacity-60 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-primary placeholder-primary opacity-60 focus:outline-none"
          />

          <div className="relative w-full">
            <Button
              className="mt-2 flex w-full items-center justify-center rounded-full bg-primary py-3 text-lg text-white hover:bg-primary"
              onClick={handleRegister}
              disabled={loading}
            >
              Cadastre-se
            </Button>

            {/* Barra de progresso */}
            {loading && (
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-1 bg-accent transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {erro && (
            <p className="mt-2 text-center text-sm text-red-500">{erro}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
