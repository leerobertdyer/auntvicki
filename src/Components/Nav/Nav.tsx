import { NavLink } from 'react-router-dom'
import { MdOutlineEmail } from "react-icons/md";

import './Nav.css'


function Nav() {
  return (
    <>
    <div className='mainNavDiv'>
    <NavLink to="/" className="navLink">Home</NavLink>
    <NavLink to="/epk" className="navLink">EPK</NavLink>
    <NavLink to="/merch" className="navLink">Merch</NavLink>
    <a className="navLink" href="mailto:mgmt@auntvicki.rocks"><MdOutlineEmail />Book</a>
    </div>  
    </>
  )
}

export default Nav