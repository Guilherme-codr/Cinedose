// Envia o projeto para o GitHub e dispara o deploy no GitHub Pages.
//
// Uso:
//   npm run deploy                         -> pergunta a mensagem do commit
//   npm run deploy -- "minha mensagem"     -> usa a mensagem informada
//
// Passos: confere o lint e o build, faz "git add", "git commit" e "git push".
// O push na branch main dispara o workflow .github/workflows/deploy.yml.

import { execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";

const REPO = "https://github.com/Guilherme-codr/Cinedose";

function rodar(comando, opcoes = {}) {
  return execSync(comando, { stdio: "inherit", ...opcoes });
}

function ler(comando) {
  return execSync(comando, { encoding: "utf8" }).trim();
}

function parar(mensagem) {
  console.error(`\n✖ ${mensagem}`);
  process.exit(1);
}

async function perguntarMensagem() {
  const terminal = createInterface({ input: process.stdin, output: process.stdout });
  const resposta = await terminal.question("Mensagem do commit: ");
  terminal.close();
  return resposta.trim();
}

const temAlteracoes = ler("git status --porcelain") !== "";
const commitsPendentes = (() => {
  try {
    return Number(ler("git rev-list --count @{u}..HEAD"));
  } catch {
    return 0;
  }
})();

if (!temAlteracoes && commitsPendentes === 0) {
  console.log("Nada para enviar: não há alterações nem commits pendentes.");
  process.exit(0);
}

if (temAlteracoes) {
  console.log("\nArquivos alterados:");
  rodar("git status --short");

  const mensagem = process.argv.slice(2).join(" ").trim() || (await perguntarMensagem());
  if (!mensagem) parar("A mensagem do commit não pode ficar vazia.");

  console.log("\n▶ Conferindo o código (lint)...");
  try {
    rodar("npm run lint");
  } catch {
    parar("O lint encontrou erros. Corrija antes de fazer o deploy.");
  }

  console.log("\n▶ Testando o build...");
  try {
    rodar("npm run build");
  } catch {
    parar("O build falhou. Corrija antes de fazer o deploy.");
  }

  console.log("\n▶ Criando o commit...");
  rodar("git add -A");
  // A mensagem vai por stdin para evitar problemas com aspas e acentos no terminal.
  execSync("git commit -F -", { input: mensagem, stdio: ["pipe", "inherit", "inherit"] });
}

console.log("\n▶ Enviando para o GitHub...");
try {
  rodar("git push");
} catch {
  parar("Não foi possível enviar para o GitHub. Verifique a conexão e o login do git.");
}

console.log(`
✔ Enviado! O deploy começou no GitHub Actions.
  Acompanhe: ${REPO}/actions
  Site:      https://guilherme-codr.github.io/Cinedose/ (atualiza em 1–2 minutos)
`);
