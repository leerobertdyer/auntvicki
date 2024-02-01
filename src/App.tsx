import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Views/Home/Home'
import Merch from './Views/Merch/Merch'
import EPK from './Views/EPK/EPK'
// import { listEvents } from './googleAPI'
// import { useEffect } from 'react'

function App() {
  
  return (
    <>
<Router>
  <div className='mainAppDiv'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/merch" element={<Merch/>}/>
    <Route path="/epk" element={<EPK/>}/>
  </Routes>
  </div>
</Router>
    </>
  )
}

export default App
