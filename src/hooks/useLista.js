import { useContext } from "react";
import { ListaContext } from "../context/ListaContext";

export function useLista() {
  const contexto = useContext(ListaContext);
  if (!contexto) throw new Error("useLista precisa ser usado dentro de <ListaProvider>.");
  return contexto;
}
