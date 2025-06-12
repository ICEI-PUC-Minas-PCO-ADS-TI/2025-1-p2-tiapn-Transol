document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.sidebar-nav .menu-item');
  const contentSections = document.querySelectorAll('.main-content .content-section');

  // Seletores de elementos DOM (para todas as seções)
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');
  const clientesTableBody = document.querySelector('#clientesTable tbody');
  const noClientsMessage = document.getElementById('noClientsMessage');
  const notificationsList = document.getElementById('notificationsList');
  const noNotificationsMessage = document.getElementById('noNotificationsMessage');
  const logoutBtn = document.getElementById('logoutBtn');
  const messageBox = document.getElementById('messageBox'); // Para mensagens gerais

  // --- Funções Auxiliares ---

  // Função para exibir mensagens de feedback na caixa de mensagem
  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Função para verificar autenticação e role
  function checkAuthenticationAndRole() {
    const jwtToken = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole');

    if (!jwtToken || userRole !== 'admin') {
      alert('Você não está logado como administrador. Redirecionando para o login...'); // Usar alert temporariamente para debug
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  // --- Lógica Principal de Exibição de Seções ---

  // Função para mostrar a seção de conteúdo correta
  function showSection(targetId) {
    contentSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
        // Lógica específica para carregar dados quando a seção é ativada
        if (targetId === 'busca') {
          loadLastFiveClients(); // Carrega os últimos 5 clientes na seção de busca
        } else if (targetId === 'clientesCadastrados') {
          loadClientes(); // Carrega todos os clientes na tabela
        } else if (targetId === 'notificacoes') {
          loadNotifications(); // Carrega as notificações
        }
      } else {
        section.classList.remove('active');
      }
    });
  }

  // --- Lógica de Carregamento e Busca de Dados ---

  // Função auxiliar para exibir clientes em searchResults (reutilizável para busca e últimos 5)
  function displayClientsInSearchResults(clients) {
    searchResults.innerHTML = ''; // Limpa antes de adicionar
    if (!clients || clients.length === 0) {
      searchResults.innerHTML = '<p class="no-results-message">Nenhum resultado encontrado.</p>';
      return;
    }
    const ul = document.createElement('ul');
    clients.forEach(client => {
      const li = document.createElement('li');
      li.innerHTML = `
              <strong>Nome:</strong> ${client.nome || 'N/A'}<br>
              <strong>CPF:</strong> ${client.cpf || 'N/A'}<br>
              <strong>Email:</strong> ${client.email || 'N/A'}<br>
              <div class="client-actions-search"> <button class="action-button-small view-client-btn" data-id="${client.id || ''}">Ver</button> <button class="action-button-small edit-client-btn" data-id="${client.id || ''}">Editar</button>
                  <button class="action-button-small delete-client-btn" data-id="${client.id || ''}">Excluir</button>
              </div>
          `;
      ul.appendChild(li);
    });
    searchResults.appendChild(ul);

    // Adicionar event listeners para os novos botões gerados dinamicamente na busca
    searchResults.querySelectorAll('.view-client-btn').forEach(button => { // NOVO: Event listener para o botão 'Ver'
      button.addEventListener('click', (event) => viewClient(event.target.dataset.id));
    });
    searchResults.querySelectorAll('.edit-client-btn').forEach(button => {
      button.addEventListener('click', (event) => editClient(event.target.dataset.id));
    });
    searchResults.querySelectorAll('.delete-client-btn').forEach(button => {
      button.addEventListener('click', (event) => deleteClient(event.target.dataset.id));
    });
  }

  // Carrega os últimos 5 clientes (para a seção de busca inicial)
  async function loadLastFiveClients() {
    if (!checkAuthenticationAndRole()) return;

    searchResults.innerHTML = '<p class="no-results-message">Carregando últimos clientes...</p>';
    searchResults.style.display = 'block';

    const jwtToken = localStorage.getItem('jwtToken');

    try {
      // Conectando à sua API para obter os últimos 5 clientes
      const response = await fetch('http://localhost:3000/clientes?_sort=id&_order=desc&_limit=5', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const clients = await response.json();

      displayClientsInSearchResults(clients); // Exibe os clientes na lista de busca
    } catch (error) {
      console.error('Erro ao carregar últimos clientes:', error);
      showMessage('Erro ao carregar últimos clientes. Verifique o servidor.', 'error');
      searchResults.innerHTML = '<p class="no-results-message error-message">Erro ao carregar últimos clientes. Tente novamente.</p>';
    }
  }

  // Executa a busca de clientes
  async function performSearch() {
    if (!checkAuthenticationAndRole()) return;

    const query = searchInput.value.trim();
    searchResults.innerHTML = '<p class="no-results-message">Buscando...</p>';
    searchResults.style.display = 'block';

    const jwtToken = localStorage.getItem('jwtToken');

    if (!query) {
      loadLastFiveClients(); // Se a busca estiver vazia, recarrega os últimos 5
      return;
    }

    try {
      // Conectando à sua API de busca de clientes
      const response = await fetch(`http://localhost:3000/clientes/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const clients = await response.json();

      displayClientsInSearchResults(clients); // Exibe os clientes na lista de busca
    } catch (error) {
      console.error('Erro na busca:', error);
      showMessage(`Erro ao buscar clientes: ${error.message}. Verifique o servidor.`, 'error');
      searchResults.innerHTML = '<p class="no-results-message error-message">Erro ao buscar clientes. Tente novamente.</p>';
    }
  }

  // Carrega todos os clientes para a tabela de Clientes Cadastrados
  async function loadClientes() {
    if (!checkAuthenticationAndRole()) return;

    clientesTableBody.innerHTML = ''; // Limpa a tabela
    noClientsMessage.style.display = 'none'; // Esconde a mensagem de "nenhum cliente"

    const jwtToken = localStorage.getItem('jwtToken');

    try {
      // Conectando à sua API para obter TODOS os clientes
      const response = await fetch('http://localhost:3000/clientes', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const allClients = await response.json();

      if (allClients.length > 0) {
        allClients.forEach(client => {
          const row = clientesTableBody.insertRow();
          row.innerHTML = `
                      <td>${client.nome || 'N/A'}</td>
                      <td>${client.cpf || 'N/A'}</td>
                      <td>${client.email || 'N/A'}</td>
                      <td>${client.telefone || 'N/A'}</td>
                      <td>${client.endereco || 'N/A'}</td>
                      <td>
                          <button class="action-button-small view-client-btn" data-id="${client.id || ''}">Ver</button> <button class="action-button-small edit-client-btn" data-id="${client.id || ''}">Editar</button>
                          <button class="action-button-small delete-client-btn" data-id="${client.id || ''}">Excluir</button>
                      </td>
                  `;
        });
      } else {
        noClientsMessage.style.display = 'block'; // Mostra a mensagem
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      showMessage(`Erro ao carregar clientes: ${error.message}. Verifique a conexão com o servidor.`, 'error');
      noClientsMessage.textContent = 'Erro ao carregar clientes. Verifique a conexão.';
      noClientsMessage.style.display = 'block';
    }
  }

  // Lógica para visualizar cliente (REDIRECIONA para perfil-cliente.html)
  function viewClient(clientId) {
    window.location.href = `perfil-cliente.html?id=${clientId}`;
  }

  // Lógica para editar cliente (redireciona para uma página de edição, passando o ID)
  function editClient(clientId) {
    window.location.href = `editar-cliente.html?id=${clientId}`;
  }

  // Lógica para excluir cliente
  async function deleteClient(clientId) {
    if (!checkAuthenticationAndRole()) return;
    const jwtToken = localStorage.getItem('jwtToken');

    if (confirm(`Tem certeza que deseja excluir o cliente com ID ${clientId}?`)) {
      try {
        // Conectando à sua API para excluir o cliente
        const response = await fetch(`http://localhost:3000/clientes/${clientId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        if (!response.ok) {
          throw new Error(`Erro ao excluir! Status: ${response.status}`);
        }
        showMessage('Cliente excluído com sucesso!', 'success');
        // Recarrega a lista de clientes (se a seção estiver ativa)
        if (document.getElementById('clientesCadastrados').classList.contains('active')) {
          loadClientes();
        } else if (document.getElementById('busca').classList.contains('active')) {
          loadLastFiveClients(); // Recarrega os últimos 5 se a busca estiver ativa
        }
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        showMessage(`Falha ao excluir cliente: ${error.message}.`, 'error');
      }
    }
  }

  // Carrega notificações de orçamento
  async function loadNotifications() {
    if (!checkAuthenticationAndRole()) return;

    notificationsList.innerHTML = ''; // Limpa a lista
    noNotificationsMessage.style.display = 'none'; // Esconde a mensagem de "nenhuma notificação"

    const jwtToken = localStorage.getItem('jwtToken');

    try {
      // Conectando à sua API para obter notificações de orçamento
      const response = await fetch('http://localhost:3000/notifications', { // Exemplo de URL
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const notifications = await response.json();

      if (notifications.length > 0) {
        notifications.forEach(notification => {
          const li = document.createElement('li');
          li.innerHTML = `
                      <div class="notification-item">
                          <p><strong>Novo Orçamento:</strong> ${notification.clientName || 'N/A'}</p>
                          <p>Serviço solicitado: ${notification.service || 'N/A'}</p>
                          <p class="notification-date">Recebido em: ${notification.date || new Date().toLocaleString()}</p>
                          <button class="action-button-small" data-id="${notification.id || ''}">Ver Detalhes</button>
                      </div>
                  `;
          notificationsList.appendChild(li);
        });
        notificationsList.querySelectorAll('.action-button-small').forEach(button => {
          button.addEventListener('click', (e) => {
            alert('Ver detalhes da notificação ID: ' + e.target.dataset.id);
            // Implementar lógica para exibir detalhes da notificação (ex: modal)
          });
        });
      } else {
        noNotificationsMessage.style.display = 'block'; // Mostra mensagem se não houver notificações
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      showMessage(`Erro ao carregar notificações: ${error.message}. Verifique a conexão.`, 'error');
      noNotificationsMessage.textContent = 'Erro ao carregar notificações. Verifique a conexão.';
      noNotificationsMessage.style.display = 'block';
    }
  }

  // --- Inicialização e Event Listeners ---

  // 1. Verificar autenticação ao carregar a página
  if (!checkAuthenticationAndRole()) {
    return; // Sai se o usuário não for admin
  }

  // 2. Adicionar Event Listeners para o menu lateral
  menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      menuItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.dataset.target;
      showSection(targetId);
    });
  });

  // 3. Adicionar Event Listeners para a busca
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // 4. Adicionar Event Listener para botões de ação na tabela de clientes (delegando para o tbody)
  // Isso é mais eficiente, pois os botões são adicionados dinamicamente
  clientesTableBody.addEventListener('click', async (event) => {
    const target = event.target;
    const clientId = target.dataset.id; // Pega o ID do cliente do atributo data-id do botão

    if (target.classList.contains('view-client-btn')) { // NOVO: Event listener para o botão 'Ver'
      viewClient(clientId);
    } else if (target.classList.contains('edit-client-btn')) {
      editClient(clientId);
    } else if (target.classList.contains('delete-client-btn')) {
      deleteClient(clientId);
    }
  });

  // 5. Adicionar Event Listener para o botão de Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    alert('Sessão encerrada. Redirecionando...'); // Usar alert temporariamente para debug
    window.location.href = 'index.html'; // Ou 'login.html'
  });

  // 6. Carregar a seção inicial (Busca) e seus dados ao carregar a página.
  showSection('busca');
});