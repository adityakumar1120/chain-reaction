import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { usePlayer } from '../contexts/PlayerProvider';
import Winner from '../components/Winner';
import { AiFillAndroid } from 'react-icons/ai';

export default function Home() {
    const { noOfPlayers, setNoOFPlayers } = usePlayer();
    const navigate = useNavigate()
    const changeNoOfPlayers = (e)=>{
        setNoOFPlayers(JSON.parse(e.target.value))
    }
  return (
    <div className='flex flex-col items-center px-4'>
        <h1 className='text-2xl text-center pt-6 pb-7'>Chain Reaction</h1>
        <div>
            <select name="players" id="players" onChange={changeNoOfPlayers}>
                <option value="2">2 Player Game</option>
                <option value="3">3 Player Game</option>
                <option value="4">4 Player Game</option>
                <option value="5">5 Player Game</option>
                <option value="6">6 Player Game</option>
                <option value="7">7 Player Game</option>
                <option value="8">8 Player Game</option>
            </select>
        </div>
            <button className='bg-gray-300 py-1.5 px-4 font-semibold rounded w-fit my-4 cursor-pointer hover:bg-gray-400' onClick={e => navigate('/gameboard')}>Play</button>
            <p className='max-w-[38rem] px-4'>The objective of Chain Reaction is to take control of the board by eliminating your opponents orbs.</p>
            
            <button className='bg-gray-300 py-1.5  font-semibold rounded max-w-[1440px] my-4 w-full cursor-pointer hover:bg-gray-400' onClick={e => navigate('/savedgames')}>Saved Games</button>
            <a href='/app-debug.apk' download={'Aditya-chain-reaction.apk'} className='bg-green-500 flex items-center justify-center gap-3 py-1.5 text-center text-white font-semibold rounded max-w-[1440px] my-1 w-full cursor-pointer hover:bg-green-700'><span>Download App</span> <AiFillAndroid className='text-2xl'/></a>
    
    </div>
  )
}
