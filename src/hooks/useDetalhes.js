import { useContext } from "react";
import { DetalhesContext } from "../context/DetalhesContext";

export function useDetalhes() {
  const contexto = useContext(DetalhesContext);
  if (!contexto) throw new Error("useDetalhes precisa ser usado dentro de <DetalhesProvider>.");
  return contexto;
}
