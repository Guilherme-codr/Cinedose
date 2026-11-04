import { useMemo, useState } from "react";
import GradeFilmes from "../components/filmes/GradeFilmes";
import Botao from "../components/ui/Botao";
import FormBusca from "../components/ui/FormBusca";
import Mensagem from "../components/ui/Mensagem";
import Secao from "../components/ui/Secao";
import { useFilmesPorIds } from "../hooks/useFilmes";
import { useLista } from "../hooks/useLista";
import Resultados from "./Resultados";

export default function MinhaLista() {
  const { ids, total } = useLista();
  const [termoBusca, setTermoBusca] = useState("");

  // Os filmes adicionados por último aparecem primeiro.
  const idsRecentes = useMemo(() => [...ids].reverse(), [ids]);
  const { filmes, carregando, erro } = useFilmesPorIds(idsRecentes);

  // Ao remover um filme, ele some na hora, sem esperar a lista ser carregada de novo.
  const filmesDaLista = filmes.filter((filme) => ids.includes(filme.id));

  const contagem = `${total} ${total === 1 ? "filme" : "filmes"}`;

  return (
    <>
      <Secao titulo="Minha Lista" acao={<span className="text-mudo">{contagem}</span>}>
        <FormBusca
          placeholder="Buscar filme para adicionar..."
          aoBuscar={setTermoBusca}
          className="max-w-[600px]"
        />
      </Secao>

      {termoBusca && (
        <Resultados
          termo={termoBusca}
          acao={
            <Botao className="px-3.5" onClick={() => setTermoBusca("")}>
              Fechar busca
            </Botao>
          }
        />
      )}

      {total === 0 ? (
        <Mensagem titulo="Sua lista está vazia">
          Busque um filme acima ou clique no + em qualquer card para adicionar.
        </Mensagem>
      ) : (
        <GradeFilmes
          filmes={filmesDaLista}
          carregando={carregando && filmesDaLista.length === 0}
          erro={erro}
          esqueletos={total}
        />
      )}
    </>
  );
}
