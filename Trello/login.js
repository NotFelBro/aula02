// Sistema de login e cadastro usando localStorage para armazenar os dados dos usuários

function showTab(tab) {
  const loginTab = document.getElementById("login-tabela");
  const registerTab = document.getElementById("registro-tabela");
  const loginButton = document.querySelector(".tabela-btn:nth-child(1)");
  const registerButton = document.querySelector(".tabela-btn:nth-child(2)");

  if (tab === "login") {
    loginTab.classList.add("ativo");
    registerTab.classList.remove("ativo");
    loginButton.classList.add("ativo");
    registerButton.classList.remove("ativo");
  } else {
    registerTab.classList.add("ativo");
    loginTab.classList.remove("ativo");
    registerButton.classList.add("ativo");
    loginButton.classList.remove("ativo");
  }
}

// ===================== BUSCA DE CEP (ViaCEP) =====================
document.addEventListener("DOMContentLoaded", function () {
  const btnCep = document.getElementById("btn-buscar-cep");
  if (btnCep) {
    btnCep.addEventListener("click", buscarCep);
  }

  // Formata o CEP automaticamente enquanto digita (00000-000)
  const cepInput = document.getElementById("registro-cep");
  if (cepInput) {
    cepInput.addEventListener("input", function () {
      let val = cepInput.value.replace(/\D/g, "").slice(0, 8);
      if (val.length > 5) val = val.slice(0, 5) + "-" + val.slice(5);
      cepInput.value = val;
    });
  }
});

async function buscarCep() {
  const cepInput = document.getElementById("registro-cep");
  const bairroInput = document.getElementById("registro-bairro");
  const cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("Digite um CEP válido com 8 dígitos.");
    return;
  }

  const btn = document.getElementById("btn-buscar-cep");
  btn.textContent = "...";
  btn.disabled = true;

  try {
    const res = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const data = await res.json();

    if (data.erro) {
      alert("CEP não encontrado. Preencha o bairro manualmente.");
    } else {
      bairroInput.value = data.bairro || "";
    }
  } catch (err) {
    alert("Erro ao buscar CEP. Preencha o bairro manualmente.");
  } finally {
    btn.textContent = "Buscar";
    btn.disabled = false;
  }
}

// ===================== LOGIN =====================
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    alert("Login bem-sucedido! Bem-vindo, " + user.name);
    window.open("página.html", "_self");
  } else {
    alert("Email ou senha incorretos.");
  }
});

// ===================== CADASTRO =====================
document
  .getElementById("registro-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registro-nome").value.trim();
    const email = document.getElementById("registro-email").value.trim();
    const phone = document.getElementById("registro-telefone").value.trim();
    const cep = document.getElementById("registro-cep").value.trim();
    const bairro = document.getElementById("registro-bairro").value.trim();
    const numero = document.getElementById("registro-numero").value.trim();
    const password = document.getElementById("registro-password").value;

    const confirmEl =
      document.getElementById("registro-confirm-password") ||
      document.getElementById("register-confirm-password");
    const confirmPassword = confirmEl ? confirmEl.value : "";

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("Este email já está cadastrado.");
      return;
    }

    const endereco = { cep, bairro, numero };
    const newUser = { name, email, phone, endereco, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("usuarioLogado", JSON.stringify(newUser));

    alert("Cadastro realizado com sucesso! Bem-vindo, " + name);
    window.open("página.html", "_self");
  });

// ===================== FUNÇÕES DOS PAINÉIS =====================

function abrir(tipo) {
  var overlay = document.getElementById("overlay-" + tipo);
  if (overlay) overlay.classList.add("ativo");
}

function fechar(tipo) {
  var overlay = document.getElementById("overlay-" + tipo);
  if (overlay) overlay.classList.remove("ativo");
}

// Fechar ao clicar no fundo escuro
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("ativo");
    });
  });
});

// ===================== CONTATO =====================
function enviarContato() {
  var nome = document.getElementById("contato-nome").value.trim();
  var email = document.getElementById("contato-email").value.trim();
  var msg = document.getElementById("contato-msg").value.trim();
  var status = document.getElementById("contato-status");

  if (!nome || !email || !msg) {
    status.textContent = "Preencha todos os campos antes de enviar.";
    status.className = "msg-status erro";
    return;
  }

  status.textContent = "Mensagem enviada! Retornaremos em até 24h.";
  status.className = "msg-status sucesso";
  document.getElementById("contato-nome").value = "";
  document.getElementById("contato-email").value = "";
  document.getElementById("contato-msg").value = "";

  setTimeout(function () {
    fechar("contato");
    status.textContent = "";
  }, 2000);
}

// ===================== SUPORTE =====================
function abrirChamado() {
  var msg = document.getElementById("suporte-msg").value.trim();
  var status = document.getElementById("suporte-status");

  if (!msg) {
    status.textContent = "Descreva o problema antes de abrir o chamado.";
    status.className = "msg-status erro";
    return;
  }

  var numeroChamado = Math.floor(Math.random() * 90000 + 10000);
  status.textContent =
    "Chamado #" + numeroChamado + " aberto! Em breve entraremos em contato.";
  status.className = "msg-status sucesso";
  document.getElementById("suporte-msg").value = "";

  setTimeout(function () {
    fechar("suporte");
    status.textContent = "";
  }, 2500);
}

// ===================== FEEDBACK =====================
var notaFeedback = 0;

function definirNota(valor) {
  notaFeedback = valor;
  document.querySelectorAll(".estrela").forEach(function (estrela) {
    var v = parseInt(estrela.getAttribute("data-v"));
    estrela.classList.toggle("ativa", v <= valor);
  });
}

function enviarFeedback() {
  var status = document.getElementById("feedback-status");

  if (!notaFeedback) {
    status.textContent = "Selecione uma avaliação antes de enviar.";
    status.className = "msg-status erro";
    return;
  }

  status.textContent =
    "Obrigado pelo seu feedback! (" + notaFeedback + "/5 estrelas)";
  status.className = "msg-status sucesso";
  document.getElementById("feedback-msg").value = "";
  notaFeedback = 0;
  document.querySelectorAll(".estrela").forEach(function (e) {
    e.classList.remove("ativa");
  });

  setTimeout(function () {
    fechar("feedback");
    status.textContent = "";
  }, 2000);
}

// ===================== CONFIGURAÇÕES =====================
function salvarConfig() {
  var status = document.getElementById("config-status");
  status.textContent = "Configurações salvas com sucesso!";
  status.className = "msg-status sucesso";

  setTimeout(function () {
    fechar("config");
    status.textContent = "";
  }, 1500);
}
