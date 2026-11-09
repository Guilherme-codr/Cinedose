import { MENU, PAGINAS } from "../../constants/paginas";
import { COR_PADRAO } from "../../data/perfil";
import { useLista } from "../../hooks/useLista";
import { usePerfil } from "../../hooks/usePerfil";
import { useSessao } from "../../hooks/useSessao";
import Botao from "../ui/Botao";
import { IconeAvatar } from "../ui/Avatar";
import FormBusca from "../ui/FormBusca";

export default function Header({ paginaAtual, aoNavegar, aoBuscar, aoAbrirConta }) {
  const { total } = useLista();
  const { perfil } = usePerfil();
  const { ativo, usuario } = useSessao();
  const rotuloConta = ativo && !usuario ? "Entrar" : perfil.nome || "Minha conta";

  // Só pinta o boneco quando a pessoa escolheu uma cor; senão ele acompanha o texto do botão.
  const corDoAvatar = perfil.cor !== COR_PADRAO ? perfil.cor : undefined;

  return (
    <header className="bg-cabecalho">
      {/* Três colunas: as das pontas têm o mesmo tamanho, então a busca fica no centro exato. */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-5 py-4 sm:gap-x-6 sm:gap-y-4 min-[1100px]:grid-cols-[1fr_minmax(260px,480px)_1fr]">
        <div className="max-sm:contents sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-2">
          <h1 className="text-2xl leading-tight font-bold sm:text-[2rem]">
            <button type="button" onClick={() => aoNavegar(PAGINAS.INICIO)}>
              Cine<span className="text-destaque">Dose</span>
            </button>
          </h1>

          <nav aria-label="Principal" className="sem-barra-de-rolagem flex items-center gap-1 overflow-x-auto whitespace-nowrap max-sm:order-2 max-sm:col-span-full max-sm:-mx-5 max-sm:px-4 sm:flex-wrap sm:gap-3.5">
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

        <div className="flex justify-end gap-1 sm:gap-3.5">
          <Botao variante="menu" onClick={aoAbrirConta}>
            {perfil.foto ? (
              <img
                src={perfil.foto}
                alt=""
                className="size-[22px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <IconeAvatar className="size-[22px] shrink-0" style={{ color: corDoAvatar }} />
            )}
            <span className="max-w-[140px] truncate max-sm:sr-only">{rotuloConta}</span>
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
