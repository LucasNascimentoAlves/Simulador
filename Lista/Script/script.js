// Capturar elementos HTML
const btnCriar = document.getElementById("btn-criar");
const inputTamanho = document.querySelector(".input-tamanho");
const caixaPai = document.querySelector(".caixa-pai");
let posicaoInicio = 1; // Variável para rastrear o início da lista
let posicaoMeio = 0; // Variável para rastrear o meio da lista
var proximoItemRemover = 1; // Índice do próximo item a ser removido

// Função para criar a lista
function criarLista() {
  // Obter o valor do tamanho inserido
  const tamanho = parseInt(inputTamanho.value);

  // Criar a lista
  const lista = document.createElement("ul");

  // Estilizar a lista
  lista.style.listStyleType = "none";
  lista.style.padding = "0";

  // Remover a lista anterior, se existir
  const listaAnterior = document.querySelector(".caixa-pai ul");
  if (listaAnterior) {
    listaAnterior.remove();
  }

  // Calcular a posição do meio da lista
  posicaoMeio = Math.ceil(tamanho / 2);

  // Adicionar itens à lista
  for (let i = 0; i < tamanho; i++) {
    const novoItem = document.createElement("li");
    novoItem.textContent = `${i + posicaoInicio} -`;
    lista.appendChild(novoItem);
  }

  // Adicionar a lista à caixa pai
  caixaPai.appendChild(lista);

  // Mostrar o botão "Apagar"
  botaoApagar.classList.remove("hidden");
}

// Adicionar evento de clique ao botão "Criar"
btnCriar.addEventListener("click", criarLista);

// Atualizar item da lista ao clicar em "Início"
document.querySelector(".botao-inicio").addEventListener("click", function () {
  var inputValor = document.querySelector(".input-valor");
  var listaItens = document.querySelectorAll(".caixa-pai ul li");
  var proximaPosicaoInicio = posicaoInicio;

  if (inputValor.value) {
    // Encontrar a próxima posição disponível a partir do início da lista
    while (
      listaItens[proximaPosicaoInicio - 1] &&
      listaItens[proximaPosicaoInicio - 1].textContent !==
        `${proximaPosicaoInicio} -`
    ) {
      proximaPosicaoInicio++;
    }

    if (listaItens && listaItens.length >= proximaPosicaoInicio) {
      listaItens[
        proximaPosicaoInicio - 1
      ].textContent = `${proximaPosicaoInicio} - ${inputValor.value}`;
      posicaoInicio = proximaPosicaoInicio + 1; // Atualizar a próxima posição de início
    }
  }

  inputValor.value = "";
});

// Atualizar item da lista ao clicar em "Meio"
document.querySelector(".botao-meio").addEventListener("click", function () {
  var inputValor = document.querySelector(".input-valor");
  var listaItens = document.querySelectorAll(".caixa-pai ul li");

  if (inputValor.value) {
    // Encontrar a próxima posição disponível a partir do meio da lista
    var proximaPosicaoMeio = posicaoMeio;

    while (
      listaItens[proximaPosicaoMeio - 1] &&
      listaItens[proximaPosicaoMeio - 1].textContent !==
        `${proximaPosicaoMeio} -`
    ) {
      proximaPosicaoMeio++;
    }

    if (listaItens && listaItens.length >= proximaPosicaoMeio) {
      listaItens[
        proximaPosicaoMeio - 1
      ].textContent = `${proximaPosicaoMeio} - ${inputValor.value}`;
      posicaoMeio = proximaPosicaoMeio + 1; // Atualizar a próxima posição de meio
    }
  }

  inputValor.value = "";
});

// Atualizar item da lista ao clicar em "Fim"
document.querySelector(".botao-fim").addEventListener("click", function () {
  var inputValor = document.querySelector(".input-valor");
  var listaItens = document.querySelectorAll(".caixa-pai ul li");

  if (inputValor.value) {
    // Encontrar a próxima posição disponível a partir do fim da lista
    var posicaoFim = listaItens.length;
    var proximaPosicaoFim = posicaoFim;

    while (
      listaItens[proximaPosicaoFim - 1] &&
      listaItens[proximaPosicaoFim - 1].textContent !== `${proximaPosicaoFim} -`
    ) {
      proximaPosicaoFim--;
    }

    if (listaItens && listaItens.length >= proximaPosicaoFim) {
      listaItens[
        proximaPosicaoFim - 1
      ].textContent = `${proximaPosicaoFim} - ${inputValor.value}`;
    }
  }

  inputValor.value = "";
});

// Selecionar o botão "Apagar"
const botaoApagar = document.querySelector(".botao-apagar");

// Adicionar evento de clique ao botão "Apagar"
botaoApagar.addEventListener("click", apagarItem);

// Função para apagar o próximo item preenchido da lista
function apagarItem() {
  // Verificar se há uma lista criada
  const lista = document.querySelector(".caixa-pai ul");
  if (!lista) {
    return;
  }

  // Obter todos os itens da lista
  const itens = lista.getElementsByTagName("li");

  // Verificar se há itens suficientes para remover
  if (itens.length >= proximoItemRemover) {
    // Verificar se o item atual está preenchido
    if (itens[proximoItemRemover - 1].textContent.trim() !== "") {
      // Apagar o texto que está na frente do número
      const texto = itens[proximoItemRemover - 1].textContent;
      const numero = texto.substring(0, texto.indexOf("-") + 1);
      itens[proximoItemRemover - 1].textContent = numero;
    }

    // Atualizar a posição do próximo item a ser removido
    proximoItemRemover++;
  }
}
