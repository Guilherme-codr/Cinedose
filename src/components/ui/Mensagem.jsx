// Texto discreto para estados vazios e erros.
export default function Mensagem({ titulo, children }) {
  return (
    <div className="rounded-[14px] border border-dashed border-borda px-5 py-12 text-center text-mudo">
      {titulo && <h3 className="mb-2 text-xl font-bold text-texto">{titulo}</h3>}
      <p>{children}</p>
    </div>
  );
}
