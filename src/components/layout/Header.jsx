import { MENU, PAGINAS } from "../../constants/paginas";
import { COR_PADRAO } from "../../data/perfil";
import { useLista } from "../../hooks/useLista";
import { usePerfil } from "../../hooks/usePerfil";
import Botao from "../ui/Botao";
import { IconeAvatar } from "../ui/Avatar";
import FormBusca from "../ui/FormBusca";

export default function Header({ paginaAtual, aoNavegar, aoBuscar, aoAbrirConta }) {
  const { total } = useLista();
  const { perfil } = usePerfil();

  // Só pinta o boneco quando a pessoa escolheu uma cor; senão ele acompanha o texto do botão.
  const corDoAvatar = perfil.cor !== COR_PADRAO ? perfil.cor : undefined;

  return (
    <header className="bg-cabecalho">
      {/* Três colunas: as das pontas têm o mesmo tamanho, então a busca fica no centro exato. */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 px-5 py-4 min-[1100px]:grid-cols-[1fr_minmax(260px,480px)_1fr]">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
          <h1 className="text-[2rem] leading-tight font-bold">
            <button type="button" onClick={() => aoNavegar(PAGINAS.INICIO)}>
              Cine<span className="text-destaque">Dose</span>
            </button>
          </h1>

          <nav aria-label="Principal" className="flex flex-wrap items-center gap-3.5">
            {MENU.map((item) => (
              <Botao
                key={item.id}
                variante="menu"
                ativo={paginaAtual === item.id}
                onClick={() => aoNavegar(item.id)}
              >
                {item.rotulo}
              </Botao>
            ))}
          </nav>
        </div>

        <FormBusca
          placeholder="Buscar filme..."
          aoBuscar={aoBuscar}
          className="order-3 col-span-full min-[1100px]:order-none min-[1100px]:col-span-1"
        />

        <div className="flex justify-end gap-3.5">
          <Botao variante="menu" onClick={aoAbrirConta}>
            <IconeAvatar className="size-[22px] shrink-0" style={{ color: corDoAvatar }} />
            <span className="max-w-[140px] truncate">{perfil.nome || "Minha conta"}</span>
          </Botao>

          <Botao
            variante="menu"
            ativo={paginaAtual === PAGINAS.LISTA}
            onClick={() => aoNavegar(PAGINAS.LISTA)}
          >
            Criar Lista
            {total > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destaque px-1.5 text-xs font-bold text-cabecalho">
                {total}
              </span>
            )}
          </Botao>
        </div>
      </div>
    </header>
  );
}
