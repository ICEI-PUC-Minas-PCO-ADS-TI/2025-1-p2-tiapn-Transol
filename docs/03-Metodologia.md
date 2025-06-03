
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

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

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
- Backend: Tatiane

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

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline       | TO-BE, Relatório   | 20/03/2025     | 10/04/2025 | ✔️    | 10/04/2025      |
| Lilianne           | Apresentação de Slides, correções GitHub   | 20/03/2025     | 10/04/2025  | ✔️     |  10/04/2025               |
| Mellyssa         | TO-BE, Diagrama de casos de Uso  | 20/03/2025     | 10/04/2025 | ✔️     |  10/04/2025               |
| Tatiane       | AS-IS, Histórias dos Usuários,  Relatório  |  20/03/2025     | 10/04/2025 | ✔️     |  10/04/2025     |


#### Sprint 3

Atualizado em: 08/05/2024


| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Ana Caroline       | Jornada do Usuário   | 12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Lilianne           | Pojeto de inteface, Template Padrão e Apresentação   |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Mellyssa         | Relatório Extensão e Diagrama de Classes  |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |
| Tatiane       | Projeto de banco de dados |  12/04/2025    | 09/05/2025 | ✔️    | 09/05/2025      |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             |[GitHub Transol](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p2-tiapn-Transol/tree/main/src)                            |
| Documentos do projeto               | GitHub                             | [Documentos do projeto Transol  ](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p2-tiapn-Transol/tree/main/docs)                            |
| Projeto de interface                | Figma                              | [Projeto de interface Transol](https://www.figma.com/)                            |
| Gerenciamento do projeto            | GitHub Projects                    |[ Gerenciamento do projeto Transol ](https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/33)                          |
| Hospedagem                          | Vercel                             | http://....                            |
