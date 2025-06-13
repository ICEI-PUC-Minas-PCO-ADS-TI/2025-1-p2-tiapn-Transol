// src/front/assets/js/perfil-cliente.js

document.addEventListener('DOMContentLoaded', async () => {
  // Seletores de elementos DOM para as seções de perfil
  const clienteNomeSpan = document.getElementById('clienteNome');
  const clienteCpfSpan = document.getElementById('clienteCpf');
  const clienteEmailSpan = document.getElementById('clienteEmail');
  const clienteEnderecoSpan = document.getElementById('clienteEndereco');
  const clienteTelefoneSpan = document.getElementById('clienteTelefone');

  // Seletores para o FORMULÁRIO de edição de alunos
  const alunosFormContainer = document.getElementById('alunosFormContainer'); // Container para os campos de aluno
  const editAlunosForm = document.getElementById('editAlunosForm'); // Formulário de edição de alunos

  // Seletores para a seção de Contrato
  const contratoStatusSpan = document.getElementById('contratoStatus');
  const contratoValorSpan = document.getElementById('contratoValor');
  const contratoDataInicioSpan = document.getElementById('contratoDataInicio');
  const viewContractBtn = document.getElementById('viewContractBtn');
  const contractUrlInput = document.getElementById('contractUrlInput');
  const addContractUrlBtn = document.getElementById('addContractUrlBtn');

  // Seletores para a seção de Pagamentos
  const paymentsContainer = document.getElementById('paymentsContainer');

  // Seletores para elementos globais
  const logoutBtn = document.getElementById('logoutBtn');
  const messageBox = document.getElementById('messageBox'); // Caixa de mensagem geral

  // Seletores do menu lateral e seções de conteúdo
  const menuItems = document.querySelectorAll('.sidebar-nav .menu-item');
  const contentSections = document.querySelectorAll('.main-content .content-section');

  let currentClientId = null; // ID do cliente logado/a ser exibido
  let childCounter = 0; // Para IDs únicos de novos campos de aluno no formulário de edição
  let removedAlunosIds = new Set(); // Para rastrear alunos removidos do formulário de edição

  // --- Funções Auxiliares (mantendo nomes originais, se aplicável) ---

  // Função para exibir mensagens de feedback
  function showMessage(message, type) {
    if (messageBox) {
      messageBox.textContent = message;
      messageBox.className = 'message-box ' + type;
      messageBox.style.display = 'block';

      setTimeout(() => {
        messageBox.style.display = 'none';
      }, 5000);
    } else {
      console.error("Erro: Elemento messageBox não encontrado!");
      alert(message); // Fallback
    }
  }

  // Função para verificar autenticação e obter ID do cliente (adaptado do seu fluxo)
  async function checkAuthenticationAndGetClientId() {
    const jwtToken = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId'); // Assumindo que o ID do usuário é salvo aqui
    const clientCpfFromAdm = new URLSearchParams(window.location.search).get('cpf'); // Se vier da ADM

    if (!jwtToken || (userRole !== 'cliente' && userRole !== 'admin')) {
      showMessage('Você não está logado ou não tem permissão. Redirecionando para o login...', 'error');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
      return null;
    }

    // Se veio da página de ADM com CPF na URL (para admin visualizar perfil de cliente)
    if (userRole === 'admin' && clientCpfFromAdm) {
      try {
        // Adapte para sua API que busca cliente por CPF para o admin
        const response = await fetch(`http://localhost:3000/clientes/search?cpf=${encodeURIComponent(clientCpfFromAdm)}`, {
          headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
        if (!response.ok) {
          throw new Error(`Erro ao buscar cliente por CPF: ${response.status}`);
        }
        const clientData = await response.json();
        if (clientData && clientData.length > 0) {
          return clientData[0].id; // Retorna o ID do cliente encontrado
        } else {
          showMessage('Cliente não encontrado para o CPF fornecido.', 'error');
          return null;
        }
      } catch (error) {
        console.error("Erro ao buscar cliente por CPF para admin:", error);
        showMessage(`Erro ao carregar perfil do cliente: ${error.message}`, 'error');
        return null;
      }
    }

    // Se for um cliente logado, usa o ID do localStorage
    if (userRole === 'cliente' && userId) {
      return userId;
    }

    // Se nenhum dos casos, ou ID não encontrado
    showMessage('ID do cliente não disponível para carregar o perfil.', 'error');
    return null;
  }


  // --- Lógica Principal de Exibição de Seções (Sidebar) ---
  function showSection(targetId) {
    contentSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
        // Lógica para carregar dados específicos da seção
        if (currentClientId) {
          if (targetId === 'dadosPessoaisSection') {
            loadDadosPessoais(currentClientId);
          } else if (targetId === 'dadosAlunosSection') {
            loadDadosAlunos(currentClientId); // Chama a função para carregar e exibir o formulário de alunos
          } else if (targetId === 'contratoSection') {
            loadContrato(currentClientId);
          } else if (targetId === 'pagamentosSection') {
            loadPagamentos(currentClientId);
          }
        } else {
          showMessage('Nenhum cliente carregado. Por favor, faça login ou forneça um ID.', 'info');
          // Limpar conteúdo das seções se não houver cliente
          if (clienteNomeSpan) clienteNomeSpan.textContent = 'N/A';
          if (clienteCpfSpan) clienteCpfSpan.textContent = 'N/A';
          if (clienteEmailSpan) clienteEmailSpan.textContent = 'N/A';
          if (clienteEnderecoSpan) clienteEnderecoSpan.textContent = 'N/A';
          if (clienteTelefoneSpan) clienteTelefoneSpan.textContent = 'N/A';
          if (alunosFormContainer) alunosFormContainer.innerHTML = '<p>Nenhum aluno disponível.</p>'; // Limpa o container do formulário
          if (contratoStatusSpan) contratoStatusSpan.textContent = 'N/A';
          if (contratoValorSpan) contratoValorSpan.textContent = 'N/A';
          if (contratoDataInicioSpan) contratoDataInicioSpan.textContent = 'N/A';
          if (paymentsContainer) paymentsContainer.innerHTML = '<p>Nenhum pagamento.</p>';
        }
      } else {
        section.classList.remove('active');
      }
    });
  }

  // --- Funções de Carregamento de Dados para cada Seção ---

  // Carrega Dados Pessoais
  async function loadDadosPessoais(clientId) {
    showMessage('Carregando dados pessoais...', 'info');
    try {
      // Adapte esta URL para sua API que busca dados do cliente por ID
      const response = await fetch(`http://localhost:3000/clientes/${clientId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const clienteData = await response.json();

      if (clienteNomeSpan) clienteNomeSpan.textContent = clienteData.nome || 'N/A';
      if (clienteCpfSpan) clienteCpfSpan.textContent = clienteData.cpf || 'N/A';
      if (clienteEmailSpan) clienteEmailSpan.textContent = clienteData.email || 'N/A';
      if (clienteEnderecoSpan) clienteEnderecoSpan.textContent = clienteData.endereco || 'N/A';
      if (clienteTelefoneSpan) clienteTelefoneSpan.textContent = clienteData.telefone || 'N/A';

      showMessage('Dados pessoais carregados.', 'success');
    } catch (error) {
      console.error('Erro ao carregar dados pessoais:', error);
      showMessage(`Erro ao carregar dados pessoais: ${error.message}`, 'error');
      if (clienteNomeSpan) clienteNomeSpan.textContent = 'Erro ao carregar';
    }
  }

  // Função para adicionar campos de aluno no formulário de edição
  function adicionarAlunoForm(alunoData = {}) {
    if (!alunosFormContainer) {
      console.error("Erro: Elemento alunosFormContainer não encontrado.");
      return;
    }
    const idSuffix = alunoData.id || `new_${childCounter++}`; // Mantendo childCounter para IDs únicos

    const alunoDiv = document.createElement('div');
    alunoDiv.classList.add('student-item'); // Reutilizando a classe de estilo
    alunoDiv.dataset.alunoId = alunoData.id || ''; // Guarda o ID do aluno se for existente

    alunoDiv.innerHTML = `
          <p><strong>Nome:</strong> <input type="text" class="alunoNome" id="alunoNome_${idSuffix}" value="${alunoData.nome || ''}" required></p>
          <p><strong>Nascimento:</strong> <input type="date" class="alunoDtNasc" id="alunoDtNasc_${idSuffix}" value="${alunoData.data_nasc || ''}" required></p>
          <p><strong>Escola:</strong> <input type="text" class="alunoEscola" id="alunoEscola_${idSuffix}" value="${alunoData.escola || ''}" required></p>
          <p><strong>Entrada:</strong> <input type="time" class="alunoEntrada" id="alunoEntrada_${idSuffix}" value="${alunoData.entrada || ''}" required></p>
          <p><strong>Saída:</strong> <input type="time" class="alunoSaida" id="alunoSaida_${idSuffix}" value="${alunoData.saida || ''}" required></p>
          <p><strong>ID Escola:</strong> <input type="number" class="alunoIdEscolar" id="alunoIdEscolar_${idSuffix}" value="${alunoData.id_escolar || '3'}" readonly required></p>
          <div class="student-actions">
              <button type="button" class="delete-btn" data-aluno-id="${alunoData.id || ''}">Excluir Aluno</button>
          </div>
      `;
    alunosFormContainer.appendChild(alunoDiv);

    // Adicionar listener para o botão de exclusão do aluno no formulário
    alunoDiv.querySelector('.delete-btn').addEventListener('click', (event) => {
      if (confirm('Tem certeza que deseja remover este aluno?')) {
        const alunoIdToRemove = event.target.dataset.alunoId;
        if (alunoIdToRemove) {
          removedAlunosIds.add(alunoIdToRemove); // Adiciona o ID do aluno a ser removido
          showMessage(`Aluno ${alunoIdToRemove} marcado para exclusão. Salve para confirmar.`, 'info');
        }
        alunoDiv.remove();
        showMessage('Aluno removido visualmente. Salve para confirmar as alterações.', 'info');
      }
    });
  }

  // Carrega Dados dos Alunos (para o formulário de edição)
  async function loadDadosAlunos(clientId) {
    showMessage('Carregando dados dos alunos...', 'info');
    if (alunosFormContainer) alunosFormContainer.innerHTML = '<p>Carregando dados dos alunos...</p>'; // Mensagem de carregamento
    try {
      // Adapte esta URL para sua API que busca alunos por cliente ID
      const response = await fetch(`http://localhost:3000/clientes/${clientId}/alunos`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const alunos = await response.json();

      if (alunosFormContainer) alunosFormContainer.innerHTML = ''; // Limpa a mensagem de carregamento
      if (alunos && alunos.length > 0) {
        alunos.forEach(aluno => {
          adicionarAlunoForm(aluno); // Adiciona cada aluno ao formulário
        });
        showMessage('Dados dos alunos carregados.', 'success');
      } else {
        if (alunosFormContainer) alunosFormContainer.innerHTML = '<p>Nenhum aluno cadastrado para este cliente. Clique "Adicionar Outro Aluno" para incluir.</p>';
        showMessage('Nenhum aluno encontrado.', 'info');
      }
    } catch (error) {
      console.error('Erro ao carregar dados dos alunos:', error);
      showMessage(`Erro ao carregar dados dos alunos: ${error.message}`, 'error');
      if (alunosFormContainer) alunosFormContainer.innerHTML = '<p>Erro ao carregar alunos.</p>';
    }
  }

  // Lógica para Salvar Alterações dos Alunos
  if (editAlunosForm) { // Verifica se o formulário existe na página
    editAlunosForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (!currentClientId) {
        showMessage('Nenhum cliente carregado para salvar alterações dos alunos.', 'error');
        return;
      }

      const updatedAlunosData = [];
      const alunoEntries = document.querySelectorAll('#alunosFormContainer .student-item');
      alunoEntries.forEach(entry => {
        const alunoId = entry.dataset.alunoId;
        const nomeAluno = entry.querySelector('.alunoNome').value;
        const dtNasc = entry.querySelector('.alunoDtNasc').value;
        const escola = entry.querySelector('.alunoEscola').value;
        const entrada = entry.querySelector('.alunoEntrada').value;
        const saida = entry.querySelector('.alunoSaida').value;
        const idEscolar = parseInt(entry.querySelector('.alunoIdEscolar').value);

        if (nomeAluno && dtNasc && escola && entrada && saida && idEscolar) {
          updatedAlunosData.push({
            id: alunoId || undefined, // Inclui o ID para update/novo
            nome: nomeAluno,
            data_nasc: dtNasc,
            escola: escola,
            entrada: entrada,
            saida: saida,
            id_escolar: idEscolar
          });
        }
      });

      const alunosParaDeletar = Array.from(removedAlunosIds);

      try {
        // Adapte esta URL para sua API de atualização de alunos (ex: PUT /clientes/:id/alunos)
        const response = await fetch(`http://localhost:3000/clientes/${currentClientId}/alunos`, {
          method: 'PUT', // Ou 'PATCH'
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
          body: JSON.stringify({
            alunos: updatedAlunosData,
            alunosParaDeletar: alunosParaDeletar
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
          throw new Error(`Erro ao salvar alunos: ${response.status} - ${errorData.message}`);
        }

        showMessage('Dados dos alunos atualizados com sucesso!', 'success');
        removedAlunosIds.clear(); // Limpa a lista de removidos após o sucesso
        loadDadosAlunos(currentClientId); // Recarrega os alunos para refletir as mudanças

      } catch (error) {
        console.error('Erro ao salvar alterações dos alunos:', error);
        showMessage(`Erro ao salvar alterações dos alunos: ${error.message}`, 'error');
      }
    });
  }

  // Botão "Adicionar Outro Aluno" para o formulário de edição de alunos
  if (document.querySelector('.add-child-button')) { // Verifica se o botão existe
    document.querySelector('.add-child-button').addEventListener('click', () => adicionarAlunoForm());
  }


  // Carrega Dados do Contrato
  async function loadContrato(clientId) {
    showMessage('Carregando dados do contrato...', 'info');
    try {
      // Adapte esta URL para sua API que busca contrato por cliente ID
      const response = await fetch(`http://localhost:3000/clientes/${clientId}/contrato`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const contratoData = await response.json();

      if (contratoStatusSpan) contratoStatusSpan.textContent = contratoData.status || 'N/A';
      if (contratoValorSpan) contratoValorSpan.textContent = `R$ ${parseFloat(contratoData.valor || 0).toFixed(2).replace('.', ',')}`;
      if (contratoDataInicioSpan) contratoDataInicioSpan.textContent = contratoData.data_inicio || 'N/A'; // Pode formatar a data aqui

      // Preencher o campo de URL do contrato
      if (contractUrlInput) contractUrlInput.value = contratoData.url_documento || ''; // Preenche o input da URL

      if (viewContractBtn) {
        viewContractBtn.style.display = contratoData.url_documento ? 'inline-block' : 'none';
        viewContractBtn.onclick = () => {
          if (contratoData.url_documento) window.open(contratoData.url_documento, '_blank');
          else showMessage('URL do contrato não disponível.', 'info');
        };
      }

      showMessage('Dados do contrato carregados.', 'success');
    } catch (error) {
      console.error('Erro ao carregar contrato:', error);
      showMessage(`Erro ao carregar contrato: ${error.message}`, 'error');
      if (contratoStatusSpan) contratoStatusSpan.textContent = 'Erro ao carregar';
      if (contractUrlInput) contractUrlInput.value = ''; // Limpa o input em caso de erro
    }
  }

  // Função para salvar a URL do contrato
  async function salvarContratoURL() {
    if (!currentClientId) {
      showMessage('Nenhum cliente carregado para salvar o contrato.', 'error');
      return;
    }
    if (!contractUrlInput || !contractUrlInput.value.trim()) {
      showMessage('Por favor, insira uma URL válida para o contrato.', 'error');
      return;
    }

    showMessage('Salvando URL do contrato...', 'info');
    const jwtToken = localStorage.getItem('jwtToken');
    const contractUrl = contractUrlInput.value.trim();

    try {
      // Adapte esta URL e MÉTODO para sua API real de atualização do contrato
      const response = await fetch(`http://localhost:3000/clientes/${currentClientId}/contrato`, {
        method: 'PATCH', // Ou PUT, se você estiver enviando o objeto contrato inteiro
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
        body: JSON.stringify({ url_documento: contractUrl }) // Enviando apenas a URL para atualização
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        throw new Error(`Erro ao salvar URL do contrato: ${response.status} - ${errorData.message}`);
      }

      showMessage('URL do contrato salva com sucesso!', 'success');
      loadContrato(currentClientId); // Recarrega os dados do contrato para refletir a mudança
    } catch (error) {
      console.error('Erro ao salvar URL do contrato:', error);
      showMessage(`Erro ao salvar URL do contrato: ${error.message}`, 'error');
    }
  }


  // Carrega Dados de Pagamentos (MODIFICADA para incluir upload de comprovante)
  async function loadPagamentos(clientId) {
    showMessage('Carregando informações de pagamentos...', 'info');
    if (paymentsContainer) paymentsContainer.innerHTML = '<p>Carregando informações de pagamentos...</p>';
    try {
      // Adapte esta URL para sua API que busca pagamentos por cliente ID
      const response = await fetch(`http://localhost:3000/clientes/${clientId}/pagamentos`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const pagamentos = await response.json();

      if (paymentsContainer) paymentsContainer.innerHTML = ''; // Limpa mensagem de carregamento
      if (pagamentos && pagamentos.length > 0) {
        pagamentos.forEach(pagamento => {
          const paymentItem = document.createElement('div');
          paymentItem.classList.add('payment-item');
          const statusClass = pagamento.status === 'Pago' ? 'paid' : 'pending';
          const iconClass = pagamento.status === 'Pago' ? 'fas fa-check-circle' : 'fas fa-times-circle'; // Corrigido ícone pendente

          paymentItem.innerHTML = `
                      <span>Mês: ${pagamento.mes_referencia || 'N/A'}</span>
                      <span class="payment-status ${statusClass}">
                          ${pagamento.status || 'N/A'} <i class="${iconClass}"></i>
                      </span>
                      <div class="payment-item-actions-wrapper"> <div class="payment-actions">
                              <button class="pay-btn" data-payment-id="${pagamento.id}" ${pagamento.status === 'Pago' ? 'disabled' : ''}>${pagamento.status === 'Pago' ? 'Pago' : 'Pagar'}</button>
                              ${pagamento.comprovante_url ? `<button class="view-proof-btn" data-proof-url="${pagamento.comprovante_url}">Ver Comprovante</button>` : ''}
                          </div>
                          ${pagamento.status !== 'Pago' ? ` <div class="payment-item-actions-row">
                                  <input type="file" id="proofUpload_${pagamento.id}" accept="image/*,.pdf" class="proof-upload-input">
                                  <button class="attach-btn" data-payment-id="${pagamento.id}">Anexar</button>
                              </div>
                          ` : ''}
                      </div>
                  `;
          paymentsContainer.appendChild(paymentItem);
        });

        // Adicionar event listeners para os botões gerados dinamicamente
        paymentsContainer.querySelectorAll('.pay-btn').forEach(button => {
          button.addEventListener('click', (e) => handlePayment(e.target.dataset.paymentId));
        });
        paymentsContainer.querySelectorAll('.attach-btn').forEach(button => {
          button.addEventListener('click', (e) => handleAttachProof(e.target.dataset.paymentId));
        });
        paymentsContainer.querySelectorAll('.view-proof-btn').forEach(button => {
          button.addEventListener('click', (e) => window.open(e.target.dataset.proofUrl, '_blank'));
        });

        showMessage('Pagamentos carregados.', 'success');
      } else {
        if (paymentsContainer) paymentsContainer.innerHTML = '<p>Nenhum pagamento registrado.</p>';
        showMessage('Nenhum pagamento encontrado.', 'info');
      }
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
      showMessage(`Erro ao carregar pagamentos: ${error.message}`, 'error');
      if (paymentsContainer) paymentsContainer.innerHTML = '<p>Erro ao carregar pagamentos.</p>';
    }
  }

  // Funções para botões de pagamento e anexo (agora usam fetch para backend)
  async function handlePayment(paymentId) {
    if (!currentClientId) { showMessage('Cliente não carregado.', 'error'); return; }
    showMessage(`Processando pagamento para o ID ${paymentId}...`, 'info');
    try {
      // Adapte esta URL e método para sua API que atualiza o status de pagamento
      const response = await fetch(`http://localhost:3000/clientes/${currentClientId}/pagamentos/${paymentId}/marcar-pago`, {
        method: 'PATCH', // ou PUT, POST
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        throw new Error(`Erro ao marcar pagamento como pago: ${response.status} - ${errorData.message}`);
      }
      showMessage('Pagamento marcado como pago com sucesso!', 'success');
      loadPagamentos(currentClientId); // Recarrega a seção para atualizar o status
    } catch (error) {
      console.error('Erro ao marcar pagamento como pago:', error);
      showMessage(`Erro ao marcar pagamento como pago: ${error.message}`, 'error');
    }
  }

  async function handleAttachProof(paymentId) {
    if (!currentClientId) { showMessage('Cliente não carregado.', 'error'); return; }
    const proofInput = document.getElementById(`proofUpload_${paymentId}`);
    const file = proofInput ? proofInput.files[0] : null;

    if (!file) {
      showMessage('Por favor, selecione um arquivo para anexar.', 'error');
      return;
    }

    showMessage(`Anexando comprovante para o ID ${paymentId}...`, 'info');
    const formData = new FormData();
    formData.append('comprovante', file); // 'comprovante' deve ser o nome do campo que sua API espera
    formData.append('paymentId', paymentId); // Envia o ID do pagamento

    try {
      // Adapte esta URL para sua API que lida com upload de comprovantes
      // Exemplo: POST /upload-comprovante ou PATCH /clientes/:id/pagamentos/:paymentId/upload
      const response = await fetch(`http://localhost:3000/clientes/${currentClientId}/pagamentos/${paymentId}/upload-comprovante`, {
        method: 'POST', // ou PUT/PATCH dependendo do seu endpoint
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          // 'Content-Type' NÃO é definido para FormData, o navegador faz isso automaticamente
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        throw new Error(`Erro ao anexar comprovante: ${response.status} - ${errorData.message}`);
      }

      showMessage('Comprovante anexado com sucesso!', 'success');
      loadPagamentos(currentClientId); // Recarrega a seção para atualizar o status e mostrar link
    } catch (error) {
      console.error('Erro ao anexar comprovante:', error);
      showMessage(`Erro ao anexar comprovante: ${error.message}`, 'error');
    }
  }


  // --- Inicialização e Event Listeners ---

  // 1. Obter ID do cliente ao carregar a página e verificar autenticação
  currentClientId = await checkAuthenticationAndGetClientId();

  // 2. Adicionar Event Listeners para o menu lateral
  menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
      const link = item.querySelector('a');

      // Permite que links com href direto funcionem (se houverem)
      if (link && link.getAttribute('href') !== '#') {
        return;
      }

      event.preventDefault(); // Impede o comportamento padrão do link para as seções internas

      // Remove a classe 'active' de todos os itens do menu
      menuItems.forEach(mi => mi.classList.remove('active'));

      // Adiciona a classe 'active' ao item clicado
      item.classList.add('active');

      // Mostra a seção correspondente
      const targetId = item.dataset.target;
      if (targetId) {
        showSection(targetId);
      }
    });
  });

  // 3. Adicionar Event listener para o botão de Logout no Header
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      showMessage('Sessão encerrada. Redirecionando...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html'; // Ou 'login.html'
      }, 1500);
    });
  }

  // 4. Carregar a primeira seção (Dados Pessoais) e seus dados ao carregar a página
  if (currentClientId) {
    const initialTargetId = contentSections[0].id; // Pega o ID da primeira seção (dadosPessoaisSection)
    showSection(initialTargetId);
  } else {
    // Se não houver cliente, a mensagem já é tratada dentro de showSection
    showSection(contentSections[0].id); // Tenta mostrar a primeira seção, mas com mensagem de erro
  }
});