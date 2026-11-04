// Chaves das APIs, lidas do arquivo .env.local (modelo em .env.example).
export const OMDB_KEY = (import.meta.env.VITE_OMDB_KEY ?? "").trim();
export const TMDB_KEY = (import.meta.env.VITE_TMDB_KEY ?? "").trim();
