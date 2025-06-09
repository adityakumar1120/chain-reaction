import { createContext, useContext, useState } from "react";

const PlayerContext = createContext()
export  const PlayerProvider = ({children}) =>{
    const [noOfPlayers , setNoOFPlayers] = useState(2)
    return <PlayerContext.Provider value={{noOfPlayers , setNoOFPlayers}}>
        {children}
    </PlayerContext.Provider>
}

export const usePlayer  = () => useContext(PlayerContext)