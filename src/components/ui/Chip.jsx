export default function Chip({ ativo = false, className = "", ...resto }) {
  const estado = ativo
    ? "border-destaque bg-destaque font-bold text-cabecalho"
    : "border-borda bg-superficie text-texto-suave hover:border-destaque hover:text-destaque";

  return (
    <button
      type="button"
      aria-pressed={ativo}
      className={`rounded-full border px-4.5 py-2 transition-colors duration-300 ${estado} ${className}`}
      {...resto}
    />
  );
}
