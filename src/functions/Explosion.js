export const explosion = (x, y, position , board , currentPlayer , checkExplosion , explosionNumber
  , grid
) => {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  const fakeBoard = [...board];
  const thresholdMap = { corner: 2, edge: 3, middle: 4 };

  const updateAndCheck = (i, j) => {
    fakeBoard[i][j].count = board[i][j].count + 1;
    fakeBoard[i][j].player = currentPlayer;
    checkExplosion(i, j, fakeBoard[i][j], thresholdMap);
  };

  fakeBoard[x][y].count = 0;

  if (position === "corner") {
    if (x > 0 && y > 0) {
      // corner bottom right
      updateAndCheck(x, y - 1);
      updateAndCheck(x - 1, y);
    } else if (x == 0 && y > 0) {
      // corner top right
      updateAndCheck(x + 1, y);
      updateAndCheck(x, y - 1);
    } else if (x == 0 && y == 0) {
      // corner top left
      updateAndCheck(x + 1, y);
      updateAndCheck(x, y + 1);
    } else if (x > 0 && y == 0) {
      // corner bottom left
      updateAndCheck(x - 1, y);
      updateAndCheck(x, y + 1);
    }
  }

  if (position === "edge") {
    if (y == 0 && x > 0 && x < grid.rows - 1) {
      // left edge
      updateAndCheck(x - 1, y);
      updateAndCheck(x + 1, y);
      updateAndCheck(x, y + 1);
    } else if (y == grid.columns - 1 && x > 0 && x < grid.rows - 1) {
      // right edge
      updateAndCheck(x - 1, y);
      updateAndCheck(x + 1, y);
      updateAndCheck(x, y - 1);
    } else if (x == 0 && y > 0 && y < grid.columns - 1) {
      // top edge
      updateAndCheck(x, y - 1);
      updateAndCheck(x, y + 1);
      updateAndCheck(x + 1, y);
    } else if (x == grid.rows - 1 && y > 0 && y < grid.columns - 1) {
      // bottom edge
      updateAndCheck(x, y - 1);
      updateAndCheck(x, y + 1);
      updateAndCheck(x - 1, y);
    }
  }

  if (position === "middle") {
    if (x > 0 && y > 0) {
      updateAndCheck(x, y + 1);
      updateAndCheck(x, y - 1);
      updateAndCheck(x + 1, y);
      updateAndCheck(x - 1, y);
    }
  }
};

  // const explosion = (x, y, position) => {
  //   if(navigator.vibrate){
  //                 navigator.vibrate(100)
  //               }
  //   const fakeBoard = [...board];
  //   if (position === "corner") {
  //     if (x > 0 && y > 0) {
  //       //corner bottom right
  //       fakeBoard[x][y].count = 0;
  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
        
  //       checkExplosion2(x, y - 1);

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);
  //     } else if (x == 0 && y > 0) {
  //       //corner top right
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);
  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
  //       checkExplosion2(x, y - 1);

  //       // console.log(board[x + 1][y]);
  //       // console.log(board[x][y - 1]);
  //     } else if (x == 0 && y == 0) {
  //       //corener top left
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       // console.log(board[x + 1][y]);
  //       // console.log(board[x][y + 1]);
  //     } else if (x > 0 && y == 0) {
  //       //bottom left
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       // console.log(board[x - 1][y]);
  //       // console.log(board[x][y + 1]);
  //     }
  //   }
  //   if (position === "edge") {
  //     if (y == 0 && (x > 0) & (x < grid.rows - 1)) {
  //       //for left side
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       // console.log(board[x - 1][y]);
  //       // console.log(board[x + 1][y]);
  //       // console.log(board[x][y + 1]);
  //     } else if (y == grid.columns - 1 && (x > 0) & (x < grid.rows - 1)) {
  //       //for right side
  //       console.log("0000cols");
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);

  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
  //       checkExplosion2(x, y - 1);

  //       // console.log(board[x - 1][y]);
  //       // console.log(board[x + 1][y]);
  //       // console.log(board[x][y - 1]);
  //     } else if (x == 0 && (y > 0) & (y < grid.columns - 1)) {
  //       //for top side
  //       console.log("0000cols");
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
  //       checkExplosion2(x, y - 1);

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);

  //       // console.log(board[x][y - 1]);
  //       // console.log(board[x][y + 1]);
  //       // console.log(board[x + 1][y]);
  //     } else if (x == grid.rows - 1 && (y > 0) & (y < grid.columns - 1)) {
  //       //bottom side
  //       console.log("0000cols");
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
  //       checkExplosion2(x, y - 1);

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);

  //       // console.log(board[x][y - 1]);
  //       // console.log(board[x][y + 1]);
  //       // console.log(board[x - 1][y]);
  //     }
  //   }
  //   if (position === "middle") {
  //     if (x > 0 && y > 0) {
  //       // console.log("bada hai");
  //       fakeBoard[x][y].count = 0;

  //       fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
  //       fakeBoard[x][y + 1].player = currentPlayer;
  //       checkExplosion2(x, y + 1);

  //       fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
  //       fakeBoard[x][y - 1].player = currentPlayer;
  //       checkExplosion2(x, y - 1);

  //       fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
  //       fakeBoard[x + 1][y].player = currentPlayer;
  //       checkExplosion2(x + 1, y);

  //       fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
  //       fakeBoard[x - 1][y].player = currentPlayer;
  //       checkExplosion2(x - 1, y);

  //       // console.log(board[x][y + 1]);
  //       // console.log(board[x][y - 1]);
  //       // console.log(board[x + 1][y]);
  //       // console.log(board[x - 1][y]);
  //     }
  //   }
  // };
  // const checkExplosion2 = (x, y, col) => {
  //   if (board[x][y].position === "corner") {
  //     if (board[x][y].count === 2) {
  //       // console.log("corner exploding");
  //       explosion(x, y, "corner");
  //       return { ...col, count: 0, player: null };
  //     }
  //   }
  //   if (board[x][y].position === "edge") {
  //     if (board[x][y].count === 3) {
  //       // console.log("edge exploding");
  //       explosion(x, y, "edge");
  //       return { ...col, count: 0, player: null };
  //     }
  //   }
  //   if (board[x][y].position === "middle") {
  //     if (board[x][y].count === 4) {
  //       // console.log("middle exploding");
  //       explosion(x, y, "middle");
  //       return { ...col, count: 0, player: null };
  //     }
  //   }
  // };
