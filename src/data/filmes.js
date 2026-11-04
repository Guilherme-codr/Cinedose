// Listas de filmes de cada seção. Cada item é o ID do IMDb (o "tt..." da URL do filme).
// Para adicionar um filme, basta incluir o ID na lista desejada.

export const FILMES_CARROSSEL = [
  "tt3896198", // Guardiões da Galáxia Vol. 2
  "tt1375666", // A Origem
  "tt0137523", // Clube da Luta
  "tt0816692", // Interestelar
  "tt0133093", // Matrix
  "tt0076759", // Star Wars
  "tt0120737", // O Senhor dos Anéis: A Sociedade do Anel
  "tt0109830", // Forrest Gump
];

export const FILMES_CLASSICOS = [
  "tt0111161", // Um Sonho de Liberdade
  "tt0068646", // O Poderoso Chefão
  "tt0468569", // Batman: O Cavaleiro das Trevas
  "tt0108052", // A Lista de Schindler
  "tt12590266", // Cyberpunk: Mercenários
  "tt0071562", // O Poderoso Chefão II
  "tt0050083", // 12 Homens e uma Sentença
  "tt0110912", // Pulp Fiction
  "tt0034583", // Casablanca
  "tt0114369", // Seven: Os Sete Crimes Capitais
  "tt0102926", // O Silêncio dos Inocentes
  "tt0099685", // Os Bons Companheiros
  "tt0120815", // O Resgate do Soldado Ryan
  "tt0245429", // A Viagem de Chihiro
  "tt0088763", // De Volta para o Futuro
];

// A tela "Melhores Avaliados" ordena esta lista pela nota do IMDb.
export const MELHORES_AVALIADOS = [
  "tt0111161", // Um Sonho de Liberdade
  "tt0068646", // O Poderoso Chefão
  "tt0468569", // Batman: O Cavaleiro das Trevas
  "tt0071562", // O Poderoso Chefão II
  "tt0050083", // 12 Homens e uma Sentença
  "tt0108052", // A Lista de Schindler
  "tt0167260", // O Senhor dos Anéis: O Retorno do Rei
  "tt0110912", // Pulp Fiction
  "tt0137523", // Clube da Luta
  "tt0109830", // Forrest Gump
  "tt1375666", // A Origem
  "tt0133093", // Matrix
];

// Categorias da tela Explorar. Também são os gêneros que a pessoa pode
// escolher em "Minha conta" para montar a seção "Para você".
export const CATEGORIAS = {
  "Ação": ["tt0468569", "tt1392190", "tt0172495", "tt0095016", "tt2911666", "tt0103064"],
  "Terror": ["tt0081505", "tt0078748", "tt5052448", "tt7784604", "tt6644200", "tt0070047"],
  "Comédia": ["tt0829482", "tt2278388", "tt0107048", "tt1478338", "tt1119646", "tt0080339"],
  "Ficção Científica": ["tt1375666", "tt0816692", "tt1856101", "tt2543164", "tt0133093", "tt1160419"],
  "Drama": ["tt0111161", "tt0109830", "tt6751668", "tt2582802", "tt0108052", "tt0120689"],
};

// A OMDb não tem lista de lançamentos: buscamos filmes do ano atual por estas palavras.
export const TERMOS_LANCAMENTOS = ["love", "night", "world"];
