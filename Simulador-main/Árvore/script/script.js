class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  addNode(value) {
    if (this.searchNode(value)) {
      console.log("Erro: Valor já existe na árvore.");
      return;
    }

    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  traverseInOrder(node, callback) {
    if (node !== null) {
      this.traverseInOrder(node.left, callback);
      callback(node.value);
      this.traverseInOrder(node.right, callback);
    }
  }

  searchNode(value) {
    return this.search(this.root, value);
  }

  search(node, value) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.search(node.left, value);
    } else {
      return this.search(node.right, value);
    }
  }

  removeNode(value) {
    if (!this.searchNode(value)) {
      console.log("Erro: Valor não encontrado na árvore.");
      return;
    }

    this.root = this.remove(this.root, value);
  }

  remove(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.remove(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.remove(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const minRight = this.findMin(node.right);
      node.value = minRight.value;
      node.right = this.remove(node.right, minRight.value);
      return node;
    }
  }

  findMin(node) {
    if (node.left === null) {
      return node;
    }
    return this.findMin(node.left);
  }
}

function addNumber() {
  const numberInput = document.getElementById("numberInput");
  const number = parseInt(numberInput.value);

  if (!isNaN(number)) {
    if (binaryTree.searchNode(number)) {
      alert("Erro: Valor já existe na árvore.");
    } else {
      binaryTree.addNode(number);
      renderTree(binaryTree.root);
    }
  } else {
    alert("Erro: Valor inválido.");
  }

  numberInput.value = "";
}

function searchNumber() {
  const numberInput = document.getElementById("numberInput");
  const number = parseInt(numberInput.value);

  if (!isNaN(number)) {
    const node = binaryTree.searchNode(number);
    if (node !== null) {
      alert("Número encontrado na árvore!");
    } else {
      alert("Número não encontrado na árvore.");
    }
  }

  numberInput.value = "";
}

function renderTree(root) {
  const treeContainer = document.getElementById("treeContainer");
  treeContainer.innerHTML = "";

  const treeDepth = getTreeDepth(root);
  const treeWidth = Math.pow(2, treeDepth - 1) * 80;

  const canvas = document.createElement("canvas");
  canvas.width = treeWidth;
  canvas.height = treeDepth * 80;
  treeContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  renderNode(root, ctx, treeWidth / 2, 40);
}

function flattenTree(node, nodes) {
  if (node !== null) {
    flattenTree(node.left, nodes);
    nodes.push(node);
    flattenTree(node.right, nodes);
  }
}

function renderNode(node, ctx, x, y) {
  if (node !== null) {
    if (node.left !== null) {
      const leftChildX = x - Math.pow(2, getTreeDepth(node.left) - 1) * 40;
      const leftChildY = y + 80;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(leftChildX, leftChildY);
      ctx.stroke();
      renderNode(node.left, ctx, leftChildX, leftChildY);
    }

    if (node.right !== null) {
      const rightChildX = x + Math.pow(2, getTreeDepth(node.right) - 1) * 40;
      const rightChildY = y + 80;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(rightChildX, rightChildY);
      ctx.stroke();
      renderNode(node.right, ctx, rightChildX, rightChildY);
    }

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.value, x, y);
  }
}

function getTreeDepth(node) {
  if (node === null) {
    return 0;
  } else {
    const leftDepth = getTreeDepth(node.left);
    const rightDepth = getTreeDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }
}

function clearTree() {
  binaryTree = new BinaryTree(); // Cria uma nova árvore binária vazia
  renderTree(binaryTree.root); // Renderiza a árvore vazia na tela
}

let binaryTree = new BinaryTree();
