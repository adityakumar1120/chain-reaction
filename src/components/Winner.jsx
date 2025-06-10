import React from 'react'
import { Link } from 'react-router'

export default function Winner({winner , playAgain}) {
  return (
    <div className='h-screen flex justify-center items-center w-full bg-[rgba(0,0,0,.8)] absolute animate-fadeIn inset-0 z-10'>
        <div className='bg-white p-4 min-w-[350px] rounded animate-fadeIn'>
            <h1 className='font-semibold text-xl '>Congratulations</h1>
            <p className='text-sm my-2'>Player {winner} Won!</p>
            <div className='flex justify-end gap-2 mt-6'>
                <Link to='/' className='text-sm text-blue-700 '>RETURN TO MENU</Link>
                <button onClick={playAgain} className='text-sm text-blue-700 cursor-pointer'>PLAY AGAIN</button>
            </div>
        </div>
    </div>
  )
}
