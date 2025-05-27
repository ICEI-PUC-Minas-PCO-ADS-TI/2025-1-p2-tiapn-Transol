
  const clientes = [
    'Mariana De Oliveira',
    'João de Castro',
    'Agnelo M. Camapum',
    'Amanda Dorneles',
    'Ana Paula Soares'
  ];

  const searchInput = document.getElementById('searchInput');
  const clientList = document.getElementById('clientList');

  function renderClientes(filtro = '') {
    clientList.innerHTML = ''; // Limpa lista

    const clientesFiltrados = clientes.filter(cliente =>
      cliente.toLowerCase().includes(filtro.toLowerCase())
    );

    if (clientesFiltrados.length === 0) {
      clientList.innerHTML = '<li>Nenhum cliente encontrado.</li>';
    } else {
      clientesFiltrados.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente;
        clientList.appendChild(li);
      });
    }
  }

  // Evento: ao digitar no input de busca
  searchInput.addEventListener('input', () => {
    const filtro = searchInput.value;
    renderClientes(filtro);
  });

  // Inicializa com todos os clientes
  renderClientes();

  // Evento para o botão "Cadastrar Cliente"
  document.getElementById('addClientBtn').addEventListener('click', () => {
    const novoCliente = prompt('Digite o nome do novo cliente:');
    if (novoCliente) {
      clientes.push(novoCliente);
      renderClientes(searchInput.value); // atualiza com o filtro atual
    }
  });
