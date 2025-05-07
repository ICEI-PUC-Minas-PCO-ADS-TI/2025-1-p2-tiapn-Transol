# Arquitetura da solução

A plataforma será composta por uma aplicação web com frontend e backend separados. A arquitetura utiliza o modelo **cliente-servidor** e será acessada diretamente pelo navegador.

- O **frontend** será desenvolvido com **React**, utilizando **HTML**, **CSS** e **JavaScript**, e ficará hospedado na **Vercel**.
- O **backend** será implementado com **C# e .NET**, responsável por processar as regras de negócio do sistema, como cadastro de alunos, rotas, motoristas, veículos e agendamentos.
- O banco de dados utilizado será o **MySQL**, armazenando as informações essenciais da aplicação.
- As IDEs utilizadas no projeto serão o **Visual Studio Code** (frontend) e o **Visual Studio** (backend).

### Funcionalidades principais

- Cadastro e autenticação de usuários (pais/responsáveis, motoristas, administradores);
- Gestão de rotas, veículos, horários e agendamentos;
- Histórico de transporte por aluno;
- Integração com métodos de pagamento.
<div align="center">
    <img src="./images/ArquiteturaDaSolução.png" alt="Modelo ER" width="30%">
</div>

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta pela Transol Escolar e Fretamento requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), foi elaborado um modelo que contempla todas as entidades e atributos associados às atividades dos processos identificados. Foi gerado um único DER que suporta todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo também contempla o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

O modelo de dados é apresentado por meio de um modelo relacional que contempla todos os conceitos e atributos apresentados na modelagem dos processos.
### Modelo ER

<img src="./images/Transol.drawio (1).png" alt="Modelo ER" width="90%">

### Esquema relacional

<img src="./images/EsquemaRelacional.jpeg" alt="Esquema Relacional" width="90%">

### Modelo físico

```sql

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `db_transol` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_transol`;

CREATE TABLE IF NOT EXISTS `administrador` (
  `ID_Administrador` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `CPF` VARCHAR(20) NOT NULL,
  `RG` VARCHAR(20) NOT NULL,
  `Telefone` INT NOT NULL,
  PRIMARY KEY (`ID_Administrador`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `escola` (
  `ID_Escola` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `Endereço` VARCHAR(45),
  PRIMARY KEY (`ID_Escola`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `aluno` (
  `ID_Aluno` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `Escola` VARCHAR(20) NOT NULL,
  `D_Nasc` DATE NOT NULL,
  `Entrada` TIME NOT NULL,
  `Saída` TIME NOT NULL,
  `ID_Cliente` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Aluno`),
  FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `escolar` (
  `ID_Escolar` SMALLINT NOT NULL AUTO_INCREMENT,
  `Data_Início` DATE NOT NULL,
  `Mensalidade` DECIMAL(10,0) NOT NULL,
  `Turno` SMALLINT NOT NULL,
  `ID_Aluno` SMALLINT NOT NULL,
  `ID_Escola` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Escolar`),
  FOREIGN KEY (`ID_Aluno`) REFERENCES `aluno` (`ID_Aluno`),
  FOREIGN KEY (`ID_Escola`) REFERENCES `escola` (`ID_Escola`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `fretamento` (
  `ID_Fretamento` SMALLINT NOT NULL AUTO_INCREMENT,
  `Destino` VARCHAR(40) NOT NULL,
  `Bairro` VARCHAR(30) NOT NULL,
  `D_Saída` DATE NOT NULL,
  `D_Retorno` DATE NOT NULL,
  `Qte_Passageiros` INT NOT NULL,
  PRIMARY KEY (`ID_Fretamento`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tipo_serviço` (
  `ID_Tipo_Serviço` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `Descrição` VARCHAR(50) NOT NULL,
  `ID_Fretamento` SMALLINT NOT NULL,
  `ID_Escolar` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Tipo_Serviço`),
  FOREIGN KEY (`ID_Escolar`) REFERENCES `escolar` (`ID_Escolar`),
  FOREIGN KEY (`ID_Fretamento`) REFERENCES `fretamento` (`ID_Fretamento`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `cliente` (
  `ID_Cliente` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `CPF` VARCHAR(20) NOT NULL,
  `RG` VARCHAR(20) NOT NULL,
  `Telefone` INT NOT NULL,
  `Endereço` VARCHAR(45),
  `ID_Administrador` SMALLINT NOT NULL,
  `ID_Tipo_Serviço` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Cliente`),
  FOREIGN KEY (`ID_Administrador`) REFERENCES `administrador` (`ID_Administrador`),
  FOREIGN KEY (`ID_Tipo_Serviço`) REFERENCES `tipo_serviço` (`ID_Tipo_Serviço`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `contrato` (
  `ID_Contrato` SMALLINT NOT NULL AUTO_INCREMENT,
  `Valor_serviço` DECIMAL(10,0) NOT NULL,
  `Status` VARCHAR(20) NOT NULL,
  `D_Emissão` DATE NOT NULL,
  `D_Viagem` DATE NOT NULL,
  `Kilômetro` FLOAT NOT NULL,
  `C_ID_Cliente` SMALLINT NOT NULL,
  `ID_TServiço` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Contrato`),
  FOREIGN KEY (`C_ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`),
  FOREIGN KEY (`ID_TServiço`) REFERENCES `contrato` (`ID_Contrato`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `motorista` (
  `ID_Motorista` SMALLINT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `CPF` VARCHAR(20) NOT NULL,
  `RG` VARCHAR(20) NOT NULL,
  `Habilitação` VARCHAR(20) NOT NULL,
  `Telefone` INT NOT NULL,
  `Endereço` VARCHAR(45),
  PRIMARY KEY (`ID_Motorista`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `veiculo` (
  `ID_Veiculo` SMALLINT NOT NULL AUTO_INCREMENT,
  `Modelo` VARCHAR(40) NOT NULL,
  `Tipo` VARCHAR(30) NOT NULL,
  `Capacidade` SMALLINT NOT NULL,
  `ID_TipoServ` SMALLINT NOT NULL,
  PRIMARY KEY (`ID_Veiculo`),
  FOREIGN KEY (`ID_TipoServ`) REFERENCES `tipo_serviço` (`ID_Tipo_Serviço`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `veiculo_motorista` (
  `ID_Veiculo` SMALLINT NOT NULL,
  `ID_Motorista` SMALLINT NOT NULL,
  `Data_Hora` DATETIME NOT NULL,
  `Turno` INT NOT NULL,
  PRIMARY KEY (`ID_Veiculo`, `ID_Motorista`),
  FOREIGN KEY (`ID_Veiculo`) REFERENCES `veiculo` (`ID_Veiculo`),
  FOREIGN KEY (`ID_Motorista`) REFERENCES `motorista` (`ID_Motorista`)
) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```


## Tecnologias

| **Dimensão**    | **Tecnologia**                          |
|-----------------|------------------------------------------|
| Front-end       | HTML, CSS, JavaScript, React             |
| Back-end        | C#, .NET                                 |
| SGBD            | MySQL                                    |
| IDEs            | Visual Studio Code, Visual Studio        |
| Deploy          | Vercel                                   |


## Hospedagem

A aplicação está totalmente hospedada na Vercel, incluindo tanto o frontend (desenvolvido com HTML, CSS, JavaScript e React) quanto o backend (desenvolvido com .NET e C#).

A Vercel permite deploy contínuo diretamente do repositório no GitHub, facilitando o desenvolvimento, atualização e publicação do sistema de forma rápida e confiável.

O banco de dados utilizado é o MongoDB, hospedado na nuvem através do MongoDB Atlas, garantindo alta disponibilidade, escalabilidade e segurança para o armazenamento das informações do sistema.

## Qualidade de Software

No desenvolvimento do sistema de transporte escolar e fretamento, foram priorizados os seguintes pontos de qualidade:

- **Manutenção fácil:**  
  O sistema será feito de forma organizada, com o código separado por partes. Isso ajuda na hora de corrigir erros, adicionar novas funções ou mudar algo no futuro sem quebrar o resto.

- **Boa usabilidade:**  
  A ideia é que qualquer pessoa consiga usar o sistema sem precisar de ajuda. Tudo será claro, direto e funcional — tanto em computador quanto no celular.

- **Segurança dos dados:**  
  Como o sistema lida com informações pessoais (alunos, pais, motoristas), tudo será tratado com cuidado. As informações ficarão protegidas contra acessos indevidos.

- **Funcionamento estável:**  
  O sistema precisa estar sempre disponível, principalmente nos horários de entrada e saída da escola. A estabilidade vai garantir que ninguém fique sem acesso quando mais precisa.

- **Acesso em qualquer lugar:**  
  O sistema será compatível com diferentes dispositivos e navegadores. Assim, o usuário consegue acessar de onde estiver, com praticidade e sem travamentos.

