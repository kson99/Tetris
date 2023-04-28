const canvas = document.querySelector("canvas");
const start = document.querySelector("#start");
const newGame = document.querySelector(".newGame");
const gameOverBtn = document.querySelector(".gameOver button");

const ctx = canvas.getContext("2d");
ctx.scale(SIZE, SIZE);
let score = 0;

// let pieceObj = null;
let game = new Game(ctx);

setInterval(() => {
  handleButtons();
  gameState();
}, 1000);

const gameState = () => {
  gridCheck();

  if (game.fallingPiece === null) {
    let random = Math.floor(Math.random() * 6) + 1;

    // creating piece
    const piece = new Piece({ shape: SHAPES[random], ctx });
    game.fallingPiece = piece;

    // drawing the piece before falling
    piece.drawPiece();
    // game.falling();
  } else {
    game.falling();
  }
};

const gridCheck = () => {
  for (let i = 0; i < game.grid.length; i++) {
    let rowFilled = true;

    // check grid for cells with 0
    for (let j = 0; j < game.grid[i].length; j++) {
      if (game.grid[i][j] === 0) {
        rowFilled = false;
      }
    }

    // remove rows without a 0 in its cells
    if (rowFilled) {
      let sound = new Audio("./sound/clear.mp3");

      game.grid.splice(i, 1);
      game.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

      game.score += SCORE;
      sound.play();
    }
  }
};

const handleButtons = () => {
  start.addEventListener("click", () => {
    game.isPlaying = !game.isPlaying;
  });

  if (game.isPlaying) {
    newGame.style.display = "none";
    start.innerHTML = "PAUSE";
    start.style.backgroundColor = "red";
    start.style.color = "white";
  } else {
    newGame.style.display = "flex";
    start.innerHTML = "START";
    start.style.backgroundColor = "white";
    start.style.color = "black";
  }

  gameOverBtn.addEventListener("click", () => {
    game.isPlaying = false;
    document.querySelector(".gameOver").style.display = "none";
  });
};

// on keypress down
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      game.rotate();
      break;

    // left
    case "a":
      game.shift("left");
      break;

    // down
    case "s":
      game.falling();
      break;

    // right
    case "d":
      game.shift("right");
      // lastKey = "d";
      break;
  }
});
