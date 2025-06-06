<img src="/docs/images/LogoTransol .webp" alt="Transol" width="40%">

# Transol Escolar e Fretamentos

`CURSO: Análise e Desenvolvimento de Sistemas`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Processos de Negócios`

`1º semestre/2025`

O objetivo desse projeto é criar um site para uma empresa de transporte escolar que visa o gerenciamento de informações sobre as plataformas de transporte e a cobrança de tarifas. A plataforma buscará otimizar a comunicação entre as partes envolvidas, oferecendo uma interface simples e eficiente para a gestão de rotas, horários e pagamentos, garantindo que tanto os usuários quanto os prestadores de serviço tenham uma experiência mais ágil e segura.

Além disso, o sistema visa implementar funcionalidades que melhorem o acompanhamento do transporte, como o controle de histórico de viagens e notificações sobre alterações nas rotas ou horários. A proposta é criar uma solução digital integrada que atenda às necessidades de pais e responsáveis que buscam segurança e confiabilidade no transporte escolar dos seus filhos, bem como auxilar nos processos internos da gestão da empresa.

## Integrantes

* Ana Caroline Resende Gomes 
* Lilianne Patrícia Soares Maia
* Mellyssa Meireles dos Santos 
* Tatiane de Miranda Mares Oliveira 


## Professor

* Amália Soares Vieira de Vasconcelos 

## Instruções de utilização

###1. Credenciais de Teste Essenciais:###
Utilize estas credenciais para acessar as diferentes partes do sistema:

Login de Administrador:
CPF/Email: adm1@transol.com
Senha: adm123@
(Após login, você acessará o Painel do Administrador.)

Clientes Teste (Para Login e Troca de Senha):

Cliente 1:
Email: clienteteste1@pucminas.com
Senha: transol1234 (senha padrão inicial)

Cliente 2:
Email: clienteteste2@pucminas.com
Senha: transol1234 (senha padrão inicial)

Cliente 3:
Email: clienteteste3@pucminas.com
Senha: transol1234 (senha padrão inicial)

Cliente 4:
Email: clienteteste4@pucminas.com
Senha: transol1234 (senha padrão inicial)

(Para o primeiro acesso com qualquer um desses clientes, o sistema solicitará a troca de senha. Depois, use a nova senha para acessar o perfil.)

####Se todos os "Clientes Teste" fornecidos já tiverem a senha alterada (e, portanto, não forem mais para a tela de troca de senha no primeiro login), você pode:####

Acessar o Painel do Administrador.
Clicar em "Cadastrar Cliente" para acessar cadastrar-cliente.html.
Cadastrar um NOVO cliente com um CPF/Email e a senha padrão transol1234.
Voltar para login.html e tentar fazer login com as credenciais deste novo cliente. Ele será redirecionado para a Tela de Troca de Senha (trocar-senha.html). Defina uma nova senha seguindo as regras de segurança.
Após a troca, o sistema o levará de volta para login.html. Faça login novamente com a nova senha para acessar o Perfil do Cliente (perfil-cliente.html).

###2. Primeiros Passos (Configuração Única - Necessário para Rodar o Back-end):###
Para que o sistema funcione, o back-end precisa estar ativo. Siga estes passos apenas uma vez no computador de teste:

Baixe o arquivo ZIP do projeto que será fornecido a você (via GitHub, por exemplo).

Descompacte o ZIP em uma pasta de sua preferência no seu computador (ex: C:\Projetos\Transol).

Instale o Node.js e o npm: Se ainda não tiver, baixe e instale a versão LTS (Long Term Support) em https://nodejs.org/en/download/.

Abra o Windows PowerShell (ou Prompt de Comando).

Navegue até a pasta do back-end do projeto:
cd [CAMINHO_DA_SUA_PASTA_PROJETO]\src\back
(Exemplo: cd C:\Projetos\Transol\src\back)

Instale as dependências:

npm install

Execute as migrações do banco de dados: (Isso garante que a estrutura do banco está atualizada.)

npx sequelize-cli db:migrate --env production

Se houver erro de validação de migração (por dados existentes), o grupo pode fornecer um script para limpar/repopular dados de teste no DB.

###3. Como Iniciar o Sistema (A cada sessão de teste):###
Inicie o Servidor Back-end:

No PowerShell (na pasta src\back do projeto, onde você fez os passos anteriores), execute:

$env:NODE_ENV="production" ; node app.js

Mantenha esta janela do PowerShell aberta. Você deve ver a mensagem: Conexão com o banco de dados estabelecida com sucesso. Servidor rodando na porta 3000.

Acesse o Front-end no Navegador:

Abra seu navegador (Chrome, Edge, Firefox).

No Explorador de Arquivos, navegue até a pasta [CAMINHO_DA_SUA_PASTA_PROJETO]\src\front\

Arraste o arquivo login.html para a barra de endereço do seu navegador. O sistema será carregado!

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/11-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
