import React, { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import sound from '../assets/sounds/click.wav'
export default function GameBoard() {
  const { noOfPlayers, setNoOFPlayers } = usePlayer();
  let audio = new Audio()
  audio.src = sound
  const grid = {
    columns: 6,
    rows: 9,
  };
  const [board, setBoard] = useState(
    new Array(grid.rows).fill(null).map((row, rowIndex) =>
      new Array(grid.columns)
        .fill(0)
        .map((_, i) => i)
        .map((col, colIndex) => {
          // console.log(setPosition(rowIndex , colIndex) , 'state');
          return {
            count: 0,
            player: null,
            position: setPosition(rowIndex, colIndex),
          };
        })
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // console.log('no of players' , noOfPlayers);
  // setNoOFPlayers(5);
  const playerColor = {
    1: "#FF6B6B", // Soft Red
    2: "#6BCB77", // Fresh Green
    3: "#4D96FF", // Calm Blue
    4: "#FFD93D", // Warm Yellow
    5: "#A0AEC0", // Cool Gray
    6: "#FF8C42", // Soft Orange
    7: "#38BDF8", // Aqua Cyan
    8: "#B794F4", // Gentle Violet
  };
  const [border, setBorder] = useState(playerColor[1]);
  const [cordinates, setCordinates] = useState({ x: null, y: null });

  const changePlayer = () => {
    setCurrentPlayer((prev) => {
      if (prev === noOfPlayers) {
        return 1;
      } //last player than reset to first (1)
      else return prev + 1;
    });
  };
  const explosion = (x, y, position) => {
    if(navigator.vibrate){
                  navigator.vibrate(100)
                }
    const fakeBoard = [...board];
    if (position === "corner") {
      if (x > 0 && y > 0) {
        //corner bottom right
        fakeBoard[x][y].count = 0;
        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        
        checkExplosion2(x, y - 1);

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);
      } else if (x == 0 && y > 0) {
        //corner top right
        fakeBoard[x][y].count = 0;

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);
        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        checkExplosion2(x, y - 1);

        console.log(board[x + 1][y]);
        console.log(board[x][y - 1]);
      } else if (x == 0 && y == 0) {
        //corener top left
        fakeBoard[x][y].count = 0;

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        console.log(board[x + 1][y]);
        console.log(board[x][y + 1]);
      } else if (x > 0 && y == 0) {
        //bottom left
        fakeBoard[x][y].count = 0;

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        console.log(board[x - 1][y]);
        console.log(board[x][y + 1]);
      }
    }
    if (position === "edge") {
      if (y == 0 && (x > 0) & (x < grid.rows - 1)) {
        //for left side
        console.log("0000");
        fakeBoard[x][y].count = 0;

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        console.log(board[x - 1][y]);
        console.log(board[x + 1][y]);
        console.log(board[x][y + 1]);
      } else if (y == grid.columns - 1 && (x > 0) & (x < grid.rows - 1)) {
        //for right side
        console.log("0000cols");
        fakeBoard[x][y].count = 0;

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);

        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        checkExplosion2(x, y - 1);

        console.log(board[x - 1][y]);
        console.log(board[x + 1][y]);
        console.log(board[x][y - 1]);
      } else if (x == 0 && (y > 0) & (y < grid.columns - 1)) {
        //for top side
        console.log("0000cols");
        fakeBoard[x][y].count = 0;

        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        checkExplosion2(x, y - 1);

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);

        console.log(board[x][y - 1]);
        console.log(board[x][y + 1]);
        console.log(board[x + 1][y]);
      } else if (x == grid.rows - 1 && (y > 0) & (y < grid.columns - 1)) {
        //bottom side
        console.log("0000cols");
        fakeBoard[x][y].count = 0;

        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        checkExplosion2(x, y - 1);

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);

        console.log(board[x][y - 1]);
        console.log(board[x][y + 1]);
        console.log(board[x - 1][y]);
      }
    }
    if (position === "middle") {
      if (x > 0 && y > 0) {
        console.log("bada hai");
        fakeBoard[x][y].count = 0;

        fakeBoard[x][y + 1].count = board[x][y + 1].count + 1;
        fakeBoard[x][y + 1].player = currentPlayer;
        checkExplosion2(x, y + 1);

        fakeBoard[x][y - 1].count = board[x][y - 1].count + 1;
        fakeBoard[x][y - 1].player = currentPlayer;
        checkExplosion2(x, y - 1);

        fakeBoard[x + 1][y].count = board[x + 1][y].count + 1;
        fakeBoard[x + 1][y].player = currentPlayer;
        checkExplosion2(x + 1, y);

        fakeBoard[x - 1][y].count = board[x - 1][y].count + 1;
        fakeBoard[x - 1][y].player = currentPlayer;
        checkExplosion2(x - 1, y);

        console.log(board[x][y + 1]);
        console.log(board[x][y - 1]);
        console.log(board[x + 1][y]);
        console.log(board[x - 1][y]);
      }
    }
  };
  const checkExplosion2 = (x, y, col) => {
    if (board[x][y].position === "corner") {
      if (board[x][y].count === 2) {
        console.log("corner exploding");
        explosion(x, y, "corner");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
    if (board[x][y].position === "edge") {
      if (board[x][y].count === 3) {
        console.log("edge exploding");
        explosion(x, y, "edge");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
    if (board[x][y].position === "middle") {
      if (board[x][y].count === 4) {
        console.log("middle exploding");
        explosion(x, y, "middle");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
  };
  const checkExplosion = (x, y, col , explosionNumber) => {
    if (board[x][y].position === "corner") {
      if (board[x][y].count === explosionNumber.corner) {
        console.log("corner exploding");
        explosion(x, y, "corner");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
    if (board[x][y].position === "edge") {
      if (board[x][y].count === explosionNumber.edge) {
        console.log("edge exploding");
        explosion(x, y, "edge");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
    if (board[x][y].position === "middle") {
      if (board[x][y].count === explosionNumber.middle) {
        console.log("middle exploding");
        explosion(x, y, "middle");
        changePlayer();
        return { ...col, count: 0, player: null };
      }
    }
  };

  const updateBoard = (x, y) => {
    setBoard((prev) => {
      return prev.map((row, rowIndex) => {
        if (rowIndex === x) {
          return row.map((col, colIndex) => {
            if (colIndex === y) {
              //check if the cell is empty or is should be same as the player turn
              if (col.player === null || col.player === currentPlayer) {
                // changin to next player if the move is correct
                const isExplosion = checkExplosion(x, y, col ,{corner : 1, edge : 2, middle: 3});
                if (isExplosion) {
                  return isExplosion;
                }
                changePlayer();
                if(navigator.vibrate){
                  navigator.vibrate(100)
                }
                return {
                  ...col,
                  count: col.count + 1,
                  player: currentPlayer,
                };
              }
            }
            return col;
          });
        }
        return row;
      });
    });
  };
  useEffect(() => {
    setBorder(playerColor[currentPlayer]);
  }, [currentPlayer]);
  useEffect(() => {
    if (cordinates.x !== null && cordinates.y !== null) {
      updateBoard(cordinates.x, cordinates.y);
    }
  }, [cordinates]);

  function setPosition(rowIndex, colIndex) {
    // console.log(rowIndex, colIndex , 'setupfunc');
    // console.log((rowIndex === grid.rows - 1 && colIndex === 1 ));
    if (
      (rowIndex === 0 && colIndex === 0) ||
      (rowIndex === 0 && colIndex === grid.columns - 1) ||
      (rowIndex === 8 && colIndex === 0) ||
      (rowIndex === 8 && colIndex === grid.columns - 1)
    ) {
      return "corner";
    } else if (
      (rowIndex === 1 && colIndex === 0) ||
      (rowIndex === 2 && colIndex === 0) ||
      (rowIndex === 3 && colIndex === 0) ||
      (rowIndex === 4 && colIndex === 0) ||
      (rowIndex === 5 && colIndex === 0) ||
      (rowIndex === 6 && colIndex === 0) ||
      (rowIndex === 7 && colIndex === 0) ||
      (rowIndex === 1 && colIndex === 5) ||
      (rowIndex === 2 && colIndex === 5) ||
      (rowIndex === 3 && colIndex === 5) ||
      (rowIndex === 4 && colIndex === 5) ||
      (rowIndex === 5 && colIndex === 5) ||
      (rowIndex === 6 && colIndex === 5) ||
      (rowIndex === 7 && colIndex === 5) ||
      (rowIndex === 0 && colIndex === 1) ||
      (rowIndex === 0 && colIndex === 2) ||
      (rowIndex === 0 && colIndex === 3) ||
      (rowIndex === 0 && colIndex === 4) ||
      (rowIndex === 0 && colIndex === 5) ||
      (rowIndex === grid.rows - 1 && colIndex === 1) ||
      (rowIndex === grid.rows - 1 && colIndex === 2) ||
      (rowIndex === grid.rows - 1 && colIndex === 3) ||
      (rowIndex === grid.rows - 1 && colIndex === 4) ||
      (rowIndex === grid.rows - 1 && colIndex === 5)
    ) {
      return "edge";
    } else {
      return "middle";
    }
  }

  const handleClick = (e) => {
    // console.log(e.target.dataset.position);
    // console.log(JSON.parse(e.target.dataset.row)
    //   ,JSON.parse(e.target.dataset.col));
    setCordinates({
      x: JSON.parse(e.target.dataset.row),
      y: JSON.parse(e.target.dataset.col),
    });
  };
  return (
    <div>
      <div className="grid grid-cols-6  max-w-[500px] h-screen mx-auto">
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
                onClick={handleClick}
                key={crypto.randomUUID()}
                data-row={rowIndex}
                data-col={colIndex}
                data-position={`${setPosition(rowIndex, colIndex)}`}
                className={`bg-slate-200 flex items-center justify-center cursor-pointer`}
                style={{
                  border: `1px solid ${border}`,
                  color: `${playerColor[col.player]}`,
                }}
              >
                {/* {col.count} */}
                {col.count === 0 ? (
                  ""
                ) : col.count === 1 ? (
                  <div className="pointer-events-none flex justify-center items center">
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                  </div>
                ) : col.count === 2 ? (
                  <div className="pointer-events-none flex justify-center items center">
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                  </div>
                ) : col.count === 3 ? (
                  <div className="pointer-events-none flex justify-center items center">
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                    <div
                      style={{
                        backgroundColor: `${playerColor[col.player]}`,
                      }}
                      className="w-[12px] h-[12px] rounded-full pointer-events-none"
                    ></div>
                  </div>
                ) : (
                  "4"
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
