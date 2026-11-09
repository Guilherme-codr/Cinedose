import { useContext } from "react";
import { SessaoContext } from "../context/SessaoContext";

export function useSessao() {
  const contexto = useContext(SessaoContext);
  if (!contexto) throw new Error("useSessao precisa ser usado dentro de <SessaoProvider>.");
  return contexto;
}
