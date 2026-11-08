import Mensagem from "../ui/Mensagem";
import CardFilme from "./CardFilme";
import CardSkeleton from "./CardSkeleton";

const CLASSES_DA_GRADE = "grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] sm:gap-7";

// Mostra os filmes em grade, com efeito de carregamento, mensagem de erro e estado vazio.
export default function GradeFilmes({
  filmes,
  carregando,
  erro,
  esqueletos = 8,
  vazio = "Nenhum filme encontrado.",
}) {
  if (erro) {
    return <Mensagem titulo="Não foi possível carregar os filmes">{erro.message}</Mensagem>;
  }

  if (carregando) {
    return (
      <div className={CLASSES_DA_GRADE}>
        {Array.from({ length: esqueletos }, (_, indice) => (
          <CardSkeleton key={indice} />
        ))}
      </div>
    );
  }

  if (filmes.length === 0) return <Mensagem>{vazio}</Mensagem>;

  return (
    <div className={CLASSES_DA_GRADE}>
      {filmes.map((filme, indice) => (
        <CardFilme key={filme.id} filme={filme} indice={indice} />
      ))}
    </div>
  );
}
