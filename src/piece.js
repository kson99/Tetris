import { COLS, IMAGES } from "./constants.js";

export default class Piece {
  constructor({ shape, ctx }) {
    this.ctx = ctx;
    this.piece = shape;
    this.y = 0;
    this.x = COLS / 2.5;
  }

  drawPiece() {
    const createImage = (src) => {
      const image = new Image();
      image.src = src;

      return image;
    };

    this.piece.map((row, i) => {
      row.map((cell, j) => {
        if (cell > 0) {
          this.ctx.drawImage(
            createImage(IMAGES[cell]),
            this.x + j,
            this.y + i,
            1,
            1
          );
          // this.ctx.fillStyle = COLORS[cell];
          // this.ctx.fillRect(this.x + j, this.y + i, 1, 1);
        }
      });
    });
  }
}
