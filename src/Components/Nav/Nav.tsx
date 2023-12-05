import { NavLink } from 'react-router-dom'
import './Nav.css'


function Nav() {
  return (
    <>
    <div className='mainNavDiv'>
    <NavLink to="/" className="navLink">Home</NavLink>
    <NavLink to="/epk" className="navLink">EPK</NavLink>
    <NavLink to="/merch" className="navLink">Merch</NavLink>
    <a className="navLink" href="mailto:mgmt@auntvicki.rocks">Book Us</a>
    </div>  
    </>
  )
}

export default Nav