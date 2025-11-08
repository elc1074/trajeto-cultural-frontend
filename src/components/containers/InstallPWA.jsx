import { useEffect, useState } from "react";
import { X } from "lucide-react"; // ícone de fechar

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuário escolheu: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleClose = () => setShowInstallButton(false);

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] flex w-[90%] -translate-x-1/2 animate-fade-in flex-col items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 text-white shadow-lg sm:w-auto sm:flex-row sm:gap-4 sm:px-5 sm:py-4">
      {/* botão de fechar */}
      <button
        onClick={handleClose}
        className="absolute right-3 top-2 text-primary/80 transition hover:text-primary"
        aria-label="Fechar"
      >
        <X size={18} />
      </button>

      <p className="pr-6 text-center text-sm text-primary sm:text-left sm:text-base">
        Instale nosso aplicativo em seu dispositivo!
      </p>

      <button
        onClick={handleInstallClick}
        className="mr-3 w-full rounded-lg bg-accent px-4 py-2 font-semibold text-white transition hover:bg-accent sm:w-auto"
      >
        Instalar
      </button>
    </div>
  );
}
