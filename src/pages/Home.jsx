import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { usePlayer } from '../contexts/PlayerProvider';
import Winner from '../components/Winner';

export default function Home() {
    const { noOfPlayers, setNoOFPlayers } = usePlayer();
    const navigate = useNavigate()
    const changeNoOfPlayers = (e)=>{
        setNoOFPlayers(JSON.parse(e.target.value))
    }
  return (
    <div className='flex flex-col items-center'>
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
            <p className='max-w-[38rem]'>The objective of Chain Reaction is to take control of the board by eliminating your opponents orbs.</p>
            
    </div>
  )
}
