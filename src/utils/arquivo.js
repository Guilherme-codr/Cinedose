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

// Lê uma imagem escolhida pela pessoa e devolve uma versão quadrada e pequena (data URL JPEG),
// para caber no localStorage sem problemas.
export function reduzirImagem(arquivo, tamanho = 256) {
  return new Promise((resolver, rejeitar) => {
    const url = URL.createObjectURL(arquivo);
    const imagem = new Image();

    imagem.onload = () => {
      const lado = Math.min(imagem.width, imagem.height);
      const canvas = document.createElement("canvas");
      canvas.width = tamanho;
      canvas.height = tamanho;
      canvas
        .getContext("2d")
        .drawImage(
          imagem,
          (imagem.width - lado) / 2,
          (imagem.height - lado) / 2,
          lado,
          lado,
          0,
          0,
          tamanho,
          tamanho,
        );
      URL.revokeObjectURL(url);
      resolver(canvas.toDataURL("image/jpeg", 0.85));
    };
    imagem.onerror = () => {
      URL.revokeObjectURL(url);
      rejeitar(new Error("Não foi possível ler a imagem."));
    };
    imagem.src = url;
  });
}
