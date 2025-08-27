import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/containers/BottomNav";
import { Header } from "@/components/containers/Header";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header section="Localização" />
      <img src="/map.png" className="w-full h-full" alt="map" />
      <BottomNav />
    </div>
  );
};

export default Home;
