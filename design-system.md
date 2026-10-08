---
tipo: referencia
status: ativo
tags: [design-system, overflow-ui, tokens, forge, archetype]
resumo: Base de tokens e padrões visuais do Forge e do Archetype, sobre o overflow-ui do Workflow Builder.
---

# Design system dos produtos

Vale para as superfícies do Forge e do Archetype. Registrado em 2026-09-14.

## Tokens e padrões visuais

Última revisão: 2026-09-14.

A base do design system dos produtos é o overflow-ui (`@synergycodes/overflow-ui`, MIT), que está por baixo do SDK do Workflow Builder. O SDK é uma camada fina `--wb-*` sobre os tokens `--ax-*` do overflow-ui.

Arquitetura em três camadas, gerada a partir das variáveis do Figma:

1. Primitivas: escalas de cor (cinza, vermelho, verde, laranja, azul, mais os acentos acc1 a acc7) e escala numérica em grade de 4px.
2. Semânticos: `tokens.css` com escopo em `html[data-theme='light'|'dark']`.
3. Componentes.

Tipografia: Poppins, sobrescrevível por `--wb-font-family`. Construído sobre `@xyflow/react` e Mantine.

Tema por cliente: os semânticos referenciam a escala de acento, então tema de cliente é sobrescrever a escala de acento e, quando necessário, a de neutros. Nada além disso.

Regra do projeto: todo valor sai do código-fonte do overflow-ui. Nada é inventado. Quando a origem faz algo estranho, o gerador replica o comportamento real e registra o motivo na descrição do componente.

O recorte virou plugin do Figma que gera o arquivo de forma reproduzível, no projeto `workflow-builder-design-system`, com `tools/setup.sh` antes de editar e `tools/validate.sh` antes de entregar. Arquivo Figma alvo: `zhKhVZYPOnt3LTmGJukNj8`, em `produtos_intus/archetype`.

PENDENTE: escala tipográfica e de espaçamento do sistema autoral do Matheus, separado do overflow-ui.


## Relacionadas

- [[forge]]
- [[archetype]]
- [[AGENTS]]
