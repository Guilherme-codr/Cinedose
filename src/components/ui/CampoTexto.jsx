const ESTILO =
  "w-full rounded-[10px] border border-borda bg-fundo px-3.5 py-2.5 text-texto outline-none transition-colors placeholder:text-apagado focus:border-destaque";

// Campo de formulário com rótulo. Use "multilinha" para um campo de texto maior.
export default function CampoTexto({ rotulo, multilinha = false, ...resto }) {
  return (
    <label className="mb-4.5 block">
      <span className="mb-1.5 block text-sm font-bold text-texto-suave">{rotulo}</span>
      {multilinha ? (
        <textarea rows={2} className={`${ESTILO} resize-y`} {...resto} />
      ) : (
        <input type="text" className={ESTILO} {...resto} />
      )}
    </label>
  );
}
