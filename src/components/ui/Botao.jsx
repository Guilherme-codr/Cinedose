const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-3 py-1.5 transition-colors duration-300";

const VARIANTES = {
  menu: "border border-transparent text-mudo hover:border-destaque hover:text-destaque",
  secundario: "border border-borda text-texto-suave hover:border-destaque hover:text-destaque",
  principal:
    "border border-destaque bg-destaque font-bold text-cabecalho hover:bg-transparent hover:text-destaque",
  texto: "px-0 text-sm text-mudo underline hover:text-destaque",
};

const ATIVO = "border-destaque text-destaque";

// Vira <a> quando recebe "href" e <button> nos outros casos.
export default function Botao({ variante = "secundario", ativo = false, className = "", ...resto }) {
  const classes = `${BASE} ${VARIANTES[variante]} ${ativo ? ATIVO : ""} ${className}`;

  if (resto.href) {
    return <a className={classes} target="_blank" rel="noopener noreferrer" {...resto} />;
  }
  return <button type="button" className={classes} {...resto} />;
}
