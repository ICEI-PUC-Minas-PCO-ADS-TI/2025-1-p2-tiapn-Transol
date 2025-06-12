// src/front/assets/js/adm.js

document.addEventListener('DOMContentLoaded', async () => {
  // const adminNameSpan = document.getElementById('adminName'); // REMOVIDO
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const recentClientList = document.getElementById('recentClientList');
  const searchClientList = document.getElementById('searchClientList');
  const logoutBtn = document.getElementById('logoutBtn');
  const messageBox = document.getElementById('messageBox');

  // Função para exibir mensagens de feedback
  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Obter token e role do localStorage
  const jwtToken = localStorage.getItem('jwtToken');
  const userRole = localStorage.getItem('userRole'); // 'cliente' ou 'admin'

  // Verificar se o usuário está logado e é um administrador
  if (!jwtToken || userRole !== 'admin') { // Não precisa mais do userName aqui
    showMessage('Você não está logado como administrador. Redirecionando para o login...', 'error');
    setTimeout(() => {
      window.location.href = 'login.html'; // Redireciona para o login
    }, 2000);
    return;
  }

  // adminNameSpan.textContent = "Administrador"; // Pode hardcodar aqui se quiser que o JS defina
                                              // Ou deixar no HTML como já fizemos

  // Função de Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.clear(); // Limpa todos os dados do localStorage
    showMessage('Sessão encerrada. Redirecionando...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html'; // Ou login.html
    }, 1500);
  });

  // Função para renderizar a lista de clientes
  function renderClientList(clients, targetElement) {
    targetElement.innerHTML = ''; // Limpa a lista existente

    if (clients && clients.length > 0) {
      clients.forEach(client => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${client.nome} (CPF: ${client.cpf})</span>
          <div class="client-actions">
            <button class="edit-btn" data-id="${client.id}">Editar</button>
            <button class="delete-btn" data-id="${client.id}">Excluir</button>
          </div>
        `;
        targetElement.appendChild(li);
      });

      // Adicionar event listeners para os botões de editar e excluir
      targetElement.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => editClient(event.target.dataset.id));
      });
      targetElement.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => deleteClient(event.target.dataset.id));
      });

    } else {
      targetElement.innerHTML = '<li>Nenhum cliente encontrado.</li>';
    }
  }

  // Função para buscar e exibir os últimos 5 clientes
  async function fetchRecentClients() {
    recentClientList.innerHTML = '<li>Carregando últimos clientes...</li>';
    try {
      const response = await fetch('http://localhost:3000/clientes/ultimos', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        renderClientList(data, recentClientList);
      } else {
        showMessage('Erro ao carregar últimos clientes: ' + (data.error || 'Erro desconhecido.'), 'error');
        recentClientList.innerHTML = '<li>Erro ao carregar clientes.</li>';
      }
    } catch (error) {
      console.error('Erro de conexão ao buscar últimos clientes:', error);
      showMessage('Erro de conexão com o servidor ao carregar últimos clientes.', 'error');
      recentClientList.innerHTML = '<li>Erro de conexão.</li>';
    }
  }

 // Função para buscar clientes por nome ou CPF
  async function searchClients() {
    const searchTerm = searchInput.value.trim(); // Remove espaços em branco
    if (searchTerm.length < 2) { // Opcional: só busca se tiver pelo menos 2 caracteres
        searchClientList.innerHTML = '<li>Digite pelo menos 2 caracteres para buscar.</li>';
        return;
    }
    searchClientList.innerHTML = '<li>Buscando clientes...</li>';

    // Determinar se o termo de busca é um CPF
    // Remove caracteres não numéricos para a verificação
    const cleanedSearchTerm = searchTerm.replace(/\D/g, ''); 
    const isCpf = cleanedSearchTerm.length === 11 && /^\d+$/.test(cleanedSearchTerm);

    let queryParam;
    if (isCpf) {
        queryParam = `cpf=${cleanedSearchTerm}`; // Envia o CPF limpo
    } else {
        queryParam = `nome=${searchTerm}`; // Envia o nome como antes
    }

    try {
      const response = await fetch(`http://localhost:3000/clientes?${queryParam}`, { // Ajustado o queryParam
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        renderClientList(data, searchClientList);
      } else {
        showMessage('Erro ao buscar clientes: ' + (data.error || 'Erro desconhecido.'), 'error');
        searchClientList.innerHTML = '<li>Erro ao buscar clientes.</li>';
      }
    } catch (error) {
      console.error('Erro de conexão ao buscar clientes:', error);
      showMessage('Erro de conexão com o servidor ao buscar clientes.', 'error');
      searchClientList.innerHTML = '<li>Erro de conexão.</li>';
    }
  }

  // Lógica para editar cliente (AGORA REDIRECIONA)
  async function editClient(clientId) {
    // Apenas redireciona para a página de edição, passando o ID na URL
    window.location.href = `editar-cliente.html?id=${clientId}`;
  }

  // Lógica para excluir cliente
  async function deleteClient(clientId) {
    if (confirm(`Tem certeza que deseja excluir o cliente com ID ${clientId}?`)) {
      try {
        const response = await fetch(`http://localhost:3000/clientes/${clientId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (response.ok) {
          showMessage('Cliente excluído com sucesso!', 'success');
          fetchRecentClients(); // Atualiza a lista de clientes recentes
          searchClients(); // Atualiza a lista de busca (se houver termo)
        } else {
          const errorData = await response.json();
          showMessage('Erro ao excluir cliente: ' + (errorData.error || 'Erro desconhecido.'), 'error');
        }
      } catch (error) {
        console.error('Erro de conexão ao excluir cliente:', error);
        showMessage('Erro de conexão com o servidor ao excluir cliente.', 'error');
      }
    }
  }

  // Event listeners
  searchBtn.addEventListener('click', searchClients);
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchClients();
    }
  });

  // Carregar os últimos clientes ao carregar a página
  fetchRecentClients();
});
