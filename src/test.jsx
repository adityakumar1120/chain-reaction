import React, { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import sound from '../assets/sounds/click.wav'
import Winner from "../components/Winner";
export default function GameBoard() {
  const { noOfPlayers, setNoOFPlayers } = usePlayer();
  let audio = new Audio()
  audio.src = sound
  const grid = {
    columns: 6,
    rows: 9,
  };
  const playerColor = {
    1: "#fd2e2e", // Soft Red
    2: "#24f940", // Fresh Green
    3: "#247ffd", // Calm Blue
    4: "#FFD93D", // Warm Yellow
    5: "#7f8ea2", // Cool Gray
    6: "#FF8C42", // Soft Orange
    7: "#38BDF8", // Aqua Cyan
    8: "#B794F4", // Gentle Violet
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
  const [moveCounts, setMoveCounts] = useState(0)
  const [winner, setWinner] = useState(null)
  const [border, setBorder] = useState(playerColor[1]);
  const [cordinates, setCordinates] = useState({ x: null, y: null });
  console.log(winner);
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
              if (winner === null && col.player === null || col.player === currentPlayer) {
                // changin to next player if the move is correct
                setMoveCounts(moveCounts + 1)
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
  let winningObj  = {
    1 : [],
  }
  const checkWin = ()=>{
    let winner ;
    [...Array(noOfPlayers)].map((_ , playerIdx)=>{
      board.filter((row , i)=>{
        return row.filter((col , i)=>{
          // console.log(col.player === null);
           if(col.player === playerIdx + 1 || col.player === null ){
            winningObj[playerIdx+1] = [...(winningObj[playerIdx+1] || []), true]
          }else{
             winningObj[playerIdx+1] = [...(winningObj[playerIdx+1] || []), false]

           }
          return col.player === playerIdx + 1 || col.player === null
        })
      })
    })
    Object.keys(winningObj).some((player)=>{
      return winner = winningObj[player].every((e)=>{
       return e === true
      }) ? player : null
    })
    return winner
  }
  useEffect(()=>{
    if(cordinates.x && cordinates.y && moveCounts > 1){
      setWinner(checkWin())
    }
  } , [board])

  const handleClick = (e) => {
    // console.log(e.target.dataset.position);
    // console.log(JSON.parse(e.target.dataset.row)
    //   ,JSON.parse(e.target.dataset.col));
    setCordinates({
      x: JSON.parse(e.target.dataset.row),
      y: JSON.parse(e.target.dataset.col),
    });
  };
  const playAgain = ()=>{
    //   setWinner(null)
    //   setCordinates({ x: null, y: null })
    //   setMoveCounts(0)
    //   setCurrentPlayer(1)
    //   setBorder(playerColor[1])
    //   setBoard(new Array(grid.rows).fill(null).map((row, rowIndex) =>
    //   new Array(grid.columns)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .map((col, colIndex) => {
    //       // console.log(setPosition(rowIndex , colIndex) , 'state');
    //       return {
    //         count: 0,
    //         player: null,
    //         position: setPosition(rowIndex, colIndex),
    //       };
    //     })
    // ))
  }
  return (
    <div>
      <div className="grid grid-cols-6 grid-rows-9  max-w-[500px] h-screen mx-auto">
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
              onClick={handleClick}
              key={crypto.randomUUID()}
              data-row={rowIndex}
              data-col={colIndex}
              data-position={`${setPosition(rowIndex, colIndex)}`}
              className={`bg-black flex items-center justify-center cursor-pointer `}
              style={{
                border: `1px solid ${border}50`, // 80 is ~50% opacity in hex
                color: `${playerColor[col.player]}`,
              }}
              >
              {/* {col.count} */}
              {col.count === 0 ? (
                ""
              ) : <div className="pointer-events-none flex justify-center items center">
                {[...Array(col.count)].map((_, i) =>{
                  return <div
                  key={i}
                  style={{
                    backgroundColor: `${playerColor[col.player]}`,
                  }}
                  className="
      shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),5px_5px_15px_rgba(0,0,0,0.3)] w-[16px] h-[16px] border rounded-full pointer-events-none"
                  ></div>
                })}
                </div>}
              </div>
            );
          });
        })}
      </div>
      {
        winner && <Winner winner={winner} playAgain={playAgain}/>
      }
    </div>
  );
}
