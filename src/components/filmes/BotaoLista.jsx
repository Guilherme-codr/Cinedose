import { useLista } from "../../hooks/useLista";

// Botão redondo "+" / "✓" que adiciona ou remove o filme da lista do usuário.
export default function BotaoLista({ filmeId, className = "" }) {
  const { estaNaLista, alternar } = useLista();
  const naLista = estaNaLista(filmeId);
  const rotulo = naLista ? "Remover da minha lista" : "Adicionar à minha lista";

  const estado = naLista
    ? "border-destaque bg-destaque text-cabecalho hover:bg-cabecalho hover:text-destaque"
    : "border-borda bg-cabecalho/85 text-texto hover:scale-110 hover:border-destaque hover:text-destaque";

  return (
    <button
      type="button"
      onClick={() => alternar(filmeId)}
      title={rotulo}
      aria-label={rotulo}
      aria-pressed={naLista}
      className={`flex size-[34px] items-center justify-center rounded-full border text-xl leading-none font-bold backdrop-blur-sm transition ${estado} ${className}`}
    >
      {naLista ? "✓" : "+"}
    </button>
  );
}
