import React from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import { Link, NavLink } from "react-router";
import { IoMdHome } from "react-icons/io";

export default function SavedGames() {
  const { history, setHistory } = usePlayer();
  return (
    <div>
      <div className="flex items-center p-2 text-2xl justify-between">
        <Link to={'/'}><IoMdHome/> </Link>
        <h1 className=" font-semibold text-center ">Saved Games</h1>
        <div></div>
      </div>
      <div className="px-4 mt-8 flex flex-col gap-4">
        {history.length > 0 ? 
    history.map((elem)=>{
        return <NavLink to={'/gameboard'}
        state={elem}
        key={elem.gameId} className="flex items-center gap-6 bg-[#595d6121] cursor-pointer py-4 px-4 rounded-[8px] hover:bg-[#5154562f]">
          <div className="w-12 rounded overflow-hidden">
            <img
              className="w-full"
              src="https://play-lh.googleusercontent.com/xUefJ0Wrh0pyUuRnCAkRggnJbCGcMoKzARwxtGN1rZEK8cUvwHCLh7DPZbUv059aoA=w480-h960-rw"
              alt=""
            />
          </div>
          <h1>{elem?.gameTitle}</h1>
      </NavLink>
    })  : <p className="text-center">No saved Games</p>   
    }
        </div>
    </div>
  );
}
