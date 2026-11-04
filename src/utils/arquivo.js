// Baixa um objeto como arquivo .json.
export function baixarJson(nomeDoArquivo, dados) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = nomeDoArquivo;
  link.click();

  URL.revokeObjectURL(url);
}
