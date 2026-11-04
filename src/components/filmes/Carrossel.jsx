import { useRef } from "react";
import Mensagem from "../ui/Mensagem";
import CardFilme from "./CardFilme";
import CardSkeleton from "./CardSkeleton";

const LARGURA_DO_CARD = 210;
const ESPACO_ENTRE_CARDS = 24;
const CARDS_POR_CLIQUE = 3;
const CLASSES_DO_CARD = "w-[210px] shrink-0 snap-start";

function SetaCarrossel({ lado, aoClicar }) {
  const posicao = lado === "esquerda" ? "left-1.5" : "right-1.5";

  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={lado === "esquerda" ? "Anterior" : "Próximo"}
      className={`absolute top-[40%] z-[5] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-borda bg-cabecalho/90 text-3xl leading-none text-texto shadow-lg transition-colors hover:border-destaque hover:text-destaque sm:flex ${posicao}`}
    >
      {lado === "esquerda" ? "‹" : "›"}
    </button>
  );
}

// Fileira de cards que rola de lado. O "scroll-snap" encaixa a rolagem em cada card.
export default function Carrossel({ filmes, carregando, erro }) {
  const trilhoRef = useRef(null);

  function rolar(direcao) {
    const passo = (LARGURA_DO_CARD + ESPACO_ENTRE_CARDS) * CARDS_POR_CLIQUE;
    trilhoRef.current.scrollBy({ left: direcao * passo, behavior: "smooth" });
  }

  if (erro) {
    return <Mensagem titulo="Não foi possível carregar os filmes">{erro.message}</Mensagem>;
  }

  return (
    <div className="relative">
      <SetaCarrossel lado="esquerda" aoClicar={() => rolar(-1)} />

      <div
        ref={trilhoRef}
        className="sem-barra-de-rolagem flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pt-3 pb-5"
      >
        {carregando
          ? Array.from({ length: 6 }, (_, indice) => (
              <CardSkeleton key={indice} className={CLASSES_DO_CARD} />
            ))
          : filmes.map((filme, indice) => (
              <CardFilme key={filme.id} filme={filme} indice={indice} className={CLASSES_DO_CARD} />
            ))}
      </div>

      <SetaCarrossel lado="direita" aoClicar={() => rolar(1)} />
    </div>
  );
}
