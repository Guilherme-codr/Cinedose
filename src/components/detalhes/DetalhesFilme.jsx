import { useDetalhesTmdb } from "../../hooks/useDetalhesTmdb";
import { useLista } from "../../hooks/useLista";
import Botao from "../ui/Botao";
import Tag from "../ui/Tag";
import ElencoFilme from "./ElencoFilme";
import FichaTecnica from "./FichaTecnica";
import NotasFilme from "./NotasFilme";

function Bloco({ titulo, children }) {
  return (
    <section className="mt-7">
      <h3 className="mb-2.5 border-l-[3px] border-destaque pl-2.5 font-bold">{titulo}</h3>
      {children}
    </section>
  );
}

// Conteúdo da janela de detalhes. Mostra os dados da OMDb na hora e completa com o TMDB quando chegam.
export default function DetalhesFilme({ filme }) {
  const { estaNaLista, alternar } = useLista();
  const extras = useDetalhesTmdb(filme);
  const naLista = estaNaLista(filme.id);

  const meta = [filme.ano, filme.duracao, filme.classificacao].filter(Boolean).join(" • ");
  const buscaDoTrailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${filme.titulo} ${filme.ano} trailer`,
  )}`;

  return (
    <article>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="aspect-[2/3] w-[160px] shrink-0 sm:w-[210px] overflow-hidden rounded-xl bg-cabecalho">
          {filme.poster && (
            <img src={filme.poster} alt={`Pôster de ${filme.titulo}`} className="h-full w-full object-cover" />
          )}
        </div>

        <div className="w-full">
          <h2 className="pr-10 text-2xl leading-tight sm:text-[1.7rem] font-bold">{filme.titulo}</h2>
          {filme.tituloOriginal !== filme.titulo && (
            <p className="mt-1 text-sm text-mudo italic">{filme.tituloOriginal}</p>
          )}
          <p className="mt-2 mb-3 text-mudo">{meta}</p>

          <div className="flex flex-wrap gap-1.5">
            {filme.generos.map((genero) => (
              <Tag key={genero}>{genero}</Tag>
            ))}
          </div>

          <NotasFilme notas={filme.notas} />

          <div className="flex flex-wrap gap-2.5">
            <Botao variante="principal" className="px-5 py-2.5" onClick={() => alternar(filme.id)}>
              {naLista ? "✓ Na minha lista" : "+ Adicionar à lista"}
            </Botao>
            <Botao className="px-4 py-2.5" href={extras?.trailer || buscaDoTrailer}>
              ▶ Trailer
            </Botao>
            <Botao className="px-4 py-2.5" href={`https://www.imdb.com/title/${filme.id}/`}>
              Ver no IMDb
            </Botao>
          </div>
        </div>
      </div>

      {extras?.slogan && <p className="mt-5 text-destaque italic">{extras.slogan}</p>}

      <Bloco titulo="Sinopse">
        <p className="leading-relaxed text-texto-suave">{filme.sinopse}</p>
      </Bloco>

      <Bloco titulo="Ficha técnica">
        <FichaTecnica filme={filme} extras={extras} />
      </Bloco>

      <Bloco titulo="Elenco">
        <ElencoFilme atores={extras?.elenco ?? []} nomes={filme.elenco} />
      </Bloco>
    </article>
  );
}
