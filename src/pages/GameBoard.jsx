import React, { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import sound from '../assets/sounds/click.wav'
import Winner from "../components/Winner";
import Cell from "../components/Cell";
import { explosion } from "../functions/Explosion";
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
  const changePlayer = () => {
    setCurrentPlayer((prev) => {
      if (prev === noOfPlayers) {
        return 1;
      } //last player than reset to first (1)
      else return prev + 1;
    });
  };
  const checkExplosion = (x, y, col , explosionNumber) => {
    const explode = (explodeNum , position)=>{
      if (board[x][y].count === explodeNum) {
        explosion(x, y, position , board , currentPlayer , checkExplosion , explosionNumber
  , grid
)
   return { ...col, count: 0, player: null };
      }
    }
    if (board[x][y].position === "corner") {
     return explode(explosionNumber.corner , 'corner')
    }
    if (board[x][y].position === "edge") {  
      return explode(explosionNumber.edge , 'edge')
    }
    if (board[x][y].position === "middle") {
      return explode(explosionNumber.middle , 'middle') 
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
                changePlayer();
                const isExplosion = checkExplosion(x, y, col ,{corner : 1, edge : 2, middle: 3});
                if (isExplosion) {
                  return isExplosion;
                }
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
    setCordinates({
      x: JSON.parse(e.target.dataset.row),
      y: JSON.parse(e.target.dataset.col),
    });
  };
  const playAgain = ()=>{
      setWinner(null)
      setCordinates({ x: null, y: null })
      setMoveCounts(0)
      setCurrentPlayer(1)
      setBorder(playerColor[1])
      setBoard(new Array(grid.rows).fill(null).map((row, rowIndex) =>
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
    ))
  }
  
  return (
    <div className="h-full">
      <div className="grid grid-cols-6 grid-rows-9  max-w-[500px]  mx-auto" 
      style={{
        height : `${JSON.stringify(window.innerHeight)}px`
      }}
      >
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <Cell
              handleClick={handleClick}
              rowIndex={rowIndex}
              colIndex={colIndex}
              setPosition={setPosition}
              border={border}
              col={col}
              playerColor={playerColor}
              />
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
