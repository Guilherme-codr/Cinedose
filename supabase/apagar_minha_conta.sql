-- Rode uma vez no Supabase: SQL Editor → New query → cole este arquivo → Run.
-- Permite que a pessoa logada apague a própria conta (inclusive o e-mail em auth.users).
-- "security definer" roda com permissão de dono, mas auth.uid() garante que só a conta de quem chamou é apagada.
create or replace function public.apagar_minha_conta()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

-- Só usuários logados podem chamar.
revoke execute on function public.apagar_minha_conta() from public, anon;
grant execute on function public.apagar_minha_conta() to authenticated;
