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
    <div className="h-screen flex flex-col items-center justify-center bg-purple-600 relative">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="Trajeto Cultural"
          className="w-80 h-80 text-white"
        />
      </div>

      <h2 className="text-gray-300 text-xl font-medium mb-6">
        Acessar sua conta
      </h2>

      <div className="flex flex-col w-80 gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-gray-200 text-gray-700 focus:outline-none placeholder-[#534C4C]"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="p-3 rounded-md bg-gray-200 text-gray-700 focus:outline-none placeholder-[#534C4C]"
        />

        <Button
          className="mt-2 bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 text-lg flex justify-center items-center"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Login"
          )}
        </Button>

        {erro && (
          <p className="text-red-300 text-sm text-center mt-2">{erro}</p>
        )}

        {/* Texto e botão de cadastro */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-200 text-sm">Não tem uma conta?</p>
          <Button
            variant="outline"
            className="mt-2 border-white text-white hover:bg-white hover:text-purple-600"
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
