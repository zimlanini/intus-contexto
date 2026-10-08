---
tipo: entrega
status: feito
tags: [rag, ocr, recuperacao, citacao-verificavel]
resumo: Comparação de métodos de ingestão, recuperação e orquestração para responder com precisão sobre um acervo de 6000 páginas.
---

# Métodos para responder com precisão sobre um acervo de 6000 páginas

Levantamento dos métodos disponíveis hoje para fazer um LLM responder com precisão sobre um acervo de 6000 páginas com três naturezas misturadas: PDF escaneado com manuscrito, tabela e planilha dentro do documento, e página digital com texto extraível. O objetivo é dar base de decisão de arquitetura para o produto de RAG de análise de documentos.

O documento separa o problema em três camadas (ingestão, recuperação, orquestração da resposta), compara os métodos de cada uma com números de benchmark público, e fecha com a arquitetura recomendada e os próximos passos.

---

## 1. A conta que define o desenho

Uma página de texto corrido ocupa de 500 a 800 tokens. Uma página escaneada com tabela, depois de transcrita com estrutura preservada, passa de 1500. O acervo inteiro fica entre 3 e 5 milhões de tokens.

Nenhuma janela de contexto disponível hoje comporta esse volume em uma única chamada, e mesmo que comportasse o custo por pergunta inviabilizaria o produto. A pergunta real do projeto não é "como colocar 6000 páginas no modelo", e sim "como reduzir 4 milhões de tokens aos 20 a 50 mil que respondem a esta pergunta específica, sem perder a evidência certa no caminho".

Toda decisão adiante responde a essa redução.

---

## 2. Camada de ingestão

Esta é a camada que mais determina a precisão final e a que mais projetos tratam como detalhe. Erro cometido aqui não é recuperado por nenhuma técnica posterior: se a tabela foi transcrita com a coluna trocada, o modelo responde com confiança usando o número errado.

O benchmark do MMLongBench-Doc mostra que trocar um extrator simples por um parser que entende layout adiciona de 4 a 9 pontos de acurácia na resposta final, independente da estratégia de recuperação usada depois. É o maior ganho isolado do pipeline.

### 2.1 Página digital com texto

Extração direta com PyMuPDF ou pdfplumber. Custo perto de zero e transcrição fiel.

O risco está na ordem de leitura: coluna dupla, nota de rodapé e cabeçalho embaralham o texto se o extrator não respeitar a geometria da página. Vale validar a ordem antes de aceitar o resultado.

### 2.2 Página escaneada e manuscrito

Duas famílias de solução, com pontos fortes diferentes.

OCR de nuvem com suporte a manuscrito: Amazon Textract, Google Document AI e Azure AI Document Intelligence. Devolvem caixa delimitadora e nível de confiança por palavra. Esse nível de confiança é o insumo que permite marcar automaticamente a página que precisa de revisão humana.

Modelo de visão sobre a imagem da página: Gemini, Claude e GPT com entrada visual leem manuscrito irregular melhor que OCR clássico em boa parte dos casos, porque usam contexto linguístico para resolver ambiguidade de traço. O problema é o inverso do OCR: onde a tinta está ilegível o modelo preenche com o que faz sentido, e não devolve confiança calibrada para avisar.

A prática que funciona no acervo com manuscrito é rodar as duas e comparar. Concordância alta libera a página. Divergência acima de um limiar manda a página para fila de revisão. O custo dobra na ingestão, que acontece uma vez só, e evita erro que apareceria em toda pergunta futura.

O caminho de anexar o PDF direto no modelo e deixar ele "ler o arquivo" foi medido no mesmo benchmark: ficou em quinto lugar entre seis abordagens em acurácia, foi o mais caro de todos, e apresentou 7% de falha intrínseca. Não sustenta produção com PDF de origem variada.

### 2.3 Tabela e planilha

Este é o ponto mais frágil de todo pipeline documental e exige uma decisão explícita de arquitetura.

Transcrever a tabela para Markdown ou HTML dentro do bloco de texto resolve tabela pequena e pergunta de leitura direta ("qual a taxa da linha de 2019"). Parsers como LlamaParse e as plataformas de nuvem reconstroem a estrutura semântica da tabela; bibliotecas básicas perdem a estrutura e produzem sequência de números sem cabeçalho, que é pior que não ter a tabela.

Pergunta numérica de agregação não se resolve por recuperação semântica. "Qual o total inadimplido em 2023" não está escrito em nenhuma página, é resultado de uma soma. Recuperar trechos e pedir para o modelo somar produz erro silencioso e não auditável.

A saída é extrair a tabela para uma tabela real em banco (SQLite, DuckDB ou Postgres) e responder esse tipo de pergunta por consulta SQL gerada pelo modelo, com o resultado numérico voltando do banco. O sistema passa a ter dois caminhos de resposta, um textual e um tabular, e o orquestrador escolhe qual usar.

### 2.4 O que sai da ingestão

O produto desta camada é um acervo normalizado com quatro elementos por página: o texto com estrutura preservada, o metadado (documento de origem, número da página, tipo documental, data, entidades citadas), a imagem da página guardada para citação visual, e a marca de confiança da transcrição.

Sem metadado por página não existe filtro por período nem por tipo de documento, e a recuperação fica refém apenas da similaridade de texto.

---

## 3. Camada de recuperação

Os métodos abaixo se somam. A ordem apresentada é também a ordem de ganho por esforço.

### 3.1 Fatiamento por estrutura

Fatiar por unidade lógica (seção, cláusula, item, tabela inteira) em vez de por número fixo de caracteres. Bloco de 400 a 800 tokens com sobreposição pequena.

Fatiamento por contagem de caracteres corta cláusula no meio e separa o cabeçalho da tabela do corpo dela, o que destrói o sentido do trecho recuperado.

### 3.2 Contexto gerado por bloco

Cada bloco recebe de 50 a 100 tokens gerados por um LLM situando aquele trecho dentro do documento de origem. Um parágrafo que diz "o percentual passa a 12%" vira "trecho do aditivo de 2021 ao contrato 4471, sobre juros de mora: o percentual passa a 12%".

Os números medidos pela Anthropic no método: 35% de redução na taxa de falha de recuperação usando embeddings contextualizados, 49% somando busca léxica contextualizada, e 67% somando reordenação. A taxa de falha cai de 5,7% para 1,9%.

O custo é único, de aproximadamente US$ 1,02 por milhão de tokens de documento com cache de prompt ativo. Para este acervo, algo em torno de US$ 4 a US$ 5 pagos uma vez. É a melhor relação entre custo e ganho de todo o pipeline.

### 3.3 Busca híbrida

Combinar busca vetorial (semântica) com BM25 (léxica), fundindo os dois rankings.

Documento jurídico, contábil e de crédito é cheio de identificador exato: número de processo, CPF, matrícula, código de contrato, número de portaria. Busca vetorial erra sistematicamente esse tipo de termo, porque embedding aproxima significado e identificador não tem significado. BM25 acerta. O inverso vale para pergunta conceitual, onde BM25 falha e a busca vetorial resolve.

Manter só um dos dois deixa uma classe inteira de pergunta sem resposta.

### 3.4 Reordenação

Um modelo de reordenação (Cohere Rerank, Voyage, BGE Reranker) recebe os 50 a 100 primeiros resultados da busca híbrida e devolve os 10 melhores, avaliando pergunta e trecho juntos em vez de comparar vetores independentes.

É o maior ganho de precisão por linha de código do pipeline inteiro, e adiciona poucas centenas de milissegundos.

### 3.5 Recuperação visual sem transcrição

ColPali e ColQwen indexam a imagem da página com um modelo de visão e fazem busca por interação tardia, dispensando OCR na etapa de recuperação. O resultado da busca é a página como imagem, entregue direto ao modelo de resposta.

Ganha quando o layout carrega significado que a transcrição perde: formulário preenchido à mão, carimbo, selo, assinatura, tabela com célula mesclada, gráfico. Perde em custo de índice, porque gera muitos vetores por página e exige banco vetorial com suporte a multivetor, como Vespa ou Qdrant.

Para este acervo, entra como camada complementar aplicada ao subconjunto escaneado, não como substituto da trilha de texto. A trilha de texto continua necessária para busca por identificador exato.

### 3.6 Grafo de conhecimento

Extrair entidade e relação de cada documento, montar um grafo, e responder por travessia em vez de por similaridade.

Ganha em pergunta de salto múltiplo, do tipo "quais devedores compartilham a mesma garantia do contrato X" ou "quais processos citam o parecer que fundamentou a decisão Y". A busca por similaridade não resolve isso porque a resposta não está em nenhum trecho isolado, está na conexão entre trechos.

Custa caro para construir e mais caro ainda para manter atualizado quando o acervo cresce. A recomendação é adiar: implantar busca híbrida com reordenação primeiro, registrar as perguntas reais dos usuários por alguns meses, e só montar o grafo se o registro mostrar volume relevante de pergunta de salto múltiplo.

### 3.7 Ajuste fino do modelo

Não resolve este problema e vale registrar por que.

Ajuste fino ensina formato, estilo e vocabulário do domínio. Não instala fatos recuperáveis com citação de origem, e não permite atualizar o acervo sem retreinar. Serve para tarefas auxiliares do pipeline, como classificar tipo documental ou extrair campo padronizado de um formulário, não para responder pergunta sobre conteúdo.

---

## 4. Camada de orquestração da resposta

### 4.1 Passagem única

Uma busca, um prompt, uma resposta. Rápido, barato e suficiente para pergunta factual direta.

Falha em pergunta composta, porque a busca acontece antes de o modelo perceber que precisa de outra informação.

### 4.2 Recuperação agêntica

O modelo recebe a busca como ferramenta, decide o que procurar, lê o resultado, percebe a lacuna, busca de novo com termo melhor, e só responde quando reuniu a evidência.

Os números do benchmark de 171 perguntas sobre 30 PDFs longos e multimodais, rodado com Claude Sonnet 4.5:

| Abordagem | Acurácia | Custo por pergunta | Latência mediana |
|---|---|---|---|
| Parser premium com contexto completo | 59,6% | US$ 0,19 a 0,21 | ~7 s |
| Recuperação agêntica | 53,2% | US$ 0,0827 | 52,8 s |
| PDF anexado direto no modelo | 52,0% | US$ 0,2552 | ~7 s |

A diferença de 6 pontos entre o topo e a recuperação agêntica não passou no teste de significância de McNemar, ou seja, boa parte dela é ruído amostral. A recuperação agêntica custou 60% menos e foi a única abordagem com zero falhas de execução.

O preço é a latência. Cinquenta segundos é aceitável para análise documental profunda e não é aceitável para uma caixa de busca. Isso vira decisão de produto: modo rápido de passagem única para consulta simples, modo de análise para pergunta que exige investigação.

### 4.3 Contexto longo com cache de prompt

Para pergunta que exige ler um processo inteiro de 200 a 500 páginas, carregar o documento completo no contexto e responder sobre ele.

Não compete com a recuperação, complementa. A recuperação identifica qual processo importa, o contexto longo lê o processo por inteiro. É o caminho para pergunta de síntese ("resuma a evolução da negociação neste contrato") que a recuperação por trechos responde mal.

O cuidado é o efeito de perda no meio: informação posicionada no centro de uma janela muito cheia perde acurácia de recuperação em 30% ou mais, segundo o trabalho de Stanford sobre o tema. Encher a janela até o limite piora o resultado em vez de melhorar.

---

## 5. Precisão verificável

Sem esta camada o produto não passa em avaliação de empresa grande nem de órgão público, porque a resposta certa sem prova de origem não serve para fundamentar decisão.

Citação obrigatória por afirmação. Cada frase da resposta aponta documento, página e trecho, com link para a imagem da página recuperada. O usuário confere em dois cliques.

Recusa calibrada. Quando a recuperação não traz evidência suficiente, o sistema responde que não encontrou e mostra o que buscou. Preencher lacuna com inferência é o comportamento que destrói a confiança do usuário no acervo inteiro.

Conjunto de avaliação com resposta conhecida. De 100 a 200 perguntas extraídas do acervo real, com a resposta e a página de origem registradas por uma pessoa que conhece o domínio. Sem esse conjunto não existe forma de saber se uma mudança no pipeline melhorou ou piorou o produto, e a evolução vira palpite.

Métricas separadas por camada, porque a falha precisa ser localizável:
- Cobertura da recuperação: a evidência correta apareceu entre os N trechos recuperados.
- Fidelidade da resposta: cada afirmação está sustentada em trecho recuperado.
- Taxa de recusa correta: o sistema recusou quando de fato não havia evidência.

Revisão humana dirigida. A fila de revisão recebe só a página que a ingestão marcou como duvidosa, não o acervo inteiro. Em acervo com manuscrito isso costuma ficar entre 5% e 15% das páginas.

---

## 6. Arquitetura recomendada

Pipeline em camadas, na ordem de implementação:

1. Ingestão com parser que entende layout, OCR com suporte a manuscrito, dupla passagem (OCR e modelo de visão) nas páginas escaneadas com divergência marcada para revisão, e extração de tabela para banco relacional.
2. Fatiamento por estrutura, contexto gerado por bloco, busca híbrida (vetorial e BM25) e reordenação por cross-encoder.
3. Orquestração agêntica com duas ferramentas: busca no acervo textual e consulta SQL sobre as tabelas extraídas.
4. Citação por página, recusa calibrada e conjunto de avaliação desde a primeira versão, não como ajuste posterior.
5. Depois, condicionado ao registro de perguntas reais: recuperação visual sobre o subconjunto escaneado, e grafo de conhecimento se aparecer volume de pergunta de salto múltiplo.

Os itens 1 e 2 respondem pela maior parte da precisão. O item 4 responde pela venda.

---

## 7. Custo de referência

Ingestão, pagamento único para 6000 páginas:
- OCR de nuvem: item dominante do custo, na casa de US$ 1,50 por mil páginas nos planos básicos e mais caro em modo de formulário e manuscrito.
- Contexto gerado por bloco: cerca de US$ 5 no total, considerando 4 a 5 milhões de tokens a US$ 1,02 por milhão com cache ativo.
- Embeddings: poucos dólares.

Ordem de grandeza total da ingestão: dezenas a poucas centenas de dólares, uma vez, com o OCR concentrando o gasto. Reprocessar o acervo depois de trocar de parser custa isso de novo, o que reforça a decisão de testar parser antes de rodar as 6000 páginas.

Operação, por pergunta:
- Passagem única: fração de centavo.
- Modo agêntico: US$ 0,05 a US$ 0,15.
- Contexto completo sem recuperação: US$ 0,19 a US$ 0,26.

A comparação que importa para precificação do produto: em corpus grande, responder por recuperação custa ordens de magnitude menos por consulta que carregar contexto, com acurácia equivalente dentro da margem estatística.

---

## 8. Próximos passos

Inventariar o acervo antes de escolher ferramenta. Quantas páginas são digitais, quantas são escaneadas, quantas têm manuscrito, quantas têm tabela, e qual a qualidade média da digitalização. Essa contagem muda a escolha de parser e a estimativa de custo.

Montar o conjunto de avaliação com 100 perguntas reais e resposta conhecida, com apoio de alguém que domina o conteúdo. É o item que trava mais projetos por ser trabalhoso e o único que permite medir evolução.

Rodar prova de conceito em 200 páginas representativas comparando dois parsers, medindo acurácia de transcrição em tabela e em manuscrito separadamente.

Definir a política de recusa e o formato de citação antes de desenhar tela, porque as duas decisões mudam a interface da resposta.

PENDENTE no arquivo do produto: `cerebro/01-empresa/produtos/rag-documentos.md` não tem diferenciais nem métricas preenchidos. Precisão verificável (citação por página e recusa calibrada) e trilha dupla para tabela são candidatos concretos a diferencial, já que a maioria das soluções de mercado entrega resposta sem prova de origem e erra pergunta numérica.

---

## Fontes

- [Agentic RAG vs Long-Context LLMs: A 171-Question Benchmark on 30 Long PDFs](https://www.surfsense.com/blog/agentic-rag-vs-long-context-llms-benchmark)
- [Contextual Retrieval in AI Systems, Anthropic](https://www.anthropic.com/engineering/contextual-retrieval)
- [RAG vs long context: what the 2026 data shows](https://usewire.io/blog/long-context-vs-rag-what-the-data-shows/)
- [Best AI PDF Parsers for 2026, LlamaIndex](https://www.llamaindex.ai/insights/best-ai-pdf-parsers)
- [Best AI for PDF Table Extraction, LlamaIndex](https://www.llamaindex.ai/insights/best-ai-for-pdf-table-extraction)
- [ColPali: Efficient Document Retrieval with Vision Language Models](https://arxiv.org/abs/2407.01449)
- [PDF Retrieval with Vision Language Models, Vespa](https://blog.vespa.ai/retrieval-with-vision-language-models-colpali/)
- [GraphRAG vs Vector RAG: When Knowledge Graphs Beat Embeddings](https://tianpan.co/blog/2026-04-17-graphrag-vs-vector-rag-knowledge-graphs)

## Relacionadas

- [[decisoes]]
- [[forge]]
