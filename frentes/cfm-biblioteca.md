# CFM: Biblioteca

Última revisão: 2026-10-06
Status: ativo. Envolvimento: alto, como PO.

## O que é
Sistema com todos os documentos do CFM (resoluções, despachos, notas, pareceres). Os documentos sobem em PDF, a LLM extrai o texto via OCR e retira as informações definidas previamente no sistema, alimentando uma grande base de dados. Depois que o time da biblioteca valida, o conteúdo vai para consulta por três chats.

## Os três chats
Cada um com regras e guardrails próprios, por causa do nível de acesso aos documentos.

| Chat | Público | Foco |
|---|---|---|
| Médicos | Médicos | Ética médica, resoluções do CFM, temas da área médica |
| Interno | Time da biblioteca, conselheiros e gestores do conselho | Consulta jurídica e entendimento processual dos documentos |
| Público | População em geral | Dúvidas sobre as normas que vão a público |

## Plataforma
Roda no Archetype, que nasceu como o OCR desta biblioteca. A ideia é que vire uma solução focada no time da biblioteca. Não roda no Forge.

## O que sustenta a solução
Vocabulário controlado construído com a equipe da biblioteca. Visão futura inclui camada de grafo para relacionar as normas.

## Cliente e acompanhamento
Contrato ativo com o CFM, com expansão provável para mais produtos no ano que vem. Contatos na biblioteca: Eliane Medeiros e Rameque. Reunião semanal em que relato o andamento. Tech lead: Daniel Carnelossi.

## PENDENTE
Restrições regulatórias (CFM, LGPD). Métricas. Links e materiais.
