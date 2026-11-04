import { useDetalhes } from "../../hooks/useDetalhes";
import { usePerfil } from "../../hooks/usePerfil";
import Tag from "../ui/Tag";
import BotaoLista from "./BotaoLista";

const MAXIMO_DE_GENEROS = 2;

export default function CardFilme({ filme, indice = 0, className = "" }) {
  const { abrirFilme } = useDetalhes();
  const { perfil } = usePerfil();

  return (
    <article
      style={{ animationDelay: `${indice * 80}ms` }}
      className={`group relative animate-aparecer overflow-hidden rounded-cartao border border-borda-suave bg-superficie shadow-cartao transition duration-300 hover:-translate-y-2 hover:border-destaque hover:shadow-cartao-destaque ${className}`}
    >
      {/* O botão "+" fica fora do botão principal: um botão não pode conter outro */}
      <button
        type="button"
        onClick={() => abrirFilme(filme)}
        aria-label={`Ver detalhes de ${filme.titulo}`}
        className="block w-full text-left"
      >
        <span className="relative block aspect-[2/3] overflow-hidden bg-cabecalho">
          {filme.poster && (
            <img
              src={filme.poster}
              alt={`Pôster de ${filme.titulo}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {filme.nota && (
            <span className="absolute top-2.5 right-2.5 z-[2] rounded-lg bg-cabecalho/85 px-2 py-1 text-[0.85rem] font-bold text-destaque backdrop-blur-sm">
              ★ {filme.nota}
            </span>
          )}

          {perfil.mostrarSinopse && (
            <span className="absolute inset-0 flex translate-y-4 items-end bg-linear-to-t from-cabecalho/95 from-30% to-transparent p-3.5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="line-clamp-6 text-[0.8rem] leading-snug text-texto-suave">
                {filme.sinopse}
              </span>
            </span>
          )}
        </span>

        <span className="block p-3.5">
          <span className="mb-1 block truncate text-base font-bold">{filme.titulo}</span>
          <span className="mb-2.5 block text-[0.85rem] text-mudo">
            {[filme.ano, filme.duracao].filter(Boolean).join(" • ")}
          </span>
          <span className="flex flex-wrap gap-1.5">
            {filme.generos.slice(0, MAXIMO_DE_GENEROS).map((genero) => (
              <Tag key={genero}>{genero}</Tag>
            ))}
          </span>
        </span>
      </button>

      <BotaoLista filmeId={filme.id} className="absolute top-2.5 left-2.5 z-10" />
    </article>
  );
}
