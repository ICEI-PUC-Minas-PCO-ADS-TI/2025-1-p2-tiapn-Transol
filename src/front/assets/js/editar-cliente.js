// assets/js/editar-cliente.js

document.addEventListener('DOMContentLoaded', () => {
  // Seletores do menu lateral e seções de conteúdo
  const menuItems = document.querySelectorAll('.sidebar-nav .menu-item');
  const contentSections = document.querySelectorAll('.main-content .content-section');

  // Caixas de mensagem para cada seção
  const messageBoxCliente = document.getElementById('messageBoxCliente');
  const messageBoxVeiculo = document.getElementById('messageBoxVeiculo');
  const messageBoxMotorista = document.getElementById('messageBoxMotorista');

  // --- Funções Auxiliares ---

  function showMessage(message, type, targetMessageBox) {
    if (targetMessageBox) {
      targetMessageBox.textContent = message;
      targetMessageBox.className = 'message-box ' + type;
      targetMessageBox.style.display = 'block';

      setTimeout(() => {
        targetMessageBox.style.display = 'none';
      }, 5000);
    } else {
      console.error("Erro: Caixa de mensagem não encontrada!");
      alert(message); // Fallback
    }
  }

  // --- Lógica Principal de Exibição de Seções ---
  function showSection(targetId) {
    contentSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
        // Lógica específica para carregar dados quando a seção é ativada
        const urlParams = new URLSearchParams(window.location.search);

        if (targetId === 'editarClienteSection') {
          const clientId = urlParams.get('id'); // O ID do cliente vem da URL
          if (clientId) {
            loadClientData(clientId); // Carrega o cliente automaticamente se ID na URL
          } else {
            // Se não houver ID na URL, o formulário permanece vazio
            showMessage('Nenhum ID de cliente fornecido na URL. Por favor, forneça um ID na URL para editar.', 'info', messageBoxCliente);
            resetClientForm(); // Limpa o formulário se nenhum ID for passado
          }
        } else if (targetId === 'editarVeiculoSection') {
          // APENAS MOSTRA A MENSAGEM DE IMPLEMENTAÇÃO FUTURA
          // Não tenta carregar dados de veículo
          showMessage('','info', messageBoxVeiculo);
          // Opcional: Você pode chamar uma função para limpar o formulário se ele existir
          // resetVehicleForm(); 
        } else if (targetId === 'editarMotoristaSection') {
          // APENAS MOSTRA A MENSAGEM DE IMPLEMENTAÇÃO FUTURA
          // Não tenta carregar dados de motorista
          showMessage('', 'info', messageBoxMotorista);
          // Opcional: Você pode chamar uma função para limpar o formulário se ele existir
          // resetMotoristaForm();
        }
      } else {
        section.classList.remove('active');
      }
    });
  }

  // --- Lógica de Edição de Cliente ---
  const nomeResponsavelInput = document.getElementById('nomeResponsavel');
  const enderecoInput = document.getElementById('endereco');
  const telefoneInput = document.getElementById('telefone');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const childrenContainer = document.getElementById('childrenContainer');
  const editClientForm = document.getElementById('editClientForm');

  let currentEditingClientId = null;
  let childCounter = 0;
  let removedChildIds = new Set();

  // Reseta o formulário do cliente
  function resetClientForm() {
    editClientForm.reset();
    childrenContainer.innerHTML = '<p>Nenhum aluno carregado.</p>';
    currentEditingClientId = null;
    removedChildIds.clear();
    childCounter = 0;
  }

  // Adiciona campos de criança (reutilizada)
  function adicionarCrianca(childData = {}) {
    const idSuffix = childData.id || `new_${childCounter++}`;

    const childDiv = document.createElement('div');
    childDiv.classList.add('child-entry');
    childDiv.dataset.childId = childData.id || ''; // Guarda o ID do aluno se for existente

    childDiv.innerHTML = `
          <button type="button" class="delete-child-btn" data-child-id="${childData.id || ''}">Excluir Aluno</button>
          <label for="nomeCrianca_${idSuffix}">Nome do Aluno:</label>
          <input type="text" class="nomeCrianca" id="nomeCrianca_${idSuffix}" value="${childData.nome || ''}" required>

          <label for="dtNasc_${idSuffix}">Data de Nascimento:</label>
          <input type="date" class="dtNasc" id="dtNasc_${idSuffix}" value="${childData.data_nasc || ''}" required>

          <label for="escola_${idSuffix}">Nome da Escola:</label>
          <input type="text" class="escola" id="escola_${idSuffix}" value="${childData.escola || ''}" required>

          <label for="entrada_${idSuffix}">Horário de Entrada:</label>
          <input type="time" class="entrada" id="entrada_${idSuffix}" value="${childData.entrada || ''}" required>

          <label for="saida_${idSuffix}">Horário de Saída:</label>
          <input type="time" class="saida" id="saida_${idSuffix}" value="${childData.saida || ''}" required>

          <label for="idEscolar_${idSuffix}">ID da Escola (para teste):</label>
          <input type="number" class="idEscolar" id="idEscolar_${idSuffix}" value="${childData.id_escolar || '3'}" readonly required>
      `;
    childrenContainer.appendChild(childDiv);

    // Adicionar listener para o botão de exclusão do aluno
    childDiv.querySelector('.delete-child-btn').addEventListener('click', (event) => {
      if (confirm('Tem certeza que deseja remover este aluno?')) {
        const childIdToRemove = event.target.dataset.childId;
        if (childIdToRemove) {
          removedChildIds.add(childIdToRemove); // Adiciona o ID do aluno a ser removido
          showMessage(`Aluno ${childIdToRemove} marcado para exclusão. Salve para confirmar.`, 'info', messageBoxCliente);
        }
        childDiv.remove();
        showMessage('Aluno removido visualmente. Salve para confirmar as alterações.', 'info', messageBoxCliente);
      }
    });
  }

  // Carrega os dados de um cliente pelo ID
  async function loadClientData(clientId) {
    if (!clientId) {
      showMessage('ID do cliente não fornecido.', 'error', messageBoxCliente);
      return;
    }

    showMessage('Carregando dados do cliente...', 'info', messageBoxCliente);
    try {
      // Adapte esta URL para sua API real que busca cliente por ID
      const response = await fetch(`http://localhost:3000/clientes/${clientId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        throw new Error(`Erro ao carregar cliente: ${response.status} - ${errorData.message}`);
      }
      const clientData = await response.json();

      currentEditingClientId = clientData.id;
      removedChildIds.clear(); // Reseta alunos removidos ao carregar um novo cliente

      // Preencher dados do responsável
      nomeResponsavelInput.value = clientData.nome || '';
      enderecoInput.value = clientData.endereco || '';
      telefoneInput.value = clientData.telefone || '';
      cpfInput.value = clientData.cpf || '';
      emailInput.value = clientData.email || '';
      senhaInput.value = ''; // Sempre limpa o campo de senha por segurança

      // Preencher dados dos alunos
      childrenContainer.innerHTML = '';
      if (clientData.alunos && clientData.alunos.length > 0) {
        clientData.alunos.forEach(child => {
          adicionarCrianca(child); // Adiciona cada aluno existente
        });
      } else {
        childrenContainer.innerHTML = '<p>Nenhum aluno cadastrado para este responsável. Clique "Adicionar Outro Aluno" para incluir.</p>';
      }

      showMessage('Cliente carregado com sucesso!', 'success', messageBoxCliente);

    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      showMessage(`Erro ao carregar dados do cliente: ${error.message}.`, 'error', messageBoxCliente);
    }
  }

  // Lógica para salvar alterações do cliente
  editClientForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!currentEditingClientId) {
      showMessage('Erro: ID do cliente não encontrado para salvar. Carregue um cliente primeiro.', 'error', messageBoxCliente);
      return;
    }

    const updatedClientData = {
      id: currentEditingClientId, // É crucial enviar o ID
      nome: nomeResponsavelInput.value,
      endereco: enderecoInput.value,
      telefone: telefoneInput.value,
      cpf: cpfInput.value,
      email: emailInput.value,
      senha: senhaInput.value ? senhaInput.value : undefined // Envia se preenchido, senão undefined
    };

    const updatedAlunosData = [];
    const childEntries = document.querySelectorAll('.child-entry');
    childEntries.forEach(entry => {
      const childId = entry.dataset.childId;
      const nomeCrianca = entry.querySelector('.nomeCrianca').value;
      const dtNasc = entry.querySelector('.dtNasc').value;
      const escola = entry.querySelector('.escola').value;
      const entrada = entry.querySelector('.entrada').value;
      const saida = entry.querySelector('.saida').value;
      const idEscolar = parseInt(entry.querySelector('.idEscolar').value);

      if (nomeCrianca && dtNasc && escola && entrada && saida && idEscolar) {
        updatedAlunosData.push({
          id: childId || undefined, // Inclui o ID para update/novo
          nome: nomeCrianca,
          data_nasc: dtNasc,
          escola: escola,
          entrada: entrada,
          saida: saida,
          id_escolar: idEscolar
        });
      }
    });

    // Converte o Set de IDs removidos para um Array, se o backend precisar
    const alunosParaDeletar = Array.from(removedChildIds);

    try {
      // Adapte esta URL e o MÉTODO (PUT/PATCH) para sua API real de atualização!
      const response = await fetch(`http://localhost:3000/clientes/${currentEditingClientId}`, {
        method: 'PUT', // Ou 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente: updatedClientData,
          alunos: updatedAlunosData,
          alunosParaDeletar: alunosParaDeletar // Envia os IDs dos alunos a serem deletados
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        throw new Error(`Erro ao salvar: ${response.status} - ${errorData.message}`);
      }

      showMessage('Cliente e alunos atualizados com sucesso!', 'success', messageBoxCliente);
      removedChildIds.clear(); // Limpa a lista de removidos após o sucesso

    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      showMessage(`Erro ao salvar alterações: ${error.message}`, 'error', messageBoxCliente);
    }
  });

  // --- Lógica de Edição de Veículo (SIMPLIFICADA) ---
  // Removidos todos os seletores e lógicas de formulário e busca para esta seção.
  // As funções loadVehicleData e editVehicleForm.addEventListener são removidas.
  function resetVehicleForm() { /* Nada para fazer, o HTML agora é estático */ }
  async function loadVehicleData(vehicleId) {
    console.log(`Tentativa de carregar veículo com ID ${vehicleId}. Funcionalidade futura.`);
    // Nenhuma lógica de carregamento real aqui, apenas a mensagem no showSection
  }
  // Removemos os event listeners para o formulário de veículo, pois ele agora é estático no HTML.

  // --- Lógica de Edição de Motorista (SIMPLIFICADA) ---
  // Removidos todos os seletores e lógicas de formulário e busca para esta seção.
  // As funções loadMotoristaData e editMotoristaForm.addEventListener são removidas.
  function resetMotoristaForm() { /* Nada para fazer, o HTML agora é estático */ }
  async function loadMotoristaData(motoristaId) {
    console.log(`Tentativa de carregar motorista com ID ${motoristaId}. Funcionalidade futura.`);
    // Nenhuma lógica de carregamento real aqui, apenas a mensagem no showSection
  }
  // Removemos os event listeners para o formulário de motorista, pois ele agora é estático no HTML.


  // --- Inicialização e Event Listeners do Sidebar ---
  menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
      const link = item.querySelector('a');

      // Permite que links com href direto (se houverem) funcionem
      if (link && link.getAttribute('href') !== '#') {
        return;
      }

      event.preventDefault(); // Impede o comportamento padrão do link para as seções internas

      menuItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.dataset.target;
      if (targetId) {
        showSection(targetId);
      }
    });
  });

  // --- Carregamento inicial da página ---
  const urlParams = new URLSearchParams(window.location.search);
  const clientIdFromUrl = urlParams.get('id'); // Tenta pegar ID de cliente da URL
  const vehicleIdFromUrl = urlParams.get('vehicleId'); // Tenta pegar ID de veículo da URL (agora não usado para carregar)
  const motoristaIdFromUrl = urlParams.get('motoristaId'); // Tenta pegar ID de motorista da URL (agora não usado para carregar)

  if (clientIdFromUrl) {
    showSection('editarClienteSection'); // Ativa a seção do cliente
    loadClientData(clientIdFromUrl); // Carrega os dados do cliente
  } else if (vehicleIdFromUrl) { // Se tiver vehicleId na URL, ativa a seção de veículo
    showSection('editarVeiculoSection');
    // loadVehicleData(vehicleIdFromUrl); // Nenhuma chamada aqui, apenas a mensagem será exibida
  } else if (motoristaIdFromUrl) { // Se tiver motoristaId na URL, ativa a seção de motorista
    showSection('editarMotoristaSection');
    // loadMotoristaData(motoristaIdFromUrl); // Nenhuma chamada aqui, apenas a mensagem será exibida
  } else {
    // Se nenhum ID for passado na URL, ativa a primeira seção por padrão (Editar Cliente)
    showSection('editarClienteSection');
    // Se for a seção de cliente, o resetClientForm já foi chamado
  }
});