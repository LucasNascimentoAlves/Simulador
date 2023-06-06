// Capturar elementos HTML
const btnCriar = document.getElementById("btn-criar");
const inputTamanho = document.querySelector(".input-tamanho");
const caixaPai = document.querySelector(".caixa-pai");
const caixaSaida = document.querySelector(".caixa-saida");

// Variáveis para rastrear a posição da lista
let posicaoInicio = 1;
let posicaoMeio = 0;
let posicaoFim;

// Array para armazenar as mensagens de erro
let mensagensErro = [];

// Função para redefinir as posições iniciais
function redefinirPosicoes() {
  posicaoInicio = 1;
  posicaoMeio = 0;
  posicaoFim = 0;
}

// Função para criar a lista
function criarLista() {
  // Obter o valor do tamanho inserido
  const tamanho = parseInt(inputTamanho.value);

  // Validar o tamanho da lista
  if (tamanho < 3 || tamanho > 10) {
    mensagensErro.push("Erro: Tamanho inválido para lista");
    exibirMensagensErro();
    return;
  }

  redefinirPosicoes();

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

  // Atualizar a posição do fim da lista
  posicaoFim = tamanho + posicaoInicio - 1;

  // Adicionar itens à lista
  for (let i = 0; i < tamanho; i++) {
    const novoItem = document.createElement("li");
    novoItem.textContent = `${i + posicaoInicio} -`;
    lista.appendChild(novoItem);
  }

  // Adicionar a lista à caixa pai
  caixaPai.appendChild(lista);
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

// Exibir mensagens de erro na caixa de saída
function exibirMensagensErro() {
  var caixaSaida = document.getElementById("caixaSaida");
  caixaSaida.textContent = "";
  mensagensErro.forEach((mensagem) => {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = mensagem;
    caixaSaida.appendChild(paragrafo);
  });
}

// Limpar mensagens de erro
document.addEventListener("DOMContentLoaded", function () {
  // Obtém uma referência ao botão "Limpar"
  var botaoLimpar = document.querySelector(".botao-limpar");

  // Adiciona um ouvinte de evento para o botão "Limpar"
  botaoLimpar.addEventListener("click", function () {
    var caixaSaida = document.getElementById("caixaSaida");
    caixaSaida.innerHTML = ""; // Limpa o conteúdo da caixa de saída
    mensagensErro = []; // Limpa o array de mensagens de erro
  });
});
