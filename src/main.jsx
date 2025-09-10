import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Perfil from "./pages/Perfil.jsx";
import PontoArtistico from "./pages/PontoArtistico.jsx";
import EventosDetails from "./pages/EventosDetails.jsx";

import { UserProvider } from "./context/UserContext";


const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/ponto-artistico",
    element: <PontoArtistico />,
  },
  {
    path: "/eventos-details",
    element: <EventosDetails />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
