// sistema de login e cadastro simples usando localStorage para armazenar os dados dos usuários

function showTab(tab) {
  const loginTab = document.getElementById("login-tab");
  const registerTab = document.getElementById("register-tab");
  const loginButton = document.querySelector(".tab-button:nth-child(1)");
  const registerButton = document.querySelector(".tab-button:nth-child(2)");

  if (tab === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginButton.classList.add("active");
    registerButton.classList.remove("active");
  } else {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerButton.classList.add("active");
    loginButton.classList.remove("active");
  }
}

// Adiciona eventos de clique para alternar entre as abas

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alert("Login bem-sucedido! Bem-vindo, " + user.name);
    // Aqui você pode redirecionar para a página principal do Trello
  } else {
    alert("Email ou senha incorretos.");
  }
});

// Adiciona evento de envio para o formulário de cadastro

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password",
    ).value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("Email já cadastrado.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso! Faça o login.");
    showTab("login");
  });
