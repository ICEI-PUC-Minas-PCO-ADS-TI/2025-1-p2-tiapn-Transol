// src/front/assets/js/login.js

document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.querySelector('#togglePassword');
  const passwordInput = document.querySelector('#passwordInput');
  const loginInput = document.querySelector('#loginInput'); // Novo campo de input unificado
  const loginForm = document.querySelector('#loginForm');
  const messageBox = document.querySelector('#messageBox');

  // Credenciais fixas para o administrador (front-end)
  const FIXED_ADMIN_EMAIL = 'adm1@transol.com';
  const FIXED_ADMIN_PASSWORD = 'adm123@';

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
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Lógica de Login Unificado
  if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const loginValue = loginInput.value; // Pode ser CPF ou Email
      const senha = passwordInput.value;

      // Limpa localStorage de sessões anteriores
      localStorage.clear(); 

      // Tentar login de administrador primeiro
      if (loginValue === FIXED_ADMIN_EMAIL && senha === FIXED_ADMIN_PASSWORD) {
        try {
          const response = await fetch('http://localhost:3000/auth/admin-fixed-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginValue, senha }),
          });

          const result = await response.json();

          if (response.ok) {
            showMessage('Login de administrador bem-sucedido!', 'success');
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('userId', result.admin.id);
            localStorage.setItem('userRole', 'admin');
            window.location.href = 'adm.html';
          } else {
            // Se o back-end retornou erro para admin fixo (ex: admin não encontrado no DB)
            showMessage('Erro no login do administrador: ' + (result.error || 'Erro desconhecido.'), 'error');
          }
        } catch (error) {
          console.error('Erro de conexão ou servidor (admin):', error);
          showMessage('Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
        }
      } else {
        // Se não for admin fixo, tentar login de cliente (com CPF)
        try {
          const response = await fetch('http://localhost:3000/auth/login', { // Rota de login do cliente
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf: loginValue, senha }), // Enviando como CPF
          });

          const result = await response.json();

          if (response.ok) {
            showMessage('Login de cliente bem-sucedido!', 'success');
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('userId', result.cliente.id);
            localStorage.setItem('userName', result.cliente.nome);
            localStorage.setItem('userRole', 'cliente');

            if (result.requiresPasswordChange) {
              window.location.href = 'trocar-senha.html';
            } else {
              window.location.href = 'perfil-cliente.html';
            }
          } else {
            // Se o back-end retornou erro para cliente
            showMessage('Erro no login do cliente: ' + (result.error || 'Erro desconhecido.'), 'error');
          }
        } catch (error) {
          console.error('Erro de conexão ou servidor (cliente):', error);
          showMessage('Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
        }
      }
    });
  }
});
