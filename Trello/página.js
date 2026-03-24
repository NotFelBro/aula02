// ===================== DADOS DOS PRODUTOS =====================
const products = [
  {
    title: "Bicicleta Infantil",
    description: "Bicicleta infantil para crianças",
    model: "Modelo A1",
    price: "R$ 50,00",
  },
  {
    title: "Bicicleta de Médio Desempenho",
    description: "Bicicleta de médio desempenho para adolescentes e adultos",
    model: "Modelo B2",
    price: "R$ 75,00",
  },
  {
    title: "Bicicleta Profissional",
    description: "Bicicleta Profissional para ciclistas experientes",
    model: "Modelo C3",
    price: "R$ 100,00",
  },
];

// ===================== BOTÕES DE COMPRA =====================
document.querySelectorAll(".buy-btn:not([disabled])").forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const product = products[index];
    document.getElementById("titulo-produto").textContent = product.title;
    document.getElementById("descricao-produto").textContent =
      product.description;
    document.getElementById("span-modelo-produto").textContent = product.model;
    document.getElementById("produto-preco").textContent = product.price;
    document.getElementById("modelo-produto").style.display = "block";
  });
});

// ===================== TOGGLE DO CORAÇÃO (WISHLIST) =====================
document.querySelectorAll(".wishlist-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const produto = {
      title: btn.dataset.title,
      model: btn.dataset.model,
      price: btn.dataset.price,
    };
    const isAtivo = btn.classList.contains("ativo");
    if (isAtivo) {
      // Desmarcar: remove da lista de desejos
      removerDesejoPorTitulo(produto.title);
      marcarWishlistBtn(btn, false);
    } else {
      // Marcar: adiciona à lista de desejos
      adicionarAosDesejos(produto);
      marcarWishlistBtn(btn, true);
    }
  });
});

/** Ativa ou desativa visualmente um botão wishlist */
function marcarWishlistBtn(btn, ativo) {
  if (ativo) {
    btn.classList.add("ativo");
    btn.textContent = "♥";
    btn.title = "Remover da lista de desejos";
  } else {
    btn.classList.remove("ativo");
    btn.textContent = "♡";
    btn.title = "Adicionar à lista de desejos";
  }
}

/** Sincroniza os ícones de coração com o estado atual da lista de desejos */
function sincronizarIconesWishlist() {
  document.querySelectorAll(".wishlist-btn").forEach(function (btn) {
    const titulo = btn.dataset.title;
    const naLista = desejosItens.some(function (i) {
      return i.title === titulo;
    });
    marcarWishlistBtn(btn, naLista);
  });
}

// Fechar modal de produto
document
  .getElementById("fechar-modelo-produto")
  .addEventListener("click", function () {
    document.getElementById("modelo-produto").style.display = "none";
  });

// Confirmar compra
document.getElementById("confirm-buy").addEventListener("click", function () {
  alert("Compra confirmada! Produto adicionado ao carrinho.");
  document.getElementById("modelo-produto").style.display = "none";
});

// Fechar modal de produto clicando fora
window.addEventListener("click", function (event) {
  const productModal = document.getElementById("modelo-produto");
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});

// ===================== TOGGLE DA BARRA LATERAL =====================
document
  .getElementById("barra-lateral-click")
  .addEventListener("click", function () {
    const sidebar = document.querySelector(".barra-lateral");
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  });

// ===================== BOTÃO SAIR =====================
document.getElementById("sair-btn-top").addEventListener("click", function () {
  alert("Você saiu da sua conta!");
  window.location.href = "login.html";
});

// ===================== FUNÇÕES DOS PAINÉIS (MODAIS) =====================

/**
 * Abre o overlay/painel correspondente ao tipo informado.
 * @param {string} tipo - 'sobre' | 'contato' | 'ajuda' | 'config' | 'suporte' | 'feedback'
 */
function abrir(tipo) {
  const overlay = document.getElementById("overlay-" + tipo);
  if (overlay) {
    overlay.classList.add("ativo");
  }
}

/**
 * Fecha o overlay/painel correspondente ao tipo informado.
 * @param {string} tipo - 'sobre' | 'contato' | 'ajuda' | 'config' | 'suporte' | 'feedback'
 */
function fechar(tipo) {
  const overlay = document.getElementById("overlay-" + tipo);
  if (overlay) {
    overlay.classList.remove("ativo");
  }
}

// Fechar qualquer painel clicando fora dele (no fundo escuro)
document.querySelectorAll(".overlay").forEach(function (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("ativo");
    }
  });
});

// ===================== CONTATO =====================
function enviarContato() {
  const nome = document.getElementById("contato-nome").value.trim();
  const email = document.getElementById("contato-email").value.trim();
  const msg = document.getElementById("contato-msg").value.trim();
  const status = document.getElementById("contato-status");

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

// ===================== CONFIGURAÇÕES =====================
var temaSelecionado = "claro";

function definirTema(tema) {
  temaSelecionado = tema;
  document
    .getElementById("tema-claro")
    .classList.toggle("ativo", tema === "claro");
  document
    .getElementById("tema-escuro")
    .classList.toggle("ativo", tema === "escuro");
}

function aplicarTema(tema) {
  const cards = document.querySelectorAll(".produto");
  const topBar = document.querySelector(".top-bar");
  const barraLateral = document.querySelector(".barra-lateral");
  const paineis = document.querySelectorAll(".painel");
  const modalConteudo = document.querySelector(".modelo-conteudo");

  if (tema === "escuro") {
    cards.forEach(function (card) {
      card.classList.add("tema-escuro");
    });
    topBar.classList.add("tema-escuro");
    barraLateral.classList.add("tema-escuro");
    paineis.forEach(function (p) {
      p.classList.add("tema-escuro");
    });
    if (modalConteudo) modalConteudo.classList.add("tema-escuro");
  } else {
    cards.forEach(function (card) {
      card.classList.remove("tema-escuro");
    });
    topBar.classList.remove("tema-escuro");
    barraLateral.classList.remove("tema-escuro");
    paineis.forEach(function (p) {
      p.classList.remove("tema-escuro");
    });
    if (modalConteudo) modalConteudo.classList.remove("tema-escuro");
  }
}

function salvarConfig() {
  const status = document.getElementById("config-status");

  aplicarTema(temaSelecionado);

  status.textContent = "Configurações salvas com sucesso!";
  status.className = "msg-status sucesso";

  setTimeout(function () {
    fechar("config");
    status.textContent = "";
  }, 1500);
}

// ===================== SUPORTE =====================
function abrirChamado() {
  const msg = document.getElementById("suporte-msg").value.trim();
  const status = document.getElementById("suporte-status");

  if (!msg) {
    status.textContent = "Descreva o problema antes de abrir o chamado.";
    status.className = "msg-status erro";
    return;
  }

  const numeroChamado = Math.floor(Math.random() * 90000 + 10000);
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
let notaFeedback = 0;

function definirNota(valor) {
  notaFeedback = valor;
  document.querySelectorAll(".estrela").forEach(function (estrela) {
    const v = parseInt(estrela.getAttribute("data-v"));
    estrela.classList.toggle("ativa", v <= valor);
  });
}

function enviarFeedback() {
  const status = document.getElementById("feedback-status");

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

// ===================== PERFIL =====================

/** Carrega os dados do usuário logado (vindo do localStorage) e preenche o painel de perfil */
function carregarPerfil() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) return;

  const nome = usuarioLogado.name || "";
  const email = usuarioLogado.email || "";
  const telefone = usuarioLogado.phone || "";
  const endereco = usuarioLogado.endereco || {};

  // Monta o endereço formatado a partir dos subcampos (bairro, número, CEP)
  const enderecoFormatado = [endereco.bairro, endereco.numero, endereco.cep]
    .filter(Boolean)
    .join(", ");

  // Preenche os campos editáveis
  document.getElementById("perfil-nome").value = nome;
  document.getElementById("perfil-email").value = email;
  if (document.getElementById("perfil-telefone")) {
    document.getElementById("perfil-telefone").value = telefone;
  }
  if (document.getElementById("perfil-endereco")) {
    document.getElementById("perfil-endereco").value = enderecoFormatado;
  }

  // Preenche o cabeçalho do painel
  document.getElementById("perfil-nome-exibido").textContent = nome;
  document.getElementById("perfil-email-exibido").textContent = email;

  // Gera as iniciais do avatar
  const iniciais = nome
    .split(" ")
    .filter((p) => p.length > 0)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  document.getElementById("perfil-avatar-inicial").textContent =
    iniciais || "?";
}

// Executa ao carregar a página
carregarPerfil();

function salvarPerfil() {
  const nome = document.getElementById("perfil-nome").value.trim();
  const email = document.getElementById("perfil-email").value.trim();
  const telefone = document.getElementById("perfil-telefone")
    ? document.getElementById("perfil-telefone").value.trim()
    : "";
  const status = document.getElementById("perfil-status");

  if (!nome || !email) {
    status.textContent = "Nome e e-mail são obrigatórios.";
    status.className = "msg-status erro";
    return;
  }

  // Atualiza o cabeçalho do painel
  document.getElementById("perfil-nome-exibido").textContent = nome;
  document.getElementById("perfil-email-exibido").textContent = email;

  // Atualiza as iniciais do avatar
  const iniciais = nome
    .split(" ")
    .filter((p) => p.length > 0)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  document.getElementById("perfil-avatar-inicial").textContent = iniciais;

  // Persiste as alterações no localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const enderecoTexto = document.getElementById("perfil-endereco")
    ? document.getElementById("perfil-endereco").value.trim()
    : "";

  // Mantém os subcampos originais do endereço, atualizando apenas o campo livre
  const enderecoAtualizado = {
    ...(usuarioLogado.endereco || {}),
    livre: enderecoTexto,
  };

  usuarioLogado.name = nome;
  usuarioLogado.email = email;
  usuarioLogado.phone = telefone;
  usuarioLogado.endereco = enderecoAtualizado;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  // Atualiza também na lista geral de usuários
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const idx = users.findIndex((u) => u.email === usuarioLogado.email);
  if (idx !== -1) {
    users[idx] = {
      ...users[idx],
      name: nome,
      email,
      phone: telefone,
      endereco: enderecoAtualizado,
    };
    localStorage.setItem("users", JSON.stringify(users));
  }

  status.textContent = "Perfil atualizado com sucesso!";
  status.className = "msg-status sucesso";

  setTimeout(function () {
    fechar("perfil");
    status.textContent = "";
  }, 1800);
}

// ===================== CARRINHO =====================
var carrinhoItens = [];

function adicionarAoCarrinho(produto) {
  var existente = carrinhoItens.find(function (i) {
    return i.title === produto.title;
  });
  if (existente) {
    existente.qtd += 1;
  } else {
    carrinhoItens.push({
      title: produto.title,
      model: produto.model,
      price: produto.price,
      qtd: 1,
    });
  }
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function renderizarCarrinho() {
  var lista = document.getElementById("carrinho-lista");
  var vazio = document.getElementById("carrinho-vazio");
  var rodape = document.getElementById("carrinho-rodape");

  lista.innerHTML = "";

  if (carrinhoItens.length === 0) {
    vazio.style.display = "block";
    rodape.style.display = "none";
    return;
  }

  vazio.style.display = "none";
  rodape.style.display = "block";

  var total = 0;

  carrinhoItens.forEach(function (item, idx) {
    var preco = parseFloat(item.price.replace("R$ ", "").replace(",", "."));
    total += preco * item.qtd;

    var div = document.createElement("div");
    div.className = "carrinho-item";
    div.innerHTML =
      '<div class="carrinho-item-info">' +
      '<p class="carrinho-item-nome">' +
      item.title +
      "</p>" +
      '<p class="carrinho-item-modelo">' +
      item.model +
      "</p>" +
      '<p class="carrinho-item-preco">' +
      item.price +
      "</p>" +
      "</div>" +
      '<div class="carrinho-item-qtd">' +
      '<button class="qtd-btn" onclick="alterarQtd(' +
      idx +
      ', -1)">&#8722;</button>' +
      '<span class="qtd-num">' +
      item.qtd +
      "</span>" +
      '<button class="qtd-btn" onclick="alterarQtd(' +
      idx +
      ', 1)">+</button>' +
      "</div>" +
      '<button class="carrinho-item-remover" onclick="removerDoCarrinho(' +
      idx +
      ')" title="Remover">&#x2715;</button>';
    lista.appendChild(div);
  });

  document.getElementById("carrinho-total").textContent =
    "R$ " + total.toFixed(2).replace(".", ",");
}

function alterarQtd(idx, delta) {
  carrinhoItens[idx].qtd += delta;
  if (carrinhoItens[idx].qtd <= 0) {
    carrinhoItens.splice(idx, 1);
  }
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function removerDoCarrinho(idx) {
  carrinhoItens.splice(idx, 1);
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function limparCarrinho() {
  carrinhoItens = [];
  atualizarBadgeCarrinho();
  renderizarCarrinho();
}

function finalizarPedido() {
  var status = document.getElementById("carrinho-status");
  if (carrinhoItens.length === 0) return;
  status.textContent =
    "Pedido realizado com sucesso! Em breve você receberá a confirmação.";
  status.className = "msg-status sucesso";
  carrinhoItens = [];
  atualizarBadgeCarrinho();
  renderizarCarrinho();
  setTimeout(function () {
    fechar("carrinho");
    status.textContent = "";
  }, 2500);
}

function atualizarBadgeCarrinho() {
  var total = carrinhoItens.reduce(function (s, i) {
    return s + i.qtd;
  }, 0);
  var btn = document.getElementById("carrinho-btn-top");
  var badge = btn.querySelector(".badge-contador");
  if (total > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "badge-contador";
      btn.appendChild(badge);
    }
    badge.textContent = total;
  } else {
    if (badge) badge.remove();
  }
}

// ===================== LISTA DE DESEJOS =====================
var desejosItens = [];

function adicionarAosDesejos(produto) {
  var existente = desejosItens.find(function (i) {
    return i.title === produto.title;
  });
  if (!existente) {
    desejosItens.push({
      title: produto.title,
      model: produto.model,
      price: produto.price,
    });
  }
  atualizarBadgeDesejos();
  renderizarDesejos();
}

function renderizarDesejos() {
  var lista = document.getElementById("desejos-lista");
  var vazio = document.getElementById("desejos-vazio");
  var rodape = document.getElementById("desejos-rodape");

  lista.innerHTML = "";

  if (desejosItens.length === 0) {
    vazio.style.display = "block";
    rodape.style.display = "none";
    return;
  }

  vazio.style.display = "none";
  rodape.style.display = "block";

  desejosItens.forEach(function (item, idx) {
    var div = document.createElement("div");
    div.className = "desejo-item";
    div.innerHTML =
      '<div class="desejo-item-info">' +
      '<p class="desejo-item-nome">' +
      item.title +
      "</p>" +
      '<p class="desejo-item-preco">' +
      item.price +
      "</p>" +
      "</div>" +
      '<div class="desejo-item-acoes">' +
      '<button class="desejo-mover-btn" onclick="moverItemCarrinho(' +
      idx +
      ')">+ Carrinho</button>' +
      '<button class="desejo-remover-btn" onclick="removerDesejo(' +
      idx +
      ')" title="Remover">&#x2715;</button>' +
      "</div>";
    lista.appendChild(div);
  });
}

function removerDesejoPorTitulo(titulo) {
  var idx = desejosItens.findIndex(function (i) {
    return i.title === titulo;
  });
  if (idx !== -1) {
    desejosItens.splice(idx, 1);
    atualizarBadgeDesejos();
    renderizarDesejos();
  }
}

function removerDesejo(idx) {
  desejosItens.splice(idx, 1);
  atualizarBadgeDesejos();
  renderizarDesejos();
  sincronizarIconesWishlist();
}

function limparDesejos() {
  desejosItens = [];
  atualizarBadgeDesejos();
  renderizarDesejos();
  sincronizarIconesWishlist();
}

function moverItemCarrinho(idx) {
  adicionarAoCarrinho(desejosItens[idx]);
  desejosItens.splice(idx, 1);
  atualizarBadgeDesejos();
  renderizarDesejos();
  sincronizarIconesWishlist();
  var status = document.getElementById("desejos-status");
  status.textContent = "Item movido para o carrinho!";
  status.className = "msg-status sucesso";
  setTimeout(function () {
    status.textContent = "";
  }, 1500);
}

function moverTudoCarrinho() {
  desejosItens.forEach(function (item) {
    adicionarAoCarrinho(item);
  });
  desejosItens = [];
  atualizarBadgeDesejos();
  renderizarDesejos();
  sincronizarIconesWishlist();
  var status = document.getElementById("desejos-status");
  status.textContent = "Todos os itens foram movidos para o carrinho!";
  status.className = "msg-status sucesso";
  setTimeout(function () {
    fechar("desejos");
    status.textContent = "";
  }, 1800);
}

function atualizarBadgeDesejos() {
  var total = desejosItens.length;
  var btn = document.getElementById("lista-desejos-btn");
  var badge = btn.querySelector(".badge-contador");
  if (total > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "badge-contador";
      btn.appendChild(badge);
    }
    badge.textContent = total;
  } else {
    if (badge) badge.remove();
  }
}

// ===================== INTEGRAR COMPRA COM CARRINHO E DESEJOS =====================
// Sobrescreve o confirm-buy para usar o carrinho real
document
  .getElementById("confirm-buy")
  .removeEventListener("click", arguments.callee);
document.getElementById("confirm-buy").addEventListener("click", function () {
  var titulo = document.getElementById("titulo-produto").textContent;
  var modelo = document.getElementById("span-modelo-produto").textContent;
  var preco = document.getElementById("produto-preco").textContent;
  adicionarAoCarrinho({ title: titulo, model: modelo, price: preco });
  document.getElementById("modelo-produto").style.display = "none";
  alert(titulo + " adicionado ao carrinho!");
});
