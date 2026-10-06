# EMGEA, Recuperação de Crédito

Última revisão: 2026-10-06

Status: PARADO por questão contratual, junto com o FCVS. Segue assim até o jurídico resolver ou o projeto ser encerrado. O conteúdo abaixo é o registro de 14/09 e vale como histórico.

## O que é
Ferramenta de IA para análise e gestão de documentos de processo jurídico da EMGEA. Tipo de caso em foco: execução de título extrajudicial com garantia real. A iniciativa central é o Second Brain, que organiza e consulta o conhecimento estruturado extraído dos processos.

## Estágio atual
Parado. Antes de parar, em setembro de 2026, estava em POC, estudando como fazer a análise sem alucinar.

## Expectativa de prazo
Provavelmente não fecha contrato em 2026. Contrato com governo envolve muita burocracia. Se vingar, é ganho acima do esperado, não premissa de plano. Nenhuma entrega trata esta frente como receita do ano.

## O problema que decide a frente
Precisão verificável. Citação de documento, página e trecho por afirmação, e recusa calibrada quando falta evidência. É o que separa a POC de algo que pode ir para produção num cliente de governo.

## O que já existe
Taxonomia documental v2, com cerca de 72 tipos e 133 subtipos. PRD do Second Brain escrito e revisado. Indexador de documento jurídico construído sobre o Forge.

## Risco conhecido
Qualidade de OCR. A auditoria do processo 0016104 documentou corrupção significativa do corpus: conteúdo inventado, páginas faltando, paginação fora de ordem. Não tratar como premissa resolvida.

## Frentes de desenvolvimento
Daniel na ingestão e OCR. Caio e Luiz em busca, RAG e agentes. Thiago e Henrique na camada do Second Brain. Risco registrado: as três podem construir camadas de interface sobrepostas sem contrato escrito entre elas.

## Vocabulário do domínio
Penhora, arrematação, adjudicação, carta precatória, embargos, FCVS, SFH, e-Proc, PJe, mandado, certidão de matrícula.

## Métricas que importam
PENDENTE: taxa de "não encontrado" incorreto e ponto de virada entre custo de token e valor entregue.

## Dono
Matheus em direção técnica, revisão de arquitetura e coordenação entre times.
