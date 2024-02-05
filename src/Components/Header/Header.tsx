import Nav from '../Nav/Nav'
import './Header.css'
import { SocialIcon } from 'react-social-icons'
import { FaCameraRetro } from "react-icons/fa";

const facebookIcon = <SocialIcon className="icon" url="https://www.facebook.com/AuntVickiBand" target="_blank"/>
const instagramIcon = <SocialIcon className="icon" url="https://www.instagram.com/_aunt_vicki" target="_blank"/>

function Header() {


    return (
        <div className='headerBackground'>
            <div className="mainHeaderDiv">
                <Nav />
                <div className='iconAndQuoteDiv'>
                    {facebookIcon}
                    <div>
                    <h2 className='underQuote'>Aunt<span className='spacingSpan'> </span>Vicki</h2>
                    <h1 className='coolAunt'>...If your cool aunt was a band</h1>
                    </div>
                    {instagramIcon}
                </div>
                <div className='headerBtnDiv'>
                    <a href="#merch">
                        {/* <button className='headerBtn'><span className='cheetahText'>Aunt Vicki's Shop</span></button> */}
                    </a>
                    <a href="https://spotify.auntvicki.rocks/spotify/auntvicki"
                        target="_blank">
                        <button className='headerBtn'><span className='cheetahText'>Follow Us On Spotify!</span></button></a>
                </div>
        <p className='photoCredit' style={{position: 'absolute'}}><FaCameraRetro/> by <a href="https://www.geddimonroe.com/" target="_blank">Geddi Monroe</a></p>
            </div>
        </div>
    )
}

export default Header