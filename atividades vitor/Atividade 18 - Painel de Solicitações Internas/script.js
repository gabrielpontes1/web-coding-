const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");

const spanTotal = document.getElementById("total");
const spanAbertas = document.getElementById("abertas");
const spanAtendimento = document.getElementById("atendimento");
const spanConcluidas = document.getElementById("concluidas");

let solicitacoes = [];


formulario.addEventListener("submit", function (event) {
  event.preventDefault(); 

  
  const formData = new FormData(formulario);
  const nome = formData.get("nome");
  const setor = formData.get("setor");
  const titulo = formData.get("titulo_solicita");
  const categoria = formData.get("categoria");
  const prioridade = formData.get("prioridade");
  const descricao = formData.get("descricao");

  if (
    !nome.trim() ||
    !setor.trim() ||
    !titulo.trim() ||
    !categoria ||
    !prioridade ||
    !descricao.trim()
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  const nova_solicitacao = {
    id: Date.now(),
    nome: nome.trim(),
    setor: setor.trim(),
    titulo: titulo.trim(),
    categoria: categoria,
    prioridade: prioridade,
    descricao: descricao.trim(),
    status: "Aberta"
  };

  solicitacoes.push(nova_solicitacao);
  formulario.reset(); 
  renderizar();
});


function criarLinha(rotulo, valor) {
  const p = document.createElement("p");
  p.textContent = rotulo + ": " + valor;
  return p;
}


function renderizar() {
  lista.innerHTML = "";

  solicitacoes.forEach(function (s) {
    const li = document.createElement("li");
    li.classList.add("solicitacao");

    if (s.prioridade === "Alta") li.classList.add("prioridade-alta");
    if (s.status === "Concluída") li.classList.add("concluida");

    const h3 = document.createElement("h3");
    h3.textContent = s.titulo;
    li.appendChild(h3);

    li.appendChild(criarLinha("Solicitante", s.nome));
    li.appendChild(criarLinha("Setor", s.setor));
    li.appendChild(criarLinha("Categoria", s.categoria));
    li.appendChild(criarLinha("Prioridade", s.prioridade));
    li.appendChild(criarLinha("Descrição", s.descricao));
    li.appendChild(criarLinha("Status", s.status));

    const btnStatus = document.createElement("button");
    btnStatus.textContent = "Alterar status";
    btnStatus.addEventListener("click", function () {
      mudarStatus(s.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", function () {
      excluir(s.id);
    });

    li.appendChild(btnStatus);
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });

  
  vazio.style.display = solicitacoes.length === 0 ? "block" : "none";

  atualizarIndicadores();
}


function atualizarIndicadores() {
  const abertas = solicitacoes.filter(function (s) {
    return s.status === "Aberta";
  }).length;

  const atendimento = solicitacoes.filter(function (s) {
    return s.status === "Em Atendimento";
  }).length;

  const concluidas = solicitacoes.filter(function (s) {
    return s.status === "Concluída";
  }).length;

  spanTotal.textContent = solicitacoes.length;
  spanAbertas.textContent = abertas;
  spanAtendimento.textContent = atendimento;
  spanConcluidas.textContent = concluidas;
}


function mudarStatus(id) {
  const s = solicitacoes.find(function (item) {
    return item.id === id;
  });

  if (s.status === "Aberta") s.status = "Em Atendimento";
  else if (s.status === "Em Atendimento") s.status = "Concluída";
  else s.status = "Aberta";

  renderizar();
}

function excluir(id) {
  solicitacoes = solicitacoes.filter(function (item) {
    return item.id !== id;
  });
  renderizar();
}

renderizar();
