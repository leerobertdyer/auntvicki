import { useState } from 'react'
import Nav from '../Nav/Nav'
import './Header.css'
import { SocialIcon } from 'react-social-icons'

const facebookIcon = <SocialIcon className="icon" url="https://www.facebook.com/AuntVickiBand" target="_blank"/>
const instagramIcon = <SocialIcon className="icon" url="https://www.instagram.com/_aunt_vicki" target="_blank"/>

function Header() {
    const [quote, setQuote] = useState(`They're saying I can't, and I'm saying I will!`)
    const [quoteIdx, setQuoteIdx] = useState(0)

    const quotes: string[] = [
        "I can be evil, but I try not to be...",
        "I'm not worthy... but it's pretty cool",
        "We had one free day so what did we do? we went to the pool and got fucking trashed!",
        "They're saying I can't, and I'm saying I will!"]

    const handleSetQuote = () => {
        console.log(quoteIdx);
        setQuote(quotes[quoteIdx]);
        const nextQuoteIdx: number = quoteIdx + 1;
        setQuoteIdx(nextQuoteIdx)
        if (quoteIdx >= quotes.length - 1) {
            setQuoteIdx(0);
        }
    }

    return (
        <>
            <div className="mainHeaderDiv">
                <Nav />
                <div className='iconAndQuoteDiv'>
                    {facebookIcon}
                    <h1
                        className='quote'
                        onClick={handleSetQuote}>
                        "{quote}"
                    </h1>
                    {instagramIcon}
                </div>
                    <h2 className='underQuote'>-<span className='underQuoteLeft'>Aunt</span> <span className='underQuoteRight'>Vicki</span></h2>
                <div className='headerBtnDiv'>
                    <a href="#merch">
                        <button className='shopBtn'>Aunt Vicki's Shop</button>
                    </a>
                    <a href="https://listen.auntvicki.rocks/spotify/auntvicki"
                        target="_blank">
                        <button className='spotifyBtn'>Follow Us On Spotify!</button></a>
                </div>
            </div>

        </>
    )
}

export default Header