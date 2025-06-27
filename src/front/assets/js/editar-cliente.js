// src/front/assets/js/editar-cliente.js

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('id'); // Obtém o ID do cliente da URL

  const editClientForm = document.getElementById('editClientForm');
  const messageBox = document.getElementById('messageBox');

  // Campos do responsável
  const nomeResponsavelInput = document.getElementById('nomeResponsavel');
  const enderecoInput = document.getElementById('endereco');
  const telefoneInput = document.getElementById('telefone');
  const cpfInput = document.getElementById('cpf');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const togglePassword = document.getElementById('togglePassword');

  // Container de alunos
  const childrenContainer = document.getElementById('childrenContainer');

  let currentAlunos = []; // Para armazenar os alunos atuais e seus IDs

  // Função para exibir mensagens de feedback
  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Lógica de toggle de senha
  if (togglePassword && senhaInput) {
    togglePassword.addEventListener('click', function () {
      const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
      senhaInput.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Verificar autenticação do administrador
  const jwtToken = localStorage.getItem('jwtToken');
  const userRole = localStorage.getItem('userRole');

  if (!jwtToken || userRole !== 'admin') {
    showMessage('Você não está logado como administrador. Redirecionando para o login...', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
    return;
  }

  // Função para adicionar um novo campo de aluno
  window.adicionarCrianca = (alunoData = {}) => {
    const newChildId = currentAlunos.length > 0 ? Math.max(...currentAlunos.map(a => a.tempId || a.id)) + 1 : 0;
    // Se for um aluno existente, use o ID real
    const alunoId = alunoData.id || `new_${newChildId}`; // ID temporário para novos alunos

    const childDiv = document.createElement('div');
    childDiv.classList.add('child-entry');
    childDiv.dataset.alunoId = alunoId; // Armazena o ID (real ou temporário)
    childDiv.innerHTML = `
      <button type="button" class="delete-child-btn" data-id="${alunoId}">X</button>
      <label for="nomeCrianca_${alunoId}">Nome do Aluno:</label>
      <input type="text" class="nomeCrianca" id="nomeCrianca_${alunoId}" value="${alunoData.nome || ''}" required>

      <label for="dtNasc_${alunoId}">Data de Nascimento:</label>
      <input type="date" class="dtNasc" id="dtNasc_${alunoId}" value="${alunoData.data_nasc || ''}" required>

      <label for="escola_${alunoId}">Nome da Escola:</label>
      <input type="text" class="escola" id="escola_${alunoId}" value="${alunoData.escola || ''}" required>

      <label for="entrada_${alunoId}">Horário de Entrada:</label>
      <input type="time" class="entrada" id="entrada_${alunoId}" value="${alunoData.entrada || ''}" required>

      <label for="saida_${alunoId}">Horário de Saída:</label>
      <input type="time" class="saida" id="saida_${alunoId}" value="${alunoData.saida || ''}" required>

      <label for="idEscolar_${alunoId}">ID da Escola (para teste):</label>
      <input type="number" class="idEscolar" id="idEscolar_${alunoId}" value="${alunoData.id_escolar || 3}" readonly required>
    `;
    childrenContainer.appendChild(childDiv);

    // Adicionar listener para o botão de exclusão de aluno
    childDiv.querySelector('.delete-child-btn').addEventListener('click', (event) => {
        const idToDelete = event.target.dataset.id;
        // Marcar para exclusão ou remover do DOM
        if (idToDelete.startsWith('new_')) { // Se for um aluno recém-adicionado no front-end
            childDiv.remove();
            currentAlunos = currentAlunos.filter(a => (a.tempId || a.id) !== idToDelete);
        } else { // Se for um aluno existente do DB, marcar para exclusão no backend
            if (confirm('Tem certeza que deseja remover este aluno? Esta ação será efetivada ao salvar as alterações do cliente.')) {
                // Adicionar o ID do aluno a uma lista de alunos a serem excluídos
                // Ou, para simplificar por enquanto, apenas remover visualmente e lidar no backend
                childDiv.style.display = 'none'; // Esconde visualmente
                // Você precisará de uma lógica no backend para identificar alunos removidos
                // Uma forma simples é enviar apenas os alunos que permanecem no formulário
                // e o backend deleta os que não foram enviados.
                currentAlunos = currentAlunos.filter(a => a.id !== parseInt(idToDelete)); // Remove do array local
            }
        }
    });
  };

  // Carregar dados do cliente
  async function loadClientData() {
    if (!clientId) {
      showMessage('ID do cliente não fornecido na URL.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://transolback-a0cgf5ezcqcwdqey.brazilsouth-01.azurewebsites.net/clientes/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      const clientData = await response.json();

      if (response.ok) {
        nomeResponsavelInput.value = clientData.nome || '';
        enderecoInput.value = clientData.endereco || '';
        telefoneInput.value = clientData.telefone || '';
        cpfInput.value = clientData.cpf || '';
        emailInput.value = clientData.email || '';
        // Senha não preenche por segurança

        childrenContainer.innerHTML = ''; // Limpa "Carregando..."
        if (clientData.alunos && clientData.alunos.length > 0) {
          currentAlunos = clientData.alunos; // Armazena os alunos atuais
          clientData.alunos.forEach(aluno => adicionarCrianca(aluno));
        } else {
          childrenContainer.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
        }

      } else {
        showMessage('Erro ao carregar dados do cliente: ' + (clientData.error || 'Erro desconhecido.'), 'error');
        if (response.status === 403 || response.status === 401) {
          localStorage.clear();
          setTimeout(() => { window.location.href = 'login.html'; }, 2000);
        }
      }
    } catch (error) {
      console.error('Erro de conexão ao carregar cliente:', error);
      showMessage('Erro de conexão com o servidor ao carregar cliente.', 'error');
    }
  }

  // Lógica para salvar alterações
  editClientForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const clienteData = {
      nome: nomeResponsavelInput.value,
      endereco: enderecoInput.value,
      telefone: telefoneInput.value,
      cpf: cpfInput.value, // CPF não é editável, mas pode ser enviado para validação
      email: emailInput.value,
    };

    if (senhaInput.value) { // Apenas adiciona a senha se o campo não estiver vazio
      clienteData.senha = senhaInput.value;
    }

    const alunosToUpdate = [];
    const alunoElements = childrenContainer.querySelectorAll('.child-entry');
    alunoElements.forEach(entry => {
      // Apenas processa alunos que não foram marcados para exclusão visualmente
      if (entry.style.display !== 'none') {
        const alunoId = entry.dataset.alunoId; // Real ID ou temp ID
        alunosToUpdate.push({
          id: alunoId.startsWith('new_') ? undefined : parseInt(alunoId), // Envia ID real ou undefined para novos
          nome: entry.querySelector('.nomeCrianca').value,
          data_nasc: entry.querySelector('.dtNasc').value,
          escola: entry.querySelector('.escola').value,
          entrada: entry.querySelector('.entrada').value,
          saida: entry.querySelector('.saida').value,
          id_escolar: parseInt(entry.querySelector('.idEscolar').value)
        });
      }
    });

    // Validar dados antes de enviar
    if (!clienteData.nome || !clienteData.cpf || !clienteData.endereco || !clienteData.telefone || !clienteData.email) {
        showMessage('Por favor, preencha todos os dados obrigatórios do responsável.', 'error');
        return;
    }
    if (alunosToUpdate.length === 0 && childrenContainer.innerHTML !== '<p>Nenhum aluno cadastrado.</p>') {
        showMessage('Por favor, adicione pelo menos um aluno ou remova todos os campos vazios.', 'error');
        return;
    }


    try {
      const response = await fetch(`https://transolback-a0cgf5ezcqcwdqey.brazilsouth-01.azurewebsites.net/clientes/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          cliente: clienteData,
          alunos: alunosToUpdate // Envia a lista de alunos para o backend
        }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('Cliente atualizado com sucesso!', 'success');
        // Opcional: Recarregar dados após salvar ou redirecionar
        // loadClientData();
        // window.location.href = 'adm.html'; // Voltar para o painel do admin
      } else {
        showMessage('Erro ao atualizar cliente: ' + (result.error || 'Erro desconhecido.'), 'error');
      }
    } catch (error) {
      console.error('Erro de conexão ao salvar cliente:', error);
      showMessage('Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
    }
  });

  // Carregar dados ao iniciar a página
  loadClientData();
});
