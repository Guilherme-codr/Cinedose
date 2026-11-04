import GradeFilmes from "../components/filmes/GradeFilmes";
import Secao from "../components/ui/Secao";
import { useLancamentos } from "../hooks/useFilmes";

export default function Lancamentos() {
  const lancamentos = useLancamentos();

  return (
    <Secao titulo="Lançamentos">
      <GradeFilmes {...lancamentos} esqueletos={10} vazio="Nenhum lançamento encontrado." />
    </Secao>
  );
}
