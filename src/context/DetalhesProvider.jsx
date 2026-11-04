import { useMemo, useState } from "react";
import DetalhesFilme from "../components/detalhes/DetalhesFilme";
import Modal from "../components/ui/Modal";
import { DetalhesContext } from "./DetalhesContext";

// Controla a janela de detalhes: qualquer card chama abrirFilme(filme) para abri-la.
export default function DetalhesProvider({ children }) {
  const [filme, setFilme] = useState(null);

  const valor = useMemo(() => ({ abrirFilme: setFilme }), []);
  const fechar = () => setFilme(null);

  return (
    <DetalhesContext value={valor}>
      {children}
      <Modal
        aberto={filme !== null}
        aoFechar={fechar}
        rotulo="Detalhes do filme"
        largura="max-w-[860px]"
      >
        {filme && <DetalhesFilme key={filme.id} filme={filme} />}
      </Modal>
    </DetalhesContext>
  );
}
