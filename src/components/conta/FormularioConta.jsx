import { useRef, useState } from "react";
import { CATEGORIAS } from "../../data/filmes";
import { useLista } from "../../hooks/useLista";
import { usePerfil } from "../../hooks/usePerfil";
import { baixarJson, reduzirImagem } from "../../utils/arquivo";
import Avatar from "../ui/Avatar";
import Botao from "../ui/Botao";
import CampoTexto from "../ui/CampoTexto";
import Chip from "../ui/Chip";
import SeletorCores from "./SeletorCores";

function Resumo({ valor, rotulo }) {
  return (
    <div className="flex flex-col rounded-[10px] border border-borda-suave bg-fundo px-3.5 py-3">
      <strong className="text-xl text-destaque">{valor}</strong>
      <span className="text-[0.8rem] text-mudo">{rotulo}</span>
    </div>
  );
}

// Formulário da conta. Edita uma cópia (rascunho) e só grava no perfil ao clicar em "Salvar".
export default function FormularioConta({ aoSalvar, aoFechar }) {
  const { perfil, salvar, redefinir } = usePerfil();
  const { ids, total, limpar: limparLista } = useLista();

  const [rascunho, setRascunho] = useState(() => ({
    ...perfil,
    generos: perfil.generos.filter((genero) => Object.hasOwn(CATEGORIAS, genero)),
  }));

  const entradaFoto = useRef(null);
  const [erroFoto, setErroFoto] = useState("");

  const atualizar = (campo, valor) => setRascunho((atual) => ({ ...atual, [campo]: valor }));

  const alternarGenero = (genero) =>
    setRascunho((atual) => ({
      ...atual,
      generos: atual.generos.includes(genero)
        ? atual.generos.filter((item) => item !== genero)
        : [...atual.generos, genero],
    }));

  async function escolherFoto(evento) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = ""; // permite escolher o mesmo arquivo de novo
    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      setErroFoto("Escolha um arquivo de imagem.");
      return;
    }
    try {
      atualizar("foto", await reduzirImagem(arquivo));
      setErroFoto("");
    } catch {
      setErroFoto("Não foi possível carregar essa imagem.");
    }
  }

  function enviar(evento) {
    evento.preventDefault();
    salvar({
      nome: rascunho.nome.trim(),
      bio: rascunho.bio.trim(),
      filmeFavorito: rascunho.filmeFavorito.trim(),
      generos: rascunho.generos,
      cor: rascunho.cor,
      foto: rascunho.foto,
      mostrarSinopse: rascunho.mostrarSinopse,
    });
    aoSalvar();
  }

  function exportarDados() {
    baixarJson("cinedose-meus-dados.json", { perfil, lista: ids });
  }

  function apagarDados() {
    if (!window.confirm("Isso apaga o seu perfil e a sua lista neste navegador. Deseja continuar?")) {
      return;
    }
    redefinir();
    limparLista();
    aoFechar();
  }

  return (
    <form onSubmit={enviar}>
      <h2 className="mb-5 pr-10 text-2xl font-bold">Minha conta</h2>

      <div className="mb-5.5 flex items-center gap-4 sm:gap-5">
        <Avatar cor={rascunho.cor} foto={rascunho.foto} />
        <div className="min-w-0">
          <span className="block text-sm font-bold text-texto-suave">Cor do avatar</span>
          <SeletorCores cor={rascunho.cor} aoEscolher={(cor) => atualizar("cor", cor)} />

          <div className="mt-3 flex flex-wrap gap-2">
            <input
              ref={entradaFoto}
              type="file"
              accept="image/*"
              onChange={escolherFoto}
              className="hidden"
            />
            <Botao className="text-sm" onClick={() => entradaFoto.current?.click()}>
              {rascunho.foto ? "Mudar foto" : "Adicionar foto"}
            </Botao>
            {rascunho.foto && (
              <Botao
                className="text-sm hover:border-perigo! hover:text-perigo!"
                onClick={() => atualizar("foto", null)}
              >
                Remover foto
              </Botao>
            )}
          </div>
          {erroFoto && <p className="mt-1.5 text-xs text-perigo">{erroFoto}</p>}
        </div>
      </div>

      <CampoTexto
        rotulo="Nome"
        maxLength={30}
        placeholder="Como quer ser chamado?"
        value={rascunho.nome}
        onChange={(evento) => atualizar("nome", evento.target.value)}
      />
      <CampoTexto
        multilinha
        rotulo="Sobre mim"
        maxLength={120}
        placeholder="Uma frase sobre você (opcional)"
        value={rascunho.bio}
        onChange={(evento) => atualizar("bio", evento.target.value)}
      />
      <CampoTexto
        rotulo="Meu filme favorito"
        maxLength={60}
        placeholder="Qual é o seu filme de todos os tempos?"
        value={rascunho.filmeFavorito}
        onChange={(evento) => atualizar("filmeFavorito", evento.target.value)}
      />

      <fieldset className="mb-4.5">
        <legend className="mb-1.5 text-sm font-bold text-texto-suave">Gêneros que eu gosto</legend>
        <div className="flex flex-wrap gap-2">
          {Object.keys(CATEGORIAS).map((genero) => (
            <Chip
              key={genero}
              ativo={rascunho.generos.includes(genero)}
              onClick={() => alternarGenero(genero)}
            >
              {genero}
            </Chip>
          ))}
        </div>
      </fieldset>

      <label className="mb-5.5 flex cursor-pointer items-center gap-2.5 text-[0.9rem] text-texto-suave">
        <input
          type="checkbox"
          checked={rascunho.mostrarSinopse}
          onChange={(evento) => atualizar("mostrarSinopse", evento.target.checked)}
          className="size-[18px] accent-destaque"
        />
        Mostrar a sinopse ao passar o mouse nos cards
      </label>

      <div className="mb-5.5 grid grid-cols-2 gap-3">
        <Resumo valor={total} rotulo="filmes na minha lista" />
        <Resumo
          valor={perfil.criadoEm ? new Date(perfil.criadoEm).toLocaleDateString("pt-BR") : "—"}
          rotulo="conta criada em"
        />
      </div>

      <div className="flex gap-2.5">
        <Botao type="submit" variante="principal" className="px-6 py-2.5">
          Salvar
        </Botao>
        <Botao className="px-5 py-2.5" onClick={aoFechar}>
          Cancelar
        </Botao>
      </div>

      <div className="mt-5.5 flex flex-wrap justify-between gap-3 border-t border-borda-suave pt-4">
        <Botao variante="texto" onClick={exportarDados}>
          Exportar meus dados
        </Botao>
        <Botao variante="texto" className="hover:text-perigo" onClick={apagarDados}>
          Apagar meus dados
        </Botao>
      </div>
    </form>
  );
}
