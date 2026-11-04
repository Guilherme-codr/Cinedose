import GradeFilmes from "../components/filmes/GradeFilmes";
import Secao from "../components/ui/Secao";
import { MELHORES_AVALIADOS } from "../data/filmes";
import { useFilmesPorIds } from "../hooks/useFilmes";

export default function MelhoresAvaliados() {
  const filmes = useFilmesPorIds(MELHORES_AVALIADOS, { ordenar: true });

  return (
    <Secao titulo="Melhores Avaliados">
      <GradeFilmes {...filmes} esqueletos={MELHORES_AVALIADOS.length} />
    </Secao>
  );
}
