import { useEffect, useState } from "react";

// Igual ao useState, mas o valor fica salvo no navegador.
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.error(`Não foi possível salvar "${chave}".`, erro);
    }
  }, [chave, valor]);

  return [valor, setValor];
}
