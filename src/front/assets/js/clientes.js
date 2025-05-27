// clientes.js

const clientes = [
  'Mariana De Oliveira',
  'João de Castro',
  'Agnelo M. Camapum',
  'Amanda Dorneles',
  'Ana Paula Soares'
];

const searchInput = document.getElementById('searchInput');
const clientList = document.getElementById('clientList');
const addClientBtn = document.getElementById('addClientBtn');

function renderClientes(filtro = '') {
  clientList.innerHTML = ''; 

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

searchInput.addEventListener('input', () => {
  const filtro = searchInput.value;
  renderClientes(filtro);
});

renderClientes();
