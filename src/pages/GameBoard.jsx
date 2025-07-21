import React, { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import sound from '../assets/sounds/click.wav'
import Winner from "../components/Winner";
import Cell from "../components/Cell";
import { explosion } from "../functions/Explosion";
import GameBoardNav from "../components/gameBoardNav.jsx";
import { useLocation } from "react-router";
export default function GameBoard() {
    const { history, setHistory } = usePlayer();
  const previousGame = useLocation().state
  const [gameId, setGameId] = useState(()=>{
    if(previousGame){
      return previousGame.gameId
    }
    return crypto.randomUUID()
  })
  console.log(gameId);
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
  const [board, setBoard] = useState(()=>{
    if(previousGame){
      return previousGame.board
    }else{
      return new Array(grid.rows).fill(null).map((row, rowIndex) =>
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
    }
  });
  const [currentPlayer, setCurrentPlayer] = useState(()=>{
    if(previousGame){
      return previousGame.currentPlayer
    }else{
      return 1
    }
  });
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(()=>{
    if(previousGame){
      return previousGame.currentPlayerIdx
    }else{
      return 0
    }
  });

  const [playingPlayers , setPlayingPlayers] = useState(()=>{
    if(previousGame){
      return previousGame.playingPlayers
    }else{
      return new Array(noOfPlayers).fill(0).map((_,i) => i+1)
    }
  })
  const [moveCounts, setMoveCounts] = useState(()=>{
    if(previousGame){
      return previousGame.moveCounts
    }else{
      return 0
    }
  })
  const [winner, setWinner] = useState(()=>{
    if(previousGame){
      return previousGame.winner
    }else{
      return null
    }
  })
  const [border, setBorder] = useState(playerColor[1]);
  const [cordinates, setCordinates] = useState(()=>{
    if(previousGame){
      return previousGame.cordinates
    }else{
      return { x: null, y: null }
    }
  });
  //undo redo states
  // const [history , setHistory] = useState([])
  // const [historyIdx , setHistoryIdx] = useState(0)
  // const [isUndoing , setIsUndoing] = useState(false)

  //undo redo states
  const changePlayer = () => {
    // if(isUndoing === false){
      setCurrentPlayer((prev) => {
      if (prev !== playingPlayers[0] && prev === noOfPlayers || currentPlayerIdx >= playingPlayers.length - 1) {
          setCurrentPlayerIdx(0)
          return playingPlayers[0];
      } 
      // else if(isUndoing === true){
      //   setCurrentPlayerIdx(prev => prev - 1)
      //   console.log(playingPlayers[currentPlayerIdx - 1] , 'mein chala');
      //   return playingPlayers[currentPlayerIdx - 1];

      // }
       //last player than reset to first (1)
      else {
        setCurrentPlayerIdx(prev => prev + 1)
        return playingPlayers[currentPlayerIdx + 1];
      }
    });
    // }
  };
  const removePlayer = ()=>{
  let isPlaying = {}
    const checking = [...Array(noOfPlayers)].map((_ , playerIdx)=>{
      return board.filter((row , i)=>{
        return row.filter((col , i)=>{
           if(moveCounts >= playingPlayers.length){
            if(col.player === playerIdx + 1 ){
            isPlaying[playerIdx+1] = [...(isPlaying[playerIdx+1] || []), true]
          }else{
             isPlaying[playerIdx+1] = [...(isPlaying[playerIdx+1] || []), false]
           }
           }
          return col.player === playerIdx + 1
        })
      })
    })

    let currenPlayingMembers = []
    Object.keys(isPlaying).map((player)=>{
      currenPlayingMembers.push(isPlaying[player].some((e ,i)=>{
        return e === true
      }) ? player : null
    )
    })
    if(moveCounts >= playingPlayers.length){
   
      setPlayingPlayers(currenPlayingMembers.filter(e => e!== null).map(e => JSON.parse(e)))
    }
  }
// console.log(playingPlayers);

  const checkExplosion = (x, y, col , explosionNumber) => {

    const explode = (explodeNum , position)=>{
      if (board[x][y].count === explodeNum) {
        explosion(x, y, position , board , currentPlayer , checkExplosion , explosionNumber
  , grid 
)
removePlayer()
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
  useEffect(()=>{
    // console.log(currenPlayingMembers);
    if(cordinates.x !== null && cordinates.y !== null){
      if (winner === null && board[cordinates.x][cordinates.y].player === null || board[cordinates.x][cordinates.y].player === currentPlayer) {
                  changePlayer();
      }
    }
    if(cordinates.x !== null && cordinates.y !== null && moveCounts > 1){
      setWinner(checkWin()) 
    }
  } , [board])




  const updateBoard = (x, y) => {
    setBoard((prev) => {
      return prev.map((row, rowIndex) => {
        if (rowIndex === x) {
          return row.map((col, colIndex) => {
            if (colIndex === y) {
              //check if the cell is empty or is should be same as the player turn
              if (winner === null && col.player === null || col.player === currentPlayer) {
                // changing to next player if the move is correct
                setMoveCounts(moveCounts + 1)
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
 let winningObj = {}
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
          return true
        })
      })
    })
    console.log();
   

    Object.keys(winningObj).some((player)=>{
      return winner = winningObj[player].every((e)=>{
       return e === true
      }) ? player : null
    })
    return winner
  }
  

  const handleClick = (e) => {
    setCordinates({
      x: JSON.parse(e.target.dataset.row),
      y: JSON.parse(e.target.dataset.col),
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

    // saving the board on each move
  // useEffect(()=>{
  //   setHistory(prev => [...prev , board])
  //   //this history  index will 1 behind as it does not have the updated history array
  //   //but thats all right cause we want it as index aur nhi toh mein history.length - 1 hi kane wala tha
  //   setHistoryIdx(history.length)
  // },[moveCounts])
  // useEffect(()=>{
  //   console.log(history);
  //   console.log(historyIdx);
  // },[history])
  // useEffect(()=>{
  //   if(cordinates.x !== null && cordinates.y !== null ){
  //     setBoard(history[historyIdx])
  //   }
  // },[historyIdx])

  const handleUndo = ()=>{
    // if(historyIdx > 0 ){
    //   setHistoryIdx(prev => prev - 1)
    //   setCurrentPlayer(prev =>{
    //           return currentPlayerIdx === 0 ? playingPlayers[playingPlayers.length-1] : playingPlayers[currentPlayerIdx - 1]
    //         })
    //         setCurrentPlayerIdx(prev => prev > 0 ? prev - 1 : playingPlayers.length-1)
            
    //   setIsUndoing(true)
      
    // }
  }
  const handleRedo = ()=>{
    // if(history.length-1 > historyIdx  ){
    //   setHistoryIdx(prev => prev + 1)
    //   setCurrentPlayer(prev =>{
    //     console.log(currentPlayerIdx);
    //           return currentPlayerIdx >= playingPlayers.length - 1 ? playingPlayers[0] : playingPlayers[currentPlayerIdx + 1]
    //         })
    //         setCurrentPlayerIdx(prev => prev >= playingPlayers.length ? 0 : prev + 1 )
            
    //   setIsUndoing(true)
      
    // }
  }
  const playAgain = ()=>{
      setWinner(null)
      setCordinates({ x: null, y: null })
      setMoveCounts(0)
      setCurrentPlayer(1)
      setBorder(playerColor[1])
      setCurrentPlayerIdx(0)
      setPlayingPlayers(new Array(noOfPlayers).fill(0).map((_,i) => i+1))
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
  useEffect(()=>{
    console.log(winner);
    if(winner){
      setHistory(prev => {
        return prev.filter((elem)=>{
          return elem.gameId !== gameId
        })
      })
    }
  }, winner)
  return (
    <div className="h-full">
      <GameBoardNav handleRedo={handleRedo} handleUndo={handleUndo} gameId={gameId}
      board={board} currentPlayer = {currentPlayer} currentPlayerIdx={currentPlayerIdx}
      playingPlayers={playingPlayers} cordinates={cordinates} moveCounts={moveCounts} winner={winner}
      />
      <div className="grid grid-cols-6 grid-rows-9  w-full  mx-auto" 
      style={{
        height : `${JSON.stringify(window.innerHeight - 45)}px`
      }}
      >
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <Cell
              key={crypto.randomUUID()}
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
