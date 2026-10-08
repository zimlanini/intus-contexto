---
tipo: entrega
status: PENDENTE
tags: [site-intus, claude-code, instrucoes, acessibilidade]
resumo: Instruções de projeto para o Claude Code construir a landing da Intus, com restrições de contraste e verificação.
---

# Site institucional Intus

Landing única em React + Tailwind. Público inclui órgãos governamentais, então acessibilidade é requisito contratual, não preferência.

## Fonte de verdade

`DESIGN.md` na raiz define cor, tipografia, espaçamento, raio e movimento. Leia antes de escrever componente. Se precisar de um valor que não está lá, pare e pergunte. Não invente token, não use hex cru em componente.

## Restrições inegociáveis

1. **`#e33e26` não é cor de texto.** Nenhum rótulo passa WCAG AA em tamanho normal sobre esse vermelho: creme dá 3.79, preto 4.34, branco 4.21. Vermelho é superfície, contorno e tipo display acima de 24px. Para texto vermelho use `--color-text-accent-on-dark` (#e4462f) ou `--color-text-accent-on-light` (#d0321b).
2. **CTA primário é `#12151a` com rótulo creme.** CTA vermelho só com rótulo em 18.66px bold ou maior.
3. **Areia (#ddb795) sobre creme (#f5f4df) é proibido.** Razão de 1.67.
4. Nunca `transition: all`. Nunca `ease-in` em UI. Nunca entrada a partir de `scale(0)`; parta de `scale(0.96)` com `opacity: 0`.
5. Sem gradiente, glow ou sombra colorida. A identidade é chapada e geométrica.
6. Alvo de toque mínimo 44x44px. Anel de foco visível em toda superfície. Toda animação dentro de `prefers-reduced-motion`.

## Verificação

Antes de dizer que uma fase terminou, rode:

```
node scripts/check-contrast.mjs
npm run build
```

O script falha se qualquer par proibido aparecer nos tokens. Não declare fase concluída com script vermelho.

## Ordem de construção

Fundação (tokens, fontes, primitivos) antes de qualquer seção. Seções em sequência, nunca em paralelo: componentes gerados em paralelo derivam em espaçamento e nomenclatura, que é exatamente o defeito que este arquivo existe para evitar.

## Escrita

Textos em português do Brasil. Tom humano e fundamentado, nunca frio. Confiança vem do domínio técnico e da clareza, não da rigidez.

Não usar travessão. Não usar: otimizar, escalável, robusto, inovador, potencial, eficiente, personalizado, intuitivo, acelerar, simplificar, alavancar, transformador, holístico.

Onde o texto de referência tiver `[preencher]`, deixe o marcador visível no código. Não estime número, não invente caso de cliente.

## Relacionadas

- [[prompt-claude-code]]
- [[entregas/site-intus/DESIGN]]
- [[escrita]]
