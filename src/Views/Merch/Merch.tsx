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
    {
        name: 'Test',
        quantity: 0,
        price: .01,
        photo: '/photos/cheetah.jpeg'
    },
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
    const [cart, setCart] = useState<IcartItem[]>(allMerchItems)
    const [quantity, setQuantity] = useState<number>(cart.reduce((total, item) => total + item.quantity, 0))
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
    const [width, height] = useWindowSize()


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

    return (
        <>
        <Nav />
            {paymentSuccess ?
                <div className='mainPaySuccessDiv' onClick={() => setPaymentSuccess(false)}>
 <Confetti width={width} height={height}/>
 <h1>Thank you!</h1>
 <h2>Your payment has been received.</h2>
 <h3>And your merch will be in the mail shortly!</h3>
 <h4 className='bigX hover' style={{color: 'red'}}>X</h4>
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