# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

Apresente uma descrição textual de como os sistemas atuais resolvem o problema que seu projeto se propõe a resolver. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

Com o tema do projeto definido, escolham alguns processos no contexto de negócios. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. Colem aqui os modelos dos processos atuais (modelo AS-IS), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.

## Descrição geral da proposta (Modelagem TO BE)

### Contratação de Serviços de Transporte Escolar

Depois de analisar o processo atual (AS-IS), foi possível ver que ele é muito manual, depende de várias conversas no WhatsApp e tem etapas repetitivas. Tudo isso deixa o atendimento mais demorado e confuso.

A proposta do novo processo (TO-BE) é deixar tudo mais rápido e organizado usando a tecnologia. O cliente continua entrando em contato pelo WhatsApp, mas já recebe um link com um formulário para preencher os dados. A partir daí, o sistema cuida de tudo: verifica se tem vaga, calcula o valor da mensalidade, gera o contrato e envia a chave PIX para o pagamento. Depois que o cliente paga, o sistema confirma e avisa que o aluno foi incluído na rota da van.

O atendente só entra se for necessário, como em casos de dúvidas ou se o pagamento não for identificado automaticamente. Isso ajuda a equipe a ganhar tempo e focar em outras tarefas importantes.

#### Oportunidades de melhoria

- Atendimento mais rápido e com menos esforço.
- Menos erros e mais organização nas informações.
- Processo padronizado, sem vai-e-volta.
- Atendente disponível para casos mais importantes.
- Melhor experiência para o cliente.

#### Limites da solução

- Se o pagamento não for identificado automaticamente, o atendente precisa verificar.
- É necessário ter um sistema e internet para usar o formulário e as automações.
- Algumas pessoas podem ter dificuldade com tecnologia.

#### Alinhamento com os objetivos do negócio

Esse novo processo ajuda o serviço de transporte escolar a crescer, atendendo mais pessoas com mais agilidade e organização. Também melhora a comunicação e a experiência de quem contrata.

## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
