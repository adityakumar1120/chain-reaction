import { createContext, useContext, useState } from "react";

const PlayerContext = createContext()
export  const PlayerProvider = ({children}) =>{
    const [noOfPlayers , setNoOFPlayers] = useState(2)
    const [history , setHistory] = useState(()=>{
        let localVal = JSON.parse(localStorage.getItem('history'))
        console.log(localVal);
        if(localVal){
            return localVal
        }
        return []
    })
    return <PlayerContext.Provider value={{noOfPlayers , setNoOFPlayers, history , setHistory}}>
        {children}
    </PlayerContext.Provider>
}

export const usePlayer  = () => useContext(PlayerContext)