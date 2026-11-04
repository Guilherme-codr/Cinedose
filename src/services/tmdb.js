import { TMDB_KEY } from "../config/api";
import { nomeDoIdioma, nomeDoPais } from "../utils/formatadores";

const URL_BASE = "https://api.themoviedb.org/3";
const URL_FOTOS = "https://image.tmdb.org/t/p/w185";
const TOTAL_ATORES = 12;

// O TMDB é opcional: sem chave, o site usa os textos em inglês da OMDb.
export const tmdbAtivo = TMDB_KEY !== "";

// Aceita os dois tipos de chave: a curta (v3, vai na URL) e o token longo (v4, vai no cabeçalho).
async function chamar(caminho, parametros = {}) {
  const busca = new URLSearchParams({ language: "pt-BR", ...parametros });
  const opcoes = {};

  if (TMDB_KEY.length > 40) {
    opcoes.headers = { Authorization: `Bearer ${TMDB_KEY}` };
  } else {
    busca.set("api_key", TMDB_KEY);
  }

  const resposta = await fetch(`${URL_BASE}${caminho}?${busca}`, opcoes);
  if (!resposta.ok) throw new Error(`O TMDB respondeu com erro ${resposta.status}.`);

  return resposta.json();
}

// Título e sinopse em português a partir do ID do IMDb.
export async function buscarTraducao(imdbId) {
  try {
    const dados = await chamar(`/find/${imdbId}`, { external_source: "imdb_id" });
    const filme = dados.movie_results?.[0];
    if (!filme) return null;

    return {
      tmdbId: filme.id,
      titulo: filme.title?.trim() ?? "",
      sinopse: filme.overview?.trim() ?? "",
    };
  } catch (erro) {
    console.warn(`Não foi possível traduzir o filme ${imdbId}.`, erro);
    return null;
  }
}

function escolherTrailer(videos = []) {
  const trailers = videos.filter((video) => video.site === "YouTube" && video.type === "Trailer");
  return trailers.find((video) => video.iso_639_1 === "pt") ?? trailers[0] ?? null;
}

// Elenco com foto, slogan, trailer e dados extras para a janela do filme.
export async function buscarDetalhes(tmdbId) {
  try {
    const dados = await chamar(`/movie/${tmdbId}`, {
      append_to_response: "credits,videos",
      include_video_language: "pt,en",
    });
    const trailer = escolherTrailer(dados.videos?.results);

    return {
      slogan: dados.tagline?.trim() ?? "",
      lancamento: dados.release_date ?? "",
      paises: (dados.production_countries ?? []).map((pais) => nomeDoPais(pais.iso_3166_1)),
      idiomas: (dados.spoken_languages ?? []).map((idioma) => nomeDoIdioma(idioma.iso_639_1)),
      trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "",
      elenco: (dados.credits?.cast ?? []).slice(0, TOTAL_ATORES).map((ator) => ({
        id: ator.id,
        nome: ator.name,
        personagem: ator.character ?? "",
        foto: ator.profile_path ? `${URL_FOTOS}${ator.profile_path}` : "",
      })),
    };
  } catch (erro) {
    console.warn(`Não foi possível carregar os detalhes do filme ${tmdbId}.`, erro);
    return null;
  }
}
