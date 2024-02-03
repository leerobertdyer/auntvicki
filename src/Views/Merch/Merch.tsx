import './Merch.css'
import Cart from '../../Components/Cart/Cart'

function Merch() {


    return (
        <>
            <div className='mainMerchDiv'>
            <div className='cartHeader'><Cart/></div>
                <div className='cheapTalk'>
                    <h3>CHEAP TALK</h3>
                    <p>Vinyl</p>
                    <p>Cd</p>

                </div>
                <div className='loveInTheDark'>
                    <h4>Love In The Dark</h4>
                    <p>Out Of Stock!</p>
                </div>
                <div className='selfTitled'>
                <h5>Aunt Vicki Self-Titled</h5>
                </div>
                <div className='shirts'>
                    T-Shirts!
                    <p>pink</p>
                    <p>green</p>
                    <p>gold</p>
                </div>
            </div>
        </>
    )
}

export default Merch