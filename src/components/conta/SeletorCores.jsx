import { CORES_AVATAR } from "../../data/perfil";

export default function SeletorCores({ cor, aoEscolher }) {
  return (
    <div role="radiogroup" aria-label="Cor do avatar" className="mt-2 flex gap-2.5">
      {CORES_AVATAR.map((opcao) => {
        const escolhida = opcao === cor;

        return (
          <button
            key={opcao}
            type="button"
            role="radio"
            aria-checked={escolhida}
            aria-label={`Cor ${opcao}`}
            onClick={() => aoEscolher(opcao)}
            className="size-7 rounded-full border-2 border-transparent hover:border-texto"
            style={{
              backgroundColor: opcao,
              boxShadow: escolhida ? `0 0 0 2px #1e293b, 0 0 0 4px ${opcao}` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
