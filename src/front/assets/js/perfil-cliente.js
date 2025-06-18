// src/front/assets/js/perfil-cliente.js

document.addEventListener('DOMContentLoaded', async () => {
  const jwtToken = localStorage.getItem('jwtToken');
  const clienteId = localStorage.getItem('clienteId'); // Opcional, o ID vem do JWT
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

  // Verificar se o usuário está logado
  if (!jwtToken) {
    showMessage('Você não está logado. Redirecionando para a página de login...', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
    return;
  }

  // Função de Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear(); // Limpa todos os dados do localStorage (token, id, etc.)
    showMessage('Sessão encerrada. Redirecionando...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html'; // Ou login.html, dependendo do fluxo
    }, 1500);
  });

  // Função para buscar e exibir os dados do cliente
  async function fetchClienteData() {
    try {
      const response = await fetch('http://localhost:3000/clientes/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}` // Envia o token JWT
        }
      });

      const cliente = await response.json();

      if (response.ok) {
        // Preencher Dados Pessoais
        document.getElementById('clienteNome').textContent = cliente.nome || 'N/A';
        document.getElementById('clienteCpf').textContent = cliente.cpf || 'N/A';
        document.getElementById('clienteEmail').textContent = cliente.email || 'N/A';
        document.getElementById('clienteEndereco').textContent = cliente.endereco || 'N/A';
        document.getElementById('clienteTelefone').textContent = cliente.telefone || 'N/A';

        // Preencher Dados dos Alunos
        const alunosContainer = document.getElementById('alunosContainer');
        alunosContainer.innerHTML = ''; // Limpa o conteúdo de carregamento

        if (cliente.alunos && cliente.alunos.length > 0) {
          cliente.alunos.forEach(aluno => {
            const alunoDiv = document.createElement('div');
            alunoDiv.classList.add('student-item');
            alunoDiv.innerHTML = `
              <p><strong>Nome do Aluno:</strong> ${aluno.nome || 'N/A'}</p>
              <p><strong>Escola:</strong> ${aluno.escola || 'N/A'} ${aluno.escolar ? `(${aluno.escolar.nome})` : ''}</p>
              <p><strong>Data Nasc.:</strong> ${aluno.data_nasc ? new Date(aluno.data_nasc).toLocaleDateString('pt-BR') : 'N/A'}</p>
              <p><strong>Entrada:</strong> ${aluno.entrada || 'N/A'}</p>
              <p><strong>Saída:</strong> ${aluno.saida || 'N/A'}</p>
            `;
            alunosContainer.appendChild(alunoDiv);
          });
        } else {
          alunosContainer.innerHTML = '<p>Nenhum aluno cadastrado para este cliente.</p>';
        }

        // Preencher Dados do Contrato
        const contratoStatus = document.getElementById('contratoStatus');
        const contratoValor = document.getElementById('contratoValor');
        const contratoDataInicio = document.getElementById('contratoDataInicio');
        const viewContractBtn = document.getElementById('viewContractBtn');

        if (cliente.contrato) {
          contratoStatus.textContent = cliente.contrato.status || 'N/A';
          contratoValor.textContent = cliente.contrato.valor_Servico ? `R$ ${parseFloat(cliente.contrato.valor_Servico).toFixed(2).replace('.', ',')}` : 'N/A';
          contratoDataInicio.textContent = cliente.contrato.data_servico ? new Date(cliente.contrato.data_servico).toLocaleDateString('pt-BR') : 'N/A';
          viewContractBtn.onclick = () => {
            // Lógica para visualizar contrato (abrir PDF, modal, etc.)
            alert('Funcionalidade de visualizar contrato em desenvolvimento!');
          };
        } else {
          contratoStatus.textContent = 'Nenhum contrato associado.';
          contratoValor.textContent = 'N/A';
          contratoDataInicio.textContent = 'N/A';
          viewContractBtn.disabled = true;
          viewContractBtn.textContent = 'Sem Contrato';
        }

        // Preencher Seção de Pagamentos (Dados Mockados ou Reais Futuros)
        const paymentsContainer = document.getElementById('paymentsContainer');
        paymentsContainer.innerHTML = ''; // Limpa o conteúdo de carregamento

        // Por enquanto, dados mockados para pagamentos.
        // Em uma fase futura, você buscará isso do back-end.
        const mockPayments = [
          { month: 'Maio/2025', status: 'Pago', id: 1 },
          { month: 'Abril/2025', status: 'Pendente', id: 2 },
          { month: 'Março/2025', status: 'Pago', id: 3 },
          { month: 'Fevereiro/2025', status: 'Pendente', id: 4 },
        ];

        if (mockPayments.length > 0) {
          mockPayments.forEach(payment => {
            const paymentDiv = document.createElement('div');
            paymentDiv.classList.add('payment-item');
            const statusClass = payment.status === 'Pago' ? 'paid' : 'pending';
            const statusIcon = payment.status === 'Pago' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';

            paymentDiv.innerHTML = `
              <span>Mês: ${payment.month}</span>
              <span class="payment-status ${statusClass}">${payment.status} ${statusIcon}</span>
              <div class="payment-actions">
                <button class="${payment.status === 'Pago' ? 'paid-btn' : ''}" ${payment.status === 'Pago' ? 'disabled' : ''} onclick="handlePayment(${payment.id})">${payment.status === 'Pago' ? 'Pago' : 'Pagar'}</button>
                <button class="attach-btn" onclick="handleAttachProof(${payment.id})">Anexar Comprovante</button>
              </div>
            `;
            paymentsContainer.appendChild(paymentDiv);
          });
        } else {
          paymentsContainer.innerHTML = '<p>Nenhum histórico de pagamentos disponível.</p>';
        }

      } else {
        // Erro ao buscar perfil
        showMessage('Erro ao carregar perfil: ' + (cliente.error || 'Erro desconhecido.'), 'error');
        // Redirecionar para login se o token for inválido/expirado
        if (response.status === 403 || response.status === 401) {
          localStorage.clear();
          setTimeout(() => { window.location.href = 'login.html'; }, 2000);
        }
      }
    } catch (error) {
      console.error('Erro de conexão ou servidor ao buscar perfil:', error);
      showMessage('Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
    }
  }

  // Funções de exemplo para botões de pagamento (implementação futura)
  window.handlePayment = (paymentId) => {
    alert(`Funcionalidade de pagar para o ID ${paymentId} em desenvolvimento!`);
    // Aqui você integraria com uma API de pagamento externa
  };

  window.handleAttachProof = (paymentId) => {
    alert(`Funcionalidade de anexar comprovante para o ID ${paymentId} em desenvolvimento!`);
    // Aqui você implementaria o upload de arquivos
  };

  // Chamar a função para buscar dados ao carregar a página
  fetchClienteData();
});
