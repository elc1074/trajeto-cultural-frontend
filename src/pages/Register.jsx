import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="relative flex h-screen flex-col items-center justify-center bg-purple-600">
      <img
        className="absolute -left-6 -top-8 w-[150px]"
        src="/login-header.png"
        alt="ink"
      />
      <div className="mt-32 h-full w-full rounded-3xl bg-gray-100 p-8 shadow-lg">
        <button
          className="mb-4 flex items-center text-sm text-purple-600"
          onClick={() => navigate("/login")}
        >
          ← Voltar para login
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-purple-600">
          Cadastre-se
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-purple-600 placeholder-purple-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-purple-600 placeholder-purple-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-purple-600 placeholder-purple-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="rounded-full border border-gray-300 bg-white p-3 text-purple-600 placeholder-purple-400 focus:outline-none"
          />

          <Button
            className="mt-2 flex items-center justify-center rounded-full bg-purple-500 py-3 text-lg text-white hover:bg-purple-600"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Cadastre-se"
            )}
          </Button>

          {erro && (
            <p className="mt-2 text-center text-sm text-red-500">{erro}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
