
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>


A metodologia de trabalho adotada pelo grupo foi baseada no framework ágil Scrum, visando promover uma organização eficiente das atividades, entregas contínuas e melhorias incrementais ao longo do desenvolvimento do projeto. Foram realizadas reuniões semanais para alinhamento, planejamento e acompanhamento das tarefas, além de revisões constantes para garantir a qualidade e a aderência às necessidades do cliente. As atividades foram organizadas por meio de um quadro Kanban, utilizando o GitHub Projects, que permitiu à equipe acompanhar o andamento de cada tarefa, priorizar demandas e visualizar os estágios de desenvolvimento.

O desenvolvimento do sistema foi realizado em ambientes configurados individualmente por cada membro da equipe, além de ambientes compartilhados na nuvem para testes. As tecnologias utilizadas incluem React.js para o desenvolvimento do frontend, .NET para o backend e MySQL como banco de dados. A integração entre as diferentes partes do sistema foi feita de maneira estruturada, garantindo consistência e segurança no armazenamento e no processamento dos dados.

Para a gestão do código-fonte, utilizou-se o GitHub, onde foi organizado um repositório centralizado que contempla as pastas de frontend, backend e documentação técnica. Foram adotadas boas práticas de versionamento, como a criação de branches por funcionalidade e a utilização de pull requests, possibilitando revisões de código e o controle rigoroso das alterações realizadas. Isso garantiu a rastreabilidade e a integridade do código ao longo do desenvolvimento.

Na organização da equipe e na gestão do projeto, foram empregadas ferramentas como Figma, utilizado para a construção dos protótipos e definição da interface do usuário, e Google Drive, para o compartilhamento de documentos e arquivos. A comunicação da equipe foi facilitada por meio do WhatsApp, para interações rápidas e diárias, e pelo Microsoft Teams, utilizado para reuniões semanais e orientações com a professora.

O processo de desenvolvimento seguiu etapas bem definidas, começando pelo levantamento de requisitos, que envolveu entrevistas com o cliente e a construção de personas e histórias de usuários. Na sequência, foi feita a modelagem dos processos atuais (AS-IS) e dos processos futuros (TO-BE), seguida pela definição dos requisitos funcionais e não funcionais. O desenvolvimento ocorreu de forma incremental, incluindo a criação dos protótipos, desenvolvimento das funcionalidades do backend e frontend, além da implementação do banco de dados. 


## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

O projeto foi configurado no GitHub, utilizando um repositório organizado por pastas de frontend, backend e documentação. A gestão do código foi feita por meio de branches, onde cada funcionalidade ou correção era desenvolvida em um branch próprio, posteriormente integrado ao branch principal (main) através de pull requests, garantindo revisão antes do merge.

As tags foram utilizadas para marcar versões importantes do projeto, facilitando a organização das entregas. Os commits seguiram um padrão descritivo, permitindo rastrear facilmente as alterações realizadas. As issues foram utilizadas para registrar tarefas, requisitos e problemas, contendo descrições detalhadas, critérios de aceite e checklists. Cada issue estava vinculada ao quadro Kanban do GitHub Projects, garantindo controle e acompanhamento das atividades da equipe durante todo o desenvolvimento.


## Planejamento do projeto

###  Divisão de papéis

#### Sprint 1
- _Scrum master_ e relatório: Lilianne
- Diagrama de casos de uso e contexto: Jefferson
- Apresentação: Anna Caroline e Melyssa
- Personas, histórias de usuários e restrições : Tatiane
- Requisitos funcionais e não funcionais: Todos

#### Sprint 2
- _Scrum master_ e relatório: Tatiane
- Diagrama de casos de uso e TO-BE: Mellyssa
- AS-IS e TO-BE Ana Caroline
- Apresentação: Lilianne
- Relatório Extensão: Tatiane
- Atualizações GitHub - Todas

#### Sprint 3
- _Scrum master_ e Projeto de banco de dados: Tatiane
- Pojeto de inteface, Template Padrão e Apresentação: Lilianne
- Jornada do Usuário: Ana Caroline
- Relatório Extensão e Diagrama de Classes: Mellyssa
- Atualizações GitHub - Todas

  #### Sprint 3
- _Scrum master_: Ana Caroline
- Feedback e integração com o banco: Lilianne
- Documentação: Ana Caroline
- Front End: Mellyssa
- Back End: Tatiane

###  Quadro de tarefas


#### Sprint 1

Atualizado em: 12/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline  | Apresentação | 21/02/2025     |  13/03/2025 | ✔️    |  13/03/2025     |
| Jefferson     | Documenacão de Contexto e Diagrama de casos de uso | 21/02/2025 |  13/03/2025 | ✔️ | 12/03/2025	   | 
| Lilianne      | Planejamento e Relatório   | 21/02/2025     | 13/03/2025 | ✔️    |13/03/2025                |
| Mellyssa      | Apresentação  |    21/02/2025        | 13/03/2025 | ✔️    |    13/03/2025   |
| Tatiane       | Personas, histórias de usuários e restrições |    21/02/2025       | 13/03/2025 | ✔️    |    13/03/2025    |

#### Sprint 2

Atualizado em: 21/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline       | TO-BE, Relatório   | 20/03/2025     | 10/04/2025 | ✔️    | 10/04/2025      |
| Lilianne           | Apresentação de Slides, correções GitHub   | 20/03/2025     | 10/04/2025  | ✔️     |  10/04/2025               |
| Mellyssa         | TO-BE, Diagrama de casos de Uso  | 20/03/2025     | 10/04/2025 | ✔️     |  10/04/2025               |
| Tatiane       | AS-IS, Histórias dos Usuários,  Relatório  |  20/03/2025     | 10/04/2025 | ✔️     |  10/04/2025     |


#### Sprint 3

Atualizado em: 08/05/2025


| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline       | Jornada do Usuário   | 12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Lilianne           | Pojeto de inteface, Template Padrão e Apresentação   |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Mellyssa         | Relatório Extensão e Diagrama de Classes  |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Tatiane       | Projeto de banco de dados |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |


#### Sprint 4

Atualizado em: 05/06/2025


| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline       |  Cadastro de Clientes e Notificações/UI/UX  | 10/05/2025    |04/06/2025 | ✔️    | 04/06/2025      |
| Lilianne           | Fluxo de Autenticação e Perfil do Cliente  | 10/05/2025    |04/06/2025 | ✔️    | 04/06/2025      |
| Mellyssa         | Gerenciamento de Clientes pelo Administrador  |  10/05/2025    |04/06/2025 | ✔️    | 04/06/2025      |
| Tatiane       | Infraestrutura de Banco de Dados e Modelos Core |  10/05/2025    |04/06/2025 | ✔️    | 04/06/2025      |



Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado




### Processo
A equipe adotou a metodologia ágil Scrum, organizando o trabalho em sprints com duração média de uma a duas semanas. Foi utilizado o GitHub Projects como quadro Kanban, com as colunas Backlog, A Fazer, Em Execução e Feito, permitindo o acompanhamento do andamento do projeto e do status das tarefas. As atividades foram descritas em issues, vinculadas a branches específicos para garantir o controle de versão. Reuniões semanais foram realizadas para planejamento, acompanhamento e retrospectiva, proporcionando organização, visibilidade e controle eficiente do desenvolvimento, além de melhorar a colaboração entre os integrantes.


<img src="/docs/images/backlog TRANSOL.png" alt="GitHub Projects Transol" width="60%">


## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas


Os artefatos do projeto foram desenvolvidos utilizando diferentes plataformas, e a seguir é apresentada uma tabela que relaciona cada ambiente utilizado com sua respectiva finalidade no desenvolvimento do sistema.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             |[GitHub Transol](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p2-tiapn-Transol/tree/main/src)                            |
| Documentos do projeto               | GitHub                             | [Documentos do projeto Transol  ](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p2-tiapn-Transol/tree/main/docs)                            |
| Projeto de interface                | Figma                              | [Projeto de interface Transol](https://www.figma.com/)                            |
| Gerenciamento do projeto            | GitHub Projects                    |[ Gerenciamento do projeto Transol ](https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/33)                          |
| Desenvolvimento do projeto | Visual Studio Code | <a href="src/README.md">Código</a>                         |
| Hospedagem                          | Vercel                             | http://....                            |
