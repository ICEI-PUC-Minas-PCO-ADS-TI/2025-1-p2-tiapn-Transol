// firebase-script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWhINHI-vP34KRhDmd3tXojtdUR4c98TE",
  authDomain: "transolapp-c9c1a.firebaseapp.com",
  projectId: "transolapp-c9c1a",
  storageBucket: "transolapp-c9c1a.firebasestorage.app",
  messagingSenderId: "727466146759",
  appId: "1:727466146759:web:e300dab41004a002a737e2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exibir notificações de orçamentos
const notificacoes = document.getElementById('notificacoes');

const q = query(collection(db, "orcamentos"), orderBy("data", "desc"));
onSnapshot(q, (snapshot) => {
  notificacoes.innerHTML = "";
  snapshot.forEach((doc) => {
    const dados = doc.data();
    const item = document.createElement('li');
    item.textContent = `${dados.nome} solicitou um orçamento: "${dados.mensagem}" em ${new Date(dados.data.seconds * 1000).toLocaleString()}`;
    notificacoes.appendChild(item);
  });
});
