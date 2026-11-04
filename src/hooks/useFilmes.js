import { useCallback, useEffect, useState } from "react";
import { buscarLancamentos, obterFilmes, pesquisarFilmes } from "../services/filmes";

const notaDe = (filme) => parseFloat(filme.nota) || 0;
const ordenarPorNota = (filmes) => [...filmes].sort((a, b) => notaDe(b) - notaDe(a));

// Executa uma busca assíncrona e devolve { filmes, carregando, erro }.
// "carregar" precisa ser uma função estável (definida fora do componente ou com useCallback):
// a própria função identifica a requisição, e uma nova função dispara uma nova busca.
function useRequisicao(carregar) {
  const [resultado, setResultado] = useState({ origem: null, filmes: [], erro: null });

  useEffect(() => {
    let cancelado = false;

    carregar()
      .then((filmes) => {
        if (!cancelado) setResultado({ origem: carregar, filmes, erro: null });
      })
      .catch((erro) => {
        console.error(erro);
        if (!cancelado) setResultado({ origem: carregar, filmes: [], erro });
      });

    return () => {
      cancelado = true;
    };
  }, [carregar]);

  return {
    filmes: resultado.filmes,
    erro: resultado.erro,
    carregando: resultado.origem !== carregar,
  };
}

// "ids" deve ser uma lista estável (constante ou resultado de useMemo).
export function useFilmesPorIds(ids, { ordenar = false } = {}) {
  const carregar = useCallback(async () => {
    const filmes = await obterFilmes(ids);
    return ordenar ? ordenarPorNota(filmes) : filmes;
  }, [ids, ordenar]);

  return useRequisicao(carregar);
}

export function usePesquisa(termo) {
  const carregar = useCallback(
    () => (termo ? pesquisarFilmes(termo) : Promise.resolve([])),
    [termo],
  );

  return useRequisicao(carregar);
}

export function useLancamentos() {
  return useRequisicao(buscarLancamentos);
}
