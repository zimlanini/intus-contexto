# DESIGN.md · Site institucional Intus

## Mission
Guiar a construção da landing institucional da Intus com tokens da marca, contraste verificado e regras de estado explícitas, prontas para implementação em React + Tailwind.

## Brand
- Marca: Intus (Intus Legere)
- Setor: IA aplicada a grandes volumes de dados e análise de informação
- Público: empresas de médio e grande porte, órgãos e agências governamentais que acumulam muitos dados mas não têm clareza técnica nem estrutura interna para lê-los
- Posicionamento: transformar dados complexos em decisões claras, com entrega final de qualidade
- Arquétipo: Mago e Mentor. O Mago transforma complexidade em clareza; o Mentor caminha ao lado do cliente, não à frente dele
- Pilares: Pragmatismo nos dados entregues · Agilidade nas entregas · Caráter humanizado
- Superfície: site de conteúdo institucional, uma página, orientado a contato qualificado

## Style Foundations

### Fontes
- `font.family.display` = `"Space Grotesk", sans-serif` (títulos e headlines)
- `font.family.body` = `Roboto, sans-serif` (textos, UI e design system)
- Pesos em uso: Space Grotesk 500 e 700; Roboto 400, 500 e 700
- Display deve usar `font-feature-settings: "ss01"` quando disponível e tracking negativo. Corpo nunca usa tracking negativo.

### Escala tipográfica
| Token | Tamanho | Line-height | Tracking | Família |
|---|---|---|---|---|
| `text.display` | `clamp(48px, 7vw, 88px)` | 1.02 | -0.03em | display |
| `text.h1` | `clamp(36px, 5vw, 56px)` | 1.06 | -0.02em | display |
| `text.h2` | `clamp(28px, 3.5vw, 40px)` | 1.10 | -0.02em | display |
| `text.h3` | `24px` | 1.20 | -0.01em | display |
| `text.h4` | `20px` | 1.30 | 0 | display |
| `text.body-lg` | `18px` | 1.60 | 0 | body |
| `text.body` | `16px` | 1.65 | 0 | body |
| `text.body-sm` | `14px` | 1.60 | 0 | body |
| `text.caption` | `13px` | 1.40 | 0.06em | body, uppercase |

A escala do arquivo anterior (12/13/14/16/20px) era de interface densa e não serve para landing. Corpo mínimo é 16px; 14px só em legenda, rótulo de formulário e rodapé.

### Cores brutas da marca
`brand.red=#e33e26` · `brand.ink=#12151a` · `brand.cream=#f5f4df` · `brand.blue=#4160ac` · `brand.sand=#ddb795`

### Cores semânticas
Tema base é escuro e quente: creme sobre quase-preto, com vermelho de acento.

| Token | Valor | Uso |
|---|---|---|
| `color.surface.base` | `#12151a` | fundo padrão da página |
| `color.surface.raised` | `#1a1e24` | cards e blocos acima da superfície base |
| `color.surface.inverse` | `#f5f4df` | seções claras de respiro |
| `color.surface.accent` | `#e33e26` | blocos de destaque, uso pontual |
| `color.text.primary` | `#f5f4df` | texto sobre superfície escura |
| `color.text.secondary` | `#ddb795` | apoio e legenda sobre escuro |
| `color.text.on-inverse` | `#12151a` | texto sobre superfície clara |
| `color.text.accent-on-dark` | `#e4462f` | vermelho legível sobre escuro (derivado) |
| `color.text.accent-on-light` | `#d0321b` | vermelho legível sobre claro (derivado) |
| `color.border.subtle` | `rgba(245,244,223,0.12)` | divisórias sobre escuro |
| `color.border.strong` | `rgba(245,244,223,0.28)` | contorno de botão secundário |
| `color.focus.ring` | `#ddb795` | anel de foco, 9.83:1 sobre o fundo base |

### Restrição de contraste (verificada, não estimada)
| Combinação | Razão | Veredito |
|---|---|---|
| creme sobre ink | 16.45 | passa AAA |
| ink sobre creme | 16.45 | passa AAA |
| areia sobre ink | 9.83 | passa AAA |
| azul sobre creme | 5.41 | passa AA |
| vermelho sobre ink | 4.34 | **só texto grande** |
| ink sobre vermelho | 4.34 | **só texto grande** |
| creme sobre vermelho | 3.79 | **só texto grande** |
| azul sobre ink | 3.04 | **só texto grande** |
| areia sobre creme | 1.67 | **proibido** |

Consequência prática, e esta é a regra mais importante do arquivo: **`brand.red` não é cor de texto.** Nenhum rótulo passa AA em tamanho normal sobre ele (creme 3.79, ink 4.34, branco 4.21). O vermelho é cor de superfície, contorno e display.

## Rules: Do
- O CTA primário **deve** ser preenchimento `#12151a` com rótulo creme, ou preenchimento vermelho com rótulo em no mínimo 18.66px bold.
- Vermelho em texto **deve** usar `color.text.accent-on-dark` ou `color.text.accent-on-light`, nunca o hex bruto.
- Todo componente **deve** definir default, hover, focus-visible, active, disabled, loading e error.
- Anel de foco **deve** ser visível em toda superfície: `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`.
- Área de toque **deve** ter no mínimo 44x44px.
- Corpo de texto **deve** ter medida entre 60 e 75 caracteres.
- Toda animação **deve** respeitar `prefers-reduced-motion`.

## Rules: Don't
- Não usar vermelho em texto abaixo de 24px regular ou 18.66px bold.
- Não combinar areia com creme em nenhuma hipótese.
- Não usar `transition: all`. Declarar a propriedade.
- Não animar a partir de `scale(0)`. Entrada parte de `scale(0.96)` com `opacity: 0`.
- Não usar `ease-in` em UI. Entrada e saída usam `ease-out`.
- Não usar gradiente decorativo, glow, nem sombra colorida. A identidade é chapada e geométrica.
- Não introduzir espaçamento ou tipografia fora da escala.
- Não usar hex cru em componente. Só token semântico.

## Spacing
Escala de 4pt: `space.1=4px` · `space.2=8px` · `space.3=12px` · `space.4=16px` · `space.5=24px` · `space.6=32px` · `space.7=48px` · `space.8=64px` · `space.9=96px` · `space.10=128px` · `space.11=160px`

Ritmo vertical de seção: 96px no mobile, 160px a partir de `lg`. Container máximo 1280px com gutter de 24px no mobile e 48px no desktop. Grid de 12 colunas com gap de 24px.

A escala anterior (1px, 5px, 398.38px) misturava valor medido com token. `398.38px` era largura de layout capturada, não passo de escala.

## Radius e sombra
`radius.xs=4px` · `radius.sm=8px` · `radius.md=12px` · `radius.lg=20px` · `radius.xl=32px` · `radius.full=9999px`

`shadow.raised = 0 1px 2px rgba(0,0,0,0.32), 0 8px 24px rgba(0,0,0,0.24)`

Sombra só em elemento que flutua de fato (menu, dropdown, toast). Card em superfície escura separa por `color.border.subtle`, não por sombra.

## Motion
`motion.duration.instant=100ms` · `fast=150ms` · `base=200ms` · `slow=300ms` · `drawer=400ms`

`motion.ease.out = cubic-bezier(0.23, 1, 0.32, 1)`
`motion.ease.inOut = cubic-bezier(0.77, 0, 0.175, 1)`

| Elemento | Duração | Easing |
|---|---|---|
| feedback de clique | 100 a 160ms | out |
| tooltip | 150ms | out |
| dropdown, select | 150 a 250ms | out |
| modal, drawer | 200 a 400ms | out |
| entrada em scroll | 300ms | out |

Regras: botão pressionado usa `transform: scale(0.97)`. Entrada em scroll usa stagger de 40 a 60ms entre itens, dispara uma única vez, nunca bloqueia interação. Popover escala a partir do trigger; modal permanece centrado. Hover só dentro de `@media (hover: hover) and (pointer: fine)`.

## Accessibility
- Alvo: WCAG 2.2 AA, com AAA onde a paleta permite
- Navegação completa por teclado, ordem de foco seguindo a ordem visual
- Todo controle sem rótulo visível precisa de `aria-label`
- Hierarquia de heading sem salto de nível
- `prefers-reduced-motion` remove deslocamento e escala, mantém opacidade
- Formulário com erro associado por `aria-describedby` e `aria-invalid`

Este bloco não é enfeite. O público inclui órgãos governamentais, onde conformidade com a NBR 17225 costuma ser cláusula contratual.

## Writing Tone
Humano e fundamentado, nunca frio. A confiança vem do domínio técnico e da clareza dos dados, não da rigidez. Ritmo constante e fluido. Papel de mentor: explica o caminho e caminha junto.

Fazer: frase curta, verbo concreto, número quando existir número, nome da dor com as palavras do cliente.
Evitar: superlativo sem prova, promessa sem mecanismo, vocabulário de release corporativo.

Substituições de referência:
| Em vez de | Escrever |
|---|---|
| solução inovadora | o que o sistema faz, em uma frase |
| melhoria significativa | o número medido |
| plataforma robusta e escalável | o volume que ela aguenta |
| processos otimizados | a etapa que deixou de existir |

## Component Rule Expectations
Componentes da landing: `Button` (primário, secundário, ghost), `Nav`, `Hero`, `StatBlock`, `PainCard`, `OfferCard`, `PillarCard`, `Accordion`, `ContactForm`, `Footer`.

Cada um precisa declarar anatomia, variantes, os sete estados, comportamento responsivo, tokens de espaçamento e tipografia usados, e tratamento de conteúdo longo, overflow e estado vazio.

A contagem de componentes do arquivo anterior (233 botões, 136 links) veio da listagem do marketplace do Framer e não descreve este site.

## Quality Gates
- Regra inegociável usa "deve"; recomendação usa "deveria"
- Toda regra de acessibilidade precisa ser testável na implementação
- Nenhum hex cru em componente
- Consistência do sistema tem prioridade sobre exceção visual local
