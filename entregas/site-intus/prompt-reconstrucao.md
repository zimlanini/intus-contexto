---
tipo: entrega
status: PENDENTE
tags: [site-intus, prompt, landing, copy]
resumo: Prompt único para o Cursor construir a landing da Intus a partir do DESIGN.md, com os textos fechados.
---

# Prompt de reconstrução · Landing Intus

Cole o bloco abaixo no Cursor com `DESIGN.md` aberto no contexto do projeto.
Onde aparecer `[preencher]`, o dado real ainda não existe. Não deixe a IA inventar número.

---

## PROMPT

Você é design engineer. Construa a landing institucional da Intus em React + Tailwind, uma única página.

O arquivo `DESIGN.md` na raiz é a fonte de verdade para cor, tipografia, espaçamento, raio e movimento. Leia antes de escrever qualquer código. Não invente token. Não use hex cru em componente. Se precisar de um valor que não está no DESIGN.md, pare e pergunte.

### Restrições que não se negociam

1. `brand.red` (#e33e26) não é cor de texto. Nenhum rótulo passa WCAG AA em tamanho normal sobre ele. Use vermelho como superfície, contorno e tipo display acima de 24px. Para texto vermelho, use `color.text.accent-on-dark` (#e4462f) ou `color.text.accent-on-light` (#d0321b).
2. CTA primário é preenchimento `#12151a` com rótulo creme. O CTA vermelho só existe com rótulo em 18.66px bold ou maior.
3. Nunca `transition: all`. Nunca `ease-in`. Nunca entrada a partir de `scale(0)`.
4. Nada de gradiente, glow ou sombra colorida. A identidade é chapada e geométrica.
5. Toda animação envolvida em `@media (prefers-reduced-motion: reduce)`, mantendo opacidade e removendo deslocamento.
6. Alvo de toque mínimo 44x44px. Anel de foco visível em toda superfície.

### Movimento

Entrada em scroll: `opacity 0 → 1` e `translateY(16px) → 0`, 300ms, `cubic-bezier(0.23, 1, 0.32, 1)`, stagger de 50ms entre irmãos, dispara uma vez só via IntersectionObserver com `{ once: true, rootMargin: '-80px' }`.
Botão: `transform: scale(0.97)` no `:active`, 140ms.
Hover apenas dentro de `@media (hover: hover) and (pointer: fine)`.

### Estrutura da página

Nav fixa sem fundo, que ganha superfície `#12151a` com borda inferior sutil após 80px de scroll. Logo iL à esquerda, links no centro, CTA à direita. No mobile vira drawer com trap de foco e fechamento por Escape.

Seções, nesta ordem: Hero, Faixa de clientes, Problema, Entregas, Como funciona, Pilares, Números, Perguntas, Contato, Rodapé.

Alternância de superfície: Hero e Problema em `surface.base`; Entregas em `surface.raised`; Pilares em `surface.inverse` (fundo creme, texto ink); Contato em `surface.base` com um bloco `surface.accent` vermelho contendo apenas tipo display.

---

## TEXTOS (usar exatamente como estão)

### Nav
Links: `Problema` · `Entregas` · `Como funciona` · `Perguntas`
CTA: `Agendar diagnóstico`

### Hero
Eyebrow: `IA aplicada a grandes volumes de dados`

H1: `Sua empresa não tem falta de dados. Tem falta de leitura.`

Subtítulo: `A Intus constrói sistemas de inteligência artificial que leem seus contratos, laudos e bases internas, e devolvem o que decide: o número, o prazo, a cláusula, o risco.`

CTA primário: `Agendar diagnóstico`
CTA secundário: `Ver como funciona`

Nota de rodapé do hero: `Intus Legere: ler por dentro. É de onde vem a palavra inteligência, e é o que fazemos com o seu acervo.`

### Faixa de clientes
Rótulo: `Empresas e órgãos que já trabalham com a gente`
Logos: `[preencher]`

### Problema
Eyebrow: `O problema`

H2: `O gargalo não é o volume. É que ninguém consegue ler tudo.`

Intro: `Toda organização que opera com muito documento chega no mesmo lugar: a informação existe, está guardada, e mesmo assim a decisão sai no achismo. Três padrões se repetem.`

Card 1
Título: `O dado está lá, mas não sai de lá`
Texto: `Rastrear uma informação específica exige abrir arquivo por arquivo. O volume e a complexidade do material interno tornam a busca cara demais para valer a pena.`

Card 2
Título: `Cada área tem a sua versão`
Texto: `As informações estão espalhadas em sistemas que não conversam. O resultado é retrabalho, número divergente entre relatórios e perda de confiança na própria análise.`

Card 3
Título: `Relatório que ninguém usa`
Texto: `Grandes volumes entram todo mês e raramente viram indicador acionável. Quem decide continua sem a leitura de que precisa.`

### Entregas
Eyebrow: `O que a Intus entrega`

H2: `Leitura de acervo, não dashboard genérico.`

Intro: `Cada projeto começa pelo seu material, não por um template. O que muda de cliente para cliente é o que precisa ser lido e o que precisa sair do outro lado.`

Card 1
Título: `Leitura e gestão do acervo`
Texto: `Um sistema que interpreta os seus próprios documentos, extrai o que importa e devolve informação de valor, com a origem de cada dado rastreável até o arquivo de origem.`

Card 2
Título: `Consolidação de fontes dispersas`
Texto: `Plataformas que reúnem dados de múltiplos sistemas em um único ecossistema analítico, com padronização e visibilidade do fluxo inteiro da informação.`

Card 3
Título: `Modelos que geram indicador`
Texto: `Modelos que interpretam padrões, apontam oportunidades e produzem relatório estratégico. Decisão baseada em evidência, com o caminho da evidência visível.`

### Como funciona
Eyebrow: `Como funciona`

H2: `Três etapas. Nenhuma delas é mágica.`

Passo 01
Título: `Diagnóstico`
Texto: `Conversa de uma hora sobre o seu acervo: o que existe, onde está, quem precisa ler. Sai daqui com o escopo e a estimativa, sem compromisso.`

Passo 02
Título: `Leitura estruturada`
Texto: `Construímos o modelo em cima do seu material real, não de amostra sintética. Você acompanha a validação e aponta o que está errado enquanto ainda dá para corrigir barato.`

Passo 03
Título: `Entrega e transferência`
Texto: `O sistema entra em produção com documentação e treinamento do time. Nossa meta é que você não dependa da gente para o dia a dia.`

### Pilares
Eyebrow: `Como trabalhamos`

H2: `Três compromissos que sustentam cada entrega.`

Pilar 01
Título: `Pragmatismo nos dados entregues`
Texto: `A base de cada solução é sustentada por dado e validação concretos. Quando não temos evidência, dizemos que não temos.`

Pilar 02
Título: `Agilidade nas entregas`
Texto: `Atuamos como parceira que ajuda a decidir com dado na mesa, no prazo em que a decisão ainda importa.`

Pilar 03
Título: `Caráter humanizado`
Texto: `A natureza do trabalho é técnica, a conversa não precisa ser. Falamos com as pessoas que estão por trás da decisão.`

### Números
Eyebrow: `Em números`
H2: `[preencher]`
Itens: `[preencher: 4 métricas reais. Sem dado verificado, corte a seção inteira em vez de estimar.]`

### Perguntas
Eyebrow: `Perguntas`
H2: `O que costumam perguntar antes de começar.`

P: `Vocês precisam dos nossos dados para fazer o orçamento?`
R: `Não. O diagnóstico é feito com base na descrição do acervo e em um ou dois exemplos anonimizados. Dado real só entra depois do contrato assinado, com o tratamento acordado.`

P: `Nossos documentos são sensíveis. Como isso é tratado?`
R: `[preencher: descrever a política real de tratamento, onde o dado é processado e o que acontece com ele ao fim do projeto.]`

P: `Quanto tempo leva um projeto?`
R: `[preencher: faixa real de prazo por porte de projeto.]`

P: `Trabalham com contratação pública?`
R: `[preencher: descrever a experiência real com órgãos e o enquadramento usado.]`

P: `E se o modelo errar?`
R: `Todo modelo erra em alguma faixa. Por isso a origem de cada informação extraída fica rastreável até o documento e a página. Quem revisa consegue conferir sem refazer o trabalho.`

### Contato
Bloco display em superfície vermelha: `Traga um documento difícil. A gente lê.`

H2: `Agendar diagnóstico`
Texto: `Uma hora de conversa sobre o seu acervo. Sem apresentação institucional, sem proposta genérica.`

Formulário: `Nome`, `E-mail corporativo`, `Organização`, `O que você precisa ler` (textarea), botão `Enviar`
Nota: `Retornamos em até um dia útil.`

### Rodapé
Assinatura: `Intus Legere`
Tagline: `Transformamos dado complexo em decisão clara.`
Colunas: `Navegação` · `Contato` · `Legal`
Contato: `[preencher: e-mail, telefone, cidade]`
Legal: `Política de privacidade`, `Termos de uso`
Linha final: `© 2026 Intus Legere. Todos os direitos reservados.`

---

## ENTREGA ESPERADA

Um componente por seção, em arquivos separados, com os tokens do DESIGN.md refletidos em `tailwind.config.ts` e em CSS custom properties no `globals.css`. Space Grotesk e Roboto carregadas com `display: swap` e subset latin-ext.

Ao final, gere uma tabela `| Seção | Tokens usados | Estados cobertos | Risco de acessibilidade |` para eu revisar antes de rodar a skill do Emil em cima.

## Relacionadas

- [[entregas/site-intus/DESIGN]]
- [[textos-procedencia]]
- [[prompt-claude-code]]
