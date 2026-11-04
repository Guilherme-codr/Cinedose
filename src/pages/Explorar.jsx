import { useState } from "react";
import GradeFilmes from "../components/filmes/GradeFilmes";
import Chip from "../components/ui/Chip";
import Secao from "../components/ui/Secao";
import { CATEGORIAS } from "../data/filmes";
import { useFilmesPorIds } from "../hooks/useFilmes";

const NOMES_DAS_CATEGORIAS = Object.keys(CATEGORIAS);

export default function Explorar() {
  const [categoria, setCategoria] = useState(NOMES_DAS_CATEGORIAS[0]);
  const filmes = useFilmesPorIds(CATEGORIAS[categoria]);

  return (
    <Secao titulo="Explorar">
      <div className="mb-7 flex flex-wrap gap-2.5">
        {NOMES_DAS_CATEGORIAS.map((nome) => (
          <Chip key={nome} ativo={nome === categoria} onClick={() => setCategoria(nome)}>
            {nome}
          </Chip>
        ))}
      </div>

      <GradeFilmes {...filmes} esqueletos={CATEGORIAS[categoria].length} />
    </Secao>
  );
}
