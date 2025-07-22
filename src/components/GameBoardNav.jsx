import React, { useState } from "react";
import { GrRedo } from "react-icons/gr";
import { IoMdAdd, IoMdHome } from "react-icons/io";
import { LuUndo2 } from "react-icons/lu";
import { usePlayer } from "../contexts/PlayerProvider";
import { useEffect } from "react";
import { HiSignal } from "react-icons/hi2";
import SavePopUp from "./SavePopUp";
import { Link } from "react-router";

export default function GameBoardNav({
  handleRedo,
  handleUndo,
  gameId,
  board,
  currentPlayer,
  currentPlayerIdx,
  playingPlayers,
  cordinates,
  moveCounts,
  winner,
}) {
  const { history, setHistory } = usePlayer();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const isPresent = history.filter((elem) => {
    if (elem.gameId === gameId) {
      return elem;
    }
  });

  const handleClick = () => {
    setOpenPopUp(false);
    setHistory((prev) => {
      console.log(isPresent);
      return isPresent.length
        ? prev.map((elem) => {
            if (elem.gameId == gameId) {
              return {
                gameTitle,
                gameId,
                board,
                currentPlayer,
                currentPlayerIdx,
                playingPlayers,
                cordinates,
                moveCounts,
                winner,
              };
            } else {
              return elem;
            }
          })
        : [
            ...prev,
            {
              gameTitle,
              gameId,
              board,
              currentPlayer,
              currentPlayerIdx,
              playingPlayers,
              cordinates,
              moveCounts,
              winner,
            },
          ];
    });
  };

 
  return (
    <nav className="bg-black border px-4 py-2 flex justify-between items-center">
      {/* <h1 className="text-green-500 font-bold text-xl tracking-wide">Chain Reaction</h1> */}
      <Link to={'/'}>< IoMdHome className='text-white text-3xl hover:bg-[#484141]  rounded-full p-[2px] cursor-pointer transition '/> </Link>
      <button
        onClick={() => {
          setOpenPopUp(true)
          isPresent.length ? setGameTitle(`${isPresent[0].gameTitle}`) :
  setGameTitle(`untitled${history.length + 1}`)

        }}
        className="text-white text-xl bg-[#484141] rounded-full p-1 cursor-pointer transition hover:bg-[#373333]"
      >
        <IoMdAdd />
      </button>
      {openPopUp && (
        <SavePopUp
          handleClick={handleClick}
          setOpenPopUp={setOpenPopUp}
          history={history}
          setGameTitle={setGameTitle}
          gameTitle={gameTitle}
        />
      )}
    </nav>
  );
}
