# Decisões

Registro do que foi decidido e por quê. Formato: data, assunto, decisão, motivo, o que foi descartado.

Migrado do cerebro em 2026-10-06. Entradas antigas valem como histórico; o AGENTS.md da pasta prevalece quando houver conflito.

---

## 2026-08-25 | RAG de documentos: mapa de métodos para acervo de 6000 páginas

Contexto: acervo misto de 6000 páginas, com PDF escaneado contendo manuscrito, tabela e planilha dentro do documento, e página digital com texto. Volume estimado entre 3 e 5 milhões de tokens, acima de qualquer janela de contexto disponível. Levantamento salvo em `../about me /OUTPUTS/rag-documentos/metodos-acervo-6000-paginas.md`.

Arquitetura recomendada em três camadas: ingestão com parser que entende layout, OCR com manuscrito e dupla passagem contra modelo de visão; recuperação com fatiamento estrutural, contexto gerado por bloco, busca híbrida e reordenação; orquestração agêntica com duas ferramentas, busca textual e SQL sobre tabelas extraídas.

Decisão de arquitetura registrada: tabela numérica não passa por recuperação semântica. Vai para banco relacional e a pergunta de agregação é respondida por SQL gerado, porque a soma não está escrita em nenhuma página.

Números que sustentam a escolha: parser layout-aware adiciona de 4 a 9 pontos de acurácia. Contexto gerado por bloco corta a falha de recuperação em 67% somando busca léxica e reordenação, a custo único de cerca de US$ 5 no acervo inteiro. Recuperação agêntica custa 60% menos por pergunta que contexto completo, com diferença de acurácia dentro da margem estatística e latência mediana de 52,8 segundos.

Adiado por escolha: grafo de conhecimento e recuperação visual por ColPali entram só depois que o registro de perguntas reais mostrar necessidade. Ajuste fino descartado para responder sobre conteúdo, fica restrito a classificar tipo documental.

Candidato a diferencial do produto: precisão verificável, com citação de documento, página e trecho por afirmação, mais recusa calibrada quando falta evidência. O arquivo do produto segue com diferenciais e métricas sem preencher.

## 2026-09-14 | Faxina do cerebro e separação entre trabalho e pessoal

Contexto: auditoria do diretório mostrou 72 arquivos e 452 KB, com 25 arquivos e 244 KB em `_to_delete/`, `_tmp2/` e `_tmp3/`, todas cópias de versões antigas do projeto do jogo. Onze arquivos eram cópia byte a byte de outro arquivo do mesmo conjunto. Cada pasta temporária tinha um `CLAUDE.md` próprio, de 5 a 6 KB, capaz de ser carregado como regra ativa por uma sessão que abrisse a pasta errada.

Decisão: as três pastas foram apagadas. O cerebro caiu para 47 arquivos e 208 KB.

Decisão: projeto pessoal sai do cerebro e passa a viver em `../pessoal/`, com `CLAUDE.md` próprio. O cerebro fica com Intus e Connectabil. De `pessoal/` só são lidos `00-contexto/matheus.md`, `tom-de-voz.md` e `palavras-proibidas.md`, porque as regras de escrita são do Matheus e não da empresa.

Motivo: projeto pessoal gera muito rascunho e se move rápido. Contexto de empresa se move devagar e precisa estar certo. Junto, o rascunho enterra a regra, e foi o que aconteceu: o cerebro conhecia o jogo em três versões e não conhecia o Archetype nem o CFM.

Regras criadas no índice: nada de pessoal neste diretório, nenhum arquivo temporário em pasta versionada, e data de última revisão obrigatória em arquivo de meta, produto e cliente, com 90 dias como prazo para tratar o conteúdo como suspeito.

Pendência aberta na mesma auditoria: as metas estavam paradas em Q2, os três arquivos de produto somavam treze marcações de PENDENTE, e Archetype, CFM e o trabalho de design system em cima do overflow-ui não apareciam em nenhum dos 72 arquivos.

## 2026-09-14 | Correção do mapa de produtos: Forge, Archetype e as cinco frentes

Contexto: a auditoria mostrou que o cerebro descrevia três produtos (Taiscrito, EMGEA, RAG de documentos) que não correspondiam ao trabalho real, e que Archetype, CFM, Rede Sarah e Forge não apareciam em nenhum dos 72 arquivos.

Correção de fato, dada pelo Matheus: o Forge é a solução por trás de todos os produtos. O Archetype não é a plataforma, virou um NODE dentro do Forge e serve única e exclusivamente ao projeto da biblioteca do CFM. O que o arquivo antigo chamava de "RAG de documentos" descrevia o Forge sem nomeá-lo.

As cinco frentes de trabalho, em 14/09/2026: CFM biblioteca (ativo, subindo documentos enquanto a equipe do conselho valida), EMGEA FCVS (assinatura de contrato, produção em breve), EMGEA Recuperação de Crédito (POC, estudando análise sem alucinar), Rede Sarah (POC em versão estendida, outra pessoa toca, Matheus mais por fora), Taiscrito (em reestruturação, desenvolvedores sem conseguir trabalhar nele por causa da evolução de agentes e orquestração).

Decisão de estrutura: as cinco frentes ficam em `01-empresa/produtos/`, com o cliente como atributo dentro do arquivo, em vez de divididas entre produto e cliente. Motivo: a divisão anterior não descrevia o trabalho, já que EMGEA é um cliente com duas frentes e CFM é um cliente com uma.

Arquivos aposentados para `_arquivo/`: `produto-emgea.md.old`, `produto-rag-documentos.md.old`, `metas-2026-agosto.md.old`.

Metas 2026 marcadas como VENCIDO, com instrução de não citar meta de ano, número de produtos ou prioridade de trimestre até serem reescritas.

Preenchido também o PENDENTE de tokens em `00-contexto/design-system.md`, com a arquitetura do overflow-ui e o seam de tema por cliente.

## 2026-09-14 | Metas 2026 reescritas: medir por cliente em produção

Decisão: a meta do ano deixa de ser contagem de produtos lançados e passa a ser cliente em produção. Motivo dado pelo Matheus: contar produto não descreve o que a empresa faz, contar cliente operando sim.

As três condições que definem 2026: EMGEA FCVS rodando em produção com uso real, CFM com o acervo no ar e validado pela equipe da biblioteca, e alguma POC virando contrato.

Prioridade do ano: EMGEA FCVS. É a única com contrato em assinatura e a que prova a empresa ao entrar em produção.

O CFM não disputa a prioridade porque já tem contrato fechado até o ano que vem, com renovação provável. É a base que sustenta o ano.

Expectativa registrada sobre EMGEA Recuperação de Crédito: provavelmente não fecha em 2026, por causa da burocracia de contrato com governo. Se vingar, é ganho acima do esperado. Nenhuma entrega trata essa frente como receita do ano.

O que mudou desde agosto: Taiscrito saiu do foco, a EMGEA se dividiu em duas frentes, o Forge virou o centro e a Rede Sarah entrou.

## 2026-09-14 | Forge levantado a partir do código-fonte

Contexto: `forge.md` existia com uma linha dizendo que o Forge é a plataforma, e nada mais. O Matheus deu acesso à pasta `forge-main`, uma cópia local sem `.git`, com o submódulo `infra/` vazio e arquivo mais recente de 25/08/2026.

O arquivo foi reescrito a partir de README, docs de arquitetura, docs de services, backlog, iniciativas e o relatório de benchmark, com a lista de fontes no fim e a ressalva de que descreve o estado de 25/08.

Achado que corrige o registro anterior: o código não tem node chamado `archetype`. O nome sobrevive só como identificador de infraestrutura, no projeto Firebase e GCP `archetype-forge-intus`, no repositório `archetype-infra` e no título antigo do README. A leitura que o código sustenta é que o Archetype era o nome do produto, virou Forge, e a capacidade de Document AI foi absorvida como o grupo de nodes de documentos e ingestão mais o `legal-document-indexer`, não como um node único. Pendente de confirmação com o Daniel, porque o submódulo `infra/` está vazio nesta cópia.

Decisão em aberto registrada no arquivo: BL-045 contra BL-046, os dois de 25/08. Mesmo objetivo e 90% do desenho em comum. A diferença é se o Q&A assume um motor de busca dedicado no stack ou faz busca textual em memória sobre o Markdown que o pipeline já produz, adiando o motor até o harness de avaliação provar que faz falta.

Duas decisões já firmes e que valem para as duas iniciativas: agregação numérica sai de extração estruturada exaustiva no ingest e é calculada em código, nunca pelo modelo, porque `top-k` não garante recall. E toda afirmação factual cita documento e página, com verificação determinística de que a página existe. Isso responde direto ao problema declarado da frente de EMGEA Recuperação de Crédito.

Ponto de atenção para o design system: o produto roda Onest com tokens do shadcn, enquanto o overflow-ui que sustenta o SDK do Workflow Builder roda Poppins e a escala `--ax-*`. São dois sistemas convivendo por escopo de CSS (`.forge-workflow-scope`), não um só.

Primeira carga da `taxonomia.yaml` do `intus_brain` feita a partir do vocabulário do código: run, node, Service, worker remoto, PageSet, ParsedDocument, arquivo permanente do projeto, knowledge base, citação verificável. Falta a coluna de como a proposta comercial chama cada um.

