import { OMDB_KEY } from "../config/api";

const URL_BASE = "https://www.omdbapi.com/";

async function chamar(parametros) {
  if (!OMDB_KEY) {
    throw new Error("Chave da OMDb não configurada. Defina VITE_OMDB_KEY no arquivo .env.local.");
  }

  const url = new URL(URL_BASE);
  url.search = new URLSearchParams({ apikey: OMDB_KEY, ...parametros });

  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`A OMDb respondeu com erro ${resposta.status}.`);

  return resposta.json();
}

// Erros que impedem qualquer busca (chave inválida, limite diário). "Não encontrado" não entra aqui.
function verificarErroFatal(dados) {
  if (/api key|limit/i.test(dados.Error ?? "")) {
    throw new Error(`OMDb: ${dados.Error}`);
  }
}

// Devolve os dados completos do filme, ou null se o ID não existir.
export async function buscarPorId(id) {
  const dados = await chamar({ i: id });
  if (dados.Response === "True") return dados;

  verificarErroFatal(dados);
  return null;
}

// Devolve o resumo dos filmes que combinam com o texto (no máximo 10).
export async function buscarPorTexto(termo, ano) {
  const dados = await chamar({ s: termo, type: "movie", ...(ano && { y: ano }) });
  if (dados.Response === "True") return dados.Search;

  verificarErroFatal(dados);
  return [];
}
