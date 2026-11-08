import { formatarData } from "../../utils/formatadores";

// Prefere os dados do TMDB (já em português) e usa os da OMDb quando eles não existem.
function juntar(lista, alternativa) {
  return lista?.length ? lista.join(", ") : alternativa;
}

export default function FichaTecnica({ filme, extras }) {
  const linhas = [
    ["Direção", filme.direcao],
    ["Roteiro", filme.roteiro],
    ["Lançamento", extras?.lancamento ? formatarData(extras.lancamento) : filme.lancamento],
    ["País", juntar(extras?.paises, filme.pais)],
    ["Idioma", juntar(extras?.idiomas, filme.idioma)],
    ["Bilheteria", filme.bilheteria],
    ["Produtora", filme.produtora],
    ["Premiações", filme.premios],
  ].filter(([, valor]) => valor);

  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
      {linhas.map(([rotulo, valor]) => (
        <div key={rotulo} className="rounded-[10px] border border-borda-suave bg-fundo px-3.5 py-2.5">
          <dt className="mb-0.5 text-[0.78rem] text-mudo">{rotulo}</dt>
          <dd className="text-[0.92rem]">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}
