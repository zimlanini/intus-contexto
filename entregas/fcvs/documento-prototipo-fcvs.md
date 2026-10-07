# Documento de Prototipação: Ferramenta de Cálculo do FCVS

**Data**: 17 de março de 2026
**Status**: Prototipação concluída — pronto para fase de Handoff
**Versão**: 1.0
**Documentos base**: Discovery v1.0, Definição v1.0, Projeto v1.0

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

- **Storyboard de solução**: Roberto recebe 10 contratos (5-8h manual) → insere parâmetros → sistema identifica regra, calcula, mostra memória + comparação → 2-3 min por contrato com confiança. Métrica: aceitação ≥ 80%, tempo < 5 min, 0 erros contra histórico.
- **HMWs prioritárias**: (1) Identificar regra/taxa automaticamente com justificativa, (2) Tornar raciocínio do cálculo visível, (3) Comparar com histórico validado
- **Foco do sprint**: Ciclo de confiança do cálculo
- **Escopo inclui**: Formulário de entrada com validação, engine de cálculo para contrato padrão, identificação automática de regra/taxa, memória de cálculo detalhada, sinalização de exceções, comparação com histórico (PoC), exportação de memória, alertas de inconsistências
- **Escopo não inclui**: Processamento em lote, gestão de múltiplos contratos, integração bancária, workflow de aprovação, dashboard administrativo, módulo de auditoria completo
- **Princípios de design**: Transparência radical, Confiança antes de velocidade, Exceção como funcionalidade, Clareza informacional sobre minimalismo, Rastreabilidade de ponta a ponta
- **Momentos da verdade**: (1) Identificação da regra correta — Etapa 3 da jornada, intensidade 5; (2) Conferência do resultado — Etapa 5, intensidade 4; (3) Auditoria retroativa — pós-jornada

---

## 2. Protótipos

### 2.1 Recorte de Prototipação
Fluxo principal completo: entrada de parâmetros → identificação automática de regra → cálculo → memória detalhada → comparação com histórico → exportação. Este recorte cobre os 3 Momentos da Verdade e as 3 HMWs prioritárias — é o ciclo de confiança inteiro.

### 2.2 Objetivo do Protótipo
Validar se o analista confia no resultado automatizado o suficiente para não refazer manualmente. Especificamente: (1) entende qual regra foi aplicada e por quê, (2) consegue conferir o raciocínio na memória de cálculo, (3) usa a comparação com histórico como mecanismo de calibração.

### 2.3 Fidelidade Recomendada
**Média-alta**. Justificativa: o produto é denso em dados e a hierarquia informacional é parte central da proposta de valor. Wireframes de baixa fidelidade não permitem validar se a memória de cálculo é realmente escaneável. É necessário layout realista com tipografia, espaçamento e hierarquia visual, mas sem necessidade de design visual final (cores de marca, ícones finais).

### 2.4 Arquitetura de Informação do Fluxo

| # | Tela/Etapa | Objetivo | Conteúdo Principal |
|---|-----------|----------|-------------------|
| 1 | Formulário de Entrada | Coletar parâmetros do contrato | Campos obrigatórios (nº contrato, datas, valor, tipo, CES), validação inline, alertas de dados faltantes, indicador de campos preenchidos |
| 2 | Tela de Processamento | Feedback durante cálculo | Indicador de progresso por etapa (identificando regra → calculando → verificando), tempo estimado, cancelamento disponível |
| 3 | Resultado — Visão Geral | Apresentar resultado principal com confiança | Valor final destacado, regra aplicada com justificativa em card, status de confiança (verde/amarelo/vermelho), ações principais (ver memória, comparar, exportar) |
| 4 | Resultado — Memória de Cálculo | Mostrar raciocínio completo passo a passo | Regra e taxa identificadas com vigência, intermediários expandíveis (passo 1, 2, 3...), ajustes aplicados, documento-fonte referenciado, botão "copiar memória" |
| 5 | Resultado — Comparação com Histórico | Calibrar confiança via referência conhecida | Lado a lado: cálculo atual vs. histórico validado, diferenças destacadas em cor, explicação de divergências (se houver), indicador "bateu/divergiu" |
| 6 | Resultado — Exceção (condicional) | Tratar exceção como funcionalidade transparente | Card de exceção com ícone amarelo (não vermelho), regra alternativa com justificativa, comparação com regra padrão ao lado, ação: "aceitar alternativa" ou "usar padrão com ressalva" |
| 7 | Exportação | Gerar documento auditável | Seleção de formato (PDF/Markdown), preview do documento, campos de metadados (analista, data, observações), botão de download + salvar no sistema |

### 2.5 Componentes e Padrões

| Componente | Uso | Referência Design System |
|-----------|-----|--------------------------|
| Input Field com validação | Formulário de entrada — todos os campos | Token: input/default, input/error, input/success |
| Progress Stepper | Tela de processamento — etapas do cálculo | Token: stepper/active, stepper/completed |
| Card informativo | Resultado — regra aplicada, exceção | Token: card/info, card/warning |
| Tabela expansível | Memória de cálculo — intermediários | Token: table/expandable-row |
| Badge de status | Resultado — confiança, validação | Token: badge/success, badge/warning, badge/error |
| Comparação lado a lado | Histórico — cálculo atual vs. anterior | Token: comparison/highlight-diff |
| Alert banner | Formulário — dados faltantes; Exceção — regra alternativa | Token: alert/warning, alert/info |
| Tooltip contextual | Todos — explicações de campos e regras | Token: tooltip/default |
| Botão primário/secundário | Todas as telas — ações principais e secundárias | Token: button/primary, button/secondary |
| Accordion/Collapse | Memória — seções expandíveis por passo | Token: accordion/default |
| Breadcrumb | Navegação — posição no fluxo | Token: breadcrumb/default |
| Empty state | Comparação — quando não há histórico | Token: empty-state/default |

### 2.6 Estados da Interface

| Tela/Componente | Default | Carregando | Vazio | Erro | Sucesso |
|----------------|---------|------------|-------|------|---------|
| Formulário de Entrada | Campos vazios com placeholders descritivos, indicador "0/N campos preenchidos" | N/A | N/A | Campo com borda vermelha + mensagem inline específica ("Data deve ser anterior a 1998") | Campo com borda verde + ícone de check |
| Tela de Processamento | N/A | Stepper animado mostrando etapa atual ("Identificando regra..."), tempo estimado, botão cancelar | N/A | Banner: "Não foi possível identificar regra para os parâmetros informados" + sugestão de ação | Transição automática para Resultado |
| Resultado — Visão Geral | Valor final + card de regra + ações | N/A | N/A | "Cálculo concluído com ressalvas" + lista de itens que precisam atenção | Badge verde "Cálculo validado" + valor em destaque |
| Memória de Cálculo | Todos os passos colapsados, apenas títulos visíveis | Skeleton loader por seção | N/A | Passo com ícone de alerta se dado-fonte indisponível | Passo com check se conferido pelo analista |
| Comparação Histórico | Layout lado a lado aguardando dados | Spinner no painel de histórico | "Nenhum cálculo anterior encontrado para este contrato" + sugestão de busca por contrato similar | "Histórico disponível mas com estrutura incompatível" + detalhes | Diferenças = 0: "Resultado idêntico ao histórico validado" em destaque verde |
| Card de Exceção | Oculto (só aparece quando exceção detectada) | N/A | N/A | "Exceção detectada mas regra alternativa não disponível" + orientação manual | Card amarelo com regra alternativa + justificativa + ações |
| Exportação | Opções de formato + preview em branco | Gerando documento... + barra de progresso | N/A | "Não foi possível gerar PDF — tente Markdown" | "Documento gerado" + link de download + confirmação de salvamento |
| Alertas de Inconsistência | Sem alertas visíveis | N/A | N/A | Banner âmbar: "{campo} inconsistente: {detalhe}" + ação sugerida | Alerta removido ao corrigir campo |

### 2.7 Avaliação Heurística (Nielsen)

| Heurística | Aplicação no Protótipo | Status |
|-----------|----------------------|--------|
| Visibilidade do status do sistema | Stepper de progresso durante cálculo; badges de status no resultado; indicador de campos preenchidos no formulário; feedback visual imediato em cada ação | OK |
| Correspondência com o mundo real | Terminologia do FCVS (regra, taxa, vigência, CES, memória de cálculo); fluxo espelha processo mental do analista; sem jargão técnico de software | OK |
| Controle e liberdade do usuário | Botão cancelar no processamento; navegação livre entre abas do resultado (memória, comparação, exportação); voltar ao formulário sem perder dados; "desfazer" em ações destrutivas | OK |
| Consistência e padrões | Design system aplicado uniformemente; mesma lógica de card para regra e exceção; padrões de cor consistentes (verde=ok, amarelo=atenção, vermelho=erro) | OK |
| Prevenção de erros | Validação inline antes de submeter; alertas de dados faltantes; confirmação antes de exportar; campos com formato esperado (máscara de data, decimal) | OK |
| Reconhecimento ao invés de memorização | Labels descritivos em todos os campos; tooltips com explicação de regras; breadcrumb de posição; regra aplicada sempre visível no resultado | Atenção |
| Flexibilidade e eficiência | Accordion para detalhes sob demanda; atalho de teclado para "calcular" (Enter); copiar memória com um clique; expandir/colapsar todos os passos | Atenção |
| Design estético e minimalista | Hierarquia clara com valor principal em destaque; informação densa mas organizada por níveis (overview → memória → detalhe); sem elementos decorativos | OK |
| Recuperação de erros | Mensagens de erro com ação sugerida ("Campo X está vazio — preencha para prosseguir"); exceção tratada como caminho alternativo, não dead-end; fallback para exportação | OK |
| Ajuda e documentação | Tooltips em campos técnicos; link "por que esta regra?" em cada card; seção de ajuda acessível; explicação de intermediários na memória de cálculo | Atenção |

### 2.8 Checklist de Acessibilidade

| Critério WCAG | Aplicação | Status |
|--------------|----------|--------|
| Contraste (AA mínimo) | Textos sobre fundo branco com ratio ≥ 4.5:1; badges com contraste verificado; ícones + texto (nunca apenas cor) | OK |
| Navegação por teclado | Tab order lógico no formulário (campo a campo); Enter para submeter; Esc para cancelar/fechar modais; foco visível com outline | OK |
| Textos alternativos | Ícones de status com aria-label ("Cálculo validado", "Exceção detectada"); gráficos de comparação com alt descritivo | OK |
| Área de toque mínima (44px) | Botões principais ≥ 44px; links de ação com padding adequado; accordion headers clicáveis em toda a largura | OK |
| Hierarquia de headings | h1 = nome da tela; h2 = seções; h3 = subseções; sem pulo de nível; semântica consistente | OK |
| Feedback multimodal | Erros: cor vermelha + ícone + texto; sucesso: cor verde + ícone + texto; exceção: cor amarela + ícone + texto + card expandido | OK |

### 2.9 Micro-interações Chave

| Interação | Comportamento | Feedback ao Usuário |
|----------|--------------|---------------------|
| Preencher campo obrigatório | Validação inline ao sair do campo (onBlur) | Borda verde + check se válido; borda vermelha + mensagem se inválido |
| Submeter formulário | Transição suave para tela de processamento | Stepper aparece com animação fade-in; botão muda para "Processando..." com spinner |
| Cálculo em andamento | Stepper avança conforme etapas completam | Etapa atual pulsa suavemente; etapas concluídas recebem check |
| Expandir passo da memória | Accordion abre com animação de altura | Conteúdo revela com slide-down suave; ícone de seta rotaciona 90° |
| Alternar para comparação | Tab switch entre memória e comparação | Conteúdo troca com crossfade; tab ativa recebe underline animado |
| Exceção detectada | Card de exceção aparece no resultado | Card entra com slide-in lateral + highlight amarelo pulsante por 2s |
| Copiar memória de cálculo | Botão "copiar" ao lado do título da memória | Texto muda para "Copiado!" por 2s com ícone de check; volta ao original |
| Exportar documento | Clique em "Exportar PDF" ou "Exportar Markdown" | Modal com preview + barra de progresso; ao concluir, link de download aparece |
| Hover em tooltip | Mouse sobre ícone "?" ou label sublinhado | Tooltip aparece com delay de 300ms; desaparece ao sair |
| Alerta de inconsistência | Sistema detecta dado inconsistente | Banner âmbar aparece no topo do formulário com slide-down; scroll automático para o campo |

### 2.10 Prompt Descritivo de Prototipação

**Tipo de produto**: Ferramenta web de cálculo regulatório — automação de cálculos do FCVS (Fundo de Compensação de Variações Salariais) para contratos habitacionais do SFH.

**Contexto de uso**: Ambiente de trabalho institucional (instituição financeira ou órgão vinculado à Caixa). Uso diário por analistas especializados. Desktop como plataforma principal. Sessões de 1-4h com múltiplos cálculos sequenciais.

**Objetivo da interface**: Permitir que o analista insira parâmetros de um contrato, receba o cálculo automatizado com memória detalhada, confira o raciocínio, compare com histórico e exporte para auditoria. A interface deve construir confiança progressiva: o analista vê, entende, confere e aceita.

**Perfil do usuário**: Roberto Cálculo — Analista FCVS Sênior, 35-55 anos, profundo domínio de regras do FCVS, usa planilhas e PDFs diariamente. Não é técnico em software mas é power user de ferramentas de cálculo. Valoriza transparência e consistência acima de estética.

**Estrutura da interface**:
1. Formulário de entrada com campos obrigatórios (nº contrato, datas de assinatura e vigência, valor original, tipo de financiamento, CES, sistema de amortização), validação inline, indicador de progresso de preenchimento e alertas proativos de dados faltantes.
2. Tela de processamento com stepper de progresso por etapa (identificando regra → calculando intermediários → verificando resultado), tempo estimado e botão de cancelar.
3. Resultado em 3 visões navegáveis: (a) visão geral com valor final, regra aplicada em card com justificativa e ações rápidas; (b) memória de cálculo com passos expandíveis (regra → taxa → intermediários → ajustes → resultado), cada passo referenciando documento-fonte; (c) comparação lado a lado com histórico validado, diferenças destacadas.
4. Card de exceção (condicional) com regra alternativa, justificativa e comparação com regra padrão. Cor amarela (atenção), não vermelha (erro). Ação: aceitar alternativa ou usar padrão com ressalva.
5. Exportação com preview, seleção de formato (PDF/Markdown) e campos de metadados.

**Componentes e design system**: Input fields com validação inline, progress stepper, cards informativos (info/warning), tabelas expansíveis com accordion, badges de status (success/warning/error), layout de comparação lado a lado, alert banners, tooltips contextuais, botões primário/secundário, breadcrumb de navegação. Todos reutilizáveis e parametrizáveis.

**Tokens visuais**: Tipografia: sans-serif legível, corpo 14-16px, headings em peso bold. Espaçamento: grid de 8px, padding consistente 16px/24px. Cores semânticas: verde (#22c55e) para sucesso/validado, amarelo (#eab308) para atenção/exceção, vermelho (#ef4444) para erro, azul (#3b82f6) para informação/ação, cinza (#6b7280) para texto secundário. Border-radius: 8px para cards, 4px para inputs. Sombras: elevation-1 para cards, elevation-2 para modais.

**Comportamentos e interações**: Validação inline onBlur, stepper progressivo com animação, accordion para detalhes sob demanda, tab switch entre visões do resultado, slide-in para card de exceção, tooltip com delay de 300ms, exportação com preview em modal.

**Estados mapeados**: Default (formulário vazio, resultado com dados, memória colapsada), carregando (stepper animado, skeleton loaders, spinner de histórico), vazio (sem histórico para comparação, sem exceção), erro (campo inválido, regra não encontrada, exportação falhou), sucesso (campo válido, cálculo concluído, exportação gerada, comparação idêntica ao histórico).

**Hierarquia visual**: Valor final é o elemento mais proeminente da tela de resultado (tipografia 2x, peso bold). Regra aplicada em segundo nível (card destacado). Memória de cálculo em terceiro nível (expandível sob demanda). Ações principais (comparar, exportar) sempre visíveis. Informação densa organizada em camadas: overview → detalhe → fonte.

**Design system**: A construir — protótipo define os tokens e padrões que serão formalizados no handoff. Componentes projetados para reuso e consistência.

**Acessibilidade**: Contraste AA mínimo em todos os textos. Navegação completa por teclado. Feedback nunca apenas por cor (sempre ícone + texto + cor). Aria-labels em ícones e badges. Tab order lógico. Áreas de toque ≥ 44px. Headings semânticos sem pulo de nível.

**Tom visual**: Profissional e confiável. Denso em informação mas organizado. Sem elementos decorativos — cada pixel justificado. Sensação de "ferramenta de especialista", não de "app consumer". Clareza informacional acima de minimalismo estético.

---

## 3. Testes Rápidos

### 3.1 Objetivo
Identificar problemas óbvios de compreensão, fluxo e consistência antes de investir em testes formais de usabilidade. Foco: o analista consegue entender o que fazer em cada tela sem explicação?

### 3.2 Checklist de Verificação

| Item | Método | Resultado |
|------|--------|-----------|
| Clareza do fluxo principal (entrada → resultado → exportação) | Walkthrough interno com 2 membros do time | Pendente |
| Compreensão dos labels e copy do formulário | Review com 1 analista disponível (5 min) | Pendente |
| Consistência de componentes com design system | Auditoria visual rápida — todos os cards, badges e alerts seguem padrão? | Pendente |
| Estados críticos mapeados e coerentes | Revisão: cada tela tem default, loading, empty, error, success definidos? | Pendente |
| Heurísticas com "Atenção" atendidas | Verificar H6, H7 e H10 especificamente | Pendente |
| Acessibilidade básica | Tab order funciona? Contraste ok? Ícones têm label? | Pendente |
| Memória de cálculo legível e escaneável | Walkthrough do fluxo de conferência com 1 analista | Pendente |
| Exceção percebida como funcionalidade | Mostrar card de exceção isolado para 1-2 pessoas — "o que isso significa?" | Pendente |
| Comparação com histórico compreensível | Mostrar tela de comparação — "o que você entende aqui?" | Pendente |
| Exportação encontrável | Pedir para 2 pessoas exportarem sem instrução | Pendente |

### 3.3 Formatos Recomendados
- **Guerrilla test com 2-3 analistas** (10 min cada): Mostrar protótipo, pedir para "calcular o FCVS deste contrato" sem instrução prévia. Observar onde hesitam.
- **Cognitive walkthrough com time de produto** (30 min): Percorrer fluxo completo passo a passo simulando Roberto Cálculo. Cada tela: "O usuário sabe o que fazer? Consegue ver o resultado da ação?"
- **Review com stakeholder técnico** (15 min): Validar se a memória de cálculo mostra o raciocínio de forma que um auditor entenderia.

### 3.4 Perguntas-Chave
- O analista entende o que preencher no formulário sem ajuda?
- Ao ver o resultado, o analista encontra o valor final em < 3 segundos?
- A memória de cálculo é escaneável sem ler tudo? O analista sabe onde olhar?
- A exceção é entendida como caminho alternativo ou como erro?
- A comparação com histórico gera reação de confiança ("bateu") ou confusão?
- O analista encontra o botão de exportação sem instrução?

### 3.5 Sinais de Atenção
- Analista não encontra o campo principal do formulário → hierarquia de entrada precisa revisão
- Analista ignora card de regra aplicada no resultado → card não está suficientemente destacado
- Analista tenta expandir a memória mas não percebe que é clicável → affordance do accordion insuficiente
- Analista confunde exceção com erro → cor ou copy precisa ajuste
- Analista pergunta "onde exporto?" → botão mal posicionado ou pouco visível

### 3.6 Critério de Avanço
O protótipo pode seguir para testes de usabilidade quando: (1) o fluxo principal é completável sem instrução em walkthrough interno, (2) nenhum problema crítico de compreensão identificado nos guerrilla tests, (3) todas as heurísticas "Atenção" têm plano de mitigação, (4) stakeholder técnico valida que memória de cálculo é auditável.

---

## 4. Testes de Usabilidade

### 4.1 Objetivo
Validar se analistas FCVS confiam no resultado automatizado o suficiente para não refazer manualmente. Medir taxa de conclusão, tempo, satisfação (SUS/SEQ) e observar comportamentos de confiança/desconfiança.

### 4.2 Perfil dos Participantes
- **Quantidade**: 5-8 participantes (5 mínimo para padrões qualitativos, 8 ideal para robustez)
- **Perfil**: Analistas que calculam FCVS ativamente — preferencialmente sêniores (≥ 3 anos), com pelo menos 1-2 plenos para contraste
- **Critérios de recrutamento**: (1) Calcula FCVS pelo menos 1x/semana; (2) Usa planilhas e PDFs como ferramentas atuais; (3) Conhece regras de vigência e exceções; (4) Não participou do desenvolvimento da ferramenta
- **Critério de exclusão**: Analistas que participaram de entrevistas no Discovery (viés de familiaridade)

### 4.3 Roteiro de Tarefas

| # | Tarefa | Cenário | Métrica de Sucesso | Tempo Esperado |
|---|--------|---------|-------------------|----------------|
| 1 | Calcular FCVS de contrato padrão | "Você recebeu este contrato dos anos 90. Use a ferramenta para calcular o valor do FCVS." | Taxa de conclusão ≥ 80% sem ajuda; tempo ≤ 5 min | 3-5 min |
| 2 | Conferir memória de cálculo | "Agora confira como o sistema chegou nesse resultado. A regra aplicada está correta?" | ≥ 4/5 identificam a regra corretamente; SEQ ≥ 5 | 2-3 min |
| 3 | Interpretar exceção | "Este próximo contrato tem uma condição especial. O que o sistema está dizendo?" | ≥ 3/5 entendem sem ajuda; nenhum interpreta como erro | 2-4 min |
| 4 | Comparar com histórico | "Veja se este resultado bate com o cálculo anterior deste contrato." | ≥ 4/5 localizam a comparação; verbalização de confiança | 1-2 min |
| 5 | Resolver inconsistência | "O sistema detectou um problema nos dados. O que você faria?" | ≥ 4/5 entendem o alerta e sabem como agir | 1-2 min |
| 6 | Exportar memória | "Gere o documento de memória de cálculo para enviar à auditoria." | ≥ 4/5 encontram e completam exportação; SEQ ≥ 5 | 1-2 min |

### 4.4 Hipóteses a Validar
- **H1**: Se o sistema mostrar qual regra foi aplicada e por quê, o analista confiará sem conferir manualmente na documentação original (conectada ao Momento da Verdade #1 e HMW #1)
- **H2**: Se a comparação automática com histórico validado mostrar resultado idêntico, o analista aceitará sem refazer o cálculo (conectada ao Momento da Verdade #2 e HMW #3)
- **H3**: Se exceções forem sinalizadas com justificativa e regra alternativa visível, o analista terá mais segurança que no processo manual (conectada ao princípio "Exceção como funcionalidade" e HMW #4)

### 4.5 Métricas de Usabilidade

| Métrica | Como Medir | Meta |
|---------|-----------|------|
| Taxa de conclusão de tarefa | % que completa cada tarefa sem ajuda do facilitador | ≥ 80% |
| Tempo por tarefa | Cronometragem do início ao fim de cada tarefa | Tarefa 1: ≤ 5 min; demais: ≤ 3 min |
| Taxa de erro | Número de erros ou caminhos incorretos por tarefa | ≤ 1 erro/tarefa em média |
| SUS Score | Questionário de 10 itens ao final da sessão | ≥ 68 (meta mínima); ≥ 75 (meta ideal) |
| SEQ (Single Ease Question) | Escala 1-7 após cada tarefa | ≥ 5.5 média geral |
| Índice de confiança | Pergunta: "Você usaria este resultado sem recalcular?" (1-5) | ≥ 4 em média |
| NPS | "De 0-10, recomendaria esta ferramenta a um colega?" | ≥ 40 |

### 4.6 Pontos de Observação
- **Olhar e escaneamento**: Para onde Roberto olha primeiro na tela de resultado? Encontra o valor final rapidamente?
- **Hesitações**: Onde o cursor para? Onde há pausa > 5 segundos sem ação?
- **Verbalizações espontâneas**: "Bateu!", "Faz sentido", "Não entendi" — mapear em qual tela/componente
- **Comportamento de conferência**: O analista tenta abrir documentação externa para conferir? (sinal de que H1 não validou)
- **Reação à exceção**: Expressão facial e verbalização ao ver card de exceção. Entende como alternativa ou interpreta como erro?
- **Comparação com histórico**: Reação ao ver resultado idêntico vs. divergente. Gera confiança ou indiferença?
- **Busca por exportação**: Caminho percorrido para encontrar o botão. Quantos cliques?
- **Perguntas ao facilitador**: Cada pergunta é evidência de problema de UI/copy

### 4.7 Critérios de Sucesso
- Taxa de conclusão ≥ 80% em todas as 6 tarefas
- SUS ≥ 68 (média dos participantes)
- SEQ ≥ 5.5 nas tarefas 1, 2 e 4 (fluxo principal)
- ≥ 4/5 participantes identificam corretamente a regra na memória de cálculo
- ≥ 3/5 participantes entendem exceção como funcionalidade (não erro)
- Índice de confiança ≥ 4 ("usaria sem recalcular")
- Zero erros da engine contra cálculos históricos validados

### 4.8 Sinais de Falha
- Participante tenta refazer cálculo manualmente após ver resultado → H1 não valida (confiança insuficiente)
- Participante não encontra valor final em > 10 segundos → hierarquia visual falha
- Participante interpreta exceção como erro do sistema → card de exceção precisa redesign
- Participante ignora comparação com histórico → componente pode ser irrelevante ou mal posicionado
- SUS < 55 → problemas estruturais graves de usabilidade
- ≥ 2 participantes pedem funcionalidade de lote → fluxo individual pode ser insuficiente para uso real

### 4.9 Guia de Facilitação
- Não conduzir o participante — deixar navegar livremente
- Fazer perguntas abertas: "O que você faria agora?", "O que você está vendo?", "O que espera que aconteça?"
- Registrar verbalizações exatas (não parafrasear)
- Anotar hesitações com timestamp e localização na tela
- Não corrigir erros do participante durante a tarefa — anotar para análise
- Aplicar SEQ imediatamente após cada tarefa (escala impressa ou digital ao lado)
- Aplicar SUS ao final da sessão completa
- Perguntas pós-teste: "O que mais chamou sua atenção?", "Você usaria no seu dia a dia? Por quê?", "O que mudaria?", "De 0-10, quão confiável pareceu?"
- Agradecer e contextualizar: "Estamos testando a ferramenta, não você. Cada hesitação nos ajuda a melhorar."

---

## 5. Validação e Iteração

### 5.1 Itens Validados

| Item | Fonte | Tipo | Resultado |
|------|-------|------|-----------|
| Analista confia no resultado sem refazer manualmente | Teste usabilidade — Tarefa 1 e 4 | Comportamental | Pendente |
| Memória de cálculo é compreensível e verificável | Teste usabilidade — Tarefa 2 | Perceptual + Comportamental | Pendente |
| Identificação automática de regra seleciona a correta | Teste rápido + Validação contra histórico | Funcional | Pendente |
| Exceção é percebida como funcionalidade, não erro | Teste usabilidade — Tarefa 3 | Perceptual | Pendente |
| Comparação com histórico gera confiança adicional | Teste usabilidade — Tarefa 4 | Comportamental | Pendente |
| Fluxo principal completável sem ajuda em < 5 min | Teste usabilidade — Tarefa 1 (tempo) | Funcional + Comportamental | Pendente |
| Alertas de inconsistência são claros e acionáveis | Teste usabilidade — Tarefa 5 | Perceptual | Pendente |
| Exportação gera documento auditável e completo | Teste rápido + Tarefa 6 | Funcional | Pendente |
| Hierarquia visual guia escaneabilidade no resultado | Heurística #8 + Teste rápido | Perceptual | Pendente |
| Navegação por teclado no fluxo completo | Checklist de acessibilidade | Funcional | Pendente |

### 5.2 Sinais Positivos
- ≥ 80% dos participantes completam o cálculo sem ajuda
- SUS ≥ 68 (meta mínima), idealmente ≥ 75 dado o perfil técnico
- SEQ médio ≥ 5.5 nas tarefas principais (1, 2 e 4)
- ≥ 4/5 participantes identificam corretamente a regra aplicada na memória
- Tempo médio por cálculo completo ≤ 5 minutos
- ≥ 80% aceitam resultado sem solicitar recálculo em 30 dias (longitudinal)
- Participantes verbalizam confiança ao ver comparação com histórico
- Exceções compreendidas sem perguntas ao facilitador em ≥ 3/5 casos
- Zero erros funcionais da engine contra históricos validados

### 5.3 Sinais de Ajuste
- ≥ 2/5 participantes tentam refazer o cálculo manualmente — H1 não valida
- Tempo > 7 min para tarefa principal — fluxo de entrada precisa simplificação
- SUS < 68 — problemas estruturais de usabilidade
- Participantes ignoram ou não percebem sinalização de exceção — repensar hierarquia visual
- Comparação com histórico não gera reação perceptível — componente pode ser irrelevante ou mal posicionado
- Copy dos alertas de inconsistência gera confusão ("o que devo fazer?") — microcopy precisa revisão
- ≥ 2 participantes não encontram o botão de exportação — posicionamento ou visibilidade falha
- Hesitação > 10 segundos no passo de "conferir memória" — hierarquia da tela de resultado precisa ajuste
- Analista pede funcionalidade de lote durante o teste — fluxo individual pode ser insuficiente

### 5.4 Log de Iteração

| Problema | Severidade | Heurística Violada | Solução Proposta | Status |
|---------|-----------|-------------------|-----------------|--------|
| {pós-teste} Analista não localiza regra aplicada | Crítico | H6 — Reconhecimento vs. Memorização | Destacar bloco "Regra Aplicada" com card diferenciado e ícone | Pendente |
| {pós-teste} Exceção não percebida como alternativa | Alto | H9 — Recuperação de erros | Trocar cor de alerta (vermelho→amarelo) + copy "Regra alternativa disponível" | Pendente |
| {pós-teste} Tempo de entrada > 5 min | Alto | H7 — Flexibilidade e eficiência | Avaliar preenchimento parcial com defaults inteligentes | Pendente |
| {pós-teste} Copy do alerta de inconsistência vago | Médio | H9 — Recuperação de erros | Reescrever com ação clara: "Campo X está vazio — preencha para prosseguir" | Pendente |
| {pós-teste} Exportação não encontrada | Médio | H6 — Reconhecimento vs. Memorização | Mover botão para topo da tela de resultado + barra de ações | Pendente |

> **Nota**: Log é framework preparatório. Cada linha será preenchida com dados reais após execução dos testes. Os exemplos refletem cenários de maior risco das etapas anteriores.

### 5.5 Pontos em Aberto
- **Baseline manual não medido**: Sem cronometragem real do processo atual, a meta "redução de 90%" não é verificável. Recomendação: medir antes do primeiro teste comparativo.
- **Quantidade de regras na engine**: Sprint definiu 10+, mas completude depende de acesso à documentação (bloqueio identificado no Projeto). Se < 5 regras disponíveis, limitar teste a cenários com regras implementadas.
- **Comparação com histórico — PoC limitada**: Validação com apenas 1 caso pode ser insuficiente para generalizar confiança. Se resultado positivo, expandir para 3-5 casos antes do handoff.
- **Perfil dos participantes**: Se analistas sêniores indisponíveis, aceitar analistas com ≥ 1 ano de experiência, documentando diferença de perfil.
- **Design system indefinido**: Protótipo usa tokens genéricos — validação de usabilidade é independente de marca visual, mas handoff precisará de tokens reais.

### 5.6 Critério de Decisão

| Cenário | Condição | Ação |
|---------|---------|------|
| **Seguir para handoff** | Taxa de conclusão ≥ 80% + SUS ≥ 68 + zero erros da engine contra histórico + H1 e H2 validadas (analista confia sem refazer) | Avançar para skill_output_handoff com documento completo |
| **Ajustar e retestar** | Taxa de conclusão 60-80% OU SUS 55-68 OU ajustes de severidade Alta OU H1/H2 parcialmente validadas | Iterar no protótipo (foco no log de iteração), re-executar testes rápidos, retestar com 2-3 participantes |
| **Revisar escopo** | Taxa de conclusão < 60% OU SUS < 55 OU erros da engine OU H1 e H2 não validadas | Voltar para skill_output_projeto — rever storyboard, escopo do sprint e hipóteses fundamentais |

---

## 6. Leitura Consolidada

### 6.1 Principais Decisões de Protótipo
- Fidelidade média-alta para validar hierarquia informacional (não apenas fluxo)
- Fluxo principal completo prototipado (7 telas/estados) — cobre os 3 Momentos da Verdade
- Exceção tratada como card amarelo (atenção), não vermelho (erro) — decisão de design alinhada ao princípio "Exceção como funcionalidade"
- Memória de cálculo em accordion expandível — equilíbrio entre densidade e escaneabilidade
- Comparação com histórico em layout lado a lado — referência direta para calibração de confiança
- Interface densa e organizada — prioriza clareza informacional sobre minimalismo estético

### 6.2 Principais Riscos de Interface
- Memória de cálculo pode ser densa demais se accordion não for suficiente para organizar — monitorar nas heurísticas H6 e H7
- Card de exceção pode ser confundido com erro se hierarquia visual não for clara — teste rápido crítico
- Comparação com histórico depende de dados reais — com PoC de 1 caso, pode não ser representativo
- Formulário com muitos campos obrigatórios pode gerar fricção na entrada — avaliar preenchimento parcial
- Tooltips de ajuda (H10 em Atenção) podem não ser suficientes para regras complexas — considerar link para documentação expandida

### 6.3 Sensibilidades da Experiência
- **Confiança é frágil**: Um erro silencioso detectado pelo analista destrói permanentemente a credibilidade da ferramenta. Feedback honesto sobre limitações é preferível a falsa certeza.
- **Conferência é comportamento esperado**: Roberto vai conferir os primeiros 10-20 cálculos. A interface deve facilitar isso, não desincentivar. Confiança se constrói pela repetição de acertos verificáveis.
- **Exceções são o caso normal**: Edge cases são alta frequência. Se o tratamento de exceções for ruim, o analista volta ao manual.
- **Densidade não é problema**: Analistas trabalham com planilhas densas. Interface limpa demais gera desconfiança ("cadê a informação?"). Hierarquia e escaneabilidade resolvem sem esconder dados.
- **Exportação é parte do valor**: Para o Auditor/Compliance (persona secundária), o PDF exportado é o produto. Qualidade da exportação impacta adoção organizacional.

### 6.4 Score de Heurísticas
- **OK**: 7 heurísticas (Visibilidade, Correspondência, Controle, Consistência, Prevenção, Estética, Recuperação)
- **Atenção**: 3 heurísticas (Reconhecimento vs. Memorização, Flexibilidade e eficiência, Ajuda e documentação)
- **Crítico**: 0 heurísticas

### 6.5 Score de Acessibilidade
- **OK**: 6 critérios (Contraste, Navegação por teclado, Textos alternativos, Área de toque, Hierarquia headings, Feedback multimodal)
- **Atenção**: 0 critérios

---

## Metadados para Pipeline

```yaml
prototipo_status: completo
data_conclusao: 2026-03-17
documentos_base: [discovery_v1, definicao_v1, projeto_v1]
fidelidade: media-alta
plataforma: web
design_system: a_criar
arquitetura_telas:
  - tela: "Formulário de Entrada"
    objetivo: "Coletar parâmetros do contrato com validação e alertas"
  - tela: "Processamento"
    objetivo: "Feedback de progresso durante cálculo"
  - tela: "Resultado — Visão Geral"
    objetivo: "Valor final + regra aplicada + ações"
  - tela: "Resultado — Memória de Cálculo"
    objetivo: "Raciocínio passo a passo expandível"
  - tela: "Resultado — Comparação Histórico"
    objetivo: "Calibração de confiança via referência"
  - tela: "Resultado — Exceção"
    objetivo: "Regra alternativa com justificativa"
  - tela: "Exportação"
    objetivo: "Documento auditável para compliance"
componentes_reutilizados:
  - "Input Field com validação"
  - "Progress Stepper"
  - "Card informativo (info/warning)"
  - "Tabela expansível/Accordion"
  - "Badge de status"
  - "Comparação lado a lado"
  - "Alert banner"
  - "Tooltip contextual"
  - "Botão primário/secundário"
  - "Breadcrumb"
  - "Empty state"
estados_mapeados: [default, loading, empty, error, success]
heuristicas:
  ok: 7
  atencao:
    - "H6 — Reconhecimento ao invés de memorização"
    - "H7 — Flexibilidade e eficiência"
    - "H10 — Ajuda e documentação"
  critico: []
acessibilidade:
  ok: 6
  atencao: []
micro_interacoes:
  - "Validação inline onBlur"
  - "Stepper progressivo animado"
  - "Accordion com slide-down"
  - "Tab switch com crossfade"
  - "Card de exceção com slide-in"
  - "Copiar memória com feedback"
  - "Tooltip com delay 300ms"
  - "Exportação com preview modal"
  - "Alerta com slide-down e auto-scroll"
metricas_usabilidade:
  taxa_conclusao: ">= 80%"
  sus_score: ">= 68 (mínimo), >= 75 (ideal)"
  seq_score: ">= 5.5"
  tempo_medio_tarefa: "<= 5 min (tarefa principal)"
  indice_confianca: ">= 4/5"
iteracoes_realizadas: 0
problemas_resolvidos: []
problemas_abertos:
  - "Baseline manual não medido"
  - "Quantidade de regras na engine depende de acesso à documentação"
  - "Comparação histórico limitada a PoC de 1 caso"
  - "Perfil participantes — sêniores podem estar indisponíveis"
  - "Design system indefinido — tokens genéricos no protótipo"
prompt_descritivo: "Completo — seção 2.10"
validacao_resultado: pendente
hipoteses:
  - id: H1
    descricao: "Mostrar regra + justificativa → confiança sem conferência manual"
    status: pendente
  - id: H2
    descricao: "Comparar com histórico → aceitação sem refazer"
    status: pendente
  - id: H3
    descricao: "Exceções sinalizadas → mais segurança que manual"
    status: pendente
persona_principal: "Roberto Cálculo"
personas_secundarias:
  - "Auditor/Compliance"
principios_design:
  - "Transparência radical"
  - "Confiança antes de velocidade"
  - "Exceção como funcionalidade"
  - "Clareza informacional sobre minimalismo"
  - "Rastreabilidade de ponta a ponta"
momentos_verdade:
  - "Identificação da regra correta (Etapa 3 jornada)"
  - "Conferência do resultado (Etapa 5 jornada)"
  - "Auditoria retroativa (pós-jornada)"
decisoes_prototipo:
  - "Fidelidade média-alta para validar hierarquia informacional"
  - "Exceção como card amarelo, não vermelho"
  - "Memória em accordion expandível"
  - "Comparação lado a lado com histórico"
  - "Interface densa e organizada, não minimalista"
proxima_fase: handoff
```

---

*Documento de Prototipação concluído.*
*Ele consolida specs de protótipo, avaliação heurística, testes, validação e prompt descritivo de interface.*
*Este documento serve como base para a próxima fase: Handoff (especificações técnicas para desenvolvimento).*
