import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PontoArtistico from "./pages/PontoArtistico";
import EventosDetails from "./pages/EventosDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial: Login */}
        <Route path="/" element={<Login />} />

        {/* Tela principal */}
        <Route path="/home" element={<Home />} />

        {/* Rota para página de ponto artístico*/}
        <Route path="/ponto-artistico" element={<PontoArtistico />} />

        {/* Rota para página de ponto artístico*/}
        <Route path="/eventos-details" element={<EventosDetails />} />

        <Route path="/perfil" element={<Perfil />} />
        
      </Routes>
    </Router>
  );
}

export default App;
