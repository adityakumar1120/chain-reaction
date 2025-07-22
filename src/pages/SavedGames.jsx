import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import { Link, NavLink } from "react-router";
import { IoMdHome } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import logo from '../assets/logo.webp'

export default function SavedGames() {
  console.log(logo);
  const { history, setHistory } = usePlayer();
  const [editValue, setEditValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)
  const handleDelete = (e , gameId)=>{
    e.preventDefault()
    setHistory(prev => prev.filter((elem) => elem.gameId !== gameId ))
    console.log('clicked');
  }
  const handleEdit = (e , gameId)=>{
    e.preventDefault()
    setIsEditing(true)   
    setEditValue(history.filter((e)=> e.gameId === gameId)[0].gameTitle)
  }
  const handleInputChange = (e)=>{
    e.preventDefault()
    setEditValue(e.target.value)
  }
  const handleEditSave =(e , gameId)=>{
    setIsEditing(false)
    setHistory(prev => prev.map((e)=>{
      if(e.gameId === gameId && editValue !== ''){
        return {...e , gameTitle : editValue}
      }else{
        return e
      }
    }))
  }
  useEffect(()=>{
    if(isEditing){
      inputRef.current.focus()
    }
  }, [isEditing])
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center p-2 px-4 text-2xl justify-between">
        <Link to={'/'}>< IoMdHome className='text-3xl'/> </Link>
        <h1 className=" font-semibold text-center ">Saved Games</h1>
        <div></div>
      </div>
      <div className="px-4 mt-8 flex flex-col gap-4">
        {history.length > 0 ? 
    history.map((elem)=>{
        return <NavLink to={'/gameboard'}
        state={elem}
        key={elem.gameId} className="flex items-center justify-between gap-4 bg-[#595d6121] cursor-pointer py-4 px-3 rounded-[8px] hover:bg-[#5154562f]">
          <div className="flex items-center gap-4">
            <div className="w-10 rounded overflow-hidden">
            <img
              className="w-full h-full"
              src={logo}
              alt=""
            />
          </div>
          {isEditing ? <div className="flex items-center justify-between gap-[4px]" onClick={e => e.preventDefault()}>
            <input ref={inputRef} className="outline-0 border-2 border-[#2c252574] rounded px-2 py-[1px] w-[84%]" type="text" value={editValue} onChange={handleInputChange}/>
            <FaCheck onClick={e => handleEditSave(e , elem.gameId)} className="hover:text-[#6418c7]"/>
          </div>:
          <h1 className="text-lg">{elem?.gameTitle}</h1>}
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[25px] ">
            <MdEdit className="hover:text-[#6418c7]" onClick={e => handleEdit(e , elem.gameId)}/>
            <MdDelete className="hover:text-[#6418c7]" onClick={e => handleDelete(e , elem.gameId)}/>
          </div>
      </NavLink>
    })  : <p className="text-center">No saved Games</p>   
    }
        </div>
    </div>
  );
}
