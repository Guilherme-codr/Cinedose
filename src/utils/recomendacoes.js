import { CATEGORIAS } from "../data/filmes";

const FILMES_POR_GENERO = 3;
const LIMITE_TOTAL = 10;

// Monta a lista da seção "Para você": poucos filmes de cada gênero escolhido, sem repetir.
export function montarRecomendacoes(generos) {
  const ids = new Set();

  generos
    .filter((genero) => Object.hasOwn(CATEGORIAS, genero))
    .forEach((genero) => {
      CATEGORIAS[genero].slice(0, FILMES_POR_GENERO).forEach((id) => ids.add(id));
    });

  return [...ids].slice(0, LIMITE_TOTAL);
}
