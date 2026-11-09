import { useState } from "react";
import { useSessao } from "../../hooks/useSessao";
import Botao from "../ui/Botao";
import CampoTexto from "../ui/CampoTexto";

// Entrar ou criar conta com e-mail e senha.
export default function FormularioLogin() {
  const { entrar, cadastrar } = useSessao();
  const [modo, setModo] = useState("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  const criando = modo === "cadastrar";

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setAviso("");
    setEnviando(true);
    try {
      if (criando) {
        const precisaConfirmar = await cadastrar(email.trim(), senha);
        if (precisaConfirmar) {
          setAviso(`Conta criada! Enviamos um link de confirmação para ${email.trim()}.`);
          setModo("entrar");
        }
      } else {
        await entrar(email.trim(), senha);
      }
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setEnviando(false);
    }
  }

  function trocarModo() {
    setModo(criando ? "entrar" : "cadastrar");
    setErro("");
    setAviso("");
  }

  return (
    <form onSubmit={enviar}>
      <h2 className="mb-5 pr-10 text-2xl font-bold">{criando ? "Criar conta" : "Entrar"}</h2>

      <CampoTexto
        rotulo="E-mail"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <CampoTexto
        rotulo="Senha"
        type="password"
        required
        minLength={6}
        autoComplete={criando ? "new-password" : "current-password"}
        value={senha}
        onChange={(evento) => setSenha(evento.target.value)}
      />

      {erro && (
        <p role="alert" className="mb-4 text-sm text-perigo">
          {erro}
        </p>
      )}
      {aviso && (
        <p role="status" className="mb-4 text-sm text-sucesso">
          {aviso}
        </p>
      )}

      <Botao type="submit" variante="principal" className="w-full py-2.5" disabled={enviando}>
        {enviando ? "Aguarde..." : criando ? "Criar conta" : "Entrar"}
      </Botao>

      <p className="mt-4 text-center text-sm text-mudo">
        {criando ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
        <Botao variante="texto" onClick={trocarModo}>
          {criando ? "Entrar" : "Criar conta"}
        </Botao>
      </p>
    </form>
  );
}
