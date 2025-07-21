import React, { useState } from "react";
import { GrRedo } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { LuUndo2 } from "react-icons/lu";
import { usePlayer } from "../contexts/PlayerProvider";
import { useEffect } from "react";
import { HiSignal } from "react-icons/hi2";
import SavePopUp from "./SavePopUp";

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

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);
  return (
    <nav className="bg-black border px-4 py-2 flex justify-between items-center">
      {/* <h1 className="text-green-500 font-bold text-xl tracking-wide">Chain Reaction</h1> */}
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
      <div className="flex gap-6">
        <button
          className="text-[rgba(71,209,255,0.9)] hover:text-[rgba(90,159,183,0.9)] transition text-xl cursor-pointer active:scale-[0.8]"
          onClick={handleUndo}
        >
          <LuUndo2 className="pointer-events-none" />
        </button>
        <button
          className="text-[rgba(71,209,255,0.9)] hover:text-[rgba(90,159,183,0.9)] transition text-xl cursor-pointer active:scale-[0.8]"
          onClick={handleRedo}
        >
          <GrRedo className="pointer-events-none" />
        </button>
      </div>
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
