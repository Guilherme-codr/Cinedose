import { useEffect, useState } from "react";
import { obterDetalhes } from "../services/filmes";

// Carrega os dados extras do filme (elenco com foto, trailer...).
// Devolve null enquanto carrega ou quando não há dados do TMDB.
export function useDetalhesTmdb(filme) {
  const [resultado, setResultado] = useState({ filmeId: null, detalhes: null });

  useEffect(() => {
    let cancelado = false;

    obterDetalhes(filme).then((detalhes) => {
      if (!cancelado) setResultado({ filmeId: filme.id, detalhes });
    });

    return () => {
      cancelado = true;
    };
  }, [filme]);

  return resultado.filmeId === filme.id ? resultado.detalhes : null;
}
