// Boneco (silhueta) usado como foto de perfil. Pega a cor do texto do elemento pai.
export function IconeAvatar({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7z" />
    </svg>
  );
}

// Avatar grande, em círculo, com a cor escolhida pela pessoa.
export default function Avatar({ cor }) {
  return (
    <div
      className="flex size-21 shrink-0 items-end justify-center overflow-hidden rounded-full border-2 bg-cabecalho transition-colors"
      style={{ color: cor, borderColor: cor }}
    >
      <IconeAvatar className="size-[76%]" />
    </div>
  );
}
