import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial: Login */}
        <Route path="/" element={<Login />} />

        {/* Tela principal */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
