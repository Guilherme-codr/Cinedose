import Tag from "../ui/Tag";
import { IconeAvatar } from "../ui/Avatar";

// Com dados do TMDB mostra foto e personagem; sem eles, só os nomes que vêm da OMDb.
export default function ElencoFilme({ atores, nomes }) {
  if (atores.length > 0) {
    return (
      <ul className="sem-barra-de-rolagem flex gap-3.5 overflow-x-auto pb-2.5">
        {atores.map((ator) => (
          <li key={ator.id} className="w-[110px] shrink-0 text-center">
            <div className="mb-2 flex size-[110px] items-end justify-center overflow-hidden rounded-full border-2 border-borda-suave bg-fundo text-borda">
              {ator.foto ? (
                <img src={ator.foto} alt={ator.nome} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <IconeAvatar className="size-[70%]" />
              )}
            </div>
            <strong className="block text-[0.82rem]">{ator.nome}</strong>
            <span className="block text-[0.74rem] text-mudo">{ator.personagem}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (nomes.length === 0) return <p className="text-mudo">Elenco não informado.</p>;

  return (
    <ul className="flex flex-wrap gap-2">
      {nomes.map((nome) => (
        <li key={nome}>
          <Tag>{nome}</Tag>
        </li>
      ))}
    </ul>
  );
}
