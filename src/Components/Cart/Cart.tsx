import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from "react";
import "./Cart.css"
import Paypal from "../../Paypal.tsx";


interface IcartItem {
    name: string,
    quantity: number,
    price: number,
    photo: string
}

interface CartProps {
    cartItems: IcartItem[],
    handleQuantity: (type: string, item: IcartItem) => void,
    quantity: number,
    handlePaymentSuccess: () => void
}


const Cart: React.FC<CartProps> = ({ cartItems, handleQuantity, quantity, handlePaymentSuccess }) => {
    const [showCart, setShowCart] = useState<boolean>(false)
    const [allCartItems, setAllCartItems] = useState<IcartItem[]>(cartItems.filter(i => i.quantity > 0))
    const [totalCost, setTotalCost] = useState<number>(allCartItems.reduce((total, item) => total + (item.price * item.quantity), 0))
    const [paypalAmount, setPaypalAmount] = useState<string>(totalCost.toFixed(2))

    useEffect(() => {
        setAllCartItems(cartItems.filter(i => i.quantity > 0))
        //eslint-disable-next-line
    }, [cartItems])

    useEffect(() => {
        setTotalCost(allCartItems.reduce((total, item) => total + (item.price * item.quantity), 0))
        // console.log(allCartItems)
    }, [allCartItems])

    useEffect(() => {
        console.log('total cost yall! : ', totalCost)
        console.log(paypalAmount)
        setPaypalAmount(totalCost.toFixed(2))
        //eslint-disable-next-line
    }, [cartItems, totalCost])

    return (
        <div className="cartMainDiv">
            {showCart
                ? <>
                    <div className="popup">
                        <div className="cartAndPaypal">
                            <div className="cart">
                                <p className="openCloseCart" onClick={() => setShowCart(false)}>
                                    Close Cart
                                    </p>
                                <GiShoppingCart size={50} onClick={() => setShowCart(!showCart)} />
                                <p className="itemNum">{quantity}</p>
                                <p className="itemNum cost">${totalCost}</p>
                            </div>
                            <Paypal key={paypalAmount} cartData={allCartItems} handlePaymentSuccess={handlePaymentSuccess} payPalValue={paypalAmount} />
                        </div>
                        <div className="openedCart">
                            {allCartItems.length === 0 &&
                                <h1 className="noItems">You have no items selected yet! :( </h1>}

                            { allCartItems.length > 0 && <>
                                <h1 className="yourSelections">Your Selections:</h1>
                            {allCartItems.map((product, key) => (
                                <div className="eachProductDiv" key={key}>
                                    <p className="productName">{product.name}</p>
                                    <p className="productQuantity">Quantity: {product.quantity}</p>
                                    <div className="cartBtnDiv">
                                        <button className="merchItemBtnCart blue" onClick={() => handleQuantity("-", product)}>-</button>
                                        <button className="merchItemBtnCart green" onClick={() => handleQuantity("+", product)}>+</button>
                                        <button className="merchItemBtnCart red" onClick={() => handleQuantity("REMOVE", product)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            </>}
                        </div>
                    </div>

                </>

                : <div className="cartAndPaypal">
                    <div className="cart">
                    <p className="openCloseCart" onClick={() => setShowCart(true)}>
                                    Open Cart
                                    </p>
                        <GiShoppingCart size={50} onClick={() => setShowCart(!showCart)} />
                        <p className="itemNum">{quantity}</p>
                        <p className="itemNum cost">${totalCost}</p>
                    </div>
                    {Number(paypalAmount) > 0 && <Paypal key={paypalAmount}  cartData={allCartItems} handlePaymentSuccess={handlePaymentSuccess} payPalValue={paypalAmount} />}
                </div>
            }
        </div>
    )
}

export default Cart