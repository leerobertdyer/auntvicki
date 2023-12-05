import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import Merch from './Components/Merch/Merch'

function App() {
  
  return (
    <>
<Router>
  <div className='mainAppDiv'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/merch" element={<Merch/>}/>
  </Routes>
<Footer/>
  </div>
</Router>
    </>
  )
}

export default App
