# Plano de testes de software



| **Requisito associado** | CT-001 – Login de Administrador |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o admin consegue acessar o sistema. |
| **Passos**               | - Acessar `/login` <br> - Inserir email e senha válidos <br> - Clicar em "Entrar" |
| **Critério de aprovação**| Acesso ao painel de administrador liberado. |
| **Responsável**          | Ana Caroline |

---


| **Requisito associado** | CT-002 – Cadastro de Cliente |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Validar o cadastro de um novo cliente. |
| **Passos**               | - Acessar painel do admin <br> - Ir até “Cadastrar Cliente” <br> - Preencher dados e salvar |
| **Critério de aprovação**| Novo cliente registrado com sucesso. |
| **Responsável**          | Ana Caroline |

---

| **Requisito associado** | CT-003 – Troca de Senha no Primeiro Acesso |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o sistema força a troca de senha no primeiro acesso. |
| **Passos**               | - Logar com cliente novo <br> - Inserir senha padrão <br> - Redefinir senha nova |
| **Critério de aprovação**| Redirecionado para troca de senha e senha nova salva. |
| **Responsável**          | Mellyssa |

---

| **Requisito associado** | CT-004 – Login com nova senha (Cliente) |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o cliente consegue acessar o sistema após trocar a senha. |
| **Passos**               | - Acessar `/login` <br> - Inserir nova senha <br> - Clicar em "Entrar" |
| **Critério de aprovação**| Acesso liberado ao perfil do cliente. |
| **Responsável**          | Mellyssa |

---

| **Requisito associado** | CT-005 – Visualizar Lista de Clientes (Admin) |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o admin consegue visualizar a lista de clientes cadastrados. |
| **Passos**               | - Acessar painel do admin <br> - Clicar em “Clientes” |
| **Critério de aprovação**| Lista carregada com os dados dos clientes. |
| **Responsável**          | Lilianne |

---

| **Requisito associado** | CT-006 – Editar Dados do Cliente (Admin) |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o admin consegue editar os dados de um cliente. |
| **Passos**               | - Acessar lista de clientes <br> - Clicar em “Editar” <br> - Atualizar dados e salvar |
| **Critério de aprovação**| Dados atualizados e exibidos corretamente. |
| **Responsável**          | Lilianne |

---

| **Requisito associado** | CT-007 – Excluir Cliente |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Verificar se o admin consegue excluir um cliente do sistema. |
| **Passos**               | - Acessar lista de clientes <br> - Clicar em “Excluir” <br> - Confirmar exclusão |
| **Critério de aprovação**| Cliente removido da listagem. |
| **Responsável**          | Tatiane |

---

| **Requisito associado** | CT-008 – Login com Senha Incorreta |
|--------------------------|------------------------------------------------------------|
| **Objetivo do teste**    | Garantir que o sistema não permite login com senha errada. |
| **Passos**               | - Acessar `/login` <br> - Inserir email válido + senha errada <br> - Clicar em "Entrar" |
| **Critério de aprovação**| Mensagem de erro exibida e acesso negado. |
| **Responsável**          | Tatiane |

