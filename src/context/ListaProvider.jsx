import { useCallback, useMemo } from "react";
import { CHAVES_ARMAZENAMENTO } from "../config/armazenamento";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ListaContext } from "./ListaContext";

// Guarda os IDs dos filmes da lista do usuário (salvos no navegador).
export default function ListaProvider({ children }) {
  const [ids, setIds] = useLocalStorage(CHAVES_ARMAZENAMENTO.lista, []);

  const alternar = useCallback(
    (id) => {
      setIds((atuais) =>
        atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id],
      );
    },
    [setIds],
  );

  const limpar = useCallback(() => setIds([]), [setIds]);

  const valor = useMemo(
    () => ({
      ids,
      total: ids.length,
      estaNaLista: (id) => ids.includes(id),
      alternar,
      limpar,
    }),
    [ids, alternar, limpar],
  );

  return <ListaContext value={valor}>{children}</ListaContext>;
}
