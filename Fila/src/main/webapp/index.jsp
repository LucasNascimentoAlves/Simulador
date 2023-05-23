<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
  <title>Simulador: Estrutura Fila (FIFO)</title>
  <link rel="stylesheet" type="text/css" href="estilo.css">
  
</head>
<header>
 <h1>Simulador: Estrutura Fila (FIFO)</h1>
</header>
<body>
  <div class="caixa-tamanho">
    Tamanho:
    <input type="number" class="input-tamanho">
    <button class="botao-criar" id="btn-criar">Criar</button>
  </div>
  
  <div class="caixa-pai">
    <div class="caixa-valor">
      Valor:
      <div class="conteudo-valor">
        <input type="number" class="input-valor">
        <button class="botao-enfileirar">Enfileirar</button>
        <button class="botao-enfileirar-aleatorio">Enfileirar Aleatório</button>
      </div>
    </div>
  </div>
   
  <button class="botao-desenfileirar">Desenfileirar</button>
  
 <div class="grafico-pizza">
    <canvas id="grafico" width="400" height="400"></canvas>
    <div class="inicio">Inicio da Fila:</div>
  <div class="fim">Fim da Fila:</div>
  </div>
  
  <script src="script.js"></script>
  
</body>
<footer>
<h1>Saída</h1>
<div class="caixa-saida">
      <!-- Números do FIFO serão exibidos aqui -->
    </div>
    <button class="botao-limpar">Limpar</button>
</footer>
</html>

