import './Merch.css'
import Cart from '../../Components/Cart/Cart'
import { useEffect, useState } from 'react'
import MerchItem from '../../Components/MerchItem/MerchItem'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'
import Nav from '../../Components/Nav/Nav'


interface IcartItem {
    name: string,
    quantity: number,
    price: number,
    photo: string
}

const allMerchItems: IcartItem[] = [
    // {
    //     name: 'Test',
    //     quantity: 0,
    //     price: .11,
    //     photo: '/photos/cheetah.jpeg'
    // },
    {
        name: "Cheap Talk Vinyl",
        quantity: 0,
        price: 25,
        photo: '/photos/albumArt3.jpg'
    },
    {
        name: "Cheap Talk CD",
        quantity: 0,
        price: 15,
        photo: '/photos/albumArt3cd.jpg'
    },
    {
        name: "Love In The Dark CD",
        quantity: 0,
        price: 15,
        photo: '/photos/albumArt2.jpg'
    },
    // {
    //     name: "Self-Titled CD",
    //     quantity: 0,
    //     price: 15,
    //     photo: '/photos/albumArt1.jpg'
    // },
    {
        name: "Green Eyes Shirt XL",
        quantity: 0,
        price: 20,
        photo: '/photos/greenShirt.png'
    },
    {
        name: "Gold Eyes Shirt XL",
        quantity: 0,
        price: 20,
        photo: '/photos/goldShirt.png'
    },
    {
        name: "Pink Eyes Shirt XL",
        quantity: 0,
        price: 20,
        photo: '/photos/pinkShirt.png'
    },
    {
        name: "Green Eyes Shirt L",
        quantity: 0,
        price: 20,
        photo: '/photos/greenShirt.png'
    },
    {
        name: "Gold Eyes Shirt L",
        quantity: 0,
        price: 20,
        photo: '/photos/goldShirt.png'
    },
    {
        name: "Pink Eyes Shirt L",
        quantity: 0,
        price: 20,
        photo: '/photos/pinkShirt.png'
    },
    {
        name: "Green Eyes Shirt M",
        quantity: 0,
        price: 20,
        photo: '/photos/greenShirt.png'
    },
    {
        name: "Gold Eyes Shirt M",
        quantity: 0,
        price: 20,
        photo: '/photos/goldShirt.png'
    },
    {
        name: "Pink Eyes Shirt M",
        quantity: 0,
        price: 20,
        photo: '/photos/pinkShirt.png'
    }
]

function Merch() {
    const [cart, setCart] = useState<IcartItem[]>(allMerchItems);
    const [quantity, setQuantity] = useState<number>(cart.reduce((total, item) => total + item.quantity, 0));
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [width, height] = useWindowSize();
    const [haveContactInfo, setHaveContactInfo] = useState<boolean>(false);
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [street, setStreet] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [zip, setZip] = useState<string>('');
    const [notes, setNotes] = useState<string>('');


    useEffect(() => {
        setQuantity(cart.reduce((total, item) => total + item.quantity, 0))
    }, [cart])

    const removeItemFromCart = (item: IcartItem) => {
        const newCart = [...cart]
        const index = newCart.findIndex((i) => i.name === item.name)
        newCart[index].quantity = 0
        setCart(newCart)
    }

    const handleQuantity = (type: string, item: IcartItem) => {
        const newCart = [...cart]
        const index = newCart.findIndex((i) => i.name === item.name)

        if (index !== -1) {

            if (type === "+") {
                newCart[index].quantity += 1
                setQuantity(quantity + 1)
                setCart(newCart)

            } else if (type === "-") {
                newCart[index].quantity -= 1
                if (newCart[index].quantity < 1) {
                    removeItemFromCart(item)
                    setQuantity(quantity - 1)
                    return
                }
                setQuantity(quantity - 1)
                setCart(newCart)
                console.log('minus')
            } else {
                removeItemFromCart(item)
            }
        }

        else {
            if (type === "+") {
                newCart.push({
                    name: item.name,
                    quantity: 1,
                    price: item.price,
                    photo: item.photo
                })
                setQuantity(quantity + 1)
                setCart(newCart)
            }
        }
    }

    const handlePaymentSuccess = () => {
        const newCart = [...cart]
        newCart.forEach(c => c.quantity = 0)
        setCart(newCart)
        setPaymentSuccess(true);
    };

    const handleShippingSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        const resp = await fetch('https://wabs-server.onrender.com/portfolio/contact', {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
                senderEmail: 'leerobertdyer@gmail.com',
                message: `New AV SALE!, DETAILS: {
                    name: ${name},
                    email: ${email},
                    address: ${street} ${city} ${zip},
                    notes: ${notes}
                }`
            })
        });
        if (resp.ok) {
            console.log('message sent');
            setHaveContactInfo(true)
        }


    }

    return (
        <>
            <Nav />

            {paymentSuccess
                ? !haveContactInfo

                    ? <div className='mainShippingDiv'>
                        <p className='oneLastStep'>🎉 One Last Step!</p>
                        <form className='shippingForm'>
                            <h1 className='contactDetailsTitle'>Shipping Information</h1>

                            <label className='shippingLabel' htmlFor="name">Name
                                <input name="name" className='shippingInput' type="text" placeholder='Uncle Viktor'
                                onChange={(e) => setName(e.target.value)}></input>
                            </label>
                            <label className='shippingLabel' htmlFor="email">Email
                                <input className='shippingInput' type="email" name='email' placeholder='MGMT@auntvicki.rocks' required
                                onChange={(e) => setEmail(e.target.value)}></input>
                            </label>
                            <label className='shippingLabel' htmlFor="street">Street Address*
                                <input className='shippingInput' type="add" name='street' placeholder='69 chicken Alley' required
                                onChange={(e) => setStreet(e.target.value)}></input>
                            </label>
                            <label className='shippingLabel' htmlFor="city">City*
                                <input className='shippingInput' type="add" name='city' placeholder='Asheville' required
                                onChange={(e) => setCity(e.target.value)}></input>
                            </label>
                            <label className='shippingLabel' htmlFor="zip">Zip Code*
                                <input className='shippingInput' type="add" name='zip' placeholder='28805' required
                                onChange={(e) => setZip(e.target.value)}></input>
                            </label>
                                <textarea className='shippingTextArea' name='notes' placeholder='Any notes for dear old aunt V?'
                                onChange={(e) => setNotes(e.target.value)}></textarea>
                                <button className="shippingSubmitBtn"onClick={(e) => handleShippingSubmit(e)}>Submit</button>
                        </form>
                    </div>

                    : <div className='mainPaySuccessDiv' onClick={() => setPaymentSuccess(false)}>
                        <Confetti width={width} height={height} />
                        <h1>Thank you!</h1>
                        <h2>Your payment has been received.</h2>
                        <h3>And your merch will be in the mail shortly!</h3>
                        <h4 className='bigX hover' style={{ color: 'red' }}>X</h4>
                    </div>
                : <div className='mainMerchDiv'>
                    <div className='cartHeader'>
                        <div className='hover'>
                            <Cart cartItems={cart} handleQuantity={handleQuantity} quantity={quantity} handlePaymentSuccess={handlePaymentSuccess} />
                        </div>
                    </div>
                    <div className="allMerchItemsDiv">
                        <h1><img src='/photos/kiss.png' alt='' className='kiss'></img> Aunt Vicki Merch <img src='/photos/kiss.png' alt='' className='kiss'></img></h1>
                        {cart.map((item, key) => (
                            <MerchItem product={item} key={key} handleQuantity={handleQuantity} />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default Merch