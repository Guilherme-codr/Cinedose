// Notas do IMDb, Rotten Tomatoes e Metacritic.
export default function NotasFilme({ notas }) {
  if (notas.length === 0) return null;

  return (
    <ul className="my-4 flex flex-wrap gap-2.5">
      {notas.map((nota) => (
        <li
          key={nota.fonte}
          className="flex flex-col rounded-[10px] border border-borda-suave bg-fundo px-3.5 py-2"
        >
          <strong className="text-lg text-destaque">{nota.valor}</strong>
          <span className="text-[0.78rem] text-texto-suave">{nota.fonte}</span>
          {nota.detalhe && <small className="text-[0.7rem] text-apagado">{nota.detalhe}</small>}
        </li>
      ))}
    </ul>
  );
}
