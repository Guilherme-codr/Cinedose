# CineDose

Catálogo de filmes feito com **React**, **Vite** e **Tailwind CSS v4**, que consome as APIs da
OMDb (dados do filme) e do TMDB (título, sinopse e elenco em português).

## Como rodar

```bash
npm install
cp .env.example .env.local   # depois preencha as chaves
npm run dev
```

| Variável | Para que serve | Obrigatória |
|---|---|---|
| `VITE_OMDB_KEY` | Dados dos filmes (nota, ano, duração, pôster) | Sim |
| `VITE_TMDB_KEY` | Título, sinopse, elenco com foto e trailer em português | Não |

Sem a chave do TMDB o site funciona normalmente, com os textos em inglês.

## Estrutura

```
src/
├── main.jsx            Ponto de entrada
├── App.jsx             Navegação entre as telas
├── index.css           Tailwind, cores e animações do tema
├── config/             Chaves das APIs e nomes do localStorage
├── constants/          Nomes das páginas e itens do menu
├── data/               Listas de filmes, gêneros, perfil padrão e dados de contato
├── services/           Chamadas às APIs (omdb, tmdb) e montagem do modelo de filme
├── hooks/              useFilmes, useLocalStorage, useLista, usePerfil...
├── context/            Estado global: lista, perfil e janela de detalhes
├── utils/              Funções puras (datas, tradução de textos, download)
├── components/
│   ├── ui/             Peças genéricas (Botao, Modal, Chip, Tag...)
│   ├── layout/         Header e Footer
│   ├── filmes/         Card, grade, carrossel e botão da lista
│   ├── detalhes/       Janela com as informações completas do filme
│   └── conta/          Janela Minha conta
└── pages/              Início, Explorar, Lançamentos, Melhores Avaliados, Minha Lista, Resultados
```

## Como personalizar

- **Filmes de cada seção:** edite `src/data/filmes.js` (use o ID `tt...` do IMDb).
- **Contato do rodapé:** edite `src/data/contato.js`.
- **Cores:** edite o bloco `@theme` em `src/index.css`.

## Deploy (GitHub Pages)

O deploy é automático pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
a cada push na branch `main` o site é gerado e publicado em
**https://guilherme-codr.github.io/Cinedose/**.

Configuração (uma vez só, no GitHub):

1. **Settings → Pages → Build and deployment → Source:** escolha **GitHub Actions**.
2. **Settings → Secrets and variables → Actions → New repository secret:** crie
   `VITE_OMDB_KEY` e (opcional) `VITE_TMDB_KEY` com as suas chaves.
3. Rode o workflow de novo em **Actions → Deploy no GitHub Pages → Run workflow** (ou faça um push).

> As variáveis `VITE_*` são embutidas no JavaScript final, então qualquer pessoa pode vê-las
> no navegador. Use chaves gratuitas/de leitura e, se possível, restrinja o domínio no painel da API.
