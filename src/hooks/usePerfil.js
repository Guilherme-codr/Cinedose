import { useContext } from "react";
import { PerfilContext } from "../context/PerfilContext";

export function usePerfil() {
  const contexto = useContext(PerfilContext);
  if (!contexto) throw new Error("usePerfil precisa ser usado dentro de <PerfilProvider>.");
  return contexto;
}
