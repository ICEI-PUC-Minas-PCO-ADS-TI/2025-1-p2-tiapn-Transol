
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

  togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
  });


  document.querySelector('.login-btn').addEventListener('click', function() {
    const email = document.querySelector('input[placeholder="Email"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    if (email === 'adm1@transol.com' && senha === '123456') {
      window.location.href = 'adm.html';  
    } else {
      alert('Email ou senha incorretos!');
    }
  });
