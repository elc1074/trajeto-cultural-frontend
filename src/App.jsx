import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <button className="font-semibold p-4 bg-red-800" onClick={() => navigate("home")}>
      Ir para Home
    </button>
  );
};

export default App;
