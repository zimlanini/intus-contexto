---
tipo: entrega
status: feito
tags: [emgea, fcvs, definicao, persona, jornada]
resumo: Definição da ferramenta de cálculo do FCVS: insights, persona principal, mapa de empatia e jornada.
---

# Documento de Definição: Ferramenta de Cálculo do FCVS

**Data**: 16 de março de 2026
**Status**: Definição concluída — pronto para fase de Projeto
**Versão**: 1.0
**Documento base**: Documento de Discovery v1.0

---

## 1. Contexto Recebido (do Discovery)

### 1.1 Objetivo do Projeto
Automatizar o cálculo do FCVS com uma engine parametrizável que elimine o processo manual, garantindo precisão de 99.9%, rastreabilidade completa e redução de 90% no tempo de cálculo.

### 1.2 Público Principal
Analista FCVS (executor dos cálculos diários) e Auditor/Compliance (validador de rastreabilidade). Proto-personas identificadas no Discovery: Analista FCVS e Auditor/Compliance.

### 1.3 Problema ou Oportunidade
Cálculo manual gera alto tempo de processamento, risco de erro humano, falta de rastreabilidade, ausência de padronização e dificuldade com regras condicionais acumuladas ao longo de décadas.

### 1.4 Resultado Esperado
Redução de 90% no tempo, 99.9% de precisão, zero erros em produção, rastreabilidade de ponta a ponta, 100% das regras documentadas implementadas.

### 1.5 Princípios de Design (herdados do Discovery)
- Transparência radical
- Confiança antes de velocidade
- Exceção como funcionalidade
- Clareza informacional sobre minimalismo
- Rastreabilidade de ponta a ponta

### 1.6 Restrições
- Documentação possivelmente incompleta
- Décadas de regras com vigências sobrepostas
- MVP sem integração bancária ou workflow
- Precisão de 2 casas decimais obrigatória

---

## 2. Síntese de Insights

### 2.1 Necessidades Principais
- Calcular FCVS automaticamente sem interpretar dezenas de documentos por contrato
- Visualizar passo a passo qual regra, taxa e metodologia foi aplicada
- Validar resultados contra cálculos históricos já conferidos
- Lidar com exceções sem quebrar o fluxo
- Exportar memória de cálculo para auditoria

### 2.2 Dores e Fricções

| Dor | Severidade | Frequência | Fonte | Impacto no Projeto |
|-----|-----------|------------|-------|---------------------|
| Alto tempo interpretando documentos manualmente | Alta | Recorrente | Discovery | Core do problema — justifica a automação |
| Risco de erro na aplicação de regras com vigências sobrepostas | Alta | Recorrente | Discovery | Precisa de identificação automática de regra |
| Impossibilidade de rastrear cálculos feitos por outros | Alta | Recorrente | Discovery | Exige memória de cálculo persistente |
| Falta de padronização entre analistas | Alta | Recorrente | Discovery | Engine única resolve — elimina variabilidade |
| Dificuldade com exceções e lógica condicional | Média | Frequente | Discovery | Tratamento explícito de exceções como funcionalidade |
| Ausência de validação automática | Média | Recorrente | Hipótese | Comparação com histórico como mecanismo de confiança |
| Retrabalho por questionamentos de auditoria | Média | Pontual | Discovery | Rastreabilidade permanente elimina retrabalho |

### 2.3 Comportamentos e Expectativas
- Analistas dominam as regras — o problema é operacionalização, não conhecimento
- Esperam ver o raciocínio, não apenas o resultado
- Preferem conferir do que confiar cegamente — ferramenta deve facilitar conferência
- Auditores esperam reconstruir qualquer cálculo a qualquer momento
- Tolerância a erro praticamente zero — consequência jurídica e financeira

### 2.4 Oportunidades para o Produto
- Memória de cálculo como diferencial central (nenhuma alternativa oferece isso no FCVS)
- Validação contra histórico como construtor de confiança progressiva
- Tratamento explícito de exceções reduz ansiedade e aumenta adoção
- Padronização elimina variabilidade de interpretação — ganho organizacional
- Detecção proativa de inconsistências antes da finalização

### 2.5 Pontos Críticos de Atenção
- Confiança é pré-requisito de adoção
- Métricas baseline inexistentes — metas não podem ser comprovadas sem coleta
- Completude das regras é risco #1
- Edge cases são cenário normal, não exceção
- Legibilidade dos PDFs não confirmada

### 2.6 Leitura Consolidada
Profissional experiente preso em processo ineficiente. A dor é falta de ferramenta, não de conhecimento. Oportunidade rara: problema real, público cativo, nicho sem concorrência. Adoção depende de confiança, construída com transparência, rastreabilidade e tratamento honesto de limitações.

---

## 3. Persona Principal

### 3.1 Identificação
- **Nome representativo**: Roberto Cálculo
- **Papel ou perfil**: Analista FCVS Sênior
- **Contexto de uso**: Trabalha em instituição financeira ou órgão vinculado à Caixa, analisando contratos habitacionais com cobertura FCVS diariamente. Usa planilhas, PDFs normativos e scripts auxiliares.

### 3.2 Objetivos
- Calcular FCVS com precisão e agilidade
- Reduzir tempo por cálculo para atender maior volume
- Ter certeza da regra e taxa corretas para cada período/contrato
- Gerar documentação que se sustente em auditoria
- Padronizar o processo entre analistas

### 3.3 Necessidades
- Identificação automática de regra e taxa por parâmetros do contrato
- Visualização do passo a passo (memória de cálculo)
- Alertas de dados faltantes ou inconsistentes
- Comparação com cálculos históricos validados
- Exportação de relatório completo

### 3.4 Dores
- 30-60 min por cálculo interpretando documentos (estimativa — precisa validação)
- Medo de aplicar regra errada em contratos com condições especiais
- Não consegue reconstruir cálculo feito por outro analista
- Interpretação variável da mesma regra entre analistas
- Retrabalho total quando auditoria questiona cálculo antigo

### 3.5 Comportamentos e Expectativas
- Confere resultado pelo menos uma vez antes de validar
- Prefere ver raciocínio do que apenas número final
- Quando encontra exceção, para e consulta — quebra de fluxo
- Espera assistente transparente, não caixa preta
- Valoriza consistência acima de novidade

### 3.6 Mapa de Empatia

| Dimensão | Descrição |
|----------|-----------|
| **Pensa** | "Será que apliquei a regra certa? E se esse contrato tiver uma condição que eu não vi?" |
| **Sente** | Ansiedade com contratos complexos; alívio quando resultado bate com histórico; frustração com retrabalho |
| **Fala** | "Cada contrato é um caso"; "Preciso conferir duas vezes"; "Não tem como padronizar, cada um tem particularidade" |
| **Faz** | Abre múltiplos PDFs, cruza regras manualmente, anota em planilha paralela, consulta colegas em casos duvidosos |

### 3.7 Jobs-to-be-Done Refinados
- **Quando** recebo um contrato padrão, **eu quero** inserir os dados e receber o cálculo com memória detalhada, **para que** reduza o tempo de 30-60 min para menos de 5 min
- **Quando** o contrato tem exceção, **eu quero** que o sistema identifique e mostre qual regra alternativa está sendo aplicada e por quê, **para que** eu tenha segurança
- **Quando** auditoria questiona um cálculo, **eu quero** recuperar a memória completa com regra, taxa, vigência e documento-fonte, **para que** comprove sem recalcular

### 3.8 Critérios de Valor Percebido
- Resultado mostra exatamente como foi calculado
- Sistema alerta sobre dados faltantes ou inconsistências
- Resultado bate com cálculos históricos validados
- Exceções tratadas com transparência
- Exportação completa para relatório formal

### 3.9 Riscos de Experiência
- Erro silencioso destrói confiança permanentemente
- Memória de cálculo confusa leva de volta ao manual
- Mensagens de erro genéricas geram desconfiança
- Sem comparação com histórico, não há calibração de confiança
- Interface complexa demais rejeita analistas menos técnicos

### 3.10 Cenários de Uso
- **Cenário 1 — Cálculo padrão**: Roberto insere parâmetros de contrato dos anos 90, ferramenta identifica regra e taxa, calcula, apresenta memória passo a passo. O que levava uma manhã leva 1 hora para 15 contratos.
- **Cenário 2 — Contrato com exceção**: Contrato com CES diferenciado. Ferramenta detecta exceção, destaca regra alternativa com justificativa, mostra cálculo padrão ao lado para comparação.
- **Cenário 3 — Auditoria retroativa**: Três meses depois, compliance questiona cálculo. Roberto busca por número do contrato, recupera memória completa, exporta PDF. Sem retrabalho.

### 3.11 Leitura da Persona
Roberto é competente mas preso em processo ineficiente. Não precisa de ferramenta que pense por ele — precisa de uma que operacionalize o que já sabe. Confiança se constrói gradualmente: primeiro compara com o manual, depois confia nos padrões, depois se apoia nas exceções. Design deve respeitar essa curva.

### 3.12 Personas Secundárias
- **Auditor/Compliance**: Consome outputs (memórias de cálculo, relatórios) mas não opera a ferramenta diretamente. Considerar em decisões de exportação, rastreabilidade e formato de relatório.

---

## 4. Journey Map

### 4.1 Objetivo da Jornada
Jornada principal do Analista FCVS ao calcular o valor do FCVS para um contrato habitacional — do recebimento da demanda à entrega do resultado validado.

### 4.2 Persona Associada
Roberto Cálculo — Analista FCVS Sênior, processa contratos diariamente.

### 4.3 Etapas da Jornada

#### Etapa 1 — Recebimento da Demanda
- **Ação**: Recebe contrato(s) por lote ou demanda individual
- **Objetivo**: Entender volume e identificar contratos potencialmente complexos
- **Pontos de contato**: E-mail, sistema interno, planilha de controle
- **Pensamento**: "Quantos contratos são? Algum parece ter condição especial?"
- **Emoção**: Neutro a levemente ansioso
- **Dores**: Sem visibilidade antecipada de quais terão exceções
- **Oportunidades**: Dashboard com pré-classificação (padrão vs. exceção)

#### Etapa 2 — Coleta de Parâmetros do Contrato
- **Ação**: Abre PDFs, identifica e anota parâmetros (número, datas, valor, tipo)
- **Objetivo**: Reunir todos os dados necessários
- **Pontos de contato**: PDFs, planilhas, sistema FH1
- **Pensamento**: "Está tudo aqui? Algum dado faltando?"
- **Emoção**: Tédio e frustração — repetitivo e manual
- **Dores**: Dados espalhados em múltiplos documentos; PDFs ilegíveis; campos faltantes
- **Oportunidades**: Formulário estruturado com alertas de dados faltantes

#### Etapa 3 — Identificação de Regra e Taxa Aplicável
- **Ação**: Cruza parâmetros com regras por vigência, identifica metodologia e taxa
- **Objetivo**: Determinar regra correta para aquele contrato/período
- **Pontos de contato**: Manual de Normas, Banco de Índices, tabelas de vigência
- **Pensamento**: "Essa regra vale para esse período? Tem exceção?"
- **Emoção**: Ansiedade — maior incerteza e risco de erro
- **Dores**: Vigências sobrepostas; exceções mal documentadas; interpretação variável
- **Oportunidades**: Identificação automática de regra com justificativa visível

#### Etapa 4 — Execução do Cálculo
- **Ação**: Aplica fórmula manualmente, processa intermediários, aplica ajustes
- **Objetivo**: Chegar ao valor final do FCVS
- **Pontos de contato**: Planilha Excel, calculadora, anotações
- **Pensamento**: "O valor parece razoável? Preciso checar intermediários..."
- **Emoção**: Concentração tensa — erro invalida tudo
- **Dores**: Intermediários complexos; fácil errar decimal; sem feedback de razoabilidade
- **Oportunidades**: Cálculo automatizado com intermediários visíveis e validação em tempo real

#### Etapa 5 — Conferência e Validação
- **Ação**: Revisa resultado, compara com cálculos anteriores similares
- **Objetivo**: Certeza de que o resultado está correto
- **Pontos de contato**: Planilha de histórico, memória pessoal, colegas
- **Pensamento**: "Esse valor bate com o que eu esperava?"
- **Emoção**: Dúvida — sem referência automática
- **Dores**: Sem comparação automática; depende de experiência pessoal; conferência consome tempo
- **Oportunidades**: Comparação automática com histórico validado; score de confiança

#### Etapa 6 — Documentação e Entrega
- **Ação**: Organiza memória de cálculo, formata relatório, entrega
- **Objetivo**: Formalizar resultado com documentação sustentável em auditoria
- **Pontos de contato**: Planilha, Word/PDF, sistema de arquivamento
- **Pensamento**: "Está tudo registrado? Se perguntarem, consigo explicar?"
- **Emoção**: Alívio ou ansiedade residual
- **Dores**: Montagem manual trabalhosa; formato não padronizado; difícil recuperar depois
- **Oportunidades**: Geração automática de memória; exportação padronizada; busca por contrato

### 4.4 Curva Emocional

| Etapa | Emoção Dominante | Intensidade (1-5) | Momento Crítico? |
|-------|-----------------|-------------------|------------------|
| 1. Recebimento | Neutro/Leve ansiedade | 2 | Não |
| 2. Coleta de parâmetros | Frustração/Tédio | 3 | Não |
| 3. Identificação de regra | Ansiedade | 5 | **Sim** |
| 4. Execução do cálculo | Concentração tensa | 4 | **Sim** |
| 5. Conferência | Dúvida/Insegurança | 4 | **Sim** |
| 6. Documentação e entrega | Alívio/Ansiedade residual | 2 | Não |

### 4.5 Momentos da Verdade

**#1 — Identificação da regra (Etapa 3)**: Ponto onde o cálculo pode dar certo ou errado. Regra errada invalida tudo. Ferramenta precisa mostrar qual regra, por que, e o que mudaria com outra.

**#2 — Conferência do resultado (Etapa 5)**: Onde confiança é construída ou destruída. Comparação automática com histórico validado transforma "ferramenta que calcula" em "ferramenta em que eu confio".

**#3 — Auditoria retroativa (pós-jornada)**: Capacidade de recuperar memória completa meses depois define se a ferramenta gerou valor duradouro.

### 4.6 Leitura Crítica
Gargalo não está em uma etapa isolada, mas na acumulação de trabalho manual com alta carga cognitiva. Etapas 3, 4 e 5 concentram maior risco e ansiedade — onde automação gera mais valor. Etapa 2 é candidata a simplificação via formulário. Etapa 6 é onde rastreabilidade se materializa. Produto deve atacar Momentos da Verdade #1 e #2 prioritariamente.

### 4.7 Pontos Prioritários para Design
- Transparência na seleção de regra (MdV #1)
- Validação contra histórico (MdV #2)
- Memória de cálculo recuperável (MdV #3)
- Formulário estruturado de entrada (Etapa 2)

---

## 5. Leitura Estratégica

### 5.1 Principais Aprendizados
- O analista é competente mas preso em processo ineficiente — a ferramenta deve operacionalizar, não substituir
- Confiança é o fator #1 de adoção e se constrói gradualmente
- Os 3 Momentos da Verdade (identificação de regra, conferência, auditoria) definem o sucesso ou fracasso do produto
- Exceções são cenário normal e devem ser funcionalidade, não falha
- Rastreabilidade é requisito de compliance e mecanismo de confiança simultaneamente

### 5.2 Principais Riscos
- Erro silencioso destrói confiança permanentemente
- Regras incompletas ou mal interpretadas geram cálculos incorretos em produção
- Sem baseline medido, sucesso não pode ser comprovado
- Interface que esconde o raciocínio será rejeitada

### 5.3 Principais Oportunidades
- Nicho sem concorrência direta
- Memória de cálculo como diferencial que nenhuma alternativa oferece
- Validação contra histórico como construtor progressivo de confiança
- Padronização elimina variabilidade entre analistas

### 5.4 Orientações para Design
- Priorizar transparência do cálculo sobre qualquer outro aspecto visual
- Tratar exceções como funcionalidade de primeira classe
- Projetar para conferência, não para confiança cega
- Organizar informação densa com hierarquia clara — sem esconder dados
- Permitir recuperação completa de qualquer cálculo a qualquer momento

---

## Metadados para Pipeline

```yaml
definicao_status: completo
data_conclusao: 2026-03-16
documento_base: discovery_v1
persona_principal:
  nome: Roberto Cálculo
  papel: Analista FCVS Sênior
  jtbd:
    - "Calcular FCVS rapidamente com memória detalhada"
    - "Ver regra alternativa aplicada em exceções com justificativa"
    - "Recuperar memória completa para auditoria sem recalcular"
  dores_criticas:
    - "Alto tempo interpretando documentos manualmente"
    - "Risco de erro na aplicação de regras com vigências sobrepostas"
    - "Impossibilidade de rastrear cálculos feitos por outros"
    - "Falta de padronização entre analistas"
personas_secundarias:
  - "Auditor/Compliance"
momentos_verdade:
  - "Identificação da regra correta (Etapa 3)"
  - "Conferência do resultado (Etapa 5)"
  - "Auditoria retroativa (pós-jornada)"
pontos_prioritarios_design:
  - "Transparência na seleção de regra"
  - "Validação contra histórico"
  - "Memória de cálculo recuperável"
  - "Formulário estruturado de entrada"
principios_design:
  - "Transparência radical"
  - "Confiança antes de velocidade"
  - "Exceção como funcionalidade"
  - "Clareza informacional sobre minimalismo"
  - "Rastreabilidade de ponta a ponta"
restricoes:
  - "Documentação possivelmente incompleta"
  - "MVP sem integração bancária"
  - "Precisão 2 casas decimais"
curva_emocional_picos_negativos:
  - "Etapa 3 — Identificação de regra (intensidade 5)"
  - "Etapa 4 — Execução do cálculo (intensidade 4)"
  - "Etapa 5 — Conferência (intensidade 4)"
proxima_fase: projeto
```

---

*Documento de Definição concluído.*
*Ele consolida os insights, a persona principal, o mapa de empatia e o Journey Map do projeto.*
*Este documento serve como base para a próxima fase: Projeto (arquitetura de informação, fluxos e wireframes).*

## Relacionadas

- [[emgea-fcvs]]
- [[documento-discovery-fcvs]]
- [[documento-projeto-fcvs]]
