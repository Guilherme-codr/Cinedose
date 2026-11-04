import { useEffect, useRef } from "react";

// Janela baseada na tag <dialog>: já traz fundo escurecido, tecla Esc e foco preso dentro dela.
// O conteúdo só é montado enquanto a janela está aberta.
export default function Modal({ aberto, aoFechar, rotulo, largura = "max-w-[560px]", children }) {
  const dialogoRef = useRef(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  // Clicar no fundo escurecido (fora do conteúdo) fecha a janela.
  function cliqueNoFundo(evento) {
    if (evento.target === dialogoRef.current) aoFechar();
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-label={rotulo}
      onClose={aoFechar}
      onClick={cliqueNoFundo}
      className={`m-auto w-[calc(100%-2rem)] ${largura} overflow-hidden rounded-2xl border border-borda bg-superficie p-0 text-texto shadow-2xl backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm open:animate-aparecer`}
    >
      <button
        type="button"
        onClick={aoFechar}
        aria-label="Fechar"
        className="absolute top-3 right-3 z-10 flex size-[34px] items-center justify-center rounded-full border border-borda bg-cabecalho/85 text-2xl leading-none text-texto-suave transition-colors hover:border-destaque hover:text-destaque"
      >
        ×
      </button>
      <div className="max-h-[90vh] overflow-y-auto p-6">{aberto && children}</div>
    </dialog>
  );
}
