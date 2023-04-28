class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.gameGrid();
    this.fallingPiece = null;
    this.score = 0;
    this.isPlaying = false;
  }

  //Empty game grid by filling all cells with 0
  gameGrid() {
    let grid = [];

    for (let i = 0; i < ROWS; i++) {
      grid.push([]);
      for (let j = 0; j < COLS; j++) {
        grid[grid.length - 1].push(0);
      }
    }

    return grid;
  }

  drawGrid() {
    const createImage = (src) => {
      const image = new Image();
      image.src = src;

      return image;
    };

    this.grid.map((row, i) => {
      row.map((cell, j) => {
        // this.ctx.fillStyle = COLORS[cell];
        // this.ctx.fillRect(j, i, 1, 1);
        this.ctx.drawImage(createImage(IMAGES[cell]), j, i, 1, 1);
      });
    });

    if (this.fallingPiece !== null) {
      // draw Piece With piece class
      this.fallingPiece.drawPiece();
    }
  }

  // piece falling function
  falling() {
    if (this.isPlaying) {
      // let this.fallingPiece = this.fallingPiece;
      if (this.fallingPiece === null) {
        this.drawGrid();
        return;
      } else if (
        !this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)
      ) {
        this.fallingPiece.y += 1;
      } else {
        const piece = this.fallingPiece.piece;
        for (let i = 0; i < piece.length; i++) {
          for (let j = 0; j < piece[i].length; j++) {
            // get position on grid
            let k = this.fallingPiece.x + j;
            let l = this.fallingPiece.y + i;
            if (k >= 0 && k < COLS && l < ROWS && piece[i][j] > 0) {
              this.grid[l][k] = piece[i][j];
              // }
            }
          }
        }

        //   game over
        if (this.fallingPiece.y === 0) {
          let sound = new Audio("../sound/game-over.mp3");

          this.score = 0;
          this.isPlaying = false;
          document.querySelector(".gameOver").style.display = "flex";
          sound.play();

          // clear grid
          this.grid = this.gameGrid();
        }

        this.fallingPiece = null;
      }

      // set score Display to current score
      document.querySelector("#score").innerHTML = this.score;
      this.drawGrid();
    }
  }

  // collision detection
  collision(x, y, rotatedPiece) {
    let piece = rotatedPiece || this.fallingPiece.piece;

    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece.length; j++) {
        if (piece[i][j] > 0) {
          // get position on grid
          let k = x + j;
          let l = y + i;
          if (k >= 0 && k < COLS && l < ROWS) {
            // Withing walls
            // When it colides with another piece
            if (this.grid[l][k] > 0) {
              return true;
            }
          } else {
            // outside canvas
            return true;
          }
        }
      }
    }
    return false;
  }

  // shift the shape left or right
  shift(direction) {
    if (this.fallingPiece === null) {
      return;
    }

    let piece = this.fallingPiece;
    if (direction === "left") {
      if (!this.collision(piece.x - 1, piece.y)) {
        piece.x -= 1;
      }
      // this.drawGrid();
    } else if (direction === "right") {
      if (!this.collision(piece.x + 1, piece.y)) {
        piece.x += 1;
      }
    }
    this.drawGrid();
  }

  // shape rotation function
  rotate() {
    let rotatedPiece = [];
    let piece = this.fallingPiece?.piece;

    // get rotatedPiece to be same size as falling piece
    for (let i = 0; i < piece.length; i++) {
      rotatedPiece.push([]);
      for (let j = 0; j < piece[i].length; j++) {
        rotatedPiece[i].push(0);
      }
    }

    // transpose of the matrix/shape
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        rotatedPiece[i][j] = piece[j][i];
      }
    }

    // Reverse each row of the transpose matrix
    rotatedPiece.map((row) => {
      row.reverse();
    });

    if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, rotatedPiece))
      this.fallingPiece.piece = rotatedPiece;
    this.drawGrid();
  }
}
