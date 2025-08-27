import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const App = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outline" onClick={() => navigate("home")}>Ir para home</Button>
  );
};

export default App;
