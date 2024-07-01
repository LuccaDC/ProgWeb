(function () {
  let FPS = 10
  let pause = false;
  let dead = false;
  const SIZE = 40

  let board;
  let snake;
  let xFruit;
  let yFruit;

  function init() {
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    fruit = newFruit(snake);
    setInterval(run, 1000 / FPS)
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (snake.direction != 2)
          snake.changeDirection(0)
        break;
      case "ArrowRight":
        if (snake.direction != 3)
          snake.changeDirection(1)
        break;
      case "ArrowDown":
        if (snake.direction != 0)
          snake.changeDirection(2)
        break;
      case "ArrowLeft":
        if (snake.direction != 1)
          snake.changeDirection(3)
        break;
      case "p":
        pauseGame();
        break;
      default:
        break;
    }
  })

  class Board {
    constructor(size) {
      this.element = document.createElement("table")
      this.element.setAttribute("id", "board")
      this.color = "#ccc";
      document.body.appendChild(this.element)
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr")
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field)
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]]
          if (head[0] < 0)
            gameOver();
          break;
        case 1:
          newHead = [head[0], head[1] + 1]
          if (head[1] > 40)
            gameOver();
          break;
        case 2:
          newHead = [head[0] + 1, head[1]]
          if (head[0] > 40)
            gameOver();
          break;
        case 3:
          newHead = [head[0], head[1] - 1]
          if (head[1] < 0)
            gameOver();
          break;
        default:
          break;
      }
      this.body.push(newHead)
      const oldTail = this.body.shift()
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
      document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color
    }
    changeDirection(direction) {
      this.direction = direction
    }
  }

  class fruit {
    constructor(x,y){
      this.color = "red";
      document.querySelector(`#board tr:nth-child(${x}) td:nth-child(${y})`).style.backgroundColor = this.color;
    }
  }

  function newFruit(snake){
    xFruit = Math.floor(Math.random() * 40);
    yFruit = Math.floor(Math.random() * 40);

    do {
      conflict = false;
      xFruit = Math.floor(Math.random() * 40);
      yFruit = Math.floor(Math.random() * 40);

      // Verifica se a posição da fruta conflita com a cobrinha
      for (let segment of snake.body) {
        if (segment[0] == xFruit && segment[1] == yFruit) {
          conflict = true;
          break;
        }
      }
    } while (conflict);

    return fruit = new fruit(xFruit,yFruit);
  }

  function gameOver(){
    dead = true;
  }

  function pauseGame(){
    if (pause == true){
      pause = false;
    }
    else{
      pause = true;
    }
  }

  function run() {
    if (pause == false && dead == false)
      snake.walk()
  }
  init()
})()