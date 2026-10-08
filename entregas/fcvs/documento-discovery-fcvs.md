---
tipo: entrega
status: feito
tags: [emgea, fcvs, discovery, pesquisa]
resumo: Discovery da ferramenta de cálculo do FCVS: contexto, mercado, concorrência e proto-personas.
---

# Documento de Discovery: Ferramenta de Cálculo do FCVS

**Data**: 16 de março de 2026
**Status**: Discovery concluído — pronto para fase de Definição
**Versão**: 1.0

---

## 1. Entendimento do Projeto

### 1.1 Contexto
O FCVS (Fundo de Compensação de Variações Salariais) é um fundo federal criado em 1967 para garantir a quitação de saldos remanescentes de financiamentos habitacionais do SFH. Gerido pelo Ministério da Fazenda e administrado pela Caixa Econômica Federal, o fundo acumulou um passivo vultoso nas décadas de 1980-90. Desde 1998, a União paga esse passivo via contratos de novação em títulos públicos (CVS) ao longo de 30 anos. A Lei 8.692/93 extinguiu a garantia para novos contratos, tornando o universo de contratos finito — mas o legado é imenso e complexo. Hoje, o cálculo dos valores do FCVS é realizado manualmente por analistas que interpretam PDFs, scripts e documentação contratual, aplicando regras que mudaram ao longo de décadas.

### 1.2 Problema ou Oportunidade
O cálculo manual do FCVS gera alto tempo de processamento, risco de erros humanos, falta de rastreabilidade, ausência de padronização e dificuldade na aplicação de regras condicionais complexas. A oportunidade é automatizar esse processo com uma engine parametrizável que leia regras estruturadas, aplique lógica condicional temporal e gere resultados com memória de cálculo completa e rastreável.

### 1.3 Público Envolvido
- **Analistas FCVS**: Usuários finais que executam os cálculos diariamente
- **Auditores e equipe de Compliance**: Validam resultados e rastreabilidade regulatória
- **Gestão financeira**: Consomem os resultados para decisões estratégicas
- **Equipe técnica**: Desenvolve e mantém a solução
- **Stakeholders secundários**: Auditoria interna, clientes/contratantes

### 1.4 Proto-personas

**Analista FCVS**
- **Contexto**: Profissional que domina as regras de cálculo do FCVS e trabalha diariamente com contratos habitacionais
- **Necessidade principal**: Calcular o FCVS corretamente em menos tempo, com confiança no resultado
- **Frustração principal**: Gasta horas interpretando documentos manualmente, com risco de erro e sem padronização
- **Job-to-be-Done**: "Quando recebo um contrato, quero calcular o FCVS correto rapidamente, para que eu não gaste horas interpretando documentos manualmente"

**Auditor/Compliance**
- **Contexto**: Profissional responsável por validar que os cálculos seguem as regras e normativas corretas
- **Necessidade principal**: Rastrear exatamente como cada cálculo foi feito, com qual regra e taxa
- **Frustração principal**: Dificuldade em reconstruir a lógica de cálculos manuais feitos por terceiros
- **Job-to-be-Done**: "Quando preciso validar um cálculo, quero ver exatamente qual regra e taxa foram aplicadas, para que eu tenha confiança e rastreabilidade completa"

### 1.5 Resultado Esperado
- Redução de 90% no tempo de cálculo comparado ao processo manual
- 99.9% de precisão comparada com cálculos validados
- 100% de cobertura das regras de cálculo documentadas
- Zero erros de cálculo em produção
- Rastreabilidade completa de cada resultado

### 1.6 Restrições Conhecidas
- Documentação contratual pode estar incompleta ou ambígua
- Regras mudaram ao longo de décadas, com exceções e condições sobrepostas
- MVP sem integração bancária, processamento de pagamentos ou workflow de aprovação
- Precisão obrigatória de 2 casas decimais para valores monetários
- Universo de contratos finito (Lei 8.692/93 extinguiu novos contratos com garantia FCVS)

---

## 2. Estudo do Mercado

### 2.1 Segmento e Categoria
Ferramenta de automação de cálculos regulatórios no setor habitacional brasileiro — na interseção entre RegTech (tecnologia regulatória) e GovTech (tecnologia para gestão pública).

### 2.2 Maturidade Digital do Setor
Baixa a média. O FCVS é administrado pela Caixa Econômica Federal com processos ainda dependentes de análise manual. A busca confirmou que há rotinas sequer implementadas no sistema atual (como critérios relacionados ao valor de compra e venda por falta de campo no sistema FH1). Defasagem tecnológica significativa.

### 2.3 Padrões e Expectativas do Setor
- Analistas financeiros esperam rastreabilidade completa — cada resultado precisa mostrar "como chegou ali"
- Confiança é mais importante que velocidade neste contexto — erro de cálculo tem impacto jurídico e financeiro
- Interfaces no setor público/financeiro tendem a ser densas em dados; expectativa de clareza informacional, não minimalismo
- Exportação e relatórios são funcionalidades essenciais para auditoria e compliance
- Saldos devedores reajustados mensalmente com base em índices do Banco de Índices, adicionando complexidade temporal

### 2.4 Tendências Relevantes
- Mercado brasileiro de RegTech em crescimento, com empresas automatizando cálculos tributários com IA e engines parametrizáveis
- Motores de cálculo na nuvem demonstram viabilidade de engines baseadas em regras com atualização legislativa automática
- Receita Federal lançou ferramenta oficial de cálculo da Reforma Tributária em formato web + componente embarcável — validando o modelo de duplo formato
- Crescimento de abordagens "engine + API" que desacoplam o motor de cálculo da interface

### 2.5 Oportunidades e Riscos de Mercado

**Oportunidades**:
- Oceano azul — não existe solução comercial específica para cálculo FCVS
- Base de usuários cativa (analistas que fazem o cálculo manual hoje)
- Demanda por compliance e rastreabilidade fortalece a proposta de valor
- Potencial de expansão para outros cálculos habitacionais regulatórios

**Riscos**:
- Complexidade das regras históricas acumuladas pode ser subestimada
- Documentação legada pode ser insuficiente para alimentar 100% das regras
- Resistência à mudança em ambiente público/financeiro conservador
- Ausência de referências de mercado dificulta benchmark de UX

### 2.6 Evidências Externas
- [Tesouro Transparente — Histórico do FCVS (2024)](https://www.tesourotransparente.gov.br/publicacoes/historico-do-fundo-de-compensacao-de-variacoes-salariais-fcvs/2024/26): Confirma complexidade e escala do fundo
- [Manual de Normas e Procedimentos do FCVS (CGU)](https://repositorio.cgu.gov.br/bitstream/1/69885/3/Manual_de_Normas_e_Procedimentos_Operacionais_do_FCVS.pdf): Documenta regras operacionais que sustentam a lógica de cálculo
- [Roteiro de Análise CCFCVS (LegisWeb)](https://www.legisweb.com.br/legislacao/?id=466633): Critérios normativos de análise
- [Caixa — Fundos de Governo (FCVS)](https://fundosdegoverno.caixa.gov.br/detalhe-fundo/9/FCVS): Portal oficial de administração do fundo

### 2.7 Leitura Crítica
O FCVS é um nicho extremamente especializado. A ausência de soluções comerciais específicas representa oportunidade clara, mas também risco pela falta de referências. A abordagem de engine parametrizável é validada pelo mercado RegTech mais amplo. O fator crítico de adoção será a confiança do usuário — que depende diretamente da rastreabilidade e transparência do cálculo.

---

## 3. Análise Competitiva

### 3.1 Mapa de Concorrentes e Referências

| Tipo | Nome | Proposta de Valor | UX Destaque | Fragilidade |
|------|------|-------------------|-------------|-------------|
| Benchmark | [Sovos Taxrules](https://sovos.com/pt-br/tributos/produtos/determinacao-calculo-tributos-taxrules/) | Engine de cálculo de alta performance (150/s) integrada ao ERP | Cálculo em tempo real, transparente | Sem aderência a cálculos habitacionais |
| Benchmark | [Thomson Reuters ONESOURCE](https://www.thomsonreuters.com.br/pt/tax-accounting/onesource-mastersaf/produtos/onesource-determination.html) | Motor de cálculo com atualização automática de regras tributárias | Rastreabilidade de regra/taxa aplicada | Complexidade de setup, voltado para grande empresa |
| Benchmark | [Avalara AvaTax](https://www.avalara.com/br/pt/blog/2025/08/erp-em-nuvem-gestao-fiscal.html) | Engine na nuvem com milhões de regras e 70k jurisdições | API simples, cálculo em tempo real | Sem contexto habitacional |
| Referência | [Calculadora Receita Federal](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/julho/receita-federal-libera-ferramenta-oficial-de-calculo-da-reforma-tributaria-sobre-o-consumo) | Ferramenta oficial da Reforma Tributária — web + componente | Acessível, duplo formato (web + embarcável) | Escopo limitado à reforma do consumo |
| Referência | [e-Auditoria](https://www.e-auditoria.com.br/blog/software-de-precificacao-para-a-reforma-tributaria/) | IA fiscal que identifica erros e calcula riscos | Identificação proativa de inconsistências | Foco em precificação, não cálculo contratual |
| Substituto | Processo manual atual | Analista interpreta PDFs e aplica regras manualmente | Flexibilidade total e controle do especialista | Lento, propenso a erro, sem rastreabilidade |

### 3.2 Padrões Recorrentes
- Engines parametrizáveis com regras e vigência temporal são o padrão de mercado
- Rastreabilidade ("por que este valor?") é funcionalidade mínima em soluções sérias
- Atualização automática de regras/taxas é diferencial competitivo relevante
- APIs e componentes embarcáveis dominam sobre interfaces standalone
- Memória de cálculo detalhada é expectativa mínima para compliance

### 3.3 Boas Práticas de UX Percebidas
- Transparência do cálculo passo a passo (ONESOURCE, Sovos)
- Validação proativa alertando inconsistências antes de finalizar (e-Auditoria)
- Duplo formato de entrega: web para uso manual + componente para integração (Receita Federal)
- Feedback imediato conforme parâmetros mudam (Avalara)

### 3.4 Fragilidades Comuns
- Nenhuma solução endereça décadas de regras históricas com vigências sobrepostas
- Interfaces de engines tributárias tendem a ser técnicas demais para não-especialistas
- Mensagens de erro em contexto regulatório raramente explicam "o que fazer agora"
- Falta de suporte a contratos com exceções e lógica condicional complexa

### 3.5 Oportunidades de Diferenciação
- **Nicho sem concorrência direta**: Não existe engine de cálculo FCVS no mercado
- **Memória de cálculo como diferencial-chave**: Explicar por que aquela regra foi escolhida, não apenas mostrar o resultado
- **Validação contra histórico**: Comparação automática com cálculos anteriormente validados
- **Tratamento de exceções como funcionalidade**: Lógica condicional visível e rastreável

### 3.6 Evidências Externas
- [Sovos Taxrules](https://sovos.com/pt-br/tributos/produtos/determinacao-calculo-tributos-taxrules/): Engine de alta performance integrada a ERP
- [Thomson Reuters ONESOURCE](https://www.thomsonreuters.com.br/pt/tax-accounting/onesource-mastersaf/produtos/onesource-determination.html): Motor com rastreabilidade de regras
- [Motores de cálculo — nova fronteira da automação tributária](https://www.reformatributaria.com/opiniao/opiniao-motores-de-calculo-a-nova-fronteira-da-automacao-tributaria-na-era-da-reforma-tributaria/): Artigo sobre tendência de engines parametrizáveis

### 3.7 Leitura Crítica
O cenário confirma que a abordagem técnica é madura no mercado RegTech. A oportunidade está no nicho: ninguém resolve o FCVS. Os analistas que fazem manualmente são público cativo que migrará se a ferramenta for confiável. O risco é subestimar as exceções e entregar uma engine que funciona no caso padrão mas falha nos edge cases.

---

## 4. Coleta de Dados

### 4.1 Dados Disponíveis
- Documentação contratual (PDFs, scripts, documentos) com regras de cálculo
- Regras de cálculo com vigência documentadas
- Histórico de taxas via Banco de Índices
- Exemplos de cálculos históricos (validação)
- Lógica condicional e exceções documentadas
- Manual de Normas e Procedimentos do FCVS (CGU)
- Roteiro de Análise CCFCVS
- Estrutura de dados de entrada e saída (definida no PRD)
- 3 casos de uso documentados (padrão, exceção, validação)
- Métricas de sucesso definidas no PRD

### 4.2 Dados Ausentes
- Quantidade total de contratos a processar
- Catálogo completo de regras com todas as vigências históricas
- Perfil detalhado dos analistas (experiência, frequência de uso, ferramentas atuais)
- Métricas baseline do processo manual (tempo/cálculo, taxa de erro, volume mensal)
- Inventário completo de exceções e condições especiais
- Design system ou padrão visual existente
- Stack tecnológica do time de desenvolvimento
- Legibilidade dos PDFs (texto pesquisável vs. scans de papel)

### 4.3 Hipóteses em Aberto

| Premissa | Impacto se Errada | Nível de Certeza | Método de Validação |
|----------|-------------------|------------------|---------------------|
| Documentação cobre 100% das regras | Alto — regras faltantes = cálculos incorretos | Média | Workshop com analistas seniores |
| Analistas confiarão se virem memória de cálculo | Alto — sem confiança não há adoção | Média | Entrevistas + teste de conceito |
| PDFs são legíveis por máquina | Alto — muda estratégia de extração | Baixa | Amostragem de 10-20 documentos |
| Volume de exceções é gerenciável | Alto — exceções não cobertas = falhas | Baixa | Inventário com analistas experientes |
| Interface CLI/web básica basta para MVP | Médio — pode limitar adoção | Média | Entrevistas com analistas |
| Resposta < 2s viável para regras complexas | Médio — frustra uso em lote | Média | Prova de conceito técnica |

### 4.4 Métricas de UX Baseline

| Métrica | Valor Atual | Fonte | Confiabilidade |
|---------|-------------|-------|----------------|
| Tempo médio por cálculo | N/D | A coletar com analistas | N/D |
| Taxa de erro atual | N/D | A coletar com analistas | N/D |
| Volume mensal de cálculos | N/D | A coletar com gestão | N/D |
| Satisfação (NPS/SUS) | N/D | Sem ferramenta atual | N/D |
| Taxa de retrabalho | N/D — mencionado qualitativamente | A coletar | N/D |

### 4.5 Plano de Coleta Priorizado

1. **Validar completude das regras** — Workshop de 2-3h com analistas seniores + comparativo com Manual de Normas
2. **Confirmar legibilidade dos PDFs** — Amostragem técnica de 10-20 documentos representativos
3. **Medir baseline do processo manual** — Shadowing + cronometragem de 5-10 cálculos reais
4. **Inventariar exceções** — Entrevistas com 3-5 analistas mais experientes
5. **Mapear perfil dos analistas** — Entrevistas contextuais rápidas (15-20 min) com 5 analistas

---

## 5. Diagnóstico Inicial

### 5.1 Principais Achados
1. O FCVS é um nicho sem concorrência direta — oportunidade clara de oceano azul
2. O processo manual atual é insustentável em escala, com riscos documentados de erro e retrabalho
3. A abordagem de engine parametrizável é madura e validada no mercado RegTech
4. Rastreabilidade e memória de cálculo são os fatores #1 de confiança e adoção
5. O universo de contratos é finito (Lei 8.692/93), o que delimita o escopo mas não reduz a complexidade
6. A complexidade temporal (décadas de regras com vigências sobrepostas) é o maior desafio técnico
7. Nenhuma métrica baseline do processo atual está disponível — precisa ser coletada antes de medir sucesso

### 5.2 Principais Incertezas
- Completude da documentação de regras (risco #1)
- Legibilidade dos PDFs fonte (impacta viabilidade de extração)
- Volume real de exceções e condições especiais
- Perfil e expectativas reais dos analistas
- Viabilidade de performance < 2s para regras complexas

### 5.3 Riscos Iniciais

| Risco | Severidade | Probabilidade |
|-------|-----------|---------------|
| Documentação incompleta de regras | Alta | Média |
| Regras mal interpretadas pela engine | Alta | Média |
| Casos extremos não cobertos | Média | Alta |
| PDFs ilegíveis (scans) | Alta | Desconhecida |
| Resistência à adoção por analistas | Média | Média |
| Mudanças regulatórias futuras | Média | Baixa |

### 5.4 Premissas que Sustentam a Iniciativa
- O cálculo manual é o gargalo real e mensurável
- Existe documentação suficiente para extrair a maioria das regras
- Analistas querem automatização se houver transparência
- Engine parametrizável é a arquitetura adequada
- MVP pode validar a abordagem antes de investimento completo

### 5.5 Pontos Críticos de Atenção
- A extração de regras é pré-requisito de tudo — se falhar, o projeto trava
- A confiança do analista é construída pela transparência, não pela interface bonita
- Exceções e edge cases são mais comuns que o cenário padrão — o sistema precisa tratar isso como funcionalidade, não como erro
- Sem baseline medido, as metas de 90% de redução não podem ser comprovadas

### 5.6 Princípios de Design Iniciais

- **Transparência radical**: Cada resultado deve mostrar como foi calculado, com qual regra, qual taxa e por que essa metodologia foi escolhida. Sem caixa preta.
- **Confiança antes de velocidade**: O usuário precisa confiar no resultado antes de se importar com a rapidez. Memória de cálculo, validação contra histórico e alertas de inconsistência são prioridade sobre otimização de performance.
- **Exceção como funcionalidade**: Casos especiais e lógica condicional devem ser visíveis e rastreáveis, não escondidos na engine. O sistema deve explicar quando uma regra alternativa foi aplicada e por quê.
- **Clareza informacional sobre minimalismo**: O contexto é denso em dados por natureza. A interface deve organizar e hierarquizar informação, não escondê-la. Escaneabilidade > estética.
- **Rastreabilidade de ponta a ponta**: De cada resultado final deve ser possível voltar até a regra, a taxa, a vigência e o documento-fonte. Isso é requisito de compliance e confiança.

---

## 6. Recomendações de Próximos Passos

### Para a Fase de Definição (próxima skill)
- Definir personas detalhadas a partir das proto-personas (Analista FCVS e Auditor/Compliance)
- Mapear jornadas completas dos dois perfis de usuário
- Estruturar requisitos de UX priorizados com base nos princípios de design
- Definir critérios de sucesso mensuráveis conectados ao baseline (quando coletado)

### Ações Complementares
- Workshop de regras com analistas seniores (prioridade 1)
- Amostragem de PDFs para viabilidade de extração (prioridade 1)
- Shadowing de 5-10 cálculos manuais para baseline (prioridade 2)
- Entrevistas contextuais com 5 analistas (prioridade 2)
- Inventário de exceções com analistas experientes (prioridade 2)

---

## Metadados para Pipeline

```yaml
discovery_status: completo
data_conclusao: 2026-03-16
proto_personas:
  - Analista FCVS
  - Auditor/Compliance
jtbd_identificados:
  - "Calcular FCVS correto rapidamente sem interpretar documentos manualmente"
  - "Rastrear regra e taxa aplicadas para ter confiança e rastreabilidade"
hipoteses_prioritarias:
  - "Documentação cobre 100% das regras"
  - "Analistas confiarão se virem memória de cálculo"
  - "PDFs são legíveis por máquina"
  - "Volume de exceções é gerenciável"
  - "Interface básica basta para MVP"
metricas_baseline: indisponivel
principios_design:
  - "Transparência radical"
  - "Confiança antes de velocidade"
  - "Exceção como funcionalidade"
  - "Clareza informacional sobre minimalismo"
  - "Rastreabilidade de ponta a ponta"
restricoes:
  - "Documentação possivelmente incompleta"
  - "Décadas de regras com vigências sobrepostas"
  - "MVP sem integração bancária ou workflow"
  - "Precisão 2 casas decimais obrigatória"
proxima_fase: definicao
```

---

*Documento de Discovery concluído.*
*Este documento serve como base para a próxima fase: Definição (personas, jornadas, requisitos de UX e priorização).*

## Relacionadas

- [[emgea-fcvs]]
- [[documento-definicao-fcvs]]
- [[prd-jornada-handoff]]
