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
      const response = await fetch("https://trajeto-cultural-backend.onrender.com/usuario/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      await response.json();
      navigate("/"); // volta para login após cadastro
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-purple-600 relative">
      <div className="bg-gray-100 rounded-3xl shadow-lg p-8 w-80">
        <button
          className="text-purple-600 text-sm mb-4 flex items-center"
          onClick={() => navigate("/")}
        >
          ← Voltar para login
        </button>

        <h2 className="text-purple-600 text-2xl font-bold mb-6 text-center">
          Cadastre-se
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-full bg-white border border-gray-300 focus:outline-none text-purple-600 placeholder-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-full bg-white border border-gray-300 focus:outline-none text-purple-600 placeholder-purple-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-3 rounded-full bg-white border border-gray-300 focus:outline-none text-purple-600 placeholder-purple-400"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="p-3 rounded-full bg-white border border-gray-300 focus:outline-none text-purple-600 placeholder-purple-400"
          />

          <Button
            className="mt-2 bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 text-lg flex justify-center items-center"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Cadastre-se"
            )}
          </Button>

          {erro && (
            <p className="text-red-500 text-sm text-center mt-2">{erro}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
