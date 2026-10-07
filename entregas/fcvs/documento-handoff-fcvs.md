# Documento de Handoff: Ferramenta de Cálculo do FCVS

**Data**: 17 de março de 2026
**Status**: Handoff completo — pronto para implementação
**Versão**: 1.0
**Pipeline completo**: Discovery → Definição → Projeto → Protótipo → Handoff
**Documentos base**: Discovery v1.0, Definição v1.0, Projeto v1.0, Protótipo v1.0

---

## 1. Resumo Executivo

### 1.1 Contexto do Projeto
Ferramenta web de automação do cálculo do FCVS (Fundo de Compensação de Variações Salariais) para contratos habitacionais do SFH. Substitui processo manual de analistas que interpretam PDFs e aplicam regras de décadas de vigência, com alto tempo (~30-60 min/contrato), risco de erro e sem rastreabilidade. Nicho sem concorrência direta — oceano azul.

### 1.2 Persona Principal
Roberto Cálculo — Analista FCVS Sênior. Domina as regras mas é limitado pela operacionalização manual. Espera transparência total do raciocínio (não caixa preta), conferência facilitada (não confiança cega) e rastreabilidade para auditoria.

### 1.3 Escopo de Implementação
7 rotas/telas cobrindo o fluxo completo do ciclo de confiança: Formulário de Entrada → Processamento → Resultado (Visão Geral + Memória de Cálculo + Comparação com Histórico + Exceção condicional) → Exportação. Contrato individual apenas — processamento em lote fica para Fase 2.

### 1.4 Decisões Estratégicas
1. **Foco em contrato individual** — Validar confiança unitária antes de escalar para lote (Projeto §3.7)
2. **Exceções sinalizadas, não bloqueantes** — Analista decide se aceita regra alternativa; sistema não impede (Projeto §3.7)
3. **Comparação histórica como PoC** — 1 caso para validar hipótese de confiança; se funcionar, expandir (Projeto §3.7)
4. **Web básica, não CLI** — Interface visual necessária para memória de cálculo; analistas menos técnicos participam dos testes (Projeto §3.7)
5. **Interface densa e organizada** — Clareza informacional sobre minimalismo; analistas trabalham com planilhas densas (Protótipo §6.3)

### 1.5 Plataforma e Tecnologia
- **Plataforma**: Web (desktop-first, responsivo)
- **Framework**: Não definido (pendência — decisão do time)
- **Design system**: A criar (tokens definidos neste handoff, sem implementação em código ainda)

---

## 2. Documentação de Produto

### 2.1 Rota: Formulário de Entrada

##### Visão Geral
Ponto de entrada do fluxo. Corresponde à Etapa 2 da jornada de Roberto (Coleta de Parâmetros). Dor: dados espalhados em múltiplos documentos. Oportunidade: formulário estruturado com alertas proativos.

##### Escopo
- Coleta de 7 parâmetros obrigatórios do contrato
- Validação inline por campo (onBlur)
- Indicador de progresso de preenchimento
- Alertas proativos de dados faltantes e inconsistências
- Submissão para cálculo com botão condicionalmente habilitado

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-01 | Inserir parâmetros do contrato | Roberto | preencher os dados do contrato em formulário estruturado | não buscar em múltiplos PDFs quais dados são necessários | RN-01, RN-02 | 7 campos obrigatórios com labels descritivos; indicador "X/Y preenchidos"; placeholders explicativos | Default, Erro, Sucesso | Labels via `for`; tab order sequencial; `aria-required` | Máscara data DD/MM/AAAA; decimal 2 casas; nº contrato alfanumérico |
| US-02 | Receber validação inline | Roberto | ver se campo está correto/incorreto ao preenchê-lo | corrigir erros antes de submeter | RN-03 | Validação onBlur; válido = borda verde + check; inválido = borda vermelha + mensagem específica | Erro, Sucesso | `aria-invalid` + `aria-describedby` para mensagem | Validação client-side por tipo |
| US-03 | Ser alertado sobre dados faltantes | Roberto | que o sistema avise proativamente sobre campos vazios | não submeter cálculo incompleto | RN-04, RN-05 | Banner âmbar no topo ao submeter incompleto; scroll automático para primeiro campo vazio | Erro | `role="alert"` + `aria-live="assertive"` | Validação no submit |
| US-04 | Ser alertado sobre inconsistências | Roberto | que o sistema detecte dados contraditórios | não calcular com parâmetros incorretos | RN-06 | Data assinatura > vigência → alerta sem bloqueio; destaca campos envolvidos | Erro | `aria-describedby` nos campos afetados | Validação cruzada |
| US-05 | Submeter para cálculo | Roberto | enviar parâmetros e iniciar cálculo | obter resultado rapidamente | RN-07 | Botão habilitado quando 7/7 válidos; transição para Processamento; dados preservados se voltar | Default, Desabilitado | Enter submete; `aria-disabled` com tooltip | POST com payload validado |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-01 | Campos obrigatórios | Sempre | Nº contrato, data assinatura, data vigência, valor original, tipo financiamento, CES, sistema amortização | PRD + Projeto §3.6 |
| RN-02 | Formato dos campos | Ao preencher | Datas DD/MM/AAAA; valores numéricos 2 decimais; nº contrato alfanumérico; CES e tipo como select | PRD |
| RN-03 | Validação inline | OnBlur | Feedback visual em < 200ms: borda + ícone + mensagem | Protótipo §2.9 |
| RN-04 | Alerta de faltantes | Submit incompleto | Banner âmbar + scroll + mensagem com nome do campo | Projeto §3.6 + HMW #5 |
| RN-05 | Campos vazios não bloqueiam navegação | Tab entre campos | Livre; bloqueio só na submissão | Decisão: exceções não bloqueantes |
| RN-06 | Validação cruzada | Ambas datas preenchidas | Data assinatura > vigência → alerta sem bloqueio | Discovery §4.3 |
| RN-07 | Habilitação do botão | 7/7 válidos | Muda de desabilitado para habilitado; tooltip explica pendência | Protótipo §2.6 |

##### Fluxo Funcional

**Principal**:
1. Roberto acessa formulário com campos vazios e placeholders
2. Preenche campos (qualquer ordem)
3. Cada campo valida onBlur — feedback imediato
4. Indicador atualiza ("5 de 7 campos")
5. Ao completar todos, botão "Calcular" habilita
6. Clica "Calcular" → transição para Processamento

**Alternativos**:
- **Preenchimento parcial**: Sai da página → dados preservados na sessão → volta com campos intactos
- **Correção pós-alerta**: Submit incompleto → alerta → corrige → alerta desaparece

**Exceções**:
- **Dados inconsistentes**: Alerta âmbar, sem bloqueio (analista pode ter razão)
- **Formato inválido**: Mensagem inline específica + campo não avança

##### Estados da Interface

| Estado | Condição | Visual | Componentes |
|--------|---------|--------|------------|
| Default | Página carregada | Campos vazios com placeholders; "0/7"; botão desabilitado | Todos |
| Erro (campo) | Campo inválido onBlur | Borda vermelha + X + mensagem | Input + mensagem |
| Erro (submit) | Submit com vazios | Banner âmbar + scroll + campos destacados | Alert + inputs |
| Sucesso (campo) | Campo válido | Borda verde + check | Input |
| Desabilitado | Campos incompletos | Botão opacidade reduzida + tooltip | Botão |

##### Critérios de Aceite por Bloco

| Bloco | Critério | Verificável |
|-------|---------|-------------|
| Formulário | 7 campos renderizam com label, placeholder e validação | Sim |
| Indicador | Atualiza em tempo real | Sim |
| Validação | Feedback em < 200ms após onBlur | Sim |
| Alertas | Banner + scroll ao submeter incompleto | Sim |
| Botão | Habilita apenas quando 7/7 válidos | Sim |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| Validação não dispara | Crítico | Campo inválido + tab | Manual + Automação |
| Submit com vazios | Crítico | Calcular sem preencher | Manual |
| Dados preservados ao voltar | Alto | Preencher 5 → sair → voltar | Manual |
| Tab order correto | Alto | Navegar inteiro por teclado | Manual |
| Validação cruzada datas | Médio | Assinatura > vigência | Manual + Automação |

##### Leitura da Rota
Porta de entrada do ciclo de confiança. Validação inline e alertas proativos reduzem retrabalho. Exceções sinalizadas mas não bloqueantes — o analista pode ter informação adicional.

---

### 2.2 Rota: Processamento

##### Visão Geral
Tela de transição com feedback visual durante o cálculo. Resolve heurística H1 (Visibilidade do status).

##### Escopo
- Stepper de progresso em 3 etapas
- Tempo estimado
- Cancelamento com preservação de dados
- Transição automática para resultado

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-06 | Ver progresso do cálculo | Roberto | acompanhar em que etapa está | saber que não travou | RN-08 | Stepper 3 etapas; ativa pulsa; concluídas com check; tempo estimado | Loading | `aria-live="polite"` | WebSocket ou polling |
| US-07 | Cancelar cálculo | Roberto | poder cancelar se errei dados | não esperar resultado incorreto | RN-09 | Botão Cancelar; volta ao formulário com dados preservados | Loading → Default | Esc como atalho | Abort controller |
| US-08 | Ver resultado automaticamente | Roberto | ser levado ao resultado ao concluir | não monitorar a tela | RN-10 | Transição automática; se erro, banner com ação | Loading → Sucesso/Erro | Foco move para resultado | Redirect pós-200; error handling |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-08 | Stepper de 3 etapas | Durante cálculo | "Identificando regra..." → "Calculando..." → "Verificando..." | Protótipo §2.4 |
| RN-09 | Cancelamento não destrutivo | Ao cancelar | Volta ao formulário com dados preservados | Protótipo §2.7 (H3) |
| RN-10 | Transição automática | Cálculo OK | Redirect para Resultado em ≤ 500ms | Protótipo §2.9 |

##### Fluxo Funcional

**Principal**: Submit → Stepper etapa 1 → etapa 2 → etapa 3 → Transição para Resultado

**Alternativos**:
- **Cancelamento**: Cancelar → Confirmação → Formulário com dados

**Exceções**:
- **Regra não encontrada**: Banner vermelho + "Verifique os dados e tente novamente" + "Voltar ao formulário"
- **Timeout (>30s)**: "Cálculo está demorando. Continuar aguardando ou cancelar?"

##### Estados da Interface

| Estado | Condição | Visual | Componentes |
|--------|---------|--------|------------|
| Loading | Calculando | Stepper animado; tempo estimado; Cancelar | Stepper, timer, botão |
| Erro | Engine falhou | Banner vermelho + ação | Alert, botão |
| Sucesso | Concluído | Transição automática | Redirect |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| Stepper não avança | Crítico | Simular cálculo | Manual + Automação |
| Cancelamento preserva dados | Alto | Cancelar e verificar formulário | Manual |
| Timeout tratado | Alto | Delay > 30s simulado | Automação (mock) |
| Erro da engine | Crítico | Parâmetros inválidos | Automação |

---

### 2.3 Rota: Resultado — Visão Geral

##### Visão Geral
Tela principal de resultado. Momento da Verdade #1 (Identificação da regra) e #2 (Conferência). Onde confiança é construída ou destruída.

##### Escopo
- Valor final em destaque (tipografia 2x)
- Card de regra aplicada com justificativa
- Badge de status
- Navegação para Memória, Comparação e Exportação
- Card de exceção condicional

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-09 | Ver valor final em destaque | Roberto | ver resultado como primeiro elemento | saber o valor sem procurar | RN-11 | Tipografia 2x, bold, topo; R$ com 2 decimais | Default | `aria-label="Valor calculado: R$ X"` | Formatação brasileira |
| US-10 | Ver regra aplicada | Roberto | ver qual regra e por quê | conferir sem abrir documentação | RN-12, RN-13 | Card: nome, vigência, taxa, link "por que esta regra?" | Default | `role="region"` + `aria-label` | Dados da engine: rule_id, name, rate |
| US-11 | Navegar entre visões | Roberto | acessar memória, comparação, exportação | conferir em profundidade | RN-14 | Tabs sempre visíveis; aba ativa com underline | Default | `role="tablist"` + `aria-selected` | Client-side routing |
| US-12 | Ver exceção como alternativa | Roberto | entender regra alternativa | decidir aceitar ou usar padrão | RN-15, RN-16 | Card amarelo; justificativa; comparação; 2 ações | Condicional | `aria-label="Exceção: regra alternativa"` | Flag exception na response |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-11 | Destaque do valor | Sempre | Tipografia 2x, bold, primeiro elemento, R$ 2 decimais | Protótipo §2.10 |
| RN-12 | Card de regra obrigatório | Sempre | Nome, vigência, taxa — visível sem scroll | HMW #1 + "Transparência radical" |
| RN-13 | Justificativa de seleção | Ao expandir | Critérios: parâmetros → vigência → regra | MdV #1 + Definição §4.5 |
| RN-14 | Navegação entre visões | Sempre | Tabs para Memória, Comparação, Exportação sem scroll | Protótipo §2.4 |
| RN-15 | Exceção como amarelo | Exception=true | Card amarelo (atenção), não vermelho (erro); "Regra alternativa disponível" | Decisão Projeto §3.7 |
| RN-16 | Ação sobre exceção | Card visível | "Aceitar alternativa" ou "Usar padrão com ressalva" | Decisão Projeto §3.7 |

##### Fluxo Funcional

**Principal**: Processamento → Resultado → Roberto vê valor + regra → Navega para Memória/Comparação → Confia ou investiga → Exporta

**Alternativos**:
- **Com exceção**: Card aparece com slide-in → Roberto decide aceitar ou usar padrão
- **Novo cálculo**: "Novo cálculo" → Formulário limpo

**Exceções**:
- **Ressalvas**: Badge amarelo "Concluído com ressalvas" + lista

##### Estados da Interface

| Estado | Condição | Visual | Componentes |
|--------|---------|--------|------------|
| Default | Sem exceção | Valor + card regra + ações | Tudo exceto card exceção |
| Exceção | Condição especial | Default + card amarelo com slide-in | Card exceção adicional |
| Ressalva | Alertas | Badge amarelo + lista | Badge, alert list |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| Valor formatado | Crítico | R$, 2 decimais, ponto milhar | Automação |
| Regra corresponde | Crítico | Caso conhecido → conferir regra | Manual + Automação |
| Card exceção aparece quando deve | Crítico | Contrato com condição especial | Automação |
| Card exceção NÃO aparece quando não deve | Alto | Contrato padrão | Automação |
| Tabs funcionam | Alto | Clicar cada aba | Manual |

---

### 2.4 Rota: Resultado — Memória de Cálculo

##### Visão Geral
Coração da proposta de valor. Princípio "Transparência radical". JTBD: "ver exatamente qual regra e taxa foram aplicadas".

##### Escopo
- Passos em accordion expandível
- Regra, taxa, vigência por passo
- Valores intermediários
- Referência a documento-fonte
- Copiar memória

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-13 | Ver memória passo a passo | Roberto | ver cada etapa com regra, taxa e intermediários | conferir sem refazer | RN-17, RN-18 | Accordion; cada passo: etapa, regra, taxa, entrada, operação, saída, fonte | Default (colapsado) | `aria-expanded`; Enter/Space toggle | Array de steps da engine |
| US-14 | Expandir/colapsar todos | Roberto | abrir ou fechar tudo de uma vez | visão geral ou análise detalhada | RN-19 | Botão toggle no topo; label alterna | Default | Botão focável; label dinâmico | Toggle state global |
| US-15 | Copiar memória | Roberto | copiar com um clique | colar em e-mail ou documento | RN-20 | Botão "Copiar"; feedback "Copiado!" por 2s | Default, Sucesso | `aria-live="polite"` | navigator.clipboard.writeText |
| US-16 | Ver documento-fonte | Roberto | saber de onde veio cada regra | rastrear até a fonte | RN-21 | Link em cada passo; tooltip com preview | Default | Link com `aria-label` | Metadado source_doc |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-17 | Estrutura do passo | Sempre | Etapa + regra + taxa + vigência + entrada + operação + saída + fonte | "Rastreabilidade ponta a ponta" + HMW #2 |
| RN-18 | Inicialmente colapsado | Ao carregar | Títulos e valores de saída visíveis; detalhes sob demanda | Protótipo §2.6 |
| RN-19 | Expandir/colapsar todos | Ao clicar | Todos simultaneamente; label alterna | Protótipo §2.9 |
| RN-20 | Formato do copiar | Ao copiar | Plain text com separadores; inclui regra, taxa, intermediários, resultado | JTBD auditoria |
| RN-21 | Documento-fonte | Em cada passo | Nome + seção/artigo; link se disponível | "Rastreabilidade ponta a ponta" |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| Passos correspondem ao cálculo | Crítico | Comparar com cálculo manual | Manual |
| Accordion abre/fecha | Alto | Click + expandir/colapsar todos | Manual + Automação |
| Copiar gera texto completo | Alto | Copiar → colar em editor | Manual |
| Fonte linkada | Médio | Click em cada referência | Manual |

---

### 2.5 Rota: Resultado — Comparação com Histórico

##### Visão Geral
Calibração de confiança. Momento da Verdade #2 e HMW #3. Se resultado bater com histórico, Roberto confia.

##### Escopo
- Layout lado a lado
- Diferenças destacadas
- Indicador "bateu/divergiu"
- Explicação de divergências
- Empty state quando sem histórico

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-17 | Comparar com histórico | Roberto | ver atual ao lado de histórico validado | calibrar confiança | RN-22, RN-23 | Lado a lado; campos alinhados; diferenças destacadas; indicador geral | Default, Vazio | `aria-label` por painel | GET /historico/{contract_id} |
| US-18 | Entender divergências | Roberto | saber por que houve diferença | decidir se é aceitável | RN-24 | Cada divergência com tooltip: "Regra atualizada em {data}" | Default (divergência) | `aria-describedby` | Metadado diff_reason |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-22 | Layout comparação | Histórico disponível | 2 colunas: "Cálculo Atual" / "Histórico Validado"; campos alinhados | Protótipo §2.4 |
| RN-23 | Indicador | Sempre | Verde "Resultado idêntico" ou amarelo "X divergências" | HMW #3 + Protótipo §2.6 |
| RN-24 | Explicação divergência | Valores diferentes | Motivo por campo (regra atualizada, taxa diferente) | Hipótese H2 |
| RN-25 | Sem histórico | Nenhum anterior | "Nenhum cálculo anterior encontrado" + "Buscar contrato similar?" | Protótipo §2.6 |

##### Estados da Interface

| Estado | Condição | Visual | Componentes |
|--------|---------|--------|------------|
| Default (match) | Valores idênticos | Lado a lado + badge verde | Comparação, badge |
| Default (diff) | Valores diferentes | Lado a lado + destaques + badge amarelo | Comparação, highlights |
| Vazio | Sem histórico | "Nenhum cálculo anterior" + CTA | Empty state |
| Loading | Buscando | Spinner no painel histórico | Loader |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| Comparação idêntica | Crítico | Caso conhecido → "idêntico" | Manual + Automação |
| Divergência detectada | Alto | Valores alterados → destaques | Automação |
| Empty state | Alto | Contrato sem histórico | Manual |

---

### 2.6 Rota: Exportação

##### Visão Geral
Materialização da rastreabilidade. Momento da Verdade #3 e JTBD auditoria. Atende persona secundária (Auditor/Compliance).

##### Escopo
- Seleção de formato (PDF/Markdown)
- Preview do documento
- Campos de metadados
- Download

##### User Stories

| ID | Título | Como | Quero | Para | Regras | Critérios de Aceite | Estados | A11y | Técnico |
|----|--------|------|-------|------|--------|--------------------|---------|----- |---------|
| US-19 | Exportar memória | Roberto | gerar documento completo | enviar à auditoria ou arquivar | RN-26, RN-27 | Modal: formato, preview, metadados, download | Default, Loading, Sucesso, Erro | Focus trap; Esc fecha | PDF server-side; Markdown client-side |
| US-20 | Preview antes de exportar | Roberto | ver como ficará o documento | garantir que está completo | RN-28 | Preview renderizado no modal com cabeçalho, regra, passos, resultado | Default | `role="document"` | Template rendering |

##### Regras de Negócio

| ID | Regra | Condição | Comportamento Esperado | Origem |
|----|-------|---------|----------------------|--------|
| RN-26 | Formatos | Sempre | PDF e Markdown; PDF default | Projeto §3.6 |
| RN-27 | Conteúdo | Sempre | Cabeçalho + regra + memória completa + resultado + exceções | JTBD auditoria |
| RN-28 | Preview obrigatório | Antes de exportar | Preview renderizado; download não disponível sem preview | "Confiança antes de velocidade" |
| RN-29 | Fallback | PDF falha | "Não foi possível gerar PDF — tente Markdown" + botão | Protótipo §2.6 |

##### QA da Rota

| Ponto | Severidade | Cenário | Método |
|-------|-----------|---------|--------|
| PDF contém memória completa | Crítico | Exportar e verificar passo a passo | Manual |
| Markdown válido | Alto | Exportar e renderizar | Manual |
| Preview = arquivo final | Alto | Comparar preview com download | Manual |
| Fallback PDF → Markdown | Médio | Simular falha PDF | Automação |

---

## 3. Specs de Interface

### 3.1 Design Tokens

| Token | Tipo | Valor | Uso |
|-------|------|-------|-----|
| `--color-success` | Cor | `#22c55e` | Campo válido, badge validado, comparação idêntica |
| `--color-warning` | Cor | `#eab308` | Card exceção, badge ressalvas, alerta inconsistência |
| `--color-error` | Cor | `#ef4444` | Campo inválido, banner erro |
| `--color-info` | Cor | `#3b82f6` | Links, botão primário, tab ativa |
| `--color-text-primary` | Cor | `#111827` | Headings, valor final, labels |
| `--color-text-secondary` | Cor | `#6b7280` | Placeholders, captions, timestamps |
| `--color-text-on-primary` | Cor | `#ffffff` | Texto sobre botão primário |
| `--color-bg-default` | Cor | `#ffffff` | Fundo de página e cards |
| `--color-bg-subtle` | Cor | `#f9fafb` | Fundo accordion expandido, empty state |
| `--color-border-default` | Cor | `#e5e7eb` | Borda inputs default, separadores |
| `--color-border-focus` | Cor | `#3b82f6` | Borda focus em inputs e botões |
| `--font-family` | Tipografia | `Inter, system-ui, sans-serif` | Todo o sistema |
| `--font-size-xs` | Tipografia | `12px` | Captions, timestamps |
| `--font-size-sm` | Tipografia | `14px` | Corpo secundário, labels, mensagens erro |
| `--font-size-base` | Tipografia | `16px` | Corpo principal, inputs, botões |
| `--font-size-lg` | Tipografia | `18px` | Subtítulos de seção |
| `--font-size-xl` | Tipografia | `24px` | Títulos de rota |
| `--font-size-2xl` | Tipografia | `32px` | Valor final do cálculo |
| `--font-weight-regular` | Tipografia | `400` | Corpo, labels |
| `--font-weight-medium` | Tipografia | `500` | Subtítulos, botões |
| `--font-weight-bold` | Tipografia | `700` | Headings, valor final |
| `--spacing-xs` | Espaçamento | `4px` | Gap ícone-texto inline |
| `--spacing-sm` | Espaçamento | `8px` | Padding badges, gap items |
| `--spacing-md` | Espaçamento | `16px` | Padding inputs/cards, gap campos |
| `--spacing-lg` | Espaçamento | `24px` | Padding seções, margem blocos |
| `--spacing-xl` | Espaçamento | `32px` | Margem entre telas, padding container |
| `--spacing-2xl` | Espaçamento | `48px` | Separador grandes seções |
| `--radius-sm` | Border radius | `4px` | Inputs, badges |
| `--radius-md` | Border radius | `8px` | Cards, modais, alerts |
| `--radius-full` | Border radius | `9999px` | Badges arredondados |
| `--shadow-sm` | Sombra | `0 1px 2px rgba(0,0,0,0.05)` | Input focus |
| `--shadow-card` | Sombra | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Cards |
| `--shadow-modal` | Sombra | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | Modal exportação |
| `--transition-fast` | Animação | `150ms ease` | Hover, focus |
| `--transition-normal` | Animação | `250ms ease-in-out` | Accordion, tabs |
| `--transition-slow` | Animação | `400ms ease-in-out` | Slide-in exceção |

### 3.2 Grid e Layout

| Propriedade | Valor | Breakpoints |
|-----------|-------|------------|
| Tipo | CSS Grid (macro) + Flexbox (componentes) | Todos |
| Colunas | 12 | Formulário: 6-col; Resultado: 8+4 |
| Gutter | 24px (`--spacing-lg`) | Todos |
| Margens laterais | 24px / 32px / auto | Mobile / Tablet / Desktop |
| Max-width container | 1200px | Desktop |

### 3.3 Responsividade

| Breakpoint | Largura | Adaptações |
|-----------|---------|-----------|
| Mobile | < 768px | Formulário 1 coluna; stepper vertical; comparação empilhada; modal fullscreen |
| Tablet | 768-1024px | Formulário 2 colunas; resultado 1 coluna com ações no topo; comparação lado a lado comprimida |
| Desktop | > 1024px | Layout padrão: formulário 2-3 colunas; resultado conteúdo + sidebar; comparação com espaço |

### 3.4 Componentes

#### Input Field
- **DS Reference**: `input/default`
- **Variantes**: default, error, success, disabled
- **Props**: label, placeholder, type (text/number/date), required, mask, errorMessage, helpText
- **Estados**: default | hover | focus (`--color-border-focus` + `--shadow-sm`) | error (`--color-error`) | success (`--color-success`) | disabled (0.5 opacity)
- **Conteúdo/Copy**: Ver seção Microcopy
- **A11y**: Role: nativo `<input>` + `<label for>` | Label: `aria-required`, `aria-invalid`, `aria-describedby` | Teclado: Tab entre campos, Enter submete | Screen reader: "{Label}: campo de texto. Obrigatório."
- **Comportamento**: onBlur → validação < 200ms → feedback visual; onChange com máscara → formata em tempo real

#### Progress Stepper
- **DS Reference**: `stepper/horizontal` — **novo** (core do produto)
- **Variantes**: horizontal (desktop), vertical (mobile)
- **Props**: steps (array {label, status}), currentStep, estimatedTime
- **Estados**: pending (cinza) | active (azul + pulsa) | completed (verde + check) | error (vermelho + X)
- **Conteúdo/Copy**: "Identificando regra...", "Calculando intermediários...", "Verificando resultado..."
- **A11y**: Role: `role="progressbar"` + `aria-valuenow/min/max` | Label: "Progresso do cálculo: etapa N de 3" | Teclado: N/A (não interativo) | Screen reader: anuncia mudança via `aria-live="polite"`
- **Comportamento**: Etapa ativa pulsa (`animation: pulse 2s infinite`); transição 250ms; ao concluir: todas verde 500ms → redirect

#### Card Informativo
- **DS Reference**: `card/info` e `card/warning`
- **Variantes**: info (borda azul), warning (borda amarela, fundo `#fffbeb`), success (borda verde)
- **Props**: title, content (ReactNode), variant, expandable, actions (array botões)
- **Estados**: default (colapsado se expandable) | expanded | hover (sombra → `--shadow-modal`)
- **A11y**: Role: `role="region"` + `aria-label` | Expandable: `aria-expanded` | Screen reader: "{Title}. {Resumo}"
- **Comportamento**: Exceção: slide-in 400ms; hover: sombra 150ms; expandable: click → reveal 250ms

#### Badge de Status
- **DS Reference**: `badge/status`
- **Variantes**: success, warning, error, info, neutral
- **Props**: label, variant, icon (opcional)
- **Estados**: estático
- **A11y**: Role: `role="status"` + `aria-label` | Ícone: `aria-hidden` (texto comunica)
- **Comportamento**: Estático — cor + ícone + texto (nunca apenas cor)

#### Accordion/Collapse
- **DS Reference**: `accordion/default`
- **Variantes**: single (um por vez), multi (vários abertos)
- **Props**: items (array {header, content, id}), mode, defaultOpen
- **Estados**: collapsed (seta →) | expanded (seta ↓) | hover (fundo `--color-bg-subtle`)
- **A11y**: Role: `role="button"` no header; `aria-expanded`; `aria-controls` | Teclado: Enter/Space toggle; ↑↓ entre items
- **Comportamento**: Toggle: slide-down 250ms; seta rotaciona 90°

#### Comparação Lado a Lado
- **DS Reference**: `comparison/side-by-side` — **novo** (diferencial do produto)
- **Variantes**: match (sem destaques), diff (campos com fundo `#fef3c7`)
- **Props**: current (object), historical (object), diffFields (array)
- **Estados**: default | loading (spinner histórico) | empty | diff
- **A11y**: Role: `role="region"` por painel + `aria-label` | Diff: `aria-label="Divergência: campo X"` | Teclado: Tab entre painéis
- **Comportamento**: Campos alinhados por row; scroll sincronizado; divergência: fundo amarelo + borda + tooltip

#### Alert Banner
- **DS Reference**: `alert/default`
- **Variantes**: info, warning, error, success
- **Props**: message, variant, action ({label, onClick}), dismissible
- **Estados**: visible | dismissed (slide-up)
- **A11y**: Role: `role="alert"` + `aria-live="assertive"` (erro) / `"polite"` (info) | Dismiss: `aria-label="Fechar alerta"`
- **Comportamento**: Aparece slide-down 250ms; auto-scroll para banner; dismissível: fade-out + slide-up

#### Tooltip Contextual
- **DS Reference**: `tooltip/default`
- **Variantes**: default (cinza escuro), info (com ícone "?")
- **Props**: content, trigger (hover/focus), position (top/bottom/left/right)
- **A11y**: Role: `role="tooltip"` + `aria-describedby` | Teclado: aparece em focus
- **Comportamento**: Hover: delay 300ms; focus: imediato; Esc fecha

#### Botão
- **DS Reference**: `button/default`
- **Variantes**: primary (azul), secondary (borda azul), ghost (sem borda)
- **Props**: label, variant, disabled, loading, icon
- **Estados**: default | hover (escurece 10%) | focus (outline 2px) | active (escurece 20%) | disabled (0.5) | loading (spinner)
- **A11y**: Role: nativo `<button>` | Disabled: `aria-disabled` + tooltip | Loading: `aria-label="Processando..."`
- **Comportamento**: Hover/focus: 150ms; click: scale 0.98 por 100ms

#### Modal de Exportação
- **DS Reference**: `modal/default`
- **Variantes**: default (centrado), fullscreen (mobile)
- **Props**: title, content, actions, onClose
- **Estados**: closed | open | loading (barra progresso)
- **A11y**: Role: `role="dialog"` + `aria-modal="true"` + `aria-labelledby` | Focus trap; Esc fecha
- **Comportamento**: Abre: fade-in overlay + scale 0.95→1 (250ms); fecha: fade-out (200ms); mobile: fullscreen slide-up

### 3.5 Micro-interações

| Elemento | Trigger | Animação | Duração | Easing |
|---------|---------|---------|---------|--------|
| Input focus | Focus | Borda → `--color-border-focus` + sombra | 150ms | ease |
| Input validação | onBlur | Borda + ícone → success/error | 150ms | ease |
| Botão hover | Hover | Background escurece 10% | 150ms | ease |
| Botão click | Mousedown | Scale 0.98 | 100ms | ease-out |
| Stepper avanço | Etapa completa | Check + próxima pulsa | 250ms | ease-in-out |
| Stepper pulso | Ativa | Opacidade 1→0.7→1 | 2000ms | ease-in-out |
| Accordion toggle | Click/Enter | Slide-down + seta 90° | 250ms | ease-in-out |
| Card exceção | Exception=true | Slide-in lateral + highlight 1x | 400ms + 2000ms | ease-in-out |
| Tab switch | Click | Crossfade + underline anima | 250ms | ease-in-out |
| Copiar memória | Click | "Copiado!" + check | 2000ms feedback | — |
| Tooltip | Hover 300ms / Focus | Fade-in | 150ms | ease |
| Alert banner | Condição | Slide-down + auto-scroll | 250ms | ease-in-out |
| Modal open | Click exportar | Overlay fade + scale 0.95→1 | 250ms | ease-in-out |
| Modal close | Esc / overlay | Overlay fade + scale 1→0.95 | 200ms | ease |

### 3.6 Microcopy

| Elemento | Texto Exato | Contexto | Regra |
|---------|------------|---------|-------|
| Label campo 1 | "Número do contrato" | Formulário | Sempre |
| Placeholder campo 1 | "Ex: 1234567890-AB" | Vazio | Desaparece ao digitar |
| Label campo 2 | "Data de assinatura" | Formulário | Sempre |
| Label campo 3 | "Data de início da vigência" | Formulário | Sempre |
| Placeholder datas | "DD/MM/AAAA" | Vazio | Máscara |
| Label campo 4 | "Valor original do financiamento" | Formulário | Sempre |
| Placeholder valor | "R$ 0,00" | Vazio | Máscara monetária |
| Label campo 5 | "Tipo de financiamento" | Formulário (select) | Sempre |
| Label campo 6 | "Coeficiente de Equiparação Salarial (CES)" | Formulário | Sempre |
| Help CES | "Selecione o CES aplicável ao contrato" | Abaixo do campo | Sempre |
| Label campo 7 | "Sistema de amortização" | Formulário (select) | Sempre |
| Indicador | "{X} de {Y} campos preenchidos" | Formulário | Tempo real |
| Botão calcular | "Calcular FCVS" | Formulário — habilitado | 7/7 válidos |
| Tooltip desabilitado | "Preencha todos os campos obrigatórios para calcular" | Hover botão disabled | Quando disabled |
| Erro vazio | "{Campo} é obrigatório" | Inline | onBlur em vazio |
| Erro formato | "Formato inválido. Use {formato}" | Inline | Formato errado |
| Erro datas | "Data de assinatura posterior à vigência — verifique os dados" | Inline/banner | Cruzada |
| Alerta faltantes | "Campos obrigatórios não preenchidos. Revise os campos destacados." | Banner âmbar | Submit incompleto |
| Stepper 1 | "Identificando regra e taxa aplicáveis..." | Processamento | Etapa 1 |
| Stepper 2 | "Calculando intermediários e ajustes..." | Processamento | Etapa 2 |
| Stepper 3 | "Verificando resultado..." | Processamento | Etapa 3 |
| Tempo estimado | "Tempo estimado: ~{N}s" | Processamento | Enquanto processa |
| Cancelar | "Cancelar cálculo" | Processamento | Enquanto processa |
| Confirmar cancelar | "Deseja cancelar o cálculo em andamento?" | Modal | Ao cancelar |
| Erro engine | "Não foi possível identificar a regra aplicável para os parâmetros informados. Verifique os dados e tente novamente." | Banner vermelho | Engine falha |
| Timeout | "O cálculo está demorando mais que o esperado. Deseja continuar aguardando ou cancelar?" | Banner âmbar | > 30s |
| Título resultado | "Resultado do Cálculo FCVS" | Heading | Sempre |
| Card regra | "Regra Aplicada" | Título card | Sempre |
| Link regra | "Por que esta regra?" | Expandível | Click revela |
| Badge validado | "Cálculo validado" | Badge verde | Sem exceção |
| Badge ressalvas | "Concluído com ressalvas" | Badge amarelo | Com alertas |
| Tab memória | "Memória de Cálculo" | Nav resultado | Sempre |
| Tab comparação | "Comparar com Histórico" | Nav resultado | Sempre |
| Tab exportar | "Exportar" | Nav resultado | Sempre |
| Expandir todos | "Expandir todos" / "Colapsar todos" | Memória — topo | Label alterna |
| Copiar | "Copiar memória" | Memória — topo | Sempre |
| Feedback copiar | "Copiado!" | Substitui por 2s | Pós-click |
| Exceção título | "Regra Alternativa Disponível" | Card amarelo | Exception=true |
| Exceção body | "O contrato apresenta {condição}. A regra alternativa {nome} pode ser aplicada." | Card | Dinâmico |
| Aceitar alternativa | "Aceitar regra alternativa" | Card exceção | Ação primária |
| Usar padrão | "Usar regra padrão com ressalva" | Card exceção | Ação secundária |
| Header atual | "Cálculo Atual" | Comparação — esquerda | Sempre |
| Header histórico | "Histórico Validado" | Comparação — direita | Com histórico |
| Match | "Resultado idêntico ao histórico validado" | Badge/texto verde | 0 divergências |
| Diff | "{N} divergência(s) encontrada(s)" | Badge amarelo | N > 0 |
| Empty comparação | "Nenhum cálculo anterior encontrado para este contrato" | Empty state | Sem histórico |
| CTA empty | "Buscar contrato similar?" | Link no empty | Opcional |
| Modal exportar | "Exportar Memória de Cálculo" | Título modal | Sempre |
| Formato PDF | "PDF" | Radio | Default |
| Formato MD | "Markdown" | Radio | Alternativa |
| Campo analista | "Analista responsável" | Modal | Pré-preenchido |
| Campo obs | "Observações (opcional)" | Textarea | Opcional |
| Download | "Gerar e baixar" | Modal — ação | Com preview |
| Sucesso export | "Documento gerado com sucesso" | Banner verde | Pós-geração |
| Erro PDF | "Não foi possível gerar o PDF. Tente o formato Markdown." | Banner + botão | Falha |
| Novo cálculo | "Novo cálculo" | Resultado — ação sec. | Sempre |

### 3.7 Dados

| Dado | Tipo | Fonte | Obrigatório | Fallback |
|------|------|-------|-------------|----------|
| Nº contrato | `string` | Input | Sim | — |
| Data assinatura | `date` | Input | Sim | — |
| Data vigência | `date` | Input | Sim | — |
| Valor original | `number` (2 dec) | Input | Sim | — |
| Tipo financiamento | `enum` | Input (select) | Sim | — |
| CES | `enum` | Input (select) | Sim | — |
| Sistema amortização | `enum` | Input (select) | Sim | — |
| Regra aplicada | `object` {id, name, rate, validity, criteria} | POST /calcular | Sim | Erro "Regra não encontrada" |
| Passos cálculo | `array` [{step_name, rule, rate, input, operation, output, source_doc}] | POST /calcular | Sim | Erro na memória |
| Resultado final | `number` (2 dec) | POST /calcular | Sim | — |
| Flag exceção | `boolean` + `object` {alternative_rule, justification} | POST /calcular | Não | Card não renderiza |
| Histórico | `object` (mesma estrutura resultado) | GET /historico/{id} | Não | Empty state |
| Diff histórico | `array` [{field, current, historical, reason}] | Computado | Não | Sem destaques |
| Progresso | `object` {current_step, total, estimated_time} | WebSocket/polling | Não | Stepper genérico |
| Documento exportado | `blob` (PDF) / `string` (MD) | POST /exportar | Sim | Fallback Markdown |

---

## 4. Handoff Técnico

### 4.1 Checklist de Implementação

| # | Item | Tipo | Prioridade | Dependência | Status |
|---|------|------|-----------|-------------|--------|
| 1 | Definir stack tecnológica | Decisão | Bloqueante | — | Pendente |
| 2 | Design tokens como variáveis CSS | Frontend | Alta | #1 | Pendente |
| 3 | Componente: Input Field | Frontend | Alta | #2 | Pendente |
| 4 | Componente: Progress Stepper (novo) | Frontend | Alta | #2 | Pendente |
| 5 | Componente: Card Informativo | Frontend | Alta | #2 | Pendente |
| 6 | Componente: Badge de Status | Frontend | Alta | #2 | Pendente |
| 7 | Componente: Accordion | Frontend | Alta | #2 | Pendente |
| 8 | Componente: Comparação Lado a Lado (novo) | Frontend | Alta | #2 | Pendente |
| 9 | Componente: Alert Banner | Frontend | Alta | #2 | Pendente |
| 10 | Componente: Tooltip | Frontend | Média | #2 | Pendente |
| 11 | Componente: Modal Exportação | Frontend | Alta | #2 | Pendente |
| 12 | Componente: Botão | Frontend | Alta | #2 | Pendente |
| 13 | Rota: Formulário de Entrada | Frontend | Alta | #3, #6, #9, #10, #12 | Pendente |
| 14 | Rota: Processamento | Frontend | Alta | #4, #12 | Pendente |
| 15 | Rota: Resultado — Visão Geral | Frontend | Alta | #5, #6, #12 | Pendente |
| 16 | Rota: Resultado — Memória | Frontend | Alta | #7, #10, #12 | Pendente |
| 17 | Rota: Resultado — Comparação | Frontend | Alta | #6, #8, #10 | Pendente |
| 18 | Rota: Resultado — Exceção | Frontend | Alta | #5, #12 | Pendente |
| 19 | Rota: Exportação | Frontend | Alta | #11, #12 | Pendente |
| 20 | Engine de cálculo (API) | Backend | Bloqueante | #22 | Pendente |
| 21 | Endpoint POST /calcular | Backend | Alta | #20 | Pendente |
| 22 | Inventário 10+ regras com vigências | Produto | Bloqueante | Documentação | Pendente |
| 23 | Endpoint GET /historico/{id} | Backend | Média | Banco históricos | Pendente |
| 24 | Endpoint POST /exportar | Backend | Média | #21 | Pendente |
| 25 | Feedback progresso (WebSocket/polling) | Integração | Média | #20, #21 | Pendente |
| 26 | Grid responsivo + breakpoints | Frontend | Alta | #2 | Pendente |
| 27 | Micro-interações e animações | Frontend | Média | #3-#12 | Pendente |
| 28 | Integração fluxo completo | Integração | Alta | #13-#19, #21 | Pendente |
| 29 | prefers-reduced-motion | Frontend | Média | #27 | Pendente |
| 30 | Testes a11y automatizados | QA | Alta | #13-#19 | Pendente |
| 31 | Testes usabilidade 5-8 analistas | QA + Produto | Alta | #28 | Pendente |
| 32 | Validar engine vs. históricos | QA | Bloqueante | #20, #22 | Pendente |

### 4.2 Dependências

**Caminhos críticos**:
1. **Frontend**: Stack → Tokens → Componentes → Rotas → Integração → Testes
2. **Backend**: Inventário regras → Engine → Endpoints → Integração → Validação histórica

**Bloqueio real**: Inventário de regras (#22) depende de acesso à documentação do FCVS e workshops com analistas sêniores. Sem isso, engine não pode ser construída. Bloqueio identificado no Discovery e reconfirmado no Projeto.

**Dependências externas**:
- Banco de históricos para Rota 5 (Comparação) — sem ele, apenas empty state
- Documentação de regras para engine — sem ela, cálculos impossíveis
- Decisão de stack para início de implementação frontend

### 4.3 Acessibilidade — Requisitos Técnicos

| Critério | Implementação | Teste | Prioridade |
|---------|--------------|-------|-----------|
| Semântica HTML | `<main>`, `<nav>`, `<section>`, `<form>`, `<table>`, h1→h3 sem pular | Inspeção DOM + axe-core | Alta |
| ARIA: formulário | `aria-required`, `aria-invalid`, `aria-describedby` | Screen reader (NVDA/VoiceOver) | Alta |
| ARIA: stepper | `role="progressbar"`, `aria-valuenow/min/max` | Screen reader | Alta |
| ARIA: resultado | `role="region"` cards; `role="tablist"` tabs; `role="status"` badges | Screen reader | Alta |
| ARIA: accordion | `aria-expanded`, `aria-controls`, `role="button"` | Screen reader + teclado | Alta |
| ARIA: modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | Screen reader | Alta |
| ARIA: alertas | `role="alert"` + `aria-live` (assertive/polite) | Screen reader auto-announce | Alta |
| Focus management | Focus → resultado pós-cálculo; focus trap modal; skip link; outline 2px | Tab through manual | Alta |
| Contraste | Textos ≥ 4.5:1 (AA); textos grandes ≥ 3:1; badges verificados | axe-core / Lighthouse | Alta |
| Teclado | Tab, Enter, Esc, Space, Arrows — todas ações sem mouse | Manual: app inteiro sem mouse | Alta |
| Redução de movimento | `@media (prefers-reduced-motion: reduce)` → desabilita pulso, slide-in, accordion transition | Ativar no OS e verificar | Média |
| Zoom 200% | Layout não quebra; sem scroll horizontal; textos legíveis | Manual: zoom browser | Média |

### 4.4 QA Consolidado

| Área | Cenário | Passo a Passo | Esperado | Severidade |
|------|---------|--------------|----------|-----------|
| Fluxo principal | Cálculo padrão completo | 7 campos → Calcular → Resultado → Memória → Comparar → Exportar PDF | Todas telas OK; valor correto; PDF baixa | Crítico |
| Fluxo principal | Cálculo com exceção | Contrato especial → Calcular → Card amarelo | Card aparece; 2 ações; aceitar funciona | Crítico |
| Precisão | Engine vs. histórico | 3 contratos conhecidos | Resultado idêntico; 0 divergências | Crítico |
| Precisão | Decimais | Verificar intermediários e final | 2 casas; arredondamento correto | Crítico |
| Precisão | Regra correta | Contrato por vigência | Regra selecionada corresponde | Crítico |
| Validação | Campo vazio | Vazio + Tab | Borda vermelha + mensagem < 200ms | Crítico |
| Validação | Formato inválido | "abc" em valor | "Formato inválido. Use R$ 0,00" | Alto |
| Validação | Datas inconsistentes | Assinatura > vigência | Alerta sem bloqueio | Alto |
| Validação | Submit incompleto | Calcular com 3/7 | Banner + scroll | Alto |
| Estados | Botão desabilitado | Hover sem preencher | Opacidade + tooltip | Alto |
| Estados | Empty state histórico | Contrato sem histórico | Mensagem + CTA | Alto |
| Estados | Erro engine | Parâmetros inválidos | Banner + "Voltar ao formulário" | Crítico |
| Estados | Timeout | Delay > 30s | Mensagem + opções | Alto |
| Estados | Fallback PDF | Simular falha | "Tente Markdown" + botão | Médio |
| Navegação | Cancelar processamento | Calcular → Cancelar → Confirmar | Formulário com dados | Alto |
| Navegação | Tabs resultado | Memória → Comparação → Exportar | Conteúdo correto; estado preservado | Alto |
| Responsivo | Mobile | Viewport 375px | 1 coluna; stepper vertical; modal fullscreen | Alto |
| Responsivo | Tablet | Viewport 768px | 2 colunas; comparação comprimida | Médio |
| A11y | Teclado | Tab, Enter, Esc em todo o app | Todas ações possíveis; foco visível | Alto |
| A11y | Screen reader | Fluxo completo NVDA/VoiceOver | Labels; estados; alertas detectados | Alto |
| A11y | Contraste | Todas combinações | ≥ 4.5:1 | Alto |
| A11y | Zoom 200% | Todas rotas | Sem scroll horizontal | Médio |
| Edge case | Campos limite | Datas 1967/1998; valor máximo; CES raro | Cálculo OK; regra correta | Alto |
| Performance | Tempo cálculo | Contrato padrão | < 5s end-to-end | Médio |
| Performance | FCP | Formulário | < 1.5s | Médio |

### 4.5 Performance

| Item | Recomendação | Impacto |
|------|-------------|---------|
| Engine | Resposta < 2s contrato padrão; cache regras/taxas frequentes | UX: > 5s gera abandono |
| Progresso | WebSocket preferível; fallback polling 1s | UX: sem feedback = "travou?" |
| Memória | Lazy render accordion — conteúdo ao expandir, não ao carregar | Performance: 10+ passos pesados |
| Comparação | Carregar histórico sob demanda (tab ativa) | Performance: evita chamada desnecessária |
| PDF | Server-side com fila; timeout 15s; fallback Markdown | UX: PDF pesado; MD instantâneo |
| Bundle | Code splitting por rota | Tempo de carga por rota |
| Cache regras | TTL 24h servidor; invalidação manual | Performance: regras mudam raramente |
| Ícones | SVG inline; 0 imagens bitmap | Performance: 0 requests imagem |
| Validação | Debounce 300ms na cruzada; onBlur imediato na simples | UX: sem validação a cada tecla |
| State | sessionStorage ou state management; invalidar em "Novo cálculo" | UX: dados preservados |

### 4.6 Pendências e Hipóteses

| Item | Tipo | Impacto se Não Resolvido | Responsável |
|------|------|--------------------------|------------|
| Stack tecnológica | Pendência | Bloqueia implementação | Tech Lead |
| Design system em código | Pendência | Componentes do zero; sem Storybook | Design + Frontend |
| Inventário de regras | Pendência (BLOQUEIO) | Engine impossível | Produto + Analistas |
| Legibilidade PDFs | Hipótese | Muda estratégia extração (OCR?) | Técnico |
| Banco de históricos | Pendência | Comparação = empty state; H2 não validável | Backend + Dados |
| Baseline manual | Pendência | "90% redução" não comprável | Produto |
| Nomenclatura CSS/componentes | Pendência | Code review inconsistente | Tech Lead |
| Contratos de API | Pendência | Frontend mocka; risco retrabalho | Backend |
| Processo QA do time | Pendência | Checklist pode não ser executável | QA Lead |
| Volume de exceções | Hipótese | Se > 30%, fluxo "condicional" insuficiente | Produto + Analistas |
| Performance engine regras complexas | Hipótese | Se > 5s, UX degrada; > 30s, timeout | Backend |

---

## 5. Rastreabilidade

| Decisão/Spec | Justificativa | Documento Origem | Seção |
|-------------|--------------|-----------------|-------|
| Engine parametrizável com regras e vigência | Abordagem validada pelo mercado RegTech; nicho FCVS sem concorrência | Discovery | §2.4 Tendências + §3.5 Diferenciação |
| Persona Roberto Cálculo — Analista FCVS Sênior | Evolução de proto-persona; domina regras, limitado por processo manual | Definição | §3 Persona Principal |
| 5 princípios de design (Transparência radical, etc.) | Derivados dos achados de Discovery e validados pela persona | Discovery | §5.6 |
| Ciclo de confiança como foco do sprint | HMWs #1, #2, #3 formam loop: identificar → mostrar → conferir | Projeto | §3.1 + §2.5 |
| Foco em contrato individual (não lote) | Validar confiança unitária antes de escalar | Projeto | §3.7 Decisões |
| Exceções como card amarelo (não vermelho) | Princípio "Exceção como funcionalidade"; amarelo = atenção, vermelho = erro | Protótipo | §6.1 Decisões + Projeto §3.7 |
| Memória de cálculo em accordion | Equilíbrio densidade/escaneabilidade; Roberto quer ver raciocínio completo | Protótipo | §2.4 + §6.1 |
| Comparação lado a lado com histórico | HMW #3; calibração de confiança via referência conhecida | Projeto | §2.4 HMW #3 + Protótipo §2.4 |
| Interface densa e organizada | Analistas trabalham com planilhas; "limpa demais" gera desconfiança | Protótipo | §6.3 Sensibilidades |
| Web básica, não CLI | Interface visual necessária para memória; analistas menos técnicos participam | Projeto | §3.7 Decisões |
| Fidelidade média-alta no protótipo | Hierarquia informacional é proposta de valor; wireframe não valida isso | Protótipo | §2.3 |
| Comparação histórica como PoC (1 caso) | Validar hipótese de confiança antes de investir em base completa | Projeto | §3.7 Decisões |
| SUS ≥ 68, taxa conclusão ≥ 80% | Metas definidas no protótipo como critério para prosseguir ao handoff | Protótipo | §4.5 + §5.6 |
| Formulário com alertas proativos | HMW #5 + Etapa 2 jornada (dor: dados espalhados) | Projeto | §2.1 HMW #5 + Definição §4.1 Etapa 2 |
| Stepper de 3 etapas no processamento | Heurística H1 (Visibilidade do status) aplicada ao cálculo | Protótipo | §2.7 |
| Exportação PDF/Markdown | JTBD "recuperar memória para auditoria" + persona secundária Auditor | Definição | §3.7 JTBD #3 + §3.12 |
| 7 campos obrigatórios no formulário | PRD + Projeto §3.6 (escopo de entrada) | Projeto | §3.6 |
| Validação inline onBlur | Protótipo §2.9 (micro-interações) — feedback imediato sem bloquear | Protótipo | §2.9 |
| Badge "Resultado idêntico" na comparação | Momento da Verdade #2 — conferência do resultado | Definição | §4.5 MdV #2 |

---

## 6. Leitura Consolidada para Handoff

### 6.1 O que Não Deve Ser Alterado

- **Exceções como card amarelo**: Decisão deliberada. Vermelho = erro. Amarelo = atenção legítima. Mudar destrói a mensagem.
- **Memória em accordion expandível**: Roberto quer ver o raciocínio completo. Não simplificar para resumo.
- **Valor final como destaque máximo** (2x, bold): Roberto precisa encontrar em < 3 segundos. Não equalizar com outros dados.
- **Comparação lado a lado** (não sequencial): Alinhamento campo a campo permite conferência rápida. Empilhar perde referência.
- **Alertas com ação sugerida**: "Data inválida" é inútil. "Data posterior à vigência — verifique" é acionável. Toda mensagem de erro deve dizer o que fazer.

### 6.2 Complexidade Escondida

- **Validação cruzada de datas**: Parece simples, mas envolve lógica de negócio (regras de período válido por tipo de contrato).
- **Card de exceção condicional**: Renderiza apenas com `exception=true`. Se flag falhar silenciosamente, analista não sabe que há exceção — teste obsessivamente.
- **Comparação com histórico**: Banco pode não existir ainda. Empty state pode ser o estado mais frequente no início. Planeje para isso.
- **Formatação monetária brasileira**: Ponto como milhar, vírgula como decimal. Inversão gera erro de ordem de grandeza.
- **Accordion com 10+ passos**: Performance e usabilidade degradam. Lazy render é obrigatório.

### 6.3 Sensibilidade de Experiência

- **Confiança é frágil**: Um erro silencioso destrói credibilidade permanentemente. Feedback honesto sobre limitações > falsa certeza.
- **Conferência é comportamento esperado**: Roberto vai conferir os primeiros 10-20 cálculos. A interface deve facilitar, não desincentivar.
- **Exceções são o caso normal**: Edge cases são alta frequência no FCVS. Se o tratamento falhar, analista volta ao manual.
- **Densidade não é problema**: Analistas trabalham com planilhas densas. Interface limpa demais gera desconfiança. Hierarquia resolve sem esconder.
- **Exportação é produto para auditoria**: Para o Auditor/Compliance, o PDF exportado é o produto. Qualidade impacta adoção organizacional.

### 6.4 Prioridade de QA

1. **Precisão da engine vs. históricos** (Crítico) — qualquer erro invalida o produto
2. **Fluxo principal end-to-end** (Crítico) — entrada → resultado → exportação
3. **Exceção renderiza quando deve / não renderiza quando não deve** (Crítico)
4. **Acessibilidade por teclado** (Alto) — analistas podem ser power users de teclado
5. **Mensagens de erro acionáveis** (Alto) — mensagens vagas destroem confiança
6. **Formatação monetária** (Alto) — inversão ponto/vírgula = erro de 1000x

### 6.5 Métricas de Sucesso Pós-Lançamento

| Métrica | Meta | Como Medir | Baseline (Discovery) |
|---------|------|-----------|----------------------|
| Taxa de conclusão de tarefa | ≥ 80% | Analytics: % que completa fluxo entrada→exportação sem abandonar | N/D — a coletar |
| SUS Score | ≥ 68 (mínimo), ≥ 75 (ideal) | Questionário SUS trimestral com analistas | N/D — sem ferramenta atual |
| Tempo por cálculo | < 5 min | Analytics: timestamp submit→resultado | ~30-60 min manual (estimativa, não medido) |
| Taxa de erro | 0 erros vs. histórico em produção | Logs: divergências engine vs. banco validado | N/D — a coletar |
| Taxa de aceitação sem recálculo | ≥ 80% em 30 dias | Survey + analytics: % que não refaz manualmente | 0% (tudo é manual hoje) |
| NPS | ≥ 40 | Survey trimestral | N/D |
| Taxa de uso da comparação histórica | > 50% dos cálculos | Analytics: % que acessa tab "Comparar" | N/A |
| Taxa de exportação | > 30% dos cálculos | Analytics: % que exporta PDF/MD | N/A |
| Índice de confiança | ≥ 4/5 | Pergunta pós-cálculo: "Usaria sem recalcular?" | 0 (não existe ferramenta) |

---

## Metadados do Pipeline Completo

```yaml
pipeline_status: completo
data_conclusao_handoff: 2026-03-17
documentos:
  discovery: v1.0
  definicao: v1.0
  projeto: v1.0
  prototipo: v1.0
  handoff: v1.0
persona_principal: "Roberto Cálculo — Analista FCVS Sênior"
personas_secundarias:
  - "Auditor/Compliance"
plataforma: web (desktop-first, responsivo)
framework: "Não definido (pendência)"
design_system: "A criar (tokens definidos no handoff)"
rotas_documentadas:
  - "Formulário de Entrada"
  - "Processamento"
  - "Resultado — Visão Geral"
  - "Resultado — Memória de Cálculo"
  - "Resultado — Comparação com Histórico"
  - "Resultado — Exceção (condicional)"
  - "Exportação"
total_user_stories: 20
total_regras_negocio: 29
total_componentes_especificados: 10
componentes_novos: 2
  - "Progress Stepper"
  - "Comparação Lado a Lado"
design_tokens: 34
itens_microcopy: 50+
heuristicas_pendentes:
  - "H6 — Reconhecimento ao invés de memorização"
  - "H7 — Flexibilidade e eficiência"
  - "H10 — Ajuda e documentação"
acessibilidade_pendentes: []
pendencias_abertas:
  - "Stack tecnológica não definida"
  - "Design system não implementado"
  - "Inventário de regras incompleto (BLOQUEIO)"
  - "Banco de históricos não disponível"
  - "Baseline manual não medido"
  - "Contratos de API não definidos"
hipoteses_abertas:
  - "Legibilidade dos PDFs"
  - "Volume de exceções"
  - "Performance engine regras complexas"
metricas_meta:
  taxa_conclusao: ">= 80%"
  sus_score: ">= 68 (mínimo), >= 75 (ideal)"
  tempo_tarefa: "< 5 min"
  taxa_erro: "0 vs. histórico"
  aceitacao_sem_recalculo: ">= 80% em 30 dias"
  nps: ">= 40"
validacao_prototipo: pendente
principios_design:
  - "Transparência radical"
  - "Confiança antes de velocidade"
  - "Exceção como funcionalidade"
  - "Clareza informacional sobre minimalismo"
  - "Rastreabilidade de ponta a ponta"
decisoes_estrategicas:
  - "Foco em contrato individual"
  - "Exceções sinalizadas, não bloqueantes"
  - "Comparação histórica como PoC"
  - "Web básica, não CLI"
  - "Interface densa e organizada"
```

---

*Documento de Handoff concluído.*
*Ele consolida a documentação de produto, specs de interface, handoff técnico e checklists de QA e acessibilidade.*
*Este documento encerra o pipeline de UX e está pronto para implementação.*

*Pipeline completo: Discovery → Definição → Projeto → Protótipo → Handoff ✓*
