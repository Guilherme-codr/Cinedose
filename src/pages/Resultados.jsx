import GradeFilmes from "../components/filmes/GradeFilmes";
import Secao from "../components/ui/Secao";
import { usePesquisa } from "../hooks/useFilmes";

// Resultados de uma busca. Usada na tela de busca do header e na busca dentro de Minha Lista.
export default function Resultados({ termo, acao }) {
  const resultados = usePesquisa(termo);

  return (
    <Secao titulo={`Resultados para "${termo}"`} acao={acao}>
      <GradeFilmes {...resultados} esqueletos={10} vazio="Nenhum filme encontrado." />
    </Secao>
  );
}
