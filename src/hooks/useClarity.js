import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export const useClarity = () => {
  useEffect(() => {
    if (window.clarity) return;

    const projectId = import.meta.env.VITE_CLARITY_ID;
    if (!projectId) return;

    Clarity.init(projectId);
  }, []);
};
