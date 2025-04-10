# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

Apresente uma descrição textual de como os sistemas atuais resolvem o problema que seu projeto se propõe a resolver. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

Com o tema do projeto definido, escolham alguns processos no contexto de negócios. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. Colem aqui os modelos dos processos atuais (modelo AS-IS), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.

## Descrição geral da proposta (Modelagem TO BE)

### Contratação do Serviços de Transporte Escolar

A partir da identificação dos gargalos do modelo AS-IS, observou-se que o processo atual de contratação do serviço de transporte escolar é altamente manual, dependente de interações via WhatsApp, e apresenta baixa padronização nas etapas de atendimento, verificação de disponibilidade, cálculo de valor, envio de contrato e confirmação de pagamento.

A proposta de solução (modelo TO-BE) busca melhorar a eficiência operacional por meio da introdução de automações. O processo se inicia com o atendimento via WhatsApp, onde o cliente recebe um link para preenchimento de um formulário com os dados necessários. A partir desse ponto, o sistema assume automaticamente as verificações de disponibilidade, cálculo do valor da mensalidade e envio do contrato junto com a chave PIX. Após o pagamento, o sistema realiza a verificação e, se confirmado, finaliza o processo com a inclusão do aluno na rota e o envio da confirmação para o cliente.

O atendente é acionado apenas em situações específicas, como dúvidas do cliente ou falha na confirmação automática do pagamento, reduzindo a carga de trabalho manual e aumentando a escalabilidade do serviço.

### Oportunidades de melhoria

- Redução do tempo total de atendimento.
- Automatização de tarefas repetitivas.
- Padronização no processo de contratação.
- Maior controle e rastreabilidade das informações.
- Liberação do atendente para atividades mais estratégicas.

### Limites da solução

- Casos de exceção ainda exigirão intervenção humana (ex: pagamentos não identificados automaticamente).
- A solução requer infraestrutura mínima (formulário digital, sistema de regras de negócio e integração com pagamento).
- Clientes com menor familiaridade digital podem apresentar dificuldade no uso inicial.

### Alinhamento com os objetivos do negócio

A proposta está alinhada com os objetivos de crescimento e eficiência do serviço de transporte escolar, permitindo maior escalabilidade, melhor organização operacional, redução de erros humanos e melhor experiência para o cliente final.


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
