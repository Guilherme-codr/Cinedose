import { useState } from "react";
import JanelaConta from "./components/conta/JanelaConta";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { PAGINAS } from "./constants/paginas";
import Explorar from "./pages/Explorar";
import Inicio from "./pages/Inicio";
import Lancamentos from "./pages/Lancamentos";
import MelhoresAvaliados from "./pages/MelhoresAvaliados";
import MinhaLista from "./pages/MinhaLista";
import Resultados from "./pages/Resultados";

export default function App() {
  const [pagina, setPagina] = useState(PAGINAS.INICIO);
  const [termoBusca, setTermoBusca] = useState("");
  const [contaAberta, setContaAberta] = useState(false);

  function navegar(destino) {
    setPagina(destino);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function buscar(termo) {
    setTermoBusca(termo);
    navegar(PAGINAS.RESULTADOS);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        paginaAtual={pagina}
        aoNavegar={navegar}
        aoBuscar={buscar}
        aoAbrirConta={() => setContaAberta(true)}
      />

      <main className="mx-auto w-full max-w-325 flex-1 px-5 py-10">
        {pagina === PAGINAS.INICIO && <Inicio />}
        {pagina === PAGINAS.EXPLORAR && <Explorar />}
        {pagina === PAGINAS.LANCAMENTOS && <Lancamentos />}
        {pagina === PAGINAS.MELHORES && <MelhoresAvaliados />}
        {pagina === PAGINAS.LISTA && <MinhaLista />}
        {pagina === PAGINAS.RESULTADOS && (
          <Resultados key={termoBusca} termo={termoBusca} />
        )}
      </main>

      <Footer aoNavegar={navegar} />

      <JanelaConta
        aberta={contaAberta}
        aoFechar={() => setContaAberta(false)}
      />
    </div>
  );
}
