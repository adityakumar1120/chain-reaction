import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

export default function SavePopUp({handleClick  , history ,gameTitle, setGameTitle}) {
    const inputRef = useRef('')
    useEffect(() => {
      inputRef?.current?.focus()
    }, [])
    
  return (
    <div className='h-screen flex justify-center items-center w-full bg-[rgba(0,0,0,.8)] absolute animate-fadeIn inset-0 z-10'>
        <form className='bg-white p-4 max-w-[350px] w-full mx-2 rounded animate-fadeIn'>
            <h1 className='font-semibold text-xl '>Save Game</h1>
            <input
            onChange={e =>{
                setGameTitle(e.target.value)
            }}
            ref={inputRef}
            className='w-full mt-4 text-lg outline-0 border-2 border-[#586fc1cd] rounded px-2' type="text" value={gameTitle} />
            <div
            
            className='flex justify-end gap-2 mt-6'>
                {/* <Link to='/' className='text-sm text-blue-700 '>RETURN TO MENU</Link> */}
                <button
                onClick={handleClick}
                className='text-sm p-1 rounded text-blue-700 cursor-pointer hover:bg-blue-300 transition-all'>SAVE</button>
            </div>
        </form>
    </div>
  )
}
