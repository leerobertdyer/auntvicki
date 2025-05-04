import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Views/Home/Home'
import Merch from './Views/Merch/Merch'
import EPK from './Views/EPK/EPK'
import DUOEPK from './Views/Duo/Components/DUOEPK'
import Listen from './Views/Duo/Components/Listen'
import Shows from './Views/Duo/Shows/Shows'

function App() {
  
  return (
    <>
<Router>
  <div className='mainAppDiv'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/merch" element={<Merch/>}/>
    <Route path="/epk" element={<EPK/>}/>
    <Route path="/duo" element={<DUOEPK/>}/>
    <Route path="/duo-music" element={<Listen/>}/>
    <Route path="/duo-shows" element={<Shows/>}/>
  </Routes>
  </div>
</Router>
    </>
  )
}

export default App
