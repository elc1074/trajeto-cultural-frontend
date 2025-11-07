import { BottomNav } from "@/components/containers/BottomNav";
import { Header } from "@/components/containers/Header";
import { Send, ExternalLink } from "lucide-react";

export function Avaliacao() {
  const FORM_URL = "https://forms.gle/ePk8gn1gi4mj7S9Q8";

  const handleRedirect = () => {
    // Abre o formulário em uma nova aba para não interromper a navegação do usuário no app
    window.open(FORM_URL, "_blank");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-bg">
      <Header section="Feedback" />
      <div className="flex flex-1 flex-col items-center justify-start rounded-t-3xl bg-bg p-6 pt-16">
        
        <div className="flex flex-col items-center w-full max-w-md gap-6 text-center">
            
            <Send className="w-16 h-16 text-primary mb-4" />

            <h2 className="text-2xl font-bold text-gray-800">
              Queremos ouvir você!
            </h2>
            <p className="text-gray-600 mb-8 px-4">
              Sua opinião é fundamental para aprimorarmos a experiência do Trajeto Cultural. Clique no botão abaixo para preencher o formulário de avaliação.
            </p>

            <button
              type="button"
              onClick={handleRedirect}
              className="w-full bg-primary text-bg py-4 px-4 rounded-xl font-bold text-lg shadow-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 transform active:scale-95"
            >
              Avaliar no Formulário
              <ExternalLink className="h-5 w-5" />
            </button>
        </div>

        <div className="mt-auto pt-10 text-xs text-gray-400">
            <p>&copy; Trajeto Cultural - UFSM</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
