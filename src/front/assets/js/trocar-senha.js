// src/front/assets/js/trocar-senha.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('trocar-senha.js: DOMContentLoaded - Script iniciado.');

  const oldPasswordInput = document.querySelector('#oldPasswordInput');
  const newPasswordInput = document.querySelector('#newPasswordInput');
  const confirmNewPasswordInput = document.querySelector('#confirmNewPasswordInput');
  const changePasswordForm = document.querySelector('#changePasswordForm');
  const messageBox = document.querySelector('#messageBox');

  // Debug: Verificar se os elementos foram encontrados
  console.log('trocar-senha.js: oldPasswordInput:', oldPasswordInput);
  console.log('trocar-senha.js: newPasswordInput:', newPasswordInput);
  console.log('trocar-senha.js: confirmNewPasswordInput:', confirmNewPasswordInput);
  console.log('trocar-senha.js: changePasswordForm:', changePasswordForm);
  console.log('trocar-senha.js: messageBox:', messageBox);


  // Funções para toggle de senha
  const togglePassword = (input, toggleIcon) => {
    if (toggleIcon && input) {
      console.log(`trocar-senha.js: Configurando toggle para ${input.id}`);
      toggleIcon.addEventListener('click', function () {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
      });
    } else {
        console.warn(`trocar-senha.js: Elemento de input ou ícone de toggle não encontrado para a função togglePassword.`);
    }
  };

  togglePassword(oldPasswordInput, document.querySelector('#toggleOldPassword'));
  togglePassword(newPasswordInput, document.querySelector('#toggleNewPassword'));
  togglePassword(confirmNewPasswordInput, document.querySelector('#toggleConfirmNewPassword'));

  // Função para exibir mensagens de feedback
  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Lógica de Troca de Senha
  if (changePasswordForm) {
    console.log('trocar-senha.js: Formulário changePasswordForm encontrado. Adicionando event listener.');
    changePasswordForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const senhaAntiga = oldPasswordInput.value;
      const novaSenha = newPasswordInput.value;
      const confirmacaoNovaSenha = confirmNewPasswordInput.value;
      const jwtToken = localStorage.getItem('jwtToken'); // Obter o token do localStorage
      const clienteCpf = localStorage.getItem('clienteCpf'); // Obter o CPF do localStorage

      console.log('trocar-senha.js: Tentando trocar senha...');
      console.log('trocar-senha.js: Senha Antiga:', senhaAntiga);
      console.log('trocar-senha.js: Nova Senha (parcial):', novaSenha.substring(0, 3) + '...'); // Não logar a senha completa
      console.log('trocar-senha.js: Token JWT presente:', !!jwtToken); // True se existir
      console.log('trocar-senha.js: CPF do Cliente (para validação):', clienteCpf);


      if (!jwtToken) {
        showMessage('Você não está autenticado. Por favor, faça login novamente.', 'error');
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/trocar-senha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify({ senhaAntiga, novaSenha, confirmacaoNovaSenha, cpf: clienteCpf }), // Enviar CPF para validação no backend
        });

        const result = await response.json();

        if (response.ok) {
          showMessage('Senha alterada com sucesso! Redirecionando para o perfil...', 'success');
          localStorage.removeItem('jwtToken'); // Remover token antigo
          localStorage.removeItem('clienteId');
          localStorage.removeItem('clienteNome');
          localStorage.removeItem('clienteCpf'); // Remover CPF
          
          setTimeout(() => {
            window.location.href = 'perfil-cliente.html';
          }, 2000);
        } else {
          showMessage('Erro ao trocar senha: ' + (result.error || 'Erro desconhecido.'), 'error');
        }
      } catch (error) {
        console.error('trocar-senha.js: Erro de conexão ou servidor:', error);
        showMessage('Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
      }
    });
  } else {
    console.error('trocar-senha.js: Formulário #changePasswordForm não encontrado!');
  }
});
