---
tipo: entrega
status: PENDENTE
tags: [site-intus, design-system, marca, acessibilidade]
resumo: Guia visual da Intus independente de stack: cor, tipografia, espaço, movimento, acessibilidade e escrita.
---

# DESIGN.md · Intus

Guia visual da Intus. Descreve como o site parece e se comporta, sem assumir framework, biblioteca ou ferramenta de build. Serve para qualquer stack.

---

## A marca

A Intus constrói sistemas de inteligência artificial para ler grandes volumes de dados e documentos. Fala com empresas de médio e grande porte e com órgãos governamentais que acumulam informação mas não têm estrutura interna para lê-la.

O arquétipo é Mago e Mentor: transforma complexidade em clareza e caminha ao lado de quem decide, não à frente.

Por causa do público governamental, acessibilidade aqui não é preferência de time. Costuma ser cláusula de contrato.

---

## Cor

A marca tem quatro cores. A característica que define o visual é o escuro quente: o fundo não é preto puro, é levemente azulado.

| Nome | Valor | O que é |
|---|---|---|
| Preto | `#12151a` | Quase preto, levemente azulado. É o fundo padrão do site |
| Vermelho | `#e33e26` | Vermelho alaranjado. A cor de acento |
| Areia | `#ddb795` | Bege quente. Texto de apoio sobre o escuro |
| Azul | `#4160ac` | Azul médio. Cor de apoio, só sobre fundo claro |

Além delas, três valores funcionais. Não são cores de marca, existem para resolver leitura e profundidade.

| Nome | Valor | O que é |
|---|---|---|
| Branco | `#ffffff` | O neutro claro. Texto sobre o escuro e fundo das seções claras |
| Fundo elevado | `#1a1e24` | Um degrau acima do preto, para cards se separarem do fundo |
| Vermelho de texto (sobre escuro) | `#e4462f` | Vermelho clareado, legível sobre o preto |
| Vermelho de texto (sobre claro) | `#de351d` | Vermelho escurecido, legível sobre o branco |

### A regra mais importante deste arquivo

**O vermelho da marca não pode ser usado como cor de texto.**

Não é opinião. Medindo o contraste do `#e33e26` contra os rótulos possíveis: branco dá 4.21, preto dá 4.34. O mínimo para texto normal é 4.5. Nenhum passa.

Na prática isso significa três coisas:

O vermelho serve como fundo de bloco, como contorno e como tipografia grande, acima de 24px normal ou 18.7px em negrito. Nesses tamanhos o mínimo cai para 3.0 e ele passa.

Um botão vermelho com rótulo de 16px reprova, não importa a cor do rótulo. O botão principal do site é preto com texto branco.

Quando precisar de uma palavra em vermelho no meio de um parágrafo, use os vermelhos de texto criados acima, nunca o hex da marca.

### Contraste medido

| Combinação | Razão | Serve para |
|---|---|---|
| Branco sobre preto | 18.29 | qualquer tamanho |
| Preto sobre branco | 18.29 | qualquer tamanho |
| Branco sobre fundo elevado | 16.73 | qualquer tamanho |
| Areia sobre preto | 9.83 | qualquer tamanho |
| Azul sobre branco | 6.01 | qualquer tamanho |
| Vermelho de texto sobre preto | 4.54 | qualquer tamanho |
| Vermelho de texto sobre branco | 4.53 | qualquer tamanho |
| Preto sobre vermelho | 4.34 | só título grande |
| Vermelho sobre preto | 4.34 | só título grande |
| Branco sobre vermelho | 4.21 | só título grande |
| Azul sobre preto | 3.04 | só título grande |
| Areia sobre branco | 1.86 | **nada. nunca combinar** |

### Onde cada cor aparece

O fundo padrão da página é preto. O texto corrido é branco. Texto de apoio, legenda e rótulo são areia. Cards e blocos separam do fundo com o fundo elevado ou com uma linha branca a 12% de opacidade, não com sombra.

Seções claras usam branco de fundo com texto preto, para dar respiro entre blocos escuros. O azul só existe nessas seções claras. A areia só existe nas escuras.

O vermelho aparece pouco e forte: um bloco inteiro de fundo vermelho com uma frase grande, ou um detalhe de contorno. Se ele estiver em toda seção, perdeu a função.

---

## Tipografia

Duas famílias. **Space Grotesk** nos títulos, **Roboto** no texto e em qualquer coisa de interface.

Space Grotesk tem desenho geométrico e um pouco futurista, que é o que dá a personalidade. Roboto é neutra e aguenta texto longo sem cansar. Não misture: título nunca em Roboto, parágrafo nunca em Space Grotesk.

| Nome | Tamanho | Entrelinha | Espaçamento | Família |
|---|---|---|---|---|
| Display | 48px no celular, até 88px no desktop | 1.02 | apertado, -3% | Space Grotesk |
| Título 1 | 36px no celular, até 56px no desktop | 1.06 | apertado, -2% | Space Grotesk |
| Título 2 | 28px no celular, até 40px no desktop | 1.10 | apertado, -2% | Space Grotesk |
| Título 3 | 24px | 1.20 | apertado, -1% | Space Grotesk |
| Título 4 | 20px | 1.30 | normal | Space Grotesk |
| Texto grande | 18px | 1.60 | normal | Roboto |
| Texto | 16px | 1.65 | normal | Roboto |
| Texto pequeno | 14px | 1.60 | normal | Roboto |
| Legenda | 13px | 1.40 | solto, +6%, caixa alta | Roboto |

O texto corrido nunca fica abaixo de 16px. Os 14px e 13px existem só para legenda, rótulo de formulário e rodapé.

Espaçamento negativo entre letras só em título. Aplicar em texto corrido prejudica a leitura.

Uma linha de texto deve ter entre 60 e 75 caracteres. Em telas largas isso significa limitar a largura do parágrafo, não deixar esticar até a borda.

---

## Espaço

Tudo múltiplo de 4: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 pixels. Nenhuma medida fora dessa lista.

O respiro entre seções é 96px no celular e 160px no desktop. É bastante de propósito: o visual depende de espaço vazio, não de linha divisória.

O conteúdo fica dentro de uma largura máxima de 1280px, com 24px de margem lateral no celular e 48px no desktop. Grade de 12 colunas com 24px entre elas.

---

## Forma

Cantos arredondados em cinco tamanhos: 4px para detalhe pequeno, 8px para campo de formulário, 12px para botão, 20px para card, 32px para bloco grande. Pílula completa só em etiqueta e badge.

O visual é chapado. Sem gradiente, sem brilho, sem sombra colorida. A sombra existe apenas em coisas que de fato flutuam sobre a página, como menu aberto, dropdown e aviso temporário. Nesses casos, sombra preta discreta, nunca colorida.

Card em fundo escuro se separa por diferença de fundo ou por borda fina, não por sombra. Sombra em fundo escuro não aparece e só suja o resultado.

---

## Movimento

Cinco velocidades: 100ms para resposta de clique, 150ms para coisa pequena, 200ms para o padrão, 300ms para entrada em rolagem, 400ms para painel lateral.

Duas curvas apenas:

Saída forte, para tudo que entra ou sai da tela: `cubic-bezier(0.23, 1, 0.32, 1)`
Entrada e saída, para o que se move dentro da tela: `cubic-bezier(0.77, 0, 0.175, 1)`

### Regras

Nada aparece a partir do tamanho zero. Um elemento entrando começa em 96% do tamanho com opacidade zero. Nada no mundo real surge do nada, e o olho percebe isso.

Botão pressionado encolhe para 97% em 140ms. É o retorno mais barato que existe e faz a interface parecer que está ouvindo.

Elementos entrando em sequência aparecem escalonados, com 50ms entre um e outro. Mais que isso e a página parece lenta.

Animação de entrada em rolagem dispara uma vez só. Repetir a cada passagem irrita.

Efeito de passar o mouse só vale em aparelho que tem mouse. Em celular, o toque dispara o estado de hover e o elemento fica preso naquele estado.

Nunca use curva que começa devagar em elemento de interface. Ela atrasa justamente o instante em que a pessoa está olhando, e faz 200ms parecer meio segundo.

Nunca anime todas as propriedades de uma vez. Diga qual propriedade muda.

Quem ligou a preferência de menos movimento no sistema recebe a página sem deslocamento e sem mudança de tamanho. A opacidade continua, porque ela ajuda a entender o que apareceu.

---

## Acessibilidade

Alvo: WCAG 2.2 nível AA.

Todo elemento clicável tem no mínimo 44 por 44 pixels de área de toque, mesmo que o desenho pareça menor.

O anel de foco é visível em qualquer fundo. Use areia, 2px, com 2px de afastamento. Sobre o fundo preto ele dá 9.83 de contraste. Em seção clara, troque por preto.

A ordem de navegação por teclado segue a ordem visual. Se alguém navegar só com Tab, a sequência precisa fazer sentido.

Títulos não pulam nível. Depois de um Título 1 vem Título 2, não Título 3.

Todo controle sem texto visível, como botão de fechar ou ícone sozinho, precisa de nome acessível declarado.

Campo de formulário com erro precisa que o erro esteja associado a ele, não solto na página.

Cor nunca é o único portador de informação. Se algo está errado, além do vermelho precisa ter ícone ou texto.

---

## Escrita

Tom humano e fundamentado, nunca frio. A confiança vem do domínio do assunto e da clareza, não da rigidez. O papel é de mentor: explica o caminho e caminha junto.

Frase curta. Verbo concreto. Número quando o número existe. A dor descrita com as palavras de quem sente a dor.

Não usar travessão.

Evitar superlativo sem prova e promessa sem mecanismo. Quando der vontade de usar palavra inflada, descreva o que a coisa faz:

| Em vez de | Escrever |
|---|---|
| solução inovadora | o que o sistema faz, em uma frase |
| melhoria significativa | o número medido |
| plataforma escalável | o volume que ela aguenta |
| processos otimizados | a etapa que deixou de existir |

Palavras a não usar: inovador, escalável, robusto, otimizar, potencial, eficiente, personalizado, intuitivo, acelerar, simplificar, alavancar, transformador, holístico, de ponta, disruptivo.

---

## Estados

Toda coisa clicável precisa saber se comportar em sete situações: parada, com o mouse em cima, com foco de teclado, sendo pressionada, desativada, carregando e com erro.

Estado desativado reduz a opacidade e tira o cursor de mão, mas mantém contraste suficiente para ser lido.

Estado carregando não pode mudar o tamanho do botão, senão a página pula.

---

## O que nunca fazer

Vermelho da marca em texto pequeno.

Areia sobre branco.

Areia em seção clara, azul em seção escura.

Medida fora da escala de 4.

Cor escrita direto no componente em vez de referenciar a definição.

Gradiente, brilho ou sombra colorida.

Animação que começa devagar, ou que parte do tamanho zero.

Sombra para separar card em fundo escuro.

Texto corrido abaixo de 16px.

Título pulando nível.

## Relacionadas

- [[entregas/site-intus/DESIGN]]
- [[textos-procedencia]]
- [[escrita]]
