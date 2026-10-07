# Documento de Projeto: Ferramenta de Cálculo do FCVS

**Data**: 16 de março de 2026
**Status**: Projeto estruturado — pronto para fase de Protótipo
**Versão**: 1.0
**Documentos base**: Discovery v1.0, Definição v1.0

---

## 1. Contexto Recebido

### 1.1 Objetivo do Projeto
Automatizar o cálculo do FCVS com engine parametrizável — precisão 99.9%, rastreabilidade completa, redução de 90% no tempo.

### 1.2 Público Principal
Roberto Cálculo — Analista FCVS Sênior que processa contratos habitacionais diariamente. Domina as regras mas é limitado pela operacionalização manual.

### 1.3 Problema ou Oportunidade
Processo manual com alto tempo (~30-60 min/contrato), risco de erro em regras com vigências sobrepostas, sem rastreabilidade e sem padronização entre analistas. Nicho sem concorrência direta.

### 1.4 Resultado Esperado
Ferramenta que operacionaliza o conhecimento do analista com transparência, confiança e rastreabilidade de ponta a ponta. Tempo por cálculo < 5 min, 99.9% de precisão, zero erros em produção.

### 1.5 Insumos das Fases Anteriores
- **Momentos da verdade**: Identificação da regra correta (Etapa 3, intensidade 5), Conferência do resultado (Etapa 5, intensidade 4), Auditoria retroativa (pós-jornada)
- **Dores críticas**: Alto tempo manual, risco de erro em vigências sobrepostas, impossibilidade de rastrear cálculos de terceiros, falta de padronização
- **JTBD prioritários**: Calcular com memória detalhada em < 5 min; Ver regra alternativa em exceções com justificativa; Recuperar memória completa para auditoria
- **Princípios de design**: Transparência radical, Confiança antes de velocidade, Exceção como funcionalidade, Clareza informacional sobre minimalismo, Rastreabilidade de ponta a ponta

---

## 2. How Might We

### 2.1 Perguntas Formuladas

| # | HMW | Origem |
|---|-----|--------|
| 1 | Como poderíamos fazer o sistema identificar automaticamente a regra e taxa corretas, mostrando por que foram selecionadas? | MdV #1, JTBD "rastrear regra e taxa", Dor "risco de erro em vigências" |
| 2 | Como poderíamos tornar visível o raciocínio completo do cálculo para que o analista confira sem refazer? | MdV #2, Princípio "transparência radical", Dor "impossibilidade de rastrear" |
| 3 | Como poderíamos permitir comparação automática com cálculos históricos para construir confiança? | MdV #2, JTBD "recuperar memória para auditoria" |
| 4 | Como poderíamos tratar exceções como funcionalidade explícita, não como erros? | Princípio "exceção como funcionalidade", Dor "dificuldade com lógica condicional" |
| 5 | Como poderíamos alertar proativamente sobre dados faltantes e inconsistências? | Risco "documentação incompleta", Comportamento "confere antes de validar" |
| 6 | Como poderíamos garantir rastreabilidade completa recuperável meses depois? | MdV #3, JTBD "recuperar memória para auditoria" |
| 7 | Como poderíamos eliminar o trabalho repetitivo de coleta de parâmetros? | Dor "alto tempo manual", Etapa 2 journey (tédio, intensidade 3) |
| 8 | Como poderíamos padronizar o processo entre analistas? | Dor "falta de padronização" |

### 2.2 Agrupamento por Tema

**Tema 1 — Confiança e Transparência** (HMW 1, 2, 3)
Origem: Momentos da Verdade #1 e #2, princípio "transparência radical"

**Tema 2 — Tratamento de Exceções** (HMW 4, 5)
Origem: Princípio "exceção como funcionalidade", edge cases como alta probabilidade

**Tema 3 — Eficiência Operacional** (HMW 7, 8)
Origem: Dores de tempo manual e falta de padronização

**Tema 4 — Rastreabilidade e Auditoria** (HMW 6)
Origem: Momento da Verdade #3, JTBD de auditoria

### 2.3 Matriz de Priorização

| HMW | Impacto Usuário | Impacto Negócio | Complexidade | Prioridade |
|-----|----------------|-----------------|-------------|------------|
| #1 Identificar regra/taxa com justificativa | Alto | Alto | Alta | 1 |
| #2 Tornar raciocínio do cálculo visível | Alto | Alto | Média | 2 |
| #3 Comparar com histórico validado | Alto | Médio | Média | 3 |
| #4 Exceções como funcionalidade | Alto | Alto | Alta | 4 |
| #5 Alertar dados faltantes/inconsistências | Alto | Alto | Média | 5 |
| #6 Rastreabilidade recuperável | Médio | Alto | Média | 6 |
| #7 Eliminar coleta repetitiva | Médio | Médio | Baixa | 7 |
| #8 Padronizar processo | Médio | Alto | Baixa | 8 |

### 2.4 HMWs Prioritárias
- **#1**: Identificar automaticamente regra e taxa com justificativa visível — é o núcleo da engine e o Momento da Verdade #1
- **#2**: Tornar o raciocínio completo do cálculo visível — constrói a transparência que gera confiança
- **#3**: Comparar com histórico validado — é o mecanismo de calibração de confiança do analista

### 2.5 Leitura da Etapa
O projeto não é apenas sobre automatizar um cálculo — é sobre construir um sistema de confiança. As 3 HMWs prioritárias formam um ciclo: engine identifica a regra (#1), mostra como calculou (#2), analista confere contra o que já sabe (#3). Se esse ciclo funcionar, a adoção acontece. Exceções e alertas são segunda camada. Eficiência e padronização são consequência natural.

---

## 3. Design Sprint

### 3.1 Foco do Sprint
Ciclo de confiança do cálculo — as 3 HMWs prioritárias que formam o núcleo do produto.

### 3.2 Desafio Central
Como entregar um cálculo automatizado do FCVS que o analista consiga conferir, entender e confiar — mesmo para contratos com condições especiais e regras de décadas atrás?

### 3.3 Objetivo do Sprint
Protótipo funcional do fluxo principal (entrada → identificação de regra → cálculo → memória detalhada → comparação com histórico) que permita validar se analistas confiam no resultado e entendem o raciocínio.

### 3.4 Hipóteses de Trabalho

| ID | Hipótese | Premissa Conectada (Discovery) |
|----|---------|-------------------------------|
| H1 | Se mostrar qual regra e por quê, analista confiará sem conferir manualmente na documentação | "Analistas confiarão se virem memória de cálculo" |
| H2 | Se comparar automaticamente com histórico validado e bater, analista aceitará sem refazer | Momento da Verdade #2 |
| H3 | Se exceções forem sinalizadas com justificativa, analista terá mais segurança que no manual | "Volume de exceções é gerenciável" |

### 3.5 Storyboard de Solução

| Elemento | Descrição |
|----------|-----------|
| **Situação inicial** | Roberto recebe 10 contratos. No processo atual, levaria ~5-8 horas. |
| **Trigger** | Roberto abre a ferramenta e insere parâmetros do primeiro contrato. |
| **Ação principal** | Sistema identifica regra e taxa, calcula, apresenta: resultado + memória passo a passo + regra com justificativa + comparação com histórico. Se exceção, destaca regra alternativa. |
| **Resultado esperado** | Roberto vê, entende, confere, valida e exporta. 2-3 min por contrato em vez de 30-60 min. |
| **Métrica de sucesso** | Aceitação sem recálculo ≥ 80% em 30 dias; tempo < 5 min; 0 erros contra histórico. |

### 3.6 Escopo do Sprint

#### Inclui
- Formulário de entrada com validação de campos obrigatórios
- Engine de cálculo para fluxo principal (contrato padrão)
- Identificação automática de regra e taxa por parâmetros/vigência
- Memória de cálculo detalhada (regra, taxa, intermediários, ajustes)
- Sinalização visual de exceções com justificativa
- Comparação com cálculo histórico (proof of concept — 1 caso)
- Exportação da memória de cálculo (PDF/Markdown)
- Alertas de dados faltantes e inconsistências

#### Não Inclui
- Processamento em lote
- Gestão de múltiplos contratos
- Histórico completo com busca
- Integração bancária ou pagamentos
- Workflow de aprovação
- Dashboard administrativo
- Módulo de auditoria completo
- Onboarding ou tutorial

### 3.7 Decisões Tomadas

| Decisão | Justificativa | Impacto |
|---------|--------------|---------|
| Foco em contrato individual, não lote | Validar confiança unitária antes de escalar | Lote fica para Fase 2 |
| Comparação histórica como proof of concept (1 caso) | Validar hipótese de confiança sem base inteira | Se validar, justifica investimento completo |
| Web básica (não CLI) | Validação requer interface visual para memória | Analistas menos técnicos participam dos testes |
| Exceções sinalizadas mas não bloqueantes | Se bloqueasse, analista voltaria ao manual | Analista decide se aceita regra alternativa |

### 3.8 Entregáveis Esperados
- Protótipo funcional: entrada → cálculo → memória → comparação
- 10+ regras de cálculo estruturadas com vigência
- 3 cenários de teste (padrão, exceção, histórico)
- Resultado de teste de usabilidade com 3-5 analistas
- Relatório de validação contra cálculos históricos

### 3.9 Critério de Pronto
- Engine calcula corretamente para ≥ 3 contratos padrão validados contra histórico
- Engine identifica e sinaliza ≥ 1 tipo de exceção
- Memória mostra regra, taxa, intermediários e justificativa
- Interface permite entrada e visualização completa
- ≥ 3 analistas testaram e deram feedback
- Tempo por cálculo medido e comparado com baseline manual

### 3.10 Riscos do Sprint

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Documentação insuficiente para 10+ regras | Média | Alto — sprint trava | Workshop antecipado; começar com 5 mais frequentes |
| PDFs ilegíveis | Desconhecida | Alto — muda arquitetura | Amostragem técnica antes de iniciar dev |
| Regras mal interpretadas | Média | Alto — destrói confiança | Validação por múltiplos analistas; testes contra histórico |
| Analistas indisponíveis para teste | Média | Médio — sem validação | Agendar antecipadamente; mínimo 3 confirmados |
| Exceções mais complexas que previsto | Alta | Médio — escopo estoura | Limitar a 1-2 tipos; documentar demais para Fase 2 |

### 3.11 Leitura da Etapa
Sprint ataca o núcleo: ciclo de confiança. Se Roberto inserir dados, ver memória transparente, conferir contra histórico e confiar — produto se prova. Foco em contrato individual e PoC de comparação mantém escopo realizável sem diluir a validação mais importante: "o analista confia?".

---

## 4. To-do List do Projeto

### 4.1 Tarefas

| # | Tarefa | Área | Dependência | Prioridade | Status |
|---|--------|------|-------------|------------|--------|
| 1 | Inventariar e estruturar 10+ regras de cálculo com vigências | Produto + Analistas | Acesso à documentação | Alta | Pendente |
| 2 | Confirmar legibilidade de PDFs com amostragem de 10-20 docs | Técnico | Acesso aos documentos | Alta | Pendente |
| 3 | Medir tempo médio por cálculo no processo manual (baseline) | Produto | Acesso a analistas | Alta | Pendente |
| 4 | Definir modelo de dados entrada/saída baseado no PRD | Técnico | Tarefa 1 | Alta | Pendente |
| 5 | Implementar engine de cálculo para fluxo principal | Desenvolvimento | Tarefas 1, 4 | Alta | Pendente |
| 6 | Implementar identificação automática de regra/taxa por parâmetros | Desenvolvimento | Tarefa 5 | Alta | Pendente |
| 7 | Implementar tratamento de exceções com sinalização e justificativa | Desenvolvimento | Tarefa 6 | Alta | Pendente |
| 8 | Desenvolver interface de entrada com validação de campos | Design + Frontend | Tarefa 4 | Alta | Pendente |
| 9 | Desenvolver tela de resultado com memória de cálculo detalhada | Design + Frontend | Tarefa 5 | Alta | Pendente |
| 10 | Implementar comparação com cálculo histórico (PoC — 1 caso) | Desenvolvimento | Tarefa 5 | Média | Pendente |
| 11 | Implementar alertas de dados faltantes e inconsistências | Desenvolvimento | Tarefa 8 | Média | Pendente |
| 12 | Implementar exportação de memória (PDF/Markdown) | Desenvolvimento | Tarefa 9 | Média | Pendente |
| 13 | Preparar 3 cenários de teste com dados reais | Produto + Analistas | Tarefas 1, 5 | Média | Pendente |
| 14 | Conduzir teste de usabilidade com 3-5 analistas | Design + Produto | Tarefas 8-12 | Alta | Pendente |
| 15 | Validar resultados da engine contra cálculos históricos | QA + Analistas | Tarefa 13 | Alta | Pendente |

### 4.2 Bloqueios e Pendências
- **Bloqueio**: Acesso à documentação completa de regras do FCVS — sem isso, tarefas 1-7 não iniciam
- **Pendência**: Confirmação de stack tecnológica do time
- **Pendência**: Definição de design system ou padrão visual

---

## 5. Leitura Consolidada do Projeto

### 5.1 Direção Central
O projeto é um sistema de confiança antes de ser uma engine de cálculo. O ciclo identificação-transparência-validação é o núcleo. Se funcionar para o contrato individual padrão, escala para lote e exceções complexas. Se não funcionar, nenhuma feature adicional salva.

### 5.2 Principais Oportunidades
- Nicho sem concorrência — público cativo que faz manualmente hoje
- Memória de cálculo como diferencial que ninguém oferece no FCVS
- Validação contra histórico como mecanismo inédito de construção de confiança
- Padronização como ganho organizacional automático

### 5.3 Principais Riscos ou Ambiguidades
- Completude e legibilidade da documentação de regras (bloqueio real)
- Complexidade das exceções pode ser maior que o estimado
- Sem baseline medido, metas de melhoria não são comprováveis
- Adoção depende de confiança — qualquer erro silencioso é destrutivo

### 5.4 Orientações para a Próxima Fase
- Prototipar o fluxo completo: entrada → regra identificada → cálculo → memória → comparação → exportação
- Priorizar transparência visual na memória de cálculo — é o que constrói confiança
- Tratar exceções como caminho alternativo visível, não como estado de erro
- Projetar para conferência: o analista quer ver o raciocínio, não apenas o número
- Interface densa em dados é aceitável — hierarquia e escaneabilidade são mais importantes que minimalismo

---

## Metadados para Pipeline

```yaml
projeto_status: completo
data_conclusao: 2026-03-16
documentos_base: [discovery_v1, definicao_v1]
foco_sprint: "Ciclo de confiança do cálculo"
desafio_central: "Cálculo automatizado do FCVS que analista confie, confira e entenda"
hmws_prioritarias:
  - "Identificar regra/taxa automaticamente com justificativa"
  - "Tornar raciocínio do cálculo visível"
  - "Comparar com histórico validado"
hipoteses_trabalho:
  - "H1: Mostrar regra + justificativa → confiança sem conferência manual"
  - "H2: Comparar com histórico → aceitação sem refazer"
  - "H3: Exceções sinalizadas → mais segurança que manual"
storyboard:
  situacao_inicial: "Roberto recebe 10 contratos, levaria 5-8h manual"
  trigger: "Insere parâmetros do contrato na ferramenta"
  acao_principal: "Sistema identifica regra, calcula, mostra memória + comparação"
  resultado_esperado: "2-3 min por contrato com confiança e rastreabilidade"
  metrica_sucesso: "Aceitação ≥ 80%, tempo < 5 min, 0 erros contra histórico"
escopo_inclui:
  - "Formulário de entrada com validação"
  - "Engine de cálculo para contrato padrão"
  - "Identificação automática de regra/taxa"
  - "Memória de cálculo detalhada"
  - "Sinalização de exceções"
  - "Comparação com histórico (PoC)"
  - "Exportação de memória"
  - "Alertas de inconsistências"
escopo_nao_inclui:
  - "Processamento em lote"
  - "Gestão de múltiplos contratos"
  - "Integração bancária"
  - "Workflow de aprovação"
entregaveis:
  - "Protótipo funcional do fluxo completo"
  - "10+ regras estruturadas"
  - "3 cenários de teste"
  - "Teste de usabilidade com 3-5 analistas"
  - "Validação contra histórico"
todo_tarefas: 15
bloqueios:
  - "Acesso à documentação de regras"
riscos:
  - "Documentação insuficiente"
  - "PDFs ilegíveis"
  - "Regras mal interpretadas"
  - "Exceções mais complexas que previsto"
decisoes_tomadas:
  - "Foco em contrato individual"
  - "Comparação histórica como PoC"
  - "Web básica, não CLI"
  - "Exceções sinalizadas, não bloqueantes"
principios_design:
  - "Transparência radical"
  - "Confiança antes de velocidade"
  - "Exceção como funcionalidade"
  - "Clareza informacional sobre minimalismo"
  - "Rastreabilidade de ponta a ponta"
persona_principal: "Roberto Cálculo"
proxima_fase: prototipo
```

---

*Documento de Projeto concluído.*
*Ele consolida o enquadramento de oportunidades (HMW), o Design Sprint e a to-do list do projeto.*
*Este documento serve como base para a próxima fase: Protótipo (specs de interface e interação).*
