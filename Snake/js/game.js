(function () {
  let FPS = 10;
  let speed = 0;
  let pause = false;
  let dead = false;
  let eated = false;
  const SIZE = 40

  let board;
  let snake;
  let fruit;

  function init() {
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    fruit = new Fruit(4,4);
    newFruit(fruit, snake)
    setTimeout(run, 1000 / FPS, fruit);
    setInterval(timer, 60000 / FPS );
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

    walk(fruit) {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]]
          // Check Border Collision
          if (head[0] <= 1){
            dead = true;
            console.log("GAME OVER: Colidiu com o fim do mapa.");
          }
          break;
        case 1:
          newHead = [head[0], head[1] + 1]
          // Check Border Collision
          if (head[1] >= 40){
            dead = true;
            console.log("GAME OVER: Colidiu com o fim do mapa.");
          }
          break;
        case 2:
          newHead = [head[0] + 1, head[1]]
          // Check Border Collision
          if (head[0] >= 40){
            dead = true;
            console.log("GAME OVER: Colidiu com o fim do mapa.");
          }
          break;
        case 3:
          newHead = [head[0], head[1] - 1]
          // Check Border Collision
          if (head[1] <= 1){
            dead = true;
            console.log("GAME OVER: Colidiu com o fim do mapa.");
          }
          break;
        default:
          break;
      }

      this.checkBodyCollision(newHead);
      this.checkEatFruit(newHead, fruit);

      if (dead == false && eated == false){
        this.body.push(newHead)
        const oldTail = this.body.shift()
        document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
        document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color
      }
      eated = false;
    }

    checkBodyCollision(newhead) {
      for (let i = 0; i < this.body.length - 2; i++) {
          if (newhead[0] == this.body[i][0] && newhead[1] == this.body[i][1]) {
              dead = true;
              console.log("GAME OVER: Colidiu com o próprio corpo.")
              break;
          }
      }
  }

    checkEatFruit(newHead, fruit){
      if (newHead[0] == fruit.coordinate[0] && newHead[1] == fruit.coordinate[1]){
        eated = true;
        this.body.push(newHead);
        document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color;
        newFruit(fruit, this);
      }
    }

    changeDirection(direction) {
      this.direction = direction;
    }
  }

  class Fruit {
    constructor(x,y){
      this.color = "red";
      this.coordinate = [x, y];
      document.querySelector(`#board tr:nth-child(${x}) td:nth-child(${y})`).style.backgroundColor = this.color;
    }
  }

  function newFruit(fruit, snake){
    let xFruit = Math.floor((Math.random() * 38)+1);
    let yFruit = Math.floor((Math.random() * 38)+1);

    do {
      conflict = false;
      xFruit = Math.floor((Math.random() * 38)+1);
      yFruit = Math.floor((Math.random() * 38)+1);

      // Verifica se a posição da fruta conflita com a cobrinha
      for (let segment of snake.body) {
        if (segment[0] == xFruit && segment[1] == yFruit) {
          conflict = true;
          break;
        }
      }
    } while (conflict);
    document.querySelector(`#board tr:nth-child(${fruit.coordinate[0]}) td:nth-child(${fruit.coordinate[1]})`).style.backgroundColor = snake.color;
    fruit.coordinate = [xFruit, yFruit];
    document.querySelector(`#board tr:nth-child(${fruit.coordinate[0]}) td:nth-child(${fruit.coordinate[1]})`).style.backgroundColor = fruit.color;
  }

  function timer(){
    if (pause == false && dead == false){
      speed += 2;
      console.log("Speed: "+speed);
    }
  }

  function pauseGame(){
    if (pause == true){
      pause = false;
    }
    else{
      pause = true;
    }
  }

  function run(fruit) {
    if (pause == false && dead == false)
      snake.walk(fruit);
    setTimeout(run, 1000 / (FPS + speed), fruit);
  }
  
  init();
})()