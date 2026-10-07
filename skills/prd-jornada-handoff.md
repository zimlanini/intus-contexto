# Skill: PRD, jornada e handoff

## Quando usar
Quando entrar uma funcionalidade nova, um produto novo ou uma reformulação de fluxo existente. É a rotina central do trabalho de produto.

## Entrada esperada
Descrição do problema ou da funcionalidade. Produto envolvido. Se houver pesquisa, transcrição de usuário ou dado de uso, entram aqui.

## Contexto a ler antes
`00-contexto/matheus.md`, `00-contexto/design-system.md`, `00-contexto/tom-de-voz.md`, `01-empresa/CLAUDE.md`, o arquivo do produto, `05-templates/prd.md`, `05-templates/jornada-usuario.md`.

## Passo a passo

A ordem do processo não muda. Cada fase gera um arquivo e passa pelo Matheus antes da seguinte.

1. **Discovery.** Problema, quem sente, com que frequência, o que existe hoje como solução paliativa. Mapear concorrentes diretos e indiretos, com o que cada um resolve e o que deixa de fora. Sem essa fase, não avance.
2. **Definição.** PRD conforme `05-templates/prd.md`: contexto, problema, objetivos e não objetivos, solução proposta, métricas de sucesso. Explicitar o que fica fora do escopo com a mesma clareza do que fica dentro.
3. **Projeto.** Jornada do usuário conforme `05-templates/jornada-usuario.md`, com etapa, ação, ponto de contato, emoção, dor e oportunidade. Estados de cada tela: vazio, carregando, erro, sucesso.
4. **Protótipo.** Estrutura de telas, hierarquia, componentes reaproveitados do sistema próprio. Apontar onde um componente novo é necessário e por quê.
5. **Handoff.** Documento para engenharia: regra de negócio por campo, validação, comportamento de erro, o que é obrigatório, o que depende de backend, o que fica para uma segunda etapa.

Entre a fase 4 e a 5, refino. Nunca entregar handoff sem refino.

## Saída esperada
Um arquivo por fase em `entregas/<projeto>/` no servidor (no Mac, `../about me /OUTPUTS/<projeto>/`), nomeados `01-discovery.md`, `02-definicao.md`, `03-projeto.md`, `04-prototipo.md`, `05-handoff.md`.

Ao final de cada fase, um resumo curto do que ficou aberto e do que precisa de decisão do Matheus.

## Erros comuns
Pular discovery porque o problema parece claro. Escrever métrica de sucesso que não é medível. Handoff que descreve a tela sem descrever a regra por trás dela.
