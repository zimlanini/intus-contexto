# Tipos de documentos EMGEA, versão 2 com campos de extração

Camada detalhada sobre a lista simples. Para cada tipo de documento, este arquivo define o que ele é, quem aparece nele, quais datas importam e quais dados o agente precisa retirar. A base é a varredura dos dois processos da pasta EMGEA 2: a execução de MG (0016104-61.1994.4.01.3800, autuada em 29/07/1994, valor da causa R$ 9.354.206,62) e a execução do RJ (0062963-08.1996.4.02.5104, autuada em 15/10/1996).

Os exemplos citados vêm dos autos. Onde um campo não existe naquele tipo de documento, o registro traz "não se aplica" em vez de campo vazio, porque a diferença entre ausente e inexistente muda a leitura do agente.

## Campos comuns a qualquer documento

Todo documento juntado carrega um rodapé no padrão `Processo 0016104-61.1994.4.01.3800/MG, Evento 305, CONTR3, Página 31`. Esse rodapé resolve sozinho a exigência do docx de questionamentos de indicar a localização do documento nos autos. O agente deve extrair sempre:

- Número do processo e sigla do tribunal
- Número do evento
- Código do documento no evento (CONTR3, PET1, PLAN2, OUT85)
- Número da página dentro do documento

Antes de cada evento o sistema insere uma página de separação com metadados legíveis: Evento, Data com hora, Usuário responsável com nome e papel (advogado, servidor de secretaria, procurador, automatização), Processo e Sequência Evento. Esses cinco campos são a data e a autoria confiáveis de qualquer peça, mesmo quando o corpo do documento está ilegível por digitalização ruim.

Peças eletrônicas trazem ainda um rodapé de assinatura: `Protocolada por cristiano seabra dan em 06/06/2017 21:22:42`, seguido do certificado digital e do número do documento no e-Proc. É a data de protocolo, que pode ser diferente da data em que a peça foi redigida.

### Códigos de documento observados nos dois processos

A frequência mostra onde está o volume: OUT (4.764 páginas), TRASLADO (2.619), VOL (1.178), CONTR (188), PROC (140), CERT (59), PET (53), DESPADEC (53), PLAN (38), COMP (32), PET_INTERCORRENTE (30), ANEXO (22), OFIC (21), ESTATUTO (12), CONTRSOCIAL (12), INT (10), AGRAVO (9), SUBS (5), PED_HABILIT (4), EXECUMPR (4), ACORDO (4), BACENJUD (3), INIC (2), ATOORD (2), DESPINSP (2).

Um alerta que muda o desenho do agente: o código não descreve o conteúdo de forma segura. No processo de MG, o documento marcado como INIC1 no evento 274 não é a petição inicial, é a certidão de migração do processo físico para o PJe, datada de 13/11/2020. A petição inicial de 1994 está digitalizada dentro dos volumes (VOL, TRASLADO), sem código próprio. Em processos migrados, a classificação precisa vir do conteúdo, não do código do arquivo.

---

## Origem do crédito

### Contrato de mútuo com garantia hipotecária

**Definição.** Empréstimo concedido pelo agente financeiro com imóvel dado em garantia real. É o título executivo extrajudicial que fundamenta a execução.

**Partes.** Credor original (Caixa Econômica Federal ou outro agente do SFH), mutuário devedor, fiadores e avalistas, intervenientes garantidores hipotecários, cônjuges anuentes.

**Data de assinatura.** Data da lavratura do instrumento. No processo do RJ o demonstrativo registra DT. ESCRITURA 14/02/1992.

**Datas relevantes.** Assinatura, vencimento da primeira prestação, vencimento da última prestação, registro da hipoteca no cartório de imóveis, data do vencimento antecipado quando declarado.

**Informações relevantes.** Número do contrato (no RJ, 201974502315-2), valor financiado, prazo total e prazo remanescente (PZO 900, PZR 570), taxa de juros nominal anual (15,0000%) e efetiva anual (16,0754%), sistema financeiro e código do produto, descrição do imóvel com matrícula e cartório, grau da hipoteca, cláusula de vencimento antecipado, unidade operacional e agência.

### Contrato de compra e venda ou promessa de compra e venda

**Definição.** Negócio de aquisição do imóvel vinculado ao financiamento. Aparece 110 vezes na forma compra e venda e 15 vezes como promessa.

**Partes.** Vendedor ou incorporadora, comprador que se torna mutuário, agente financeiro interveniente.

**Data de assinatura.** Data do instrumento particular ou da escritura.

**Datas relevantes.** Assinatura, quitação do preço, entrega das chaves, registro no cartório.

**Informações relevantes.** Identificação da unidade (bloco, apartamento, vaga de garagem), preço, forma de pagamento, se há cessão de direitos posterior. Serve para ligar o devedor formal ao ocupante real do imóvel.

### Escritura pública

**Definição.** Versão lavrada em cartório de notas do contrato ou da constituição da hipoteca. Aparece em 9 dos 12 arquivos.

**Partes.** Outorgantes, outorgados, tabelião.

**Data de assinatura.** Data da lavratura, com livro e folha.

**Datas relevantes.** Lavratura e registro subsequente na matrícula.

**Informações relevantes.** Cartório, livro, folha, número do ato, qualificação completa das partes com CPF e CNPJ, descrição do imóvel, valor declarado.

### Certidão de matrícula do imóvel

**Definição.** Registro do imóvel no cartório de registro de imóveis, com cadeia de propriedade, hipotecas, penhoras e indisponibilidades averbadas.

**Partes.** Titular registrado, credores hipotecários, oficial do registro.

**Data de assinatura.** Data de emissão da certidão pelo oficial.

**Datas relevantes.** Emissão, e a data de cada averbação relevante: registro da hipoteca, averbação da penhora, averbação da baixa, averbação de indisponibilidade.

**Informações relevantes.** Número da matrícula e cartório (no MG, matrículas 41.903, 41.905, 41.906, 42.794, 47.514, 47.845, 33.355; no RJ, 11.267, 12.452, 13.616, 13.780, 14.133, 14.335, 14.904), área do imóvel (Gleba 6-B com 79.640,37 m², Gleba 6-A com 127.004,57 m², Gleba 2 com 339.897,37 m²), titular atual, ônus ativos, ordem cronológica das penhoras, que define preferência em concurso de credores.

A duplicidade de certidões da mesma matrícula é ruído declarado pelo time jurídico. O agente deve reconhecer a repetição pelo número da matrícula e manter apenas a emissão mais recente.

### Demonstrativo de débito SIACI

**Definição.** Extrato gerado pelo sistema da EMGEA com a posição da dívida em uma data. É o documento que responde diretamente à pergunta sobre o valor devido.

**Partes.** EMGEA como credora e mutuário nomeado no contrato.

**Data de assinatura.** Não se aplica. O documento traz emitente e data de processamento (USUARIO C078747, 11/09/2019 18:12:12).

**Datas relevantes.** Data de referência do saldo, data da escritura, data da prestação vencida, período de atraso.

**Informações relevantes.** No exemplo do RJ, evento 546: número do contrato 201974502315.2, mutuário STEMIL SOC TEC DE MON TEC IND LTDA, CNPJ 29.061.595/0001-77, saldo devedor em 11/09/2019 de R$ 6.570.060,82, encargo de R$ 82.125,78, quantidade de prestações em atraso 331, período de 02/1992 a 08/2019, encargo em atraso R$ 20.740.734,96, mora e multa R$ 235.889.423,25, total em atraso R$ 256.630.158,21, dívida total R$ 263.276.869,72, garantia atual R$ 6.570.060,90, despesas recuperáveis R$ 49.497,41, códigos de situação 041 101 019 063 229.

A distância entre garantia (R$ 6,5 milhões) e dívida total (R$ 263 milhões) é o dado que define a viabilidade da recuperação. O agente deve calcular essa razão sempre que os dois valores aparecerem.

### Relatório de prestações em atraso

**Definição.** Detalhamento prestação a prestação da dívida, gerado junto com o demonstrativo.

**Partes.** EMGEA e mutuário.

**Data de assinatura.** Não se aplica. Traz data e hora de emissão.

**Datas relevantes.** Vencimento de cada prestação, da mais antiga (14/02/1992 no RJ) à mais recente.

**Informações relevantes.** Por linha: vencimento, número da prestação, valor líquido, correção monetária, juros moratórios, juros remuneratórios, IOF complementar, diferença de prestação anterior, multa e valor a pagar. A situação especial vem codificada no cabeçalho, como LIMINAR/EXECUCAO/ADJUDICADO/ARREMATADO, que informa em uma linha o estágio da recuperação.

### Documentos de FCVS

**Definição.** Registros do Fundo de Compensação de Variações Salariais, ligados a créditos habitacionais cedidos entre agentes. Aparecem 43 vezes.

**Partes.** EMGEA, agente cedente, União como gestora do fundo.

**Data de assinatura.** Data do instrumento de cessão, quando houver.

**Datas relevantes.** Cessão, homologação, novação.

**Informações relevantes.** Se o crédito discutido nos autos tem parcela coberta pelo FCVS, porque isso reduz o valor efetivamente recuperável pela EMGEA.

---

## Titularidade do crédito e representação da EMGEA

### Petição de habilitação ou sucessão processual

**Definição.** Pedido para que a EMGEA assuma o polo ativo antes ocupado pela Caixa Econômica Federal. Sem essa peça, a leitura das partes na capa fica errada. No processo de MG, a autuação de 1994 registra CAIXA ECONOMICA FEDERAL como exequente, e a capa atual registra EMPRESA GESTORA DE ATIVOS.

**Partes.** CEF como cedente, EMGEA como cessionária, executados.

**Data de assinatura.** Data de protocolo da petição.

**Datas relevantes.** Protocolo, decisão que defere a habilitação, retificação da autuação.

**Informações relevantes.** Fundamento legal da transferência (art. 11 da Medida Provisória 2.196-3 de 24/08/2001, Decreto 3.848 de 26/06/2001), relação de contratos cedidos, se a habilitação foi deferida e em que evento.

### Contrato de prestação de serviços entre EMGEA e CAIXA

**Definição.** Contrato administrativo que delega à CAIXA a administração dos créditos da EMGEA, incluindo serviços jurídicos, contábeis e de engenharia. Presente no MG, evento 309, CONTR2.

**Partes.** EMGEA, CNPJ 04.527.335/0001-13, sede no Setor Bancário Sul em Brasília, representada pelo Diretor-Presidente Roberto Meira de Almeida Barrete. CAIXA, CNPJ 00.360.305/0001-04, representada pelo Superintendente Nacional Felipe Moreira Cruzeiro.

**Data de assinatura.** Contrato Administrativo 0014/2019, vigência a partir de 02/05/2019.

**Datas relevantes.** Início da vigência, encerramento da prestação de serviços (a EMGEA afirma nos autos que terminou em 2019), data da rescisão que abre a discussão de honorários.

**Informações relevantes.** Cláusulas de obrigação da CAIXA, entre elas elaborar laudo de avaliação dos imóveis dados em garantia e repassar à EMGEA os valores recebidos. A cláusula 5ª, parágrafos quarto e quinto, trata dos honorários em caso de rescisão e é o fundamento da disputa com a ADVOCEF. Contrato citado também como número 14/2019.

### Estatuto social e atos societários

**Definição.** Documentos que comprovam a existência e a representação da EMGEA e da ADVOCEF.

**Partes.** Pessoa jurídica e seus representantes.

**Data de assinatura.** Data da assembleia. No caso da EMGEA, Ata da 3ª Assembleia Geral Extraordinária de 24/07/2018, publicada no Diário Oficial da União em 23/11/2018.

**Datas relevantes.** Aprovação, publicação, eleição dos administradores (reunião extraordinária de 06/05/2016, Ata 034).

**Informações relevantes.** Ruído declarado pelo time jurídico. O agente deve marcar e não analisar, salvo se houver questionamento de representação nos autos.

---

## Estrutura do processo

### Capa do processo

**Definição.** Folha de rosto gerada pelo sistema do tribunal. É o documento de maior densidade de informação por página em todo o conjunto.

**Partes.** Exequente com CNPJ, executados pessoa física e jurídica com CPF e CNPJ, procuradores de cada polo com número de OAB.

**Data de assinatura.** Não se aplica.

**Datas relevantes.** Data de autuação (MG em 29/07/1994, RJ em 15/10/1996) e data de geração da capa.

**Informações relevantes.** Classe da ação (Execução de Título Extrajudicial), competência, situação atual (MOVIMENTO-AGUARDA DESPACHO nos dois), órgão julgador, juiz, valor da causa, código e descrição do assunto (02190326, Mútuo, Espécies de contratos, Obrigações, Direito Civil), nível de sigilo, flags booleanas (grande devedor, penhora no rosto dos autos, penhora ou apreensão de bens, admitida execução, petição urgente) e a lista de processos relacionados.

A lista de relacionados é um sinal de escala: o processo do RJ tem dezenas de apelações cíveis vinculadas no TRF2, cada uma um autos apartado. O processo de MG tem dois dependentes, 0030734-15.2000.4.01.3800 e 0013227-17.1995.4.01.3800.

### Listagem de eventos

**Definição.** Andamento cronológico numerado do processo. No MG são 308 eventos até 04/11/2025, no RJ mais de 780.

**Partes.** Usuário responsável por cada movimentação.

**Data de assinatura.** Não se aplica.

**Datas relevantes.** Data e hora de cada evento, e os intervalos entre eles.

**Informações relevantes.** É a espinha dorsal da linha do tempo. Descrições que mudam o estado da recuperação: "Processo Suspenso por Execução Frustrada" (MG, 30/01/2025), "Levantada a suspensão ou sobrestamento dos autos" (MG, 03/11/2025), "Recebido o mandado para cumprimento pelo oficial de justiça", "Ato cumprido pela parte ou interessado, depósito de bens ou dinheiro", "Desentranhado o documento", "Ato Ordinatório, Processo Migrado de Sistema" (MG, 21/08/2024).

Grandes intervalos sem movimentação útil, como os anos de "Juntado(a)" e "Recebidos os autos" entre 2010 e 2019 no MG, são o indicador direto de processo parado. O agente deve medir esses vazios.

### Petição inicial da execução

**Definição.** Peça que abre a execução, com o pedido, o valor cobrado e a causa de pedir.

**Partes.** Exequente original e todos os executados, incluindo devedores principais, fiadores e garantidores.

**Data de assinatura.** Data de protocolo. No MG, próxima à autuação de 29/07/1994.

**Datas relevantes.** Protocolo, autuação, despacho inicial que ordena a citação.

**Informações relevantes.** Valor da execução na data da propositura, contrato que embasa o pedido, relação de bens indicados à penhora, pedido de citação. Nos dois processos a inicial está digitalizada dentro dos volumes físicos, sem código próprio de documento.

### Petição intermediária ou intercorrente

**Definição.** Qualquer manifestação das partes durante o processo. Código PET ou PET_INTERCORRENTE.

**Partes.** Peticionante e advogados signatários com OAB.

**Data de assinatura.** Data de protocolo registrada na página de separação e no rodapé de assinatura eletrônica.

**Datas relevantes.** Protocolo e o evento a que a petição se refere, indicado no próprio nome do evento (PETICAO REFER AO EVENTO 782).

**Informações relevantes.** O pedido concreto. Exemplo do MG, evento 306, protocolado em 31/10/2025 pelos advogados Kassim Schneider Raslan (OAB/MG 80.722) e Giovanni Câmara de Morais (OAB/MG 77.618): pedido de leilão judicial das glebas já penhoradas e avaliadas, com laudo às folhas 290 a 335, listando as matrículas 47.845, 47.514 e 41.906. Uma única petição entrega estágio, bens, avaliação e localização do laudo.

---

## Atos do juízo

### Despacho

**Definição.** Ato que movimenta o processo sem resolver questão de mérito. Código DESPADEC.

**Partes.** Juiz e destinatários da ordem.

**Data de assinatura.** Data da assinatura eletrônica do magistrado.

**Datas relevantes.** Assinatura, publicação, prazo que abre para as partes.

**Informações relevantes.** O comando concreto: intime-se, cite-se, expeça-se mandado, diga a exequente. E o prazo fixado, que alimenta o controle de decurso.

### Decisão interlocutória

**Definição.** Ato que resolve questão pontual no curso do processo. Código DESPADEC, mesmo código do despacho, o que exige separação por conteúdo.

**Partes.** Juiz, parte requerente, parte contrária.

**Data de assinatura.** Data da assinatura eletrônica.

**Datas relevantes.** Assinatura, intimação das partes, início do prazo de agravo.

**Informações relevantes.** O que foi deferido ou indeferido, e sobre qual bem ou valor. Decisões que importam para recuperação: deferimento de penhora, autorização de leilão, deferimento de levantamento de valores, reconhecimento de prescrição, suspensão por execução frustrada.

### Sentença

**Definição.** Decisão que encerra uma fase do processo. É o termo mais frequente do conjunto, com 2.184 ocorrências.

**Partes.** Juiz e as partes da ação ou do incidente julgado.

**Data de assinatura.** Data da prolação.

**Datas relevantes.** Prolação, publicação, prazo de apelação, trânsito em julgado.

**Informações relevantes.** Dispositivo (procedente, improcedente, extinção com ou sem mérito), condenação em honorários e percentual, e a qual autos a sentença pertence. Em execuções antigas, boa parte das sentenças pertence aos embargos apensos, não à execução principal.

### Relatório e voto

**Definição.** Peça do julgamento colegiado. O relator resume o caso e apresenta seu voto. Aparece 19 vezes só na parte 8 do processo do RJ.

**Partes.** Desembargador relator, órgão julgador, partes.

**Data de assinatura.** Data da sessão de julgamento.

**Datas relevantes.** Julgamento, publicação do acórdão.

**Informações relevantes.** Histórico processual condensado, que serve de atalho para reconstruir a linha do tempo sem ler os autos inteiros. Fundamentação e resultado do voto.

### Acórdão

**Definição.** Decisão colegiada do tribunal. Vinte ocorrências na parte 8 do RJ, com eventos de juntada e julgamento entre 2019 e 2020.

**Partes.** Turma julgadora, relator, apelante, apelado.

**Data de assinatura.** Data da sessão.

**Datas relevantes.** Sessão de julgamento, publicação, prazo recursal, trânsito em julgado.

**Informações relevantes.** Ementa, resultado por unanimidade ou maioria, número do recurso, se houve reforma ou manutenção da sentença. O acórdão define se a execução volta a andar ou continua travada.

### Decisão de admissibilidade de recurso especial

**Definição.** Ato do vice-presidente do tribunal que admite ou barra a subida do recurso ao STJ. Seis ocorrências na parte 8 do RJ, com eventos de recurso especial não admitido.

**Partes.** Vice-presidência do tribunal, recorrente, recorrido.

**Data de assinatura.** Data da decisão (exemplo em 14/07/2020).

**Datas relevantes.** Decisão, intimação, prazo de agravo em recurso especial.

**Informações relevantes.** Fundamento da inadmissão (súmula 7, súmula 83, falta de prequestionamento) e se houve agravo subsequente.

### Acórdão e decisão do STJ ou STF

**Definição.** Julgamento nas cortes superiores. Seis acórdãos e quatro decisões na parte 8 do RJ, com evento "Recebidos os autos do STJ" em 28/04/2021.

**Partes.** Ministro relator, turma, partes.

**Data de assinatura.** Data do julgamento monocrático ou colegiado.

**Datas relevantes.** Julgamento, baixa dos autos à origem, trânsito em julgado.

**Informações relevantes.** Resultado e data de retorno dos autos, que marca quando a execução pôde retomar.

### Certidão de trânsito em julgado

**Definição.** Atesta que não cabe mais recurso.

**Partes.** Secretaria do juízo.

**Data de assinatura.** Data da certificação.

**Datas relevantes.** Data do trânsito, que é a data a partir da qual a expropriação pode seguir sem risco de reforma.

**Informações relevantes.** A qual decisão o trânsito se refere, e em quais autos.

---

## Comunicação e cumprimento de atos

### Mandado de citação

**Definição.** Ordem para chamar o executado ao processo. Dezenove ocorrências em três arquivos.

**Partes.** Juízo expedidor, oficial de justiça, citando.

**Data de assinatura.** Data em que o diretor de secretaria assina, por ordem do juiz.

**Datas relevantes.** Expedição, cumprimento pelo oficial, juntada aos autos. O prazo de 10 dias para embargos corre do cumprimento.

**Informações relevantes.** Endereço da diligência, valor a ser pago para elidir a penhora, advertência sobre embargos, entrega da contrafé.

### Mandado de penhora e avaliação

**Definição.** Ordem para o oficial penhorar e avaliar bens. Aparece 366 vezes, em 10 dos 12 arquivos, o que confirma penhora como o eixo central destes processos.

**Partes.** Juízo, oficial de justiça, executado, depositário nomeado.

**Data de assinatura.** Data da expedição, assinada pela direção de secretaria (exemplo em Belo Horizonte, agosto de 1995, assinado por Rubens Rios Câmara, Diretor de Secretaria da 23ª Vara).

**Datas relevantes.** Expedição, recebimento pelo oficial (o evento "Recebido o mandado para cumprimento pelo oficial de justiça" aparece cinco vezes só entre 2012 e 2013 no MG), cumprimento e devolução.

**Informações relevantes.** Bens a penhorar, valor da dívida atualizada no momento da expedição, nomeação do depositário e advertência de que não pode abrir mão do depósito sem autorização do juízo.

### Edital de citação

**Definição.** Citação por publicação quando o devedor não é localizado. Dezoito ocorrências.

**Partes.** Juízo, citando não localizado.

**Data de assinatura.** Data de expedição.

**Datas relevantes.** Publicação, prazo do edital, término do prazo, que marca a citação ficta.

**Informações relevantes.** Nome completo e qualificação do citando, prazo, veículo de publicação. Indica que as tentativas pessoais falharam, dado que pesa na avaliação de chance de recuperação.

### Carta precatória

**Definição.** Pedido de um juízo a outro para cumprir ato fora de sua jurisdição. Noventa e nove ocorrências em três arquivos.

**Partes.** Juízo deprecante, juízo deprecado, partes.

**Data de assinatura.** Data de expedição.

**Datas relevantes.** Expedição, distribuição no juízo deprecado, cumprimento, devolução. A soma desses intervalos costuma explicar anos de paralisia.

**Informações relevantes.** Finalidade (citação, penhora, avaliação, leilão), comarca de destino, número da precatória no juízo deprecado.

### Ofício

**Definição.** Comunicação formal do juízo com órgãos externos. Código OFIC, 607 ocorrências.

**Partes.** Juízo e destinatário (cartório, banco, prefeitura, junta comercial, receita).

**Data de assinatura.** Data de expedição.

**Datas relevantes.** Expedição, resposta.

**Informações relevantes.** O que foi requisitado e o que voltou. Ofícios ao cartório para averbar penhora e ofícios a bancos para bloqueio são os que mudam a posição do crédito.

### Certidão do oficial de justiça

**Definição.** Relato do cumprimento ou não cumprimento de um mandado.

**Partes.** Oficial de justiça, pessoa procurada.

**Data de assinatura.** Data da certidão.

**Datas relevantes.** Diligência e certificação.

**Informações relevantes.** Resultado da diligência. Certidão negativa por não localização do devedor ou por inexistência de bens é o gatilho da suspensão por execução frustrada, situação em que o processo de MG ficou entre 30/01/2025 e 03/11/2025.

### Certidão de secretaria

**Definição.** Registro de ato cartorário. Código CERT, 575 ocorrências do termo. Inclui certidão de publicação, de decurso de prazo, de juntada de volumes e de migração de sistema.

**Partes.** Servidor da secretaria.

**Data de assinatura.** Data da certificação.

**Datas relevantes.** Data certificada e o prazo cujo decurso se atesta.

**Informações relevantes.** A que evento a certidão se refere. Certidões de decurso de prazo em série indicam inércia de uma das partes.

### Intimação eletrônica

**Definição.** Comunicação processual às partes pelo sistema. Evento "Expedida certificada a intimação eletrônica" aparece 17 vezes só na parte 8 do RJ.

**Partes.** Juízo e advogado intimado.

**Data de assinatura.** Não se aplica.

**Datas relevantes.** Expedição, abertura pelo destinatário, decurso do prazo de 10 dias para leitura tácita.

**Informações relevantes.** Ato comunicado e prazo aberto.

---

## Constrição e expropriação de bens

### Auto ou termo de penhora

**Definição.** Documento que formaliza a apreensão judicial do bem. Cinquenta e duas ocorrências de auto de penhora e quatro de termo de penhora.

**Partes.** Oficial de justiça, executado, depositário, exequente.

**Data de assinatura.** Data da lavratura pelo oficial (exemplo no MG, Belo Horizonte, 02/05/1995).

**Datas relevantes.** Lavratura, intimação do executado, averbação na matrícula do imóvel, que é a data que fixa a preferência do crédito.

**Informações relevantes.** Descrição exata do bem com matrícula e área, valor atribuído, nome e qualificação do depositário, ordem da penhora em relação a outras. No MG a penhora recaiu sobre lotes 21 a 34, 38 a 112 e 116 a 123 da quadra 127, e lotes 1 a 8 da quadra 133 do loteamento do Distrito Industrial de Venda Nova, originados das matrículas 41.903, 33.355, 41.905 e 42.794 do 6º Ofício de Belo Horizonte.

Autos de penhora podem ser retificados por acordo entre as partes, como ocorreu no MG, com a Construtora Almeida renunciando ao direito de pedir redução da penhora e de opor embargos em razão da retificação. O agente deve tratar retificação como novo estado do bem, não como documento duplicado.

### Baixa ou levantamento de penhora

**Definição.** Ato que libera um bem antes penhorado. Pergunta explícita do docx de questionamentos.

**Partes.** Juízo, exequente, executado, cartório de registro.

**Data de assinatura.** Data da decisão que determina a baixa.

**Datas relevantes.** Decisão, expedição do ofício ao cartório, averbação da baixa na matrícula.

**Informações relevantes.** Motivo da baixa (acordo, substituição de bem, excesso de penhora, reconhecimento de propriedade de terceiro) e qual matrícula foi liberada. Uma baixa sem substituição por outro bem reduz a garantia e precisa ser sinalizada.

### Auto ou laudo de avaliação

**Definição.** Apuração do valor de mercado do bem penhorado. Oito ocorrências de auto de avaliação e 796 do termo avaliação. O contrato EMGEA e CAIXA prevê a elaboração do laudo como obrigação da CAIXA, às expensas da EMGEA.

**Partes.** Oficial avaliador ou perito nomeado, partes intimadas do laudo.

**Data de assinatura.** Data em que o avaliador assina.

**Datas relevantes.** Vistoria, assinatura do laudo, juntada, intimação das partes, e a data limite de validade da avaliação, já que laudo antigo costuma ser impugnado antes do leilão.

**Informações relevantes.** Valor atribuído a cada bem, metodologia, área considerada, estado de conservação, ocupação do imóvel. Localização nos autos é campo obrigatório: no MG, o laudo está às folhas 290 a 335, citado na petição do evento 306.

Os anexos do laudo, com fotos e memória de metodologia, são ruído declarado. O agente extrai o valor e a data e marca os anexos sem processá-los.

### Edital de leilão ou hasta pública

**Definição.** Convocação pública para venda judicial do bem. Sessenta e seis ocorrências de leilão e 24 de praça.

**Partes.** Juízo, leiloeiro, exequente, executado, terceiros interessados.

**Data de assinatura.** Data de expedição do edital.

**Datas relevantes.** Publicação, primeira praça, segunda praça, e a data limite para remição da dívida pelo executado.

**Informações relevantes.** Valor de avaliação, lance mínimo em cada praça, descrição dos bens, condições de pagamento, ônus que acompanham o bem. O docx de questionamentos pede o resultado, positivo ou negativo, o que faz do par edital e certidão de resultado uma unidade de análise.

No MG, a petição de 31/10/2025 pede a designação de leilão das glebas penhoradas, o que situa o processo na fase de expropriação, ainda sem leilão realizado.

### Auto de arrematação e carta de arrematação

**Definição.** Formalizam a venda do bem em leilão a terceiro. Quarenta e nove ocorrências de arrematação e uma de carta de arrematação.

**Partes.** Arrematante, juízo, leiloeiro, executado, exequente.

**Data de assinatura.** Data da lavratura do auto, assinada por juiz, arrematante e leiloeiro.

**Datas relevantes.** Arrematação, pagamento do preço, expedição da carta, registro na matrícula, imissão na posse.

**Informações relevantes.** Valor da arrematação comparado ao valor de avaliação, identificação do arrematante, se houve arrematação por preço vil, quanto do produto foi destinado ao crédito da EMGEA.

### Auto de adjudicação e carta de adjudicação

**Definição.** Transferência do bem ao próprio credor como forma de pagamento. Dezoito ocorrências de adjudicação e duas de carta de adjudicação.

**Partes.** EMGEA como adjudicante, executado, juízo.

**Data de assinatura.** Data do auto.

**Datas relevantes.** Pedido, decisão, lavratura, registro, imissão na posse.

**Informações relevantes.** Valor pelo qual o bem foi adjudicado e saldo remanescente da dívida. O relatório de prestações do RJ traz o marcador ADJUDICADO na situação especial, sinal de que houve adjudicação naquele contrato.

### Consulta a sistemas de constrição patrimonial

**Definição.** Resultados de buscas eletrônicas de bens. Bacenjud com 23 ocorrências e código de documento próprio, Renajud com 10, Infojud com 6, Sisbajud com 6.

**Partes.** Juízo requisitante, instituições financeiras, executado.

**Data de assinatura.** Não se aplica. O sistema registra data e hora da ordem e da resposta.

**Datas relevantes.** Ordem de bloqueio, resposta das instituições, decisão sobre transferência ou desbloqueio.

**Informações relevantes.** Valor bloqueado por instituição, valor total, se houve desbloqueio e por qual motivo. Resultado zerado repetido é evidência de execução frustrada e sustenta a decisão de suspensão.

### Indisponibilidade e arresto

**Definição.** Restrições sobre bens que concorrem com a penhora da EMGEA. Sessenta e seis ocorrências de cada termo.

**Partes.** Juízo que decretou a restrição, credor concorrente, executado.

**Data de assinatura.** Data da decisão que decretou.

**Datas relevantes.** Decretação, averbação na matrícula, eventual levantamento.

**Informações relevantes.** Qual juízo decretou e em qual processo. No RJ há discussão de concurso singular de credores sobre o mesmo bem, com aplicação dos artigos 908 e 909 do CPC e da ordem de preferência dos direitos reais do artigo 958 do Código Civil. A anterioridade da penhora define quem recebe primeiro, o que torna a data de averbação um campo decisivo.

### Guia de depósito judicial e alvará de levantamento

**Definição.** Comprovante de valores depositados em conta vinculada e autorização para retirá-los. Doze ocorrências de depósito judicial e três de alvará de levantamento.

**Partes.** Depositante, instituição depositária, beneficiário do levantamento.

**Data de assinatura.** Data do depósito e data de expedição do alvará.

**Datas relevantes.** Depósito, decisão que autoriza o levantamento, transferência efetiva.

**Informações relevantes.** Valor, conta, beneficiário e percentual destinado a cada credor. Nos autos do MG há disputa sobre o destino dos valores levantados entre EMGEA e ADVOCEF, com precedente citado no Agravo de Instrumento 5012859-76.2021.4.04.0000 do TRF4, que deferiu a transferência de 100% do valor à EMGEA.

---

## Defesas do executado

### Embargos à execução

**Definição.** Ação autônoma do devedor para discutir a dívida. Termo com 3.447 ocorrências, o segundo mais frequente do conjunto. Corre em autos apensos e explica boa parte das sentenças e apelações encontradas.

**Partes.** Embargante executado, embargada exequente.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo, que deve ocorrer em 10 dias da citação no rito antigo, decisão sobre efeito suspensivo, sentença, trânsito em julgado.

**Informações relevantes.** Matérias alegadas (excesso de execução, nulidade do título, capitalização de juros, aplicação do Código de Defesa do Consumidor), número dos autos apensos, se foi concedido efeito suspensivo. Embargos com efeito suspensivo param a execução, e o período de paralisia é dado obrigatório para a linha do tempo.

### Exceção de pré-executividade

**Definição.** Defesa apresentada dentro da própria execução, sem garantia do juízo, sobre matérias conhecíveis de ofício. Vinte e três ocorrências em sete arquivos.

**Partes.** Executado e exequente.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo, decisão.

**Informações relevantes.** Matéria alegada, com prescrição à frente (26 ocorrências do termo). Acolhimento parcial pode excluir um coexecutado sem extinguir a execução, o que altera a lista de responsáveis.

### Impugnação

**Definição.** Resposta de uma parte à manifestação da outra. Duzentas e setenta e três ocorrências.

**Partes.** Impugnante e impugnado.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo e decisão sobre a impugnação.

**Informações relevantes.** O que se contesta. Exemplo do MG, evento 309, protocolado em 27/05/2026: a EMGEA impugna o pedido de rateio e reserva de honorários da ADVOCEF formulado no evento 290, sustentando ausência de relação jurídica entre elas e invocando o artigo 18 do CPC.

---

## Recursos

### Apelação

**Definição.** Recurso contra sentença. Mil setecentas e dezoito ocorrências. No RJ, dezenas de apelações cíveis figuram como processos relacionados no TRF2, todas de 2017.

**Partes.** Apelante, apelado, tribunal.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo, contrarrazões, remessa ao tribunal, julgamento, baixa.

**Informações relevantes.** Número do recurso no tribunal, órgão relator, resultado. O volume de apelações relacionadas indica execução fragmentada em muitos incidentes, cada um com prazo próprio.

### Agravo de instrumento

**Definição.** Recurso contra decisão interlocutória. Dois mil setecentas e sete ocorrências e código de documento próprio.

**Partes.** Agravante, agravado, relator.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo, decisão sobre efeito suspensivo, julgamento.

**Informações relevantes.** Decisão atacada e se houve suspensão dos efeitos, porque isso trava a expropriação enquanto pende.

### Embargos de declaração

**Definição.** Pedido de correção de omissão, contradição ou obscuridade. Cento e oitenta e sete ocorrências.

**Partes.** Embargante e embargado.

**Data de assinatura.** Data de protocolo, dentro de cinco dias da publicação.

**Datas relevantes.** Protocolo, julgamento. Interrompem o prazo dos demais recursos, o que reposiciona toda a contagem seguinte.

**Informações relevantes.** Se houve efeito modificativo e se foram considerados protelatórios, com multa.

### Recurso especial e recurso extraordinário

**Definição.** Recursos às cortes superiores por violação de lei federal ou da Constituição. Mil seiscentas e cinquenta ocorrências de recurso especial e 46 de extraordinário.

**Partes.** Recorrente, recorrido, STJ ou STF.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo, decisão de admissibilidade, subida, julgamento, baixa dos autos.

**Informações relevantes.** Dispositivos apontados como violados e resultado da admissibilidade. No RJ o recurso especial não foi admitido em seis registros e os autos retornaram do STJ em 28/04/2021.

### Contrarrazões

**Definição.** Resposta da parte contrária ao recurso. Duzentas e dezesseis ocorrências.

**Partes.** Recorrido e recorrente.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Intimação para responder e protocolo.

**Informações relevantes.** Preliminares de não conhecimento, que muitas vezes decidem o recurso antes do mérito.

---

## Acordo e encerramento

### Acordo ou transação

**Definição.** Composição entre credor e devedor. Código ACORDO no e-Proc, com 494 ocorrências do termo acordo e 104 de transação.

**Partes.** EMGEA, executados, e eventuais intervenientes.

**Data de assinatura.** Data em que as partes assinam o termo.

**Datas relevantes.** Assinatura, homologação judicial, vencimento de cada parcela, data de eventual descumprimento.

**Informações relevantes.** Valor total acordado comparado ao saldo devedor, número de parcelas (14 ocorrências de parcelamento), garantias mantidas, cláusula de vencimento antecipado e destino das penhoras existentes. É o documento que fecha a recuperação, e o mais denso em consequência prática.

### Sentença de extinção da execução

**Definição.** Decisão que encerra a execução por pagamento, acordo cumprido ou outro motivo. Cinco ocorrências de extinção da execução.

**Partes.** Juízo e partes.

**Data de assinatura.** Data da prolação.

**Datas relevantes.** Prolação, trânsito, expedição de ofícios de baixa das penhoras.

**Informações relevantes.** Fundamento da extinção e se o crédito foi satisfeito de forma integral ou parcial. Extinção sem satisfação é perda, e precisa de marcação distinta.

---

## Representação processual

### Procuração

**Definição.** Outorga de poderes a advogado. Código PROC, 140 páginas, 178 ocorrências do termo.

**Partes.** Outorgante e advogados outorgados com OAB.

**Data de assinatura.** Data da outorga.

**Datas relevantes.** Outorga e juntada.

**Informações relevantes.** Poderes específicos, sobretudo para transigir e dar quitação, que definem se o signatário de um acordo tinha poder para assiná-lo. Procurações da EMGEA em série são ruído declarado, mas a que embasa um acordo não é.

### Substabelecimento e renúncia de mandato

**Definição.** Repasse de poderes a outro advogado e saída formal do processo. Código SUBS, 62 ocorrências de substabelecimento.

**Partes.** Advogado substabelecente, substabelecido, cliente.

**Data de assinatura.** Data do ato.

**Datas relevantes.** Assinatura, juntada e, na renúncia, o fim do período de responsabilidade do advogado.

**Informações relevantes.** Ruído para a análise de crédito. A renúncia em bloco dos advogados da CAIXA depois de 2019 é a exceção, porque é ela que explica a entrada de novos patronos e a disputa de honorários com a ADVOCEF.

### Pedido de habilitação de advogado

**Definição.** Ingresso formal de novo procurador. Código PED_HABILIT.

**Partes.** Advogado requerente e parte representada.

**Data de assinatura.** Data de protocolo.

**Datas relevantes.** Protocolo e deferimento.

**Informações relevantes.** Ruído declarado, com a mesma exceção acima.

### Guia de custas e comprovantes

**Definição.** Comprovantes de recolhimento de despesas processuais. Código COMP, 771 ocorrências de custas.

**Partes.** Recolhedor e juízo.

**Data de assinatura.** Data do pagamento.

**Datas relevantes.** Pagamento e juntada.

**Informações relevantes.** Valor e finalidade. Despesas processuais acumuladas entram na conta de recuperação e aparecem no demonstrativo SIACI como despesas recuperáveis, R$ 49.497,41 no contrato do RJ.

---

## Marcação de ruído

O docx de questionamentos define como ruído: renúncia de advogados, habilitação de advogados, procurações da EMGEA, estatuto da EMGEA, anexos de laudos de avaliação com fotos e metodologia, petições da ADVOCEF, estatuto da ADVOCEF, procurações de advogados e certidões de matrícula em duplicidade.

A recomendação é tratar ruído como atributo do documento, não como categoria separada. Cada registro classificado recebe um campo booleano de relevância, com justificativa quando o agente decide contrariar a regra geral. Isso preserva a rastreabilidade: o documento continua indexado e localizável, mas sai da fila de análise.

Duas exceções observadas nos autos merecem regra própria. Procuração que embasa acordo com poderes para transigir é peça de análise. Petição da ADVOCEF sobre reserva de honorários deixa de ser ruído quando há valores depositados em juízo, porque disputa a mesma quantia que a EMGEA pretende levantar.

## Campos derivados que o agente deve calcular

Alguns dados não estão em nenhum documento e só aparecem no cruzamento entre eles.

Razão entre garantia e dívida, a partir do demonstrativo SIACI. No contrato do RJ, R$ 6,5 milhões de garantia contra R$ 263 milhões de dívida total.

Idade do processo, da autuação até a data de referência. Trinta e dois anos no MG, trinta no RJ.

Tempo até a primeira penhora efetiva, contado da autuação, e tempo entre penhora e avaliação.

Intervalos de paralisia, medidos por sequências de eventos sem conteúdo decisório.

Idade do laudo de avaliação na data do pedido de leilão, que antecipa risco de impugnação.

Estado atual da recuperação, derivado do último evento com efeito prático e não do último evento registrado.

## Próximos passos

Validar com o time jurídico os campos obrigatórios de cada tipo, separando o que o agente deve extrair sempre do que é desejável. Em seguida, definir o esquema de saída (JSON por documento, com tipo, campos, confiança e localização) e escolher a estratégia de OCR, já que boa parte dos volumes antigos está digitalizada com qualidade baixa e o texto extraído vem corrompido em trechos inteiros.
