import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Star } from "lucide-react";

const achievements = [
  { title: "Primeira visita", date: "xx/xx/xxxx" },
  { title: "Explorador de esculturas", date: "xx/xx/xxxx" },
  { title: "10 obras descobertas", date: "xx/xx/xxxx" },
  { title: "Explorador Ouro", date: "xx/xx/xxxx" },
  { title: "Participou de l evento", date: "xx/xx/xxxx" },
  { title: "Participou de 10 eventos", date: "xx/xx/xxxx" },
  { title: "Arco UFSM", date: "xx/xx/xxxx" },
];

const ConquistasPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-500 relative">
      <Header section="Conquistas" />

      <div className="flex-1 bg-white rounded-t-3xl p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Conquistas</h1>
        
        <ul className="space-y-6">
          {achievements.map((item, idx) => (
            <li key={idx} className="flex items-start border-b border-gray-200 pb-4 last:border-b-0">
              <Star 
                className={`w-6 h-6 mt-1 mr-3 ${idx % 2 === 0 ? 'text-orange-500' : 'text-purple-500'}`} 
                fill={idx % 2 === 0 ? '#f97316' : '#a855f7'}
              />
              <div>
                <p className="font-medium text-gray-800 text-lg">{item.title}</p>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <BottomNav />
    </div>
  );
};

export default ConquistasPage;