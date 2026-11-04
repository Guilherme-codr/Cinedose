import { TERMOS_LANCAMENTOS } from "../data/filmes";
import {
  analisarData,
  formatarVotos,
  limpar,
  separarLista,
  traduzirGeneros,
  traduzirPremios,
} from "../utils/formatadores";
import { buscarPorId, buscarPorTexto } from "./omdb";
import { buscarDetalhes, buscarTraducao, tmdbAtivo } from "./tmdb";

// Guardamos as promessas: um filme pedido duas vezes (mesmo ao mesmo tempo) só gasta uma requisição.
const cacheFilmes = new Map();
const cacheDetalhes = new Map();

const NOMES_DAS_FONTES = { "Internet Movie Database": "IMDb" };

function montarNotas(omdb) {
  return (omdb.Ratings ?? []).map((nota) => ({
    fonte: NOMES_DAS_FONTES[nota.Source] ?? nota.Source,
    valor: nota.Value,
    detalhe: nota.Source === "Internet Movie Database" ? formatarVotos(omdb.imdbVotes) : "",
  }));
}

// Converte a resposta da OMDb (+ tradução do TMDB) no modelo de filme usado pelo site.
function normalizar(omdb, traducao) {
  const lancamento = analisarData(limpar(omdb.Released));

  return {
    id: omdb.imdbID,
    tmdbId: traducao?.tmdbId ?? null,
    titulo: traducao?.titulo || omdb.Title,
    tituloOriginal: omdb.Title,
    sinopse: traducao?.sinopse || limpar(omdb.Plot) || "Sinopse não disponível.",
    ano: limpar(omdb.Year),
    duracao: limpar(omdb.Runtime),
    classificacao: limpar(omdb.Rated),
    lancamento: lancamento ? lancamento.toLocaleDateString("pt-BR") : "",
    lancamentoMs: lancamento?.getTime() ?? 0,
    generos: traduzirGeneros(omdb.Genre),
    direcao: limpar(omdb.Director),
    roteiro: limpar(omdb.Writer),
    elenco: separarLista(omdb.Actors),
    idioma: limpar(omdb.Language),
    pais: limpar(omdb.Country),
    premios: traduzirPremios(omdb.Awards),
    bilheteria: limpar(omdb.BoxOffice),
    produtora: limpar(omdb.Production),
    poster: limpar(omdb.Poster),
    nota: limpar(omdb.imdbRating),
    notas: montarNotas(omdb),
  };
}

async function carregarFilme(id) {
  const omdb = await buscarPorId(id);
  if (!omdb) return null;

  const traducao = tmdbAtivo ? await buscarTraducao(id) : null;
  return normalizar(omdb, traducao);
}

export function obterFilme(id) {
  if (!cacheFilmes.has(id)) {
    const promessa = carregarFilme(id).catch((erro) => {
      cacheFilmes.delete(id); // para tentar de novo da próxima vez
      throw erro;
    });
    cacheFilmes.set(id, promessa);
  }
  return cacheFilmes.get(id);
}

export async function obterFilmes(ids) {
  const filmes = await Promise.all(ids.map(obterFilme));
  return filmes.filter(Boolean); // remove os IDs que não foram encontrados
}

export async function pesquisarFilmes(termo, ano) {
  const resultados = await buscarPorTexto(termo, ano);
  return obterFilmes(resultados.map((resultado) => resultado.imdbID));
}

// Filmes do ano atual, dos mais recentes para os mais antigos.
export async function buscarLancamentos() {
  const ano = new Date().getFullYear();
  const listas = await Promise.all(TERMOS_LANCAMENTOS.map((termo) => pesquisarFilmes(termo, ano)));

  const semRepetir = new Map(
    listas
      .flat()
      .filter((filme) => filme.poster)
      .map((filme) => [filme.id, filme]),
  );

  return [...semRepetir.values()].sort((a, b) => b.lancamentoMs - a.lancamentoMs);
}

// Dados extras do TMDB (elenco com foto, trailer...). Devolve null quando não há TMDB.
export function obterDetalhes(filme) {
  if (!tmdbAtivo || !filme.tmdbId) return Promise.resolve(null);

  if (!cacheDetalhes.has(filme.id)) {
    const promessa = buscarDetalhes(filme.tmdbId).then((detalhes) => {
      if (!detalhes) cacheDetalhes.delete(filme.id);
      return detalhes;
    });
    cacheDetalhes.set(filme.id, promessa);
  }
  return cacheDetalhes.get(filme.id);
}
