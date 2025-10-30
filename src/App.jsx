import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Start from "./pages/Start.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ConquistasPage from "./pages/ConquistasPage.jsx";
import Perfil from "./pages/Perfil.jsx";
import PontoArtistico from "./pages/PontoArtistico.jsx";
import PontosVisitados from "./pages/PontosVisitados.jsx";
import EventosDetails from "./pages/EventosDetails.jsx";
import { Avaliacao } from "./pages/Avaliacao.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { useClarity } from "./hooks/useClarity.js";
import InstallPWA from "./components/containers/InstallPWA.jsx";

const AppContent = () => {
  useClarity();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/conquistas",
      element: <ConquistasPage />,
    },
    {
      path: "/ponto-artistico",
      element: <PontoArtistico />,
    },
    {
      path: "/pontos-visitados",
      element: <PontosVisitados />,
    },
    {
      path: "/eventos-details",
      element: <EventosDetails />,
    },
    {
      path: "/avaliacao",
      element: <Avaliacao />,
    },
    {
      path: "/perfil",
      element: <Perfil />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContent />
    <InstallPWA />
  </StrictMode>,
);
