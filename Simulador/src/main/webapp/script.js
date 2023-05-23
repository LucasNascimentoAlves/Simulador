var fila = []; // Array para armazenar os elementos da fila

// Função para desenhar o gráfico pizza
function desenharGraficoPizza(tamanho) {
  var canvas = document.getElementById('grafico');
  var ctx = canvas.getContext('2d');

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = Math.min(centerX, centerY) - 40;

  var anglePerSection = 360 / tamanho;

  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define a cor de preenchimento como transparente ou branca
  ctx.fillStyle = 'transparent'; // ou '#FFFFFF' para cor branca
  // Define a cor do contorno como preto
  ctx.strokeStyle = '#000000';

  for (var i = 0; i < tamanho; i++) {
    var startAngle = i * anglePerSection * Math.PI / 180;
    var endAngle = (i + 1) * anglePerSection * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    // Define o contorno do setor
    ctx.stroke();
    
    // Define a posição e o estilo do texto
    var textAngle = (startAngle + endAngle) / 2;
    var textX = centerX + (radius * 1.1) * Math.cos(textAngle);
    var textY = centerY + (radius * 1.1) * Math.sin(textAngle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';

    // Exibe o número da posição da fila ao lado do setor
    ctx.fillText(i.toString(), textX, textY);
    
   if (fila[i] !== undefined) {
  var textX = centerX + (radius * 0.5) * Math.cos((startAngle + endAngle) / 2);
  var textY = centerY + (radius * 0.5) * Math.sin((startAngle + endAngle) / 2);
  ctx.fillStyle = '#000000';
  
  // Centraliza o número dentro do setor
  var textWidth = ctx.measureText(fila[i].toString()).width;
  var textHeight = 12; // Altura da fonte definida anteriormente
  ctx.fillText(fila[i].toString(), textX - (textWidth / 2), textY + (textHeight / 2));
}
  }
  
  // Posiciona e exibe o texto "Início da Fila"
  var inicioElement = document.querySelector('.inicio');
  inicioElement.textContent = 'Inicio da fila: 0';
  inicioElement.style.left = centerX - (inicioElement.offsetWidth / 2) + 'px';

  // Posiciona e exibe o texto "Fim da Fila"
  var fimElement = document.querySelector('.fim');
  fimElement.textContent = 'Fim da fila: ' + (tamanho - 1);
  fimElement.style.left = centerX - (fimElement.offsetWidth / 2) + 'px';
}

function enfileirarNumero() {
  var numero = parseInt(document.querySelector('.input-valor').value);

  if (!isNaN(numero)) {
    fila.push(numero); // Adiciona o número no final da fila
    var tamanho = parseInt(document.querySelector('.input-tamanho').value);
    
    if (fila.length < tamanho) {
      desenharGraficoPizza(tamanho);
    }
  }
}

// Função para enfileirar um número aleatório
function enfileirarAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 99) + 1;
  var tamanho = parseInt(document.querySelector('.input-tamanho').value);

  if (fila.length < tamanho - 1) {
    fila.push(numeroAleatorio); // Adiciona o número no final da fila
    desenharGraficoPizza(tamanho, fila);
  } 
}

// Aguarda o carregamento completo da página antes de associar eventos
window.addEventListener('load', function() {
  // Obtém uma referência ao botão "Criar"
  var btnCriar = document.getElementById('btn-criar');
  // Adiciona um evento de clique ao botão "Criar"
  btnCriar.addEventListener('click', function() {
    // Obtém o valor do input "tamanho"
    var tamanho = parseInt(document.querySelector('.input-tamanho').value);

    // Desenha o gráfico usando o valor do tamanho
    desenharGraficoPizza(tamanho, []);

    // Limpa o campo de valor
    document.querySelector('.input-valor').value = '';
  });

  // Obtém uma referência ao botão "Enfileirar"
  var btnEnfileirar = document.querySelector('.botao-enfileirar');
  // Adiciona um evento de clique ao botão "Enfileirar"
  btnEnfileirar.addEventListener('click', function() {
    // Enfileira o número
    enfileirarNumero();
  });
});
// Obtém uma referência ao botão "Enfileirar Aleatório"
var btnEnfileirarAleatorio = document.querySelector('.botao-enfileirar-aleatorio');
// Adiciona um evento de clique ao botão "Enfileirar Aleatório"
btnEnfileirarAleatorio.addEventListener('click', function() {
  enfileirarAleatorio();
});


