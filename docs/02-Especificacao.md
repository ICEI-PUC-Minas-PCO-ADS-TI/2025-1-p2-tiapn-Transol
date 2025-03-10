# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas


![Persona 1- Íris)](https://github.com/user-attachments/assets/c47d5737-a9a0-4c98-8ce4-2c6c2ea5ccdc)
![Persona 2- Agnaldo](https://github.com/user-attachments/assets/b43e2ff6-805b-4be7-b374-8c2f333ca790)
![Persona 3- Sofia](https://github.com/user-attachments/assets/cb9ef455-8d34-4300-ab30-90075f4baf5a)
![Persona 4- Carlos](https://github.com/user-attachments/assets/2e12b63b-a33f-45a9-903d-c22f590fd1a0)
![Persona 5- Marcos](https://github.com/user-attachments/assets/e8636684-e7a5-4d5f-a4da-5bfa33f8c121)
![Persona 6- Mariana](https://github.com/user-attachments/assets/fe5abbde-b52c-4236-9757-511051fe8e46)


## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Eu, Íris, como administradora de empresa de transporte escolar e fretamento,|preciso monitorar a localização em tempo real dos ônibus escolares, receber relatórios detalhados sobre o desempenho dos motoristas e a utilização dos veículos,|para monitorar a eficiência operacional e identificar áreas de melhoria e garantir a segurança dos alunos e planejar melhor os horários de entrada e saída.|
|Eu, Agnaldo como motorista de ônibus escolar e fretamento,|preciso ter acesso a rotas otimizadas e atualizações de tráfego em tempo real|para garantir que chegue aos destinos de forma rápida e segura, evitando atrasos.|
|Eu, Sofia, mãe de um aluno, | quero receber notificações em tempo real sobre a localização do Escolar| para garantir que meu filho está seguro e saber o horário de chegada e partida.|
|Eu, Carlos, coordenador de vendas, |quero comunicar mudanças de última hora nas rotas de ônibus | para ajustar rapidamente a logística de transporte e informar os participantes.  |
|Eu, Marcos, diretor de escola,|quero acompanhar em tempo real a localização dos ônibus escolares|para garantir a segurança dos alunos e planejar melhor os horários de entrada e saída.|
|Eu, Mariana, professora,|quero ter um canal de comunicação com os pais sobre o transporte escolar| para informar sobre alterações nos horários e garantir que os pais estejam cientes.



## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir a criação e otimização de rotas de transporte escolar. | ALTA | 
|RF-002| O sistema deve fornecer atualizações em tempo real sobre condições de tráfego e possíveis desvios.  | MÉDIA |
|RF-003| O sistema deve monitorar a localização dos veículos em tempo real.| ALTA |
|RF-004| O sistema deve enviar notificações sobre problemas mecânicos e eventos de segurança.| MÉDIA |
|RF-005| O sistema deve permitir que os usuários façam reservas de transporte escolar e fretamento online.| ALTA |
|RF-006| O sistema deve processar pagamentos e fornecer recibos eletrônicos.| ALTA |
|RF-007| O sistema deve oferecer uma plataforma de comunicação entre motoristas, administradores, pais e escolas.| MÉDIA |
|RF-008| O sistema deve permitir o envio de notificações e alertas para os usuários.| MÉDIA |
|RF-009| O sistema deve gerar relatórios detalhados sobre o desempenho dos motoristas e a utilização dos veículos.| ALTA |
|RF-010| O sistema deve fornecer análises de dados para identificar áreas de melhoria e otimização.| ALTA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve garantir a proteção dos dados pessoais e financeiros dos usuários. | ALTA | 
|RNF-002| O sistema deve ser capaz de processar informações e fornecer atualizações em tempo real de maneira eficiente.|  ALTA |
|RNF-003| O sistema deve ser intuitivo e fácil de usar para todos os tipos de usuários, independentemente do nível de experiência tecnológica.|ALTA |
|RNF-004| O sistema deve garantir a continuidade do serviço mesmo em caso de falhas técnicas.| MÉDIA |
|RNF-005| O sistema deve ser capaz de lidar com o aumento do número de usuários e veículos à medida que a empresa cresce.| ALTA |
|RNF-006| O sistema deve ser compatível com diferentes dispositivos e sistemas operacionais.| ALTA |
|RNF-007| O sistema deve suportar integração com ferramentas de terceiros, como aplicativos de navegação e pagamento online.| ALTA |



## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| A capacidade dos veículos deve ser adequada ao número de alunos e passageiros, respeitando as normas de segurança e conforto. |
|002| Todos os motoristas devem seguir as leis de trânsito e regulamentações específicas para transporte escolar, incluindo limites de velocidade e sinalização.|
|003| A empresa deve garantir uma conexão de internet estável e segura para o funcionamento dos sistemas de monitoramento e comunicação.|
|004| Os sistemas devem ser compatíveis com diversos dispositivos e sistemas operacionais utilizados por motoristas, administradores, pais e escolas.|
|005| A empresa deve cumprir as leis de proteção de dados pessoais, garantindo a privacidade e segurança das informações dos usuários.|
|006| Todos os veículos e motoristas devem possuir as licenças e certificações necessárias para a operação de serviços de transporte escolar e fretamento.|
|007| A empresa deve gerenciar os custos operacionais para garantir a viabilidade econômica dos serviços oferecidos.|
|008| Sempre que possível, a empresa deve adotar práticas sustentáveis, como o uso de veículos elétricos ou híbridos.|

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
