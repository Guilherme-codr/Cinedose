import { useState } from "react";
import Botao from "./Botao";

export default function FormBusca({ placeholder, aoBuscar, className = "" }) {
  const [texto, setTexto] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    const termo = texto.trim();
    if (termo) aoBuscar(termo);
  }

  return (
    <form onSubmit={enviar} role="search" className={`flex gap-2 ${className}`}>
      <input
        type="text"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 rounded-[10px] border border-borda bg-superficie px-3.5 py-2 text-texto outline-none transition-colors placeholder:text-apagado focus:border-destaque"
      />
      <Botao type="submit" variante="principal">
        Buscar
      </Botao>
    </form>
  );
}
