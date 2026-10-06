# Skill: transcrição de reunião para proposta comercial

## Quando usar
Quando chegar transcrição, gravação ou anotação de reunião com cliente ou prospect e o objetivo for uma proposta.

## Entrada esperada
Transcrição da reunião. Nome do cliente. Se o cliente já tem arquivo em `02-clientes/`, ele entra na leitura. Se não tem, ele é criado ao final.

## Contexto a ler antes
`00-contexto/tom-de-voz.md`, `00-contexto/palavras-proibidas.md`, `01-empresa/CLAUDE.md`, o arquivo do produto envolvido, `02-clientes/<cliente>.md`, `05-templates/proposta-comercial.md`.

## Passo a passo

1. Ler a transcrição inteira antes de escrever qualquer coisa.
2. Extrair, com citação literal quando possível: o problema nas palavras do cliente, o volume de dados ou documentos envolvido, quem decide, qual prazo foi mencionado, qual restrição apareceu (orçamento, conformidade, sistema legado, resistência interna).
3. Separar o que o cliente pediu do que ele precisa. Registrar os dois. A proposta responde ao que ele precisa, usando as palavras do que ele pediu.
4. Mapear para produto: Taiscrito, EMGEA, RAG ou combinação. Se nenhum encaixa, dizer isso em vez de forçar.
5. Listar o que ficou ambíguo na reunião. Perguntar ao Matheus antes de escrever a proposta. Não preencher lacuna de escopo por conta própria.
6. Escrever a proposta seguindo `05-templates/proposta-comercial.md`.
7. Atualizar ou criar `02-clientes/<cliente>.md` com o histórico da reunião, as objeções e os próximos passos.
8. Registrar decisão de escopo relevante em `06-memoria/decisoes.md`.

## Saída esperada
Arquivo em `../about me /OUTPUTS/proposta-<cliente>/proposta.md`. Versão em HTML só quando o Matheus pedir.

Junto da proposta, um bloco curto de perguntas em aberto que o Matheus precisa responder ou levar de volta ao cliente.

## Erros comuns
Inventar prazo ou preço que não apareceu na reunião. Escrever escopo vago para parecer abrangente. Traduzir a dor do cliente para jargão de produto e perder a linguagem dele.
