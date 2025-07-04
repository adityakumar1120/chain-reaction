import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import GameBoard from './pages/GameBoard'
import {PlayerProvider} from './contexts/PlayerProvider.jsx';
function App() {

  return (
   <PlayerProvider>
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/gameboard' element={<GameBoard/>}></Route>
   </Routes>
   </BrowserRouter>
   </PlayerProvider>
  )
}

export default App
