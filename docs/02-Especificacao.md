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
|RF-001| O sistema deve permitir login de administrador  | ALTA | 
|RF-002| O sistema deve permitir login de cliente | ALTA |
|RF-003| O sistema deve permitir login de motorista | ALTA |
|RF-004| O administrador deve fazer o cadastro do cliente | ALTA |
|RF-005| O administrador deve ser capaz de editar os dados do cliente | ALTA |
|RF-006| O administrador deve ser capaz de excluir o cliente | ALTA |
|RF-007| O administrador deve ser capaz de visualizar todos os dados do cliente | ALTA |
|RF-008| O cliente deve ser capaz de enviar o recibo do pagamento  | ALTA |
|RF-009| O cliente e o administrador devem ser capazes de visualizar todos os pagamentos feitos | ALTA |
|RF-010| O cliente deve ser capaz de enviar mensagens para o administrador| ALTA |
|RF-011| O sistema deve enviar mensagens com lembrete de pagamento ao cliente | ALTA |
|RF-012| O sistema deve alterar o status do pagamento da mensalidade após o envio do comprovante | ALTA |
|RF-013| O administrador deve ser capaz de cadastrar veículos | ALTA |
|RF-014| O administrador deve ser capaz de editar os dados dos veículos | ALTA |
|RF-015| O administrador deve ser capaz de excluir os veículos | ALTA |
|RF-016| O administrador deve ser capaz de cadastrar motoristas  | ALTA |
|RF-017| O administrador deve ser capaz de editar os dados dos motoristas | ALTA |
|RF-018| O administrador deve ser capaz de excluir os motoristas | ALTA |
|RF-019| O motorista deve ser capaz de atualizar a quilometragem do veículo  | ALTA |
|RF-020| O motorista e o administrador devem ser capazes de atualizar dados de manutenção dos veículos | ALTA |
|RF-021| O motorista deve ser capaz de visualizar os dados dos veículos | ALTA | 
|RF-022| O administrador deve ser capaz de criar uma rota diária para cada motorista | ALTA |
|RF-023| O administrador e o motorista devem ser capazes de visualizar as rotas criadas | ALTA |
|RF-024| O sistema deve permitir a recuperação de senha do usuário | ALTA |
|RF-025| O sistema deve permitir a alteração de senha por parte do usuário | ALTA |
|RF-026| O sistema deve permitir a geração de relatórios financeiros | ALTA |
|RF-027| O sistema deve permitir a exportação de dados | ALTA |
|RF-028| O sistema deve permitir a criação de múltiplos administradores | ALTA |
|RF-029| O sistema deve registrar o histórico de ações realizadas pelos administradores e motoristas | ALTA |
|RF-030| O sistema deve permitir a atribuição de tarefas ou atividades para os motoristas | ALTA |
|RF-031| O sistema deve permitir a visualização de relatórios de desempenho de motoristas | ALTA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve funcionar 24/7  | ALTA | 
|RNF-002| O sistema deve mudar o status do pagamento depois do envio do recibo |  ALTA |
|RNF-003| O sistema deve ser capaz de processar até 300 usuários simultâneos sem degradação de desempenho. |ALTA |
|RNF-004| O tempo de resposta para cada operação (login, cadastro, consulta) não deve ultrapassar 10 segundos. | MÉDIA |
|RNF-005| O sistema deve ser escalável para suportar o aumento de número de usuários e transações. | ALTA |
|RNF-006| O sistema deve utilizar criptografia para proteger dados sensíveis, como senhas de usuários e informações de pagamento. | ALTA |
|RNF-007| O sistema deve ter uma interface intuitiva e fácil de usar para todos os tipos de usuário. | ALTA |
|RNF-008|O sistema deve ser acessível em dispositivos móveis e desktops. | ALTA |
|RNF-009|O código do sistema deve seguir boas práticas de desenvolvimento e ser bem documentado, para facilitar futuras manutenções e atualizações. | ALTA |
|RNF-010|O sistema deve permitir atualizações automáticas sem a necessidade de interrupção significativa dos serviços. | ALTA |
|RNF-011| O sistema deve ser compatível com as versões mais recentes dos principais navegadores | ALTA |
|RNF-012| O sistema deve ser compatível com sistemas operacionais amplamente utilizados, como Windows, Linux e macOS. | ALTA |
|RNF-013| O sistema deve realizar backups automáticos regulares (diários ou semanais), com a capacidade de restaurar dados em caso de falha. | ALTA |
|RNF-014| O sistema deve ser capaz de recuperar dados de transações realizadas, mesmo em caso de falhas técnicas. | ALTA |
|RNF-015| O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras regulamentações de privacidade de dados aplicáveis. | ALTA |




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

<img src="docs/images/CasodeUsoTransol.png alt="Caso De Uso" width="20%">
