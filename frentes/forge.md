---
tipo: projeto
status: ativo
tags: [forge, plataforma, workflow, temporal, nodes]
resumo: Forge, a plataforma carro-chefe de workflows por nodes, levantada do código-fonte em 14/09/2026.
---

# Forge

> Atualização de 2026-10-06
> Meu papel: product designer do Forge e apoio ao Daniel no que ele precisar. Envolvimento alto.
> O Forge é a plataforma carro-chefe da Intus. A visão é ter nodes customizáveis conforme a necessidade de cada cliente: extração de dados de Excel e planilhas, código de barras, documentos, e o que mais os casos de uso pedirem nos próximos meses.
> Correção: o Archetype segue existindo como a solução da Biblioteca do CFM (ver `archetype.md`). A seção "Sobre o nome Archetype" abaixo é a leitura feita do código em 14/09 e deve ser lida com essa correção.
> O resto deste arquivo foi levantado do código-fonte em 14/09/2026.

Última revisão: 2026-09-14. Levantado a partir do código-fonte em `forge-main`, não de memória de reunião.

Ressalva de fonte: a pasta lida é uma cópia sem `.git`, em `Desktop/intus_atual/___testes/forge-main`, com o submódulo `infra/` vazio. O arquivo mais recente é de 25/08/2026. Tudo abaixo descreve o estado daquela data. Antes de usar numa entrega, conferir contra o repositório de verdade.

## O que é

Plataforma SaaS multi-tenant de orquestração visual de workflows. O usuário monta um fluxo num canvas, salva, e um runtime durável executa. Nome interno anterior: Archetype Forge.

O editor não executa nada. Ele salva uma receita visual. A API transforma a receita em snapshot executável e submete ao Temporal, que percorre o grafo e delega todo I/O para Activities e Services.

## Camadas

```
Canvas no navegador
  -> App e API em Next.js
    -> snapshot normalizado do workflow
      -> Workflow do Temporal: runForgeExecution
        -> mappers determinísticos
          -> Activities locais ou remotas
            -> Services, workers e providers externos
```

A regra que sustenta o desenho: payload do Temporal carrega só referência pequena, nunca arquivo grande. Artefato pesado vai para o Cloud Storage e o node devolve a referência.

## Stack

Next.js 16 com App Router, React 19, TypeScript, Tailwind v4, shadcn/ui com Radix. Firebase 12 no client e Firebase Admin 14 no servidor. Firestore para dados, Firebase Auth para identidade, Cloud Storage para arquivo, Cloud Functions para automação de perfil. Temporal como runtime durável. Workflow Builder SDK (`@workflowbuilder/sdk` v2) como editor de grafo, sobre `@xyflow/react`, JSONForms, i18next, immer e zustand. `@openai/agents-core` e o plugin do Temporal para os nodes de agente.

Projeto Firebase e GCP: `archetype-forge-intus`.

## Design system, o que o código diz

O tema vive em `src/app/globals.css`, no modelo do Tailwind v4 com `@theme inline`. Fonte padrão Onest, mono Geist Mono, radius do tema reduzido pela metade em relação ao template inicial. Tokens semânticos do shadcn mapeados para os tokens do tema, com aliases de compatibilidade para nomes antigos de paleta (`pearl-aqua`, `cool-steel`, `slate-grey`) porque parte da UI ainda usa classe com `var(--color-...)`.

Os estilos do Workflow Builder ficam isolados no escopo `.forge-workflow-scope`, para reduzir conflito entre Tailwind, shadcn e o CSS do SDK.

Ponto de atenção para o trabalho de DS: o produto roda Onest e tokens do shadcn, enquanto o overflow-ui que sustenta o SDK do Workflow Builder roda Poppins e a escala `--ax-*`. São dois sistemas convivendo por escopo de CSS, não um só.

## Nodes

Três grupos na palette:

Padrão, herdados do Workflow Builder: `trigger`, `action`, `conditional`, `decision`, `delay`, `notification`, `ai-agent`.

Avançados: `multi-port`, `visualize`.

Documentos e ingestão, os do Forge: `forge/upload-file`, `forge/ocrmypdf`, `forge/pdf-to-pages`, `forge/paddleocr-document-parser`, `forge/save-file`, `forge/save-artifact-file`, `forge/project-files`, `forge/split-pdf`, `forge/merge-pdf`, `forge/delete-file`, `forge/ocr-google`, `forge/unlimited-ocr`.

Legal: `forge/legal-document-indexer`. Roda como Child Workflow local com `TemporalOpenAIRunner`, tem tools de Activity (`read_markdown_pages`, `inspect_pdf_pages`), valida a saída com Ajv contra um JSON Schema configurado na tela e persiste o JSON grande no Storage. É o node que sustenta a frente de EMGEA.

## Workers remotos

Cinco workers Temporal independentes em Docker, mais um container de serving, na VM `forge-workers`. Cada um com Task Queue própria:

| Worker | Task Queue | Depende de |
|---|---|---|
| `forge-pdf-worker` | `forge-pdf` | OCRmyPDF, Tesseract em português, Ghostscript, qpdf, poppler |
| `forge-pdf-pages-worker` | `forge-pdf-pages` | poppler, qpdf, sharp |
| `forge-paddleocr-worker` | `forge-paddleocr` | SDK do PaddleOCR, qpdf, poppler |
| `forge-pdf-merge-worker` | `forge-pdf-merge` | pdf-lib, qpdf |
| `forge-unlimited-ocr-worker` | `forge-unlimited-ocr` | cliente HTTP do Unlimited OCR |

O `forge-paddleocr-server` roda PaddleX com PP-StructureV3, exposto só na rede Docker.

## Multi-tenant

Organização, projeto e papel (`owner`, `admin`, `user`) em mapa `members` no documento da organização. Isolamento nas regras do Firestore e do Storage, com helpers `isSignedIn`, `isOrgMember` e `isOrgAdminOrOwner`. Estrutura: `/users/{uid}`, `/organizations/{orgId}`, `/organizations/{orgId}/projects/{projectId}`, `/invitations/{invitationId}`.

Um processo por projeto é a premissa de uso levantada para a frente de Q&A.

## O que está pronto e o que não está

Pronto o bastante para construir em cima, segundo o próprio backlog: autenticação, organização, projeto e seleção ativa; o Workflow Builder isolado em tela dedicada salvando no Firestore; a biblioteca local de nodes; a rota `workflow-runs` com validação de membership e snapshot imutável da execução; o worker do Temporal conectando e atualizando status no Firestore; a UI de teste acompanhando progresso em realtime.

Pendente, nos itens P0: a API aceita workflow vazio e cria run que conclui na hora, porque a validação de grafo ainda não está ligada ao caminho oficial do SDK. E o erro de Temporal inacessível chega genérico na UI.

Dívida registrada: vários timestamps e snapshots ainda em `any`, e o lint falha por problemas preexistentes em Firebase, Functions e alguns componentes React.

## A decisão que está na mesa

BL-045 contra BL-046, os dois de 25/08/2026. Mesmo objetivo: responder pergunta em linguagem natural sobre um processo de milhares de páginas, com citação de página verificável. Compartilham 90% do desenho. A diferença é uma peça só, e a pergunta que separa as duas é estreita: quando o agente não sabe em qual documento olhar, como ele descobre?

BL-045 assume um motor de busca dedicado no stack, com Typesense previsto. BL-046 não assume nada: busca textual em memória sobre o Markdown que o pipeline já produz, com a adoção de motor dedicado adiada até o harness de avaliação provar que faz falta. O argumento a favor: 3.000 páginas de Markdown são da ordem de 10 MB, e a busca é o caminho secundário, não o principal.

Duas decisões já tomadas e que valem para as duas: agregação numérica sai de extração estruturada exaustiva no ingest e é calculada em código, nunca pelo modelo, porque `top-k` não garante recall e não se soma pagamento sem ter achado todos. E toda afirmação factual cita documento e página, com verificação determinística de que a página existe.

Isso conecta direto com o problema declarado da frente de EMGEA Recuperação de Crédito, que é fazer a análise sem alucinar.

## Achado de benchmark, 21/08/2026

Nove PDFs reais de produção, 10.056 páginas. O `pdf-lib` extrai página sem remover o dicionário `/Resources` compartilhado, então o recorte de 6 páginas saía com 95,3% a 98,3% do tamanho do original, em 100% dos arquivos testados. `qpdf` e `pikepdf` resolvem, levando para 0,0% a 2,0%. `PyMuPDF` não resolve.

Descoberta no merge: a mesma flag que salva o split (`--remove-unreferenced-resources`) é o gargalo no merge. Desligada, a união de 8 arquivos caiu de mais de 20 minutos para 2 segundos, com saída 0,13% menor.

Recomendação registrada: `qpdf`, com poda de recursos ligada no split e desligada no merge.

## Sobre o nome Archetype

O código não tem node chamado `archetype`. O nome aparece só como identificador de infraestrutura: projeto Firebase e GCP `archetype-forge-intus`, repositório de infraestrutura `archetype-infra`, e o título antigo no README e no Makefile.

A leitura que o código sustenta: o Archetype era o nome do produto, virou Forge, e a capacidade de Document AI que o Archetype prometia (ingestão, extração de metadado, consulta) foi absorvida como o grupo de nodes de documentos e ingestão, mais o `legal-document-indexer`, e não como um node único.

PENDENTE: confirmar com o Daniel se existe algo chamado Archetype dentro do submódulo `infra/`, que está vazio nesta cópia.

## Vocabulário do produto

Termos que o código usa e que precisam valer também em proposta e interface: run, workflow run, snapshot de execução, node, Task Queue, Activity, Service, worker remoto, mapper, Child Workflow, PageSet, ParsedDocument, artefato, arquivo permanente do projeto, knowledge base, catálogo de documentos, citação verificável.

## Dono

PENDENTE: Daniel Carnelossi é o tech lead. Confirmar quem responde por cada camada.

## Fontes

`README.md`, `docs/product/overview.md`, `docs/architecture/forge-architecture.md`, `docs/architecture/workers-development-guide.md`, `docs/services/legal-document-indexer.md`, `docs/backlog/backlog.md`, `docs/backlog/initiatives/bl-045-knowledge-base-qa.md`, `docs/backlog/initiatives/bl-046-knowledge-base-qa-sem-motor-dedicado.md`, `RELATORIO-BENCHMARK-PDF.md`, `package.json`, `.firebaserc`, `.gitmodules`.

## Relacionadas

- [[archetype]]
- [[design-system]]
- [[emgea-recuperacao-credito]]
- [[decisoes]]
