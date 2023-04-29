const ROWS = 20;
const COLS = 10;
const SCORE = 10;
const SIZE = 30;

const SHAPES = [
  [],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0],
  ],
  [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [6, 6, 6],
    [0, 6, 0],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

const IMAGES = [
  "../images/blank.png",
  "../images/I.png",
  "../images/J.png",
  "../images/L.png",
  "../images/O.png",
  "../images/S.png",
  "../images/T.png",
  "../images/Z.png",
];

export { ROWS, COLS, SCORE, SIZE, SHAPES, IMAGES };
