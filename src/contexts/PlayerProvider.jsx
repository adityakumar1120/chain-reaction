import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext()
export  const PlayerProvider = ({children}) =>{
    const [noOfPlayers , setNoOFPlayers] = useState(2)
    const [history , setHistory] = useState(()=>{
        let localVal = JSON.parse(localStorage.getItem('history'))
        if(localVal){
            return localVal
        }
        return []
    })
     useEffect(() => {
    console.log(history);
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);
    return <PlayerContext.Provider value={{noOfPlayers , setNoOFPlayers, history , setHistory}}>
        {children}
    </PlayerContext.Provider>
}

export const usePlayer  = () => useContext(PlayerContext)