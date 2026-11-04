import { useMemo } from "react";
import Carrossel from "../components/filmes/Carrossel";
import GradeFilmes from "../components/filmes/GradeFilmes";
import Secao from "../components/ui/Secao";
import { FILMES_CARROSSEL, FILMES_CLASSICOS } from "../data/filmes";
import { useFilmesPorIds } from "../hooks/useFilmes";
import { usePerfil } from "../hooks/usePerfil";
import { montarRecomendacoes } from "../utils/recomendacoes";

export default function Inicio() {
  const { perfil } = usePerfil();

  const destaques = useFilmesPorIds(FILMES_CARROSSEL);
  const classicos = useFilmesPorIds(FILMES_CLASSICOS);

  // "Para você" só aparece quando a pessoa escolheu gêneros em Minha conta.
  const idsParaVoce = useMemo(() => montarRecomendacoes(perfil.generos), [perfil.generos]);
  const paraVoce = useFilmesPorIds(idsParaVoce);

  return (
    <>
      <Secao titulo="Em destaque">
        <Carrossel {...destaques} />
      </Secao>

      {idsParaVoce.length > 0 && (
        <Secao titulo={perfil.nome ? `Para você, ${perfil.nome}` : "Para você"}>
          <GradeFilmes {...paraVoce} esqueletos={idsParaVoce.length} />
        </Secao>
      )}

      <Secao titulo="Clássicos imperdíveis">
        <GradeFilmes {...classicos} esqueletos={FILMES_CLASSICOS.length} />
      </Secao>
    </>
  );
}
