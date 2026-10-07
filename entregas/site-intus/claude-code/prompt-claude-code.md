# Roteiro para Claude Code · Landing Intus

Diferente do prompt de bloco único, aqui o trabalho vai em fases com checkpoint. Claude Code roda comando e lê arquivo, então dá para verificar em vez de confiar.

## Antes de abrir a sessão

```
mkdir intus-site && cd intus-site
mkdir -p scripts .claude/skills
```

Copie para o projeto:

- `CLAUDE.md` na raiz
- `DESIGN.md` na raiz
- `check-contrast.mjs` em `scripts/`
- `prompt-reconstrucao.md` em `docs/` (é de onde saem os textos)

Instale a skill do Emil antes de gerar qualquer componente, para ela valer durante a construção e não só na revisão:

```
git clone https://github.com/emilkowalski/skill /tmp/emil
cp -r /tmp/emil/skills/emil-design-eng .claude/skills/
```

Confirme com `/doctor` ou listando `.claude/skills/` que ela apareceu.

---

## Fase 0 · Plano

Entre em plan mode antes de qualquer escrita.

> Leia `CLAUDE.md`, `DESIGN.md` e a seção TEXTOS de `docs/prompt-reconstrucao.md`. Não escreva código ainda. Me devolva o plano de implementação: stack, estrutura de pastas, ordem dos componentes e onde cada token do DESIGN.md vai morar. Aponte qualquer contradição que encontrar entre os três arquivos.

Só aprove o plano se ele citar a restrição do vermelho. Se não citou, não leu.

---

## Fase 1 · Fundação

> Fase 1, só fundação. Suba o projeto com Vite, React e TypeScript. Traduza os tokens do `DESIGN.md` para `tailwind.config.ts` e CSS custom properties em `src/styles/globals.css`. Carregue Space Grotesk e Roboto com `display: swap` e subset latin-ext. Nenhum componente ainda, nenhuma seção.
>
> Ao terminar rode `node scripts/check-contrast.mjs` e `npm run build`, e me mostre a saída dos dois.

Checkpoint: script verde, build passando, nenhum hex cru fora do `globals.css`.

---

## Fase 2 · Primitivos

> Fase 2, primitivos. Construa `Button` (primário, secundário, ghost), `Section`, `Container`, `Eyebrow`, `Heading` e o hook `useReveal`.
>
> `useReveal` usa IntersectionObserver com `{ once: true, rootMargin: '-80px' }`, aplica `opacity 0 → 1` e `translateY(16px) → 0` em 300ms com `cubic-bezier(0.23, 1, 0.32, 1)`, e aceita índice para stagger de 50ms. Dentro de `prefers-reduced-motion: reduce`, mantenha a opacidade e remova o deslocamento.
>
> Cada componente precisa dos sete estados do `DESIGN.md`. Depois de escrever, invoque a skill `emil-design-eng` e me devolva a tabela Before/After dela sobre o que você acabou de gerar.

Checkpoint: a tabela do Emil vem quase vazia. Se vier cheia, ele está corrigindo coisa que o `DESIGN.md` já deveria ter evitado, e o problema está no arquivo, não no código.

---

## Fase 3 · Seções

Três lotes, um por vez. Não peça os onze de uma vez.

> Lote A: Nav, Hero, Faixa de clientes.
> Lote B: Problema, Entregas, Como funciona.
> Lote C: Pilares, Números, Perguntas, Contato, Rodapé.

Em cada lote:

> Use os textos da seção TEXTOS de `docs/prompt-reconstrucao.md` exatamente como estão, sem reescrever. Mantenha os marcadores `[preencher]` visíveis. Respeite a alternância de superfície descrita no roteiro. Ao terminar o lote, rode o build e me diga quais tokens novos você precisou usar.

Checkpoint por lote: nenhum token novo apareceu. Token novo no lote C significa que a fundação estava incompleta.

---

## Fase 4 · QA

> Fase final. Gere a tabela `| Seção | Tokens usados | Estados cobertos | Risco de acessibilidade |`. Depois rode uma passada de acessibilidade: hierarquia de heading sem salto, todo controle com nome acessível, ordem de foco igual à ordem visual, alvo de toque de 44px. Liste o que falhou com o arquivo e a linha.
>
> Por fim, invoke `emil-design-eng` sobre a página inteira e me traga a tabela Before/After.

---

## O que muda em relação ao Cursor

| | Cursor | Claude Code |
|---|---|---|
| Contexto | arquivo aberto e `.cursorrules` | `CLAUDE.md` carrega sempre; `DESIGN.md` só quando lido |
| Skill do Emil | passada manual depois | roda durante a construção |
| Verificação | você confere no olho | o agente roda o script e o build |
| Formato | um bloco grande | fases com checkpoint |

Por isso o `CLAUDE.md` repete as seis restrições em vez de só apontar para o `DESIGN.md`: o que está no `CLAUDE.md` está sempre na memória, o resto depende de o agente decidir ler.

## Sobre rodar no talo

Esforço alto ajuda no plano da Fase 0 e na Fase 4, que envolvem decisão de arquitetura e varredura. Não ajuda em fidelidade de token: o que impede desvio é o arquivo e o script, não o tamanho do raciocínio. Se quiser economizar, use esforço alto nas fases 0 e 4 e normal nas 1, 2 e 3.

Uma coisa a não fazer: disparar subagentes para construir seções em paralelo. Eles não compartilham o que foi decidido em tempo de execução e voltam com espaçamento e nomenclatura divergentes, que é exatamente o defeito que este setup existe para evitar.
