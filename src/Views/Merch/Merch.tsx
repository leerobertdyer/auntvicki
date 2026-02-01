import "./Merch.css";
import Cart, { ShippingInfo } from "../../Components/Cart/Cart";
import { useEffect, useState } from "react";
import MerchItem from "../../Components/MerchItem/MerchItem";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import Nav from "../../Components/Nav/Nav";
import { SERVER_URL } from "../../constants";
import { allMerchItems } from "./items";
import { IcartItem } from "../../types";

// Helper to generate unique key for cart items (handles variants)
const getCartItemKey = (item: IcartItem): string => {
  let key = item.name;
  if (item.selectedSize) key += `-${item.selectedSize}`;
  if (item.selectedColor) key += `-${item.selectedColor}`;
  return key;
};

function Merch() {
  // Cart holds items that have been added (with quantity > 0)
  const [cartItems, setCartItems] = useState<IcartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [width, height] = useWindowSize();
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    setQuantity(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const addToCart = (item: IcartItem) => {
    const itemKey = getCartItemKey(item);
    const existingIndex = cartItems.findIndex(
      (cartItem) => getCartItemKey(cartItem) === itemKey
    );

    if (existingIndex !== -1) {
      // Item already in cart, increment quantity
      const newCart = [...cartItems];
      newCart[existingIndex].quantity += 1;
      setCartItems(newCart);
    } else {
      // New item, add to cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (item: IcartItem) => {
    const itemKey = getCartItemKey(item);
    setCartItems(cartItems.filter((cartItem) => getCartItemKey(cartItem) !== itemKey));
  };

  const handleQuantity = (type: string, item: IcartItem) => {
    const itemKey = getCartItemKey(item);
    const index = cartItems.findIndex(
      (cartItem) => getCartItemKey(cartItem) === itemKey
    );

    if (index === -1) return;

    const newCart = [...cartItems];

    if (type === "+") {
      newCart[index].quantity += 1;
      setCartItems(newCart);
    } else if (type === "-") {
      newCart[index].quantity -= 1;
      if (newCart[index].quantity < 1) {
        removeItemFromCart(item);
        return;
      }
      setCartItems(newCart);
    } else {
      removeItemFromCart(item);
    }
  };

  const handlePaymentSuccess = async (shippingInfo: ShippingInfo) => {
    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Format shipping address
    const shippingAddress = `${shippingInfo.name}\n${shippingInfo.street}\n${shippingInfo.city}, ${shippingInfo.zip}`;

    // Format order summary for shop notification
    const orderDetails = cartItems
      .map((item) => {
        let itemDesc = item.name;
        if (item.selectedSize || item.selectedColor) {
          const variants = [item.selectedSize, item.selectedColor]
            .filter(Boolean)
            .join(", ");
          itemDesc += ` (${variants})`;
        }
        return `${itemDesc} x${item.quantity} ($${(
          item.price * item.quantity
        ).toFixed(2)})`;
      })
      .join("\n");

    const orderSummary = `🎉 NEW AV SALE! 🎉\n\nORDER DETAILS:\n${orderDetails}\n\nTOTAL: $${total.toFixed(
      2
    )}\n\nSHIP TO:\n${shippingAddress}\nEmail: ${shippingInfo.email}\n\nNotes: ${shippingInfo.notes || "None"}`;

    // Send order confirmation (notifies shop + sends receipt to customer)
    try {
      await fetch(`${SERVER_URL}/av/order-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: shippingInfo.name,
          customerEmail: shippingInfo.email,
          items: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          })),
          total,
          shippingAddress,
          orderSummary,
        }),
      });
      console.log("Order confirmation sent");
    } catch (error) {
      console.error("Failed to send order confirmation:", error);
    }

    // Clear the cart
    setCartItems([]);
    setPaymentSuccess(true);
  };

  return (
    <>
      {!cartOpen && <Nav />}

      {paymentSuccess ? (
        <div
          className="mainPaySuccessDiv"
          onClick={() => setPaymentSuccess(false)}
        >
          <Confetti width={width} height={height} />
          <h1>Thank you!</h1>
          <h2>Your payment has been received.</h2>
          <h3>And your merch will be in the mail shortly!</h3>
          <h4 className="bigX hover" style={{ color: "red" }}>
            X
          </h4>
        </div>
      ) : (
        <div className="mainMerchDiv">
          <div className="cartContainer">
            <Cart
              cartItems={cartItems}
              handleQuantity={handleQuantity}
              quantity={quantity}
              handlePaymentSuccess={handlePaymentSuccess}
              onCartOpenChange={setCartOpen}
            />
          </div>
          <div className={cartOpen ? "cartIsOpen" : "allMerchItemsDiv"}>
            <h1>
              <img src="/photos/kiss.png" alt="" className="kiss" /> Aunt Vicki
              Merch <img src="/photos/kiss.png" alt="" className="kiss" />
            </h1>
            {allMerchItems.map((item, key) => (
              <MerchItem product={item} key={key} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Merch;
