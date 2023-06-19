var fila = []; // Array para armazenar os elementos da fila
var posicaoDesenfileirar = 0; // Variável para controlar a posição atual na fila
var fimFila = 0; // Variável para controlar o final da fila
var posicaoEnfileirar = 0; // Variável para controlar a posição de enfileiramento na fila
var registros = []; // Array para armazenar as mensagens impressas na caixa de saída

// Função para desenhar o gráfico pizza
function desenharGraficoPizza(tamanho) {
  var canvas = document.getElementById("grafico");
  var ctx = canvas.getContext("2d");

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = Math.min(centerX, centerY) - 40;

  var anglePerSection = 360 / tamanho;

  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define a cor de preenchimento como transparente ou branca
  ctx.fillStyle = "transparent"; // ou '#FFFFFF' para c	or branca
  // Define a cor do contorno como preto
  ctx.strokeStyle = "#000000";

  for (var i = 0; i < tamanho; i++) {
    var startAngle = (i * anglePerSection * Math.PI) / 180;
    var endAngle = ((i + 1) * anglePerSection * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    // Define o contorno do setor
    ctx.stroke();

    // Define a posição e o estilo do texto
    var textAngle = (startAngle + endAngle) / 2;
    var textX = centerX + radius * 1.1 * Math.cos(textAngle);
    var textY = centerY + radius * 1.1 * Math.sin(textAngle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.font = "bold 12px Arial";

    // Exibe o número da posição da fila ao lado do setor
    ctx.fillText(i.toString(), textX, textY);

    if (fila[i] !== undefined) {
      var textX =
        centerX + radius * 0.5 * Math.cos((startAngle + endAngle) / 2);
      var textY =
        centerY + radius * 0.5 * Math.sin((startAngle + endAngle) / 2);
      ctx.fillStyle = "#000000";

      // Centraliza o número dentro do setor
      var textWidth = ctx.measureText(fila[i].toString()).width;
      var textHeight = 12; // Altura da fonte definida anteriormente
      ctx.fillText(
        fila[i].toString(),
        textX - textWidth / 2,
        textY + textHeight / 2
      );
    }

    document.querySelector(".inicio").textContent =
      "Inicio da fila: " + posicaoDesenfileirar;
    document.querySelector(".fim").textContent =
      "Fim da fila: " + posicaoEnfileirar;
  }
}

function enfileirarNumero() {
  var numero = parseInt(document.querySelector(".input-valor").value);
  var tamanho = parseInt(document.querySelector(".input-tamanho").value);
  if (!isNaN(numero)) {
    // Verifica se o número é válido
    if (posicaoEnfileirar !== fimFila) {
      // Verifica se o último setor está ocupado
      fila[posicaoEnfileirar] = numero; // Armazena o número na posição atual da fila
      posicaoEnfileirar = (posicaoEnfileirar + 1) % tamanho; // Atualiza a posição de enfileiramento circularmente
      desenharGraficoPizza(tamanho); // Redesenha o gráfico de pizza
    } else {
      registros.push({ tipo: "erro", mensagem: "Erro: Fila cheia." });
      atualizarCaixaSaida();
    }
  }
}

// Função para enfileirar um número aleatório
function enfileirarAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 99) + 1;
  var tamanho = parseInt(document.querySelector(".input-tamanho").value);

  if (posicaoEnfileirar !== fimFila) {
    // Verifica se o último setor está ocupado
    fila[posicaoEnfileirar] = numeroAleatorio; // Armazena o número aleatório na posição atual da fila
    posicaoEnfileirar = (posicaoEnfileirar + 1) % tamanho; // Atualiza a posição de enfileiramento circularmente
    desenharGraficoPizza(tamanho); // Redesenha o gráfico de pizza
  } else {
    registros.push({ tipo: "erro", mensagem: "Erro: Fila cheia." });
    atualizarCaixaSaida();
  }
}

// Função para desenfileirar um número
function desenfileirarNumero() {
  var tamanho = parseInt(document.querySelector(".input-tamanho").value);

  var numeroDeletado = fila[posicaoDesenfileirar]; // Armazena o número deletado

  if (fila[posicaoDesenfileirar] !== undefined) {
    fila[posicaoDesenfileirar] = undefined; // Remove o número da posição atual da fila
    posicaoDesenfileirar = (posicaoDesenfileirar + 1) % tamanho; // Atualiza a posição de desenfileiramento circularmente
    fimFila = (fimFila + 1) % tamanho; // Atualiza o final da fila circularmente
    desenharGraficoPizza(tamanho); // Redesenha o gráfico de pizza
    registros.push({ tipo: "deletado", numero: numeroDeletado });
  } else {
    registros.push({ tipo: "erro", mensagem: "Erro: Fila vazia." });
  }

  // Atualiza a caixa de saída
  atualizarCaixaSaida();
}

// Função para atualizar a caixa de saída
function atualizarCaixaSaida() {
  var caixaSaida = document.getElementById("caixaSaida");
  caixaSaida.innerHTML = ""; // Limpa o conteúdo da caixa de saída

  for (var i = 0; i < registros.length; i++) {
    var registro = registros[i];
    var registroElemento = document.createElement("p");

    if (registro.tipo === "erro") {
      registroElemento.classList.add("mensagem-erro");
      registroElemento.innerText = registro.mensagem;
    } else if (registro.tipo === "deletado") {
      registroElemento.classList.add("numero-deletado");
      registroElemento.innerText = registro.numero;
    }

    caixaSaida.appendChild(registroElemento);
  }
}

// Aguarda o carregamento completo da página antes de associar eventos
window.addEventListener("load", function () {
  // Obtém uma referência ao botão "Criar"
  var btnCriar = document.getElementById("btn-criar");
  // Adiciona um evento de clique ao botão "Criar"
  btnCriar.addEventListener("click", function () {
    // Obtém o valor do input "tamanho"
    var tamanho = parseInt(document.querySelector(".input-tamanho").value);
    // Verifica se o tamanho está dentro das restrições
    if (tamanho < 2 || tamanho > 10) {
      registros.push({
        tipo: "erro",
        mensagem: "Erro: O tamanho deve estar entre 2 e 10",
      });
      document.querySelector(".input-tamanho").value = "";
      atualizarCaixaSaida();
      return;
    }
    fila.length = 0;
    fimFila = tamanho - 1;
    posicaoEnfileirar = 0; // Reinicializa a posição de enfileiramento
    posicaoDesenfileirar = 0; // Reinicializa a posição de desenfileiramento
    // Desenha o gráfico usando o valor do tamanho
    desenharGraficoPizza(tamanho);
    // Limpa o campo de valor
    document.querySelector(".input-valor").value = "";
  });
  // Obtém uma referência ao botão "Enfileirar"
  var btnEnfileirar = document.querySelector(".botao-enfileirar");
  // Adiciona um evento de clique ao botão "Enfileirar"
  btnEnfileirar.addEventListener("click", function () {
    var valor = parseInt(document.querySelector(".input-valor").value);
    if (valor <= 0 || valor > 99) {
      registros.push({
        tipo: "erro",
        mensagem: "Erro: O valor deve estar entre 1 e 99",
      });
      atualizarCaixaSaida();
      return;
    }
    enfileirarNumero();
  });
});
// Obtém uma referência ao botão "Enfileirar Aleatório"
var btnEnfileirarAleatorio = document.querySelector(
  ".botao-enfileirar-aleatorio"
);
// Adiciona um evento de clique ao botão "Enfileirar Aleatório"
btnEnfileirarAleatorio.addEventListener("click", function () {
  enfileirarAleatorio();
});
// Obtém uma referência ao botão "Desenfileirar"
var btnDesenfileirar = document.getElementById("botao-desenfileirar");
// Adiciona um evento de clique ao botão "Desenfileirar"
btnDesenfileirar.addEventListener("click", function () {
  // Chama a função desenfileirarNumero()
  desenfileirarNumero();
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtém uma referência ao botão "Limpar"
  var botaoLimpar = document.querySelector(".botao-limpar");

  // Adiciona um ouvinte de evento para o botão "Limpar"
  botaoLimpar.addEventListener("click", function () {
    var caixaSaida = document.getElementById("caixaSaida");
    caixaSaida.innerHTML = ""; // Limpa o conteúdo da caixa de saída
    registros = [];
  });
});
