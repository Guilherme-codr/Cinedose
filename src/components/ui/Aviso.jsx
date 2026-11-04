import { useEffect } from "react";

// Aviso rápido no pé da tela. "aoSumir" deve ser uma função estável (useCallback).
export default function Aviso({ texto, aoSumir, duracao = 2500 }) {
  useEffect(() => {
    const temporizador = setTimeout(aoSumir, duracao);
    return () => clearTimeout(temporizador);
  }, [aoSumir, duracao]);

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-6 z-50 mx-auto w-max max-w-[calc(100%-2rem)] animate-aparecer rounded-[10px] bg-destaque px-5 py-3 font-bold text-cabecalho shadow-xl"
    >
      {texto}
    </div>
  );
}
