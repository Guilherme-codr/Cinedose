// Bloco da página com título (borda laranja à esquerda) e uma ação opcional à direita.
export default function Secao({ titulo, acao, children }) {
  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="border-l-4 border-destaque pl-3 text-2xl font-bold sm:text-[1.6rem]">{titulo}</h2>
        {acao}
      </div>
      {children}
    </section>
  );
}
