import { MENU } from "../../constants/paginas";
import { CONTATO } from "../../data/contato";

const TITULO_DA_COLUNA = "mb-4 font-bold";
const LINK = "text-[0.9rem] text-mudo transition-colors hover:text-destaque";

// Monta os links de contato, ignorando os campos que ficaram vazios em data/contato.js.
function montarContatos() {
  return [
    CONTATO.email && { rotulo: CONTATO.email, href: `mailto:${CONTATO.email}` },
    CONTATO.whatsapp && { rotulo: "WhatsApp", href: `https://wa.me/${CONTATO.whatsapp}` },
    CONTATO.linkedin && { rotulo: "LinkedIn", href: CONTATO.linkedin },
    CONTATO.github && { rotulo: "GitHub", href: CONTATO.github },
    CONTATO.portfolio && { rotulo: "Portfólio", href: CONTATO.portfolio },
  ].filter(Boolean);
}

export default function Footer({ aoNavegar }) {
  const contatos = montarContatos();

  return (
    <footer className="mt-10 border-t border-superficie bg-cabecalho px-5 pt-12 pb-6">
      <div className="mx-auto grid max-w-[1300px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="mb-3 text-2xl font-bold">
            Cine<span className="text-destaque">Dose</span>
          </p>
          <p className="mb-4 max-w-[340px] text-[0.9rem] text-mudo">
            Projeto de catálogo de filmes desenvolvido com React, Vite e Tailwind, consumindo as APIs
            da OMDb e do TMDB.
          </p>
          {CONTATO.disponivel && (
            <span className="inline-flex items-center gap-2 rounded-full border border-sucesso/30 bg-sucesso/10 px-3 py-1 text-[0.8rem] text-sucesso">
              <span className="size-2 rounded-full bg-sucesso" />
              Disponível para novos projetos
            </span>
          )}
        </div>

        <nav aria-label="Rodapé">
          <h2 className={TITULO_DA_COLUNA}>Navegação</h2>
          <ul className="flex flex-col items-start gap-2.5">
            {MENU.map((item) => (
              <li key={item.id}>
                <button type="button" className={LINK} onClick={() => aoNavegar(item.id)}>
                  {item.rotulo}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={TITULO_DA_COLUNA}>Fale comigo</h2>
          <ul className="flex flex-col gap-2.5">
            {contatos.map((contato) => (
              <li key={contato.rotulo}>
                <a
                  href={contato.href}
                  className={LINK}
                  {...(contato.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {contato.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1300px] flex-col gap-2 border-t border-superficie pt-5 text-[0.82rem] text-mudo">
        <p>
          © {new Date().getFullYear()} {CONTATO.nome}. Todos os direitos reservados.
        </p>
        <p className="text-[0.78rem] text-apagado">
          Dados e pôsteres fornecidos pela{" "}
          <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer" className="text-mudo underline hover:text-destaque">
            OMDb API
          </a>
          . Títulos, sinopses e elenco em português fornecidos pelo{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-mudo underline hover:text-destaque">
            TMDB
          </a>
          . Este produto usa a API do TMDB, mas não é endossado nem certificado por ele. Os filmes e
          imagens pertencem aos seus respectivos detentores. Projeto sem fins lucrativos, criado para
          fins de estudo e portfólio.
        </p>
      </div>
    </footer>
  );
}
