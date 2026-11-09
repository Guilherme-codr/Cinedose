import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";
import { SessaoContext } from "./SessaoContext";

// Mensagens do Supabase Auth em português. Códigos não listados mostram a mensagem original.
const ERROS = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme o seu e-mail antes de entrar (veja a caixa de entrada).",
  user_already_exists: "Este e-mail já tem uma conta. Tente entrar.",
  weak_password: "A senha precisa ter pelo menos 6 caracteres.",
  validation_failed: "Confira o e-mail digitado.",
  over_email_send_rate_limit: "Muitas tentativas. Espere alguns minutos e tente de novo.",
  over_request_rate_limit: "Muitas tentativas. Espere alguns minutos e tente de novo.",
};

function traduzirErro(erro) {
  return ERROS[erro.code] ?? erro.message;
}

// Sessão do usuário (login com e-mail e senha pelo Supabase).
// Sem as chaves do Supabase, "ativo" fica false e o site segue só com o localStorage.
export default function SessaoProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null);
      setCarregando(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_evento, sessao) => {
      setUsuario(sessao?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const valor = useMemo(() => {
    // Lança Error com a mensagem já traduzida, para o formulário mostrar.
    async function entrar(email, senha) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw new Error(traduzirErro(error));
    }

    // Retorna true quando a conta ainda precisa ser confirmada pelo e-mail.
    async function cadastrar(email, senha) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { emailRedirectTo: window.location.origin + import.meta.env.BASE_URL },
      });
      if (error) throw new Error(traduzirErro(error));
      // Com a confirmação de e-mail ligada, o Supabase não dá erro para e-mail repetido: devolve identities vazio.
      if (data.user?.identities?.length === 0) throw new Error(ERROS.user_already_exists);
      return !data.session;
    }

    async function sair() {
      await supabase.auth.signOut();
    }

    // Apaga o usuário de auth.users pela função do arquivo supabase/apagar_minha_conta.sql.
    async function apagarConta() {
      const { error } = await supabase.rpc("apagar_minha_conta");
      if (error) {
        throw new Error(
          error.code === "PGRST202"
            ? "A função de apagar conta não foi instalada no Supabase (veja supabase/apagar_minha_conta.sql)."
            : "Não foi possível apagar a conta. Tente de novo.",
        );
      }
      // "local": o usuário já não existe no servidor, então só limpa a sessão deste navegador.
      await supabase.auth.signOut({ scope: "local" });
    }

    return { ativo: Boolean(supabase), usuario, carregando, entrar, cadastrar, sair, apagarConta };
  }, [usuario, carregando]);

  return <SessaoContext value={valor}>{children}</SessaoContext>;
}
