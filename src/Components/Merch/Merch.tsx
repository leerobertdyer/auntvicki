import './Merch.css'
import Nav from '../Nav/Nav'

function Merch() {
    return (
        <>
            <Nav />
            <div className='mainMerchDiv'>
                <div className='cheapTalk'>
                    <h3>CHEAP TALK</h3>
                </div>
                <div className='loveInTheDark'>
                    <h4>Love In The Dark</h4>
                </div>
                <div className='selfTitled'>
                <h5>Aunt Vicki Self-Titled</h5>
                </div>
            </div>
        </>
    )
}

export default Merch