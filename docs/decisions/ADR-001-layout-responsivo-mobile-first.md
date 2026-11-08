# ADR-001: Versão para celular só com classes do Tailwind (breakpoint `sm`)

## Status
Aceito

## Data
2026-11-08

## Contexto
O site foi feito pensando no desktop e ficava ruim no celular:
- O header espremia logo, menu (4 itens), conta e "Criar Lista" em duas colunas.
- A grade usava cards de no mínimo 210px, então num celular de 375px cabia só um card gigante por linha.
- Os cards do carrossel tinham 210px, os espaçamentos eram grandes e a janela (`Modal`) usava `90vh`, que no celular ignora a barra do navegador.

O projeto não tem rotas, CSS próprio por componente nem biblioteca de UI: tudo é Tailwind v4 direto no JSX.

## Decisão
Adaptar o layout só com variantes do Tailwind nos componentes que já existem, usando **um único breakpoint: `sm` (640px)**.
- Abaixo de 640px valem os estilos do celular (`max-sm:` ou a classe sem prefixo).
- A partir de 640px a aparência é a mesma de antes (classes `sm:`).

Pontos principais:
- **Header:** no celular, o bloco do logo e do menu vira `max-sm:contents`, e as peças viram itens do grid. Ficam três linhas: logo + botões, menu rolável na horizontal e busca. O nome da conta fica em `sr-only` para os leitores de tela continuarem lendo.
- **Grade:** `minmax(130px,1fr)` no celular, o que dá 2 colunas em telas de 360–430px.
- **Carrossel:** cards de 150px, então parte do próximo card aparece e fica claro que dá para arrastar.
- **Modal:** `max-h-[90dvh]` no lugar de `90vh`.
- **Ficha técnica:** `minmax(min(220px,100%),1fr)`, para não estourar a largura em telas estreitas.

## Alternativas consideradas

### Menu hambúrguer (gaveta lateral)
- Prós: header mais limpo.
- Contras: precisa de estado, foco preso e um botão a mais, e esconde a navegação, que tem só 4 itens.
- Rejeitada: o menu rolável resolve sem JavaScript novo.

### Barra de navegação fixa no rodapé
- Prós: fica ao alcance do polegar.
- Contras: componente novo, ocupa espaço permanente na tela e duplica o menu do header.
- Rejeitada: é mais do que o projeto precisa agora.

### Mais breakpoints (`md`, `lg`)
- Prós: ajuste fino para tablets.
- Contras: mais classes para manter. Os grids `auto-fill` já se adaptam sozinhos entre celular e desktop.
- Rejeitada: um único breakpoint é suficiente. O header já usa `min-[1100px]` para centralizar a busca no desktop, e isso foi mantido.

## Consequências
- Nenhuma dependência nova, nenhum CSS novo e nenhum JavaScript novo. A mudança está toda nas classes.
- Ao criar ou alterar componentes, siga o mesmo padrão: classe base pensada para o celular e `sm:` para o desktop.
- O efeito de passar o mouse (sinopse sobre o card) não aparece no toque, porque o Tailwind v4 só aplica `hover:` em aparelhos com mouse (`@media (hover: hover)`). No celular, a sinopse está na janela de detalhes.
- Ainda não houve teste num aparelho real, só no modo responsivo do DevTools.
