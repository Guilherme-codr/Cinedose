import { useCallback, useMemo } from "react";
import { CHAVES_ARMAZENAMENTO } from "../config/armazenamento";
import { PERFIL_PADRAO } from "../data/perfil";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PerfilContext } from "./PerfilContext";

// Guarda os dados da conta (nome, gêneros favoritos, preferências), salvos no navegador.
export default function PerfilProvider({ children }) {
  const [salvo, setSalvo] = useLocalStorage(CHAVES_ARMAZENAMENTO.perfil, PERFIL_PADRAO);

  // Completa com os valores padrão caso o perfil salvo seja de uma versão mais antiga.
  const perfil = useMemo(() => ({ ...PERFIL_PADRAO, ...salvo }), [salvo]);

  const salvar = useCallback(
    (dados) => {
      setSalvo((atual) => ({
        ...atual,
        ...dados,
        criadoEm: atual.criadoEm ?? new Date().toISOString(),
      }));
    },
    [setSalvo],
  );

  const redefinir = useCallback(() => setSalvo(PERFIL_PADRAO), [setSalvo]);

  const valor = useMemo(() => ({ perfil, salvar, redefinir }), [perfil, salvar, redefinir]);

  return <PerfilContext value={valor}>{children}</PerfilContext>;
}
