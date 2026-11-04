import { GENEROS_PT } from "../data/generos";

const nomesDePaises = new Intl.DisplayNames(["pt-BR"], { type: "region" });
const nomesDeIdiomas = new Intl.DisplayNames(["pt-BR"], { type: "language" });

// A OMDb devolve "N/A" quando não tem o dado. Aqui isso vira texto vazio.
export function limpar(valor) {
  return !valor || valor === "N/A" ? "" : String(valor).trim();
}

// "Action, Sci-Fi" -> ["Action", "Sci-Fi"]
export function separarLista(texto) {
  const limpo = limpar(texto);
  return limpo ? limpo.split(", ") : [];
}

export function traduzirGeneros(texto) {
  return separarLista(texto).map((genero) => GENEROS_PT[genero] ?? genero);
}

// Aceita "2017-05-03" (TMDB) e "05 May 2017" (OMDb).
export function analisarData(texto) {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

  const tempo = Date.parse(texto);
  return Number.isNaN(tempo) ? null : new Date(tempo);
}

export function formatarData(texto) {
  const data = analisarData(texto);
  return data ? data.toLocaleDateString("pt-BR") : texto;
}

// "849,165" -> "849.165 votos"
export function formatarVotos(texto) {
  const votos = limpar(texto);
  return votos ? `${votos.replace(/,/g, ".")} votos` : "";
}

// Tradução simples das frases mais comuns da OMDb.
export function traduzirPremios(texto) {
  return limpar(texto)
    .replace(/Nominated for/g, "Indicado a")
    .replace(/Another/g, "Mais")
    .replace(/Won/g, "Ganhou")
    .replace(/(\d+) wins?\b/g, (_, n) => `${n} ${n === "1" ? "vitória" : "vitórias"}`)
    .replace(/(\d+) nominations?\b/g, (_, n) => `${n} ${n === "1" ? "indicação" : "indicações"}`)
    .replace(/\btotal\b/g, "no total")
    .replace(/ (&|and) /g, " e ");
}

export function nomeDoPais(codigo) {
  try {
    return nomesDePaises.of(codigo) ?? codigo;
  } catch {
    return codigo;
  }
}

export function nomeDoIdioma(codigo) {
  try {
    const nome = nomesDeIdiomas.of(codigo) ?? codigo;
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  } catch {
    return codigo;
  }
}
