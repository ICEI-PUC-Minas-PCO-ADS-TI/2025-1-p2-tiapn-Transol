// src/front/firebase-script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do Firebase (DEVE SER A MESMA EM TODOS OS LUGARES)
const firebaseConfig = {
    apiKey: "AIzaSyCWhINHI-vP34KRhDmd3tXojtdUR4c98TE",
    authDomain: "transolapp-c9c1a.firebaseapp.com",
    projectId: "transolapp-c9c1a",
    storageBucket: "transolapp-c9c1a.firebasestorage.app",
    messagingSenderId: "727466146759",
    appId: "1:727466146759:web:e300dab41004a002a737e2"
};

// Inicializa o Firebase (se ainda não foi inicializado)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 'db' local para este script

// Referências aos elementos do formulário
const form = document.getElementById('orcamentoForm');
const tipoOrcamentoSelect = document.getElementById('tipoOrcamento');
const camposEscolar = document.getElementById('camposEscolar');
const camposViagem = document.getElementById('camposViagem');

// Seleciona os elementos de feedback do formulário
const loadingDiv = form.querySelector('.loading');
const errorMessageDiv = form.querySelector('.error-message');
const sentMessageDiv = form.querySelector('.sent-message');

// Função para mostrar/esconder campos com base na seleção
tipoOrcamentoSelect.addEventListener('change', function() {
    const selectedType = this.value;

    camposEscolar.style.display = 'none';
    camposViagem.style.display = 'none';

    const optionalInputsEscolar = camposEscolar.querySelectorAll('input, select');
    const optionalInputsViagem = camposViagem.querySelectorAll('input');

    optionalInputsEscolar.forEach(input => {
        input.value = '';
        input.removeAttribute('required');
    });
    optionalInputsViagem.forEach(input => {
        input.value = '';
        input.removeAttribute('required');
    });

    if (selectedType === 'escolar') {
        camposEscolar.style.display = 'block';
        document.getElementById('escola').setAttribute('required', 'required');
        document.getElementById('turno').setAttribute('required', 'required');
        document.getElementById('cepEscolar').setAttribute('required', 'required');
    } else if (selectedType === 'viagem') {
        camposViagem.style.display = 'block';
        document.getElementById('destino').setAttribute('required', 'required');
        document.getElementById('dataIda').setAttribute('required', 'required');
        document.getElementById('dataVolta').setAttribute('required', 'required');
    }
});

// Listener para o envio do formulário
if (form) { // Verifica se o formulário existe na página
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        loadingDiv.style.display = 'block';
        errorMessageDiv.style.display = 'none';
        sentMessageDiv.style.display = 'none';
        errorMessageDiv.innerHTML = '';

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const tipoOrcamento = tipoOrcamentoSelect.value;
        const mensagem = document.getElementById('mensagem').value;

        let dadosOrcamento = {
            nome,
            email,
            telefone,
            tipoOrcamento,
            mensagem,
            dataEnvio: serverTimestamp(),
            status: 'Pendente' // Adicionar um status inicial para o orçamento
        };

        if (tipoOrcamento === 'escolar') {
            dadosOrcamento.escola = document.getElementById('escola').value;
            dadosOrcamento.turno = document.getElementById('turno').value;
            dadosOrcamento.cepEscolar = document.getElementById('cepEscolar').value;
        } else if (tipoOrcamento === 'viagem') {
            dadosOrcamento.destino = document.getElementById('destino').value;
            dadosOrcamento.dataIda = document.getElementById('dataIda').value;
            dadosOrcamento.dataVolta = document.getElementById('dataVolta').value;
        }

        try {
            await addDoc(collection(db, "orcamentos"), dadosOrcamento);

            loadingDiv.style.display = 'none';
            sentMessageDiv.style.display = 'block';
            form.reset();
            tipoOrcamentoSelect.value = '';
            camposEscolar.style.display = 'none';
            camposViagem.style.display = 'none';

            console.log('Orçamento enviado com sucesso para o Firebase!');

        } catch (error) {
            loadingDiv.style.display = 'none';
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.innerHTML = `Erro ao enviar orçamento: ${error.message}. Por favor, tente novamente.`;
            console.error('Erro ao enviar para o Firebase:', error);
        }
    });
} else {
    console.warn("Formulário de orçamento ou elementos relacionados não encontrados. Verifique seu HTML.");
}
