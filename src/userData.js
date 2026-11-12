import { supabase } from "./services/supabase";

// Todas as funções devolvem os dados ou lançam Error com mensagem pronta para mostrar.

async function uid() {
  if (!supabase) throw new Error("Contas indisponíveis: o Supabase não está configurado.");
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Entre na sua conta primeiro.");
  return data.user.id;
}

// Desembrulha a resposta do Supabase: lança o erro ou devolve os dados.
async function resultado(consulta) {
  const { data, error } = await consulta;
  if (error) throw new Error(error.message);
  return data;
}

// FAVORITOS
export async function getFavorites() {
  await uid();
  return resultado(supabase.from("favorites").select("*").order("created_at", { ascending: false }));
}

export async function addFavorite(movie) {
  await uid();
  return resultado(
    supabase.from("favorites").insert({
      movie_id: String(movie.id),
      title: movie.title,
      poster_path: movie.poster_path,
    }),
  );
}

export async function removeFavorite(movieId) {
  await uid();
  return resultado(supabase.from("favorites").delete().eq("movie_id", String(movieId)));
}

// FOTO DE PERFIL
export async function uploadAvatar(file) {
  const id = await uid();
  const path = `${id}/avatar`;
  await resultado(supabase.storage.from("avatars").upload(path, file, { upsert: true }));
  const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl + "?t=" + Date.now();
  await resultado(supabase.from("profiles").update({ avatar_url: url, updated_at: new Date() }).eq("id", id));
  return url;
}

export async function getProfile() {
  const id = await uid();
  return resultado(supabase.from("profiles").select("avatar_url").eq("id", id).single());
}
