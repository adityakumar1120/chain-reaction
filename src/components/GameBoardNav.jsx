import React from 'react'
import { GrRedo } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { LuUndo2 } from 'react-icons/lu'

export default function GameBoardNav({handleRedo , handleUndo}) {
  return (
    <nav className="bg-black border px-4 py-2 flex justify-between items-center">
  {/* <h1 className="text-green-500 font-bold text-xl tracking-wide">Chain Reaction</h1> */}
  <button className="text-white text-xl bg-[#484141] rounded-full p-1 cursor-pointer transition hover:bg-[#373333]">
      <IoMdAdd />
    </button>
  <div className="flex gap-6">
    <button className="text-[rgba(71,209,255,0.9)] hover:text-[rgba(90,159,183,0.9)] transition text-xl cursor-pointer active:scale-[0.8]" onClick={handleUndo}><LuUndo2 className='pointer-events-none' /></button>
    <button className="text-[rgba(71,209,255,0.9)] hover:text-[rgba(90,159,183,0.9)] transition text-xl cursor-pointer active:scale-[0.8]" onClick={handleRedo}><GrRedo  className='pointer-events-none'/></button>
  
  </div>
</nav>
  )
}
