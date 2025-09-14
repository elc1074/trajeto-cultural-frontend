import { Header } from "@/components/containers/Header";
import { BottomNav } from "@/components/containers/BottomNav";
import { Award } from "lucide-react";

const achievements = [
  { title: "Primeira visita", date: "xx/xx/xxxx", color: "text-orange-500" },
  { title: "Explorador de esculturas", date: "xx/xx/xxxx", color: "text-purple-500" },
  { title: "10 obras descobertas", date: "xx/xx/xxxx", color: "text-orange-500" },
  { title: "Explorador Ouro", date: "xx/xx/xxxx", color: "text-purple-500" },
  { title: "Participou de 1 evento", date: "xx/xx/xxxx", color: "text-purple-500" },
  { title: "Participou de 10 eventos", date: "xx/xx/xxxx", color: "text-orange-500" },
  { title: "Arco UFSM", date: "xx/xx/xxxx", color: "text-orange-500" },
];

const ConquistasPage = () => {
  return (
    <div className="h-screen flex flex-col bg-purple-600 relative">
      {/* Cabeçalho */}
      <Header section="Conquistas" />

      {/* Conteúdo arredondado branco */}
      <div className="flex-1 bg-white rounded-t-2xl p-4 overflow-y-auto">
        <ul className="space-y-4">
          {achievements.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <Award className={`w-8 h-8 ${item.color}`} />
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navegação inferior */}
      <BottomNav />
    </div>
  );
};

export default ConquistasPage;
