import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from "react";
import "./Cart.css";
import Paypal from "../../Paypal.tsx";
import { IcartItem } from "../../types";

// Helper to format product display name with variants
const getProductDisplayName = (product: IcartItem): string => {
  let name = product.name;
  if (product.selectedSize || product.selectedColor) {
    const variants = [product.selectedSize, product.selectedColor]
      .filter(Boolean)
      .join(", ");
    name += ` (${variants})`;
  }
  return name;
};

export interface ShippingInfo {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  notes: string;
}

interface CartProps {
  cartItems: IcartItem[];
  handleQuantity: (type: string, item: IcartItem) => void;
  quantity: number;
  handlePaymentSuccess: (shippingInfo: ShippingInfo) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  handleQuantity,
  quantity,
  handlePaymentSuccess,
  cartOpen,
  setCartOpen
}) => {

  const toggleCart = (open: boolean) => {
    setCartOpen(open);
  };
  const [allCartItems, setAllCartItems] = useState<IcartItem[]>(
    cartItems.filter((i) => i.quantity > 0)
  );
  const [totalCost, setTotalCost] = useState<number>(
    allCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [paypalAmount, setPaypalAmount] = useState<string>(
    totalCost.toFixed(2)
  );

  // Checkout flow states
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    notes: "",
  });

  const isShippingValid =
    shippingInfo.name &&
    shippingInfo.email &&
    shippingInfo.street &&
    shippingInfo.city &&
    shippingInfo.zip;

  useEffect(() => {
    setAllCartItems(cartItems.filter((i) => i.quantity > 0));
  }, [cartItems]);

  useEffect(() => {
    setTotalCost(
      allCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );
  }, [allCartItems]);

  useEffect(() => {
    setPaypalAmount(totalCost.toFixed(2));
  }, [cartItems, totalCost]);

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const onPaymentSuccess = () => {
    handlePaymentSuccess(shippingInfo);
    // Reset checkout state
    setShowCheckoutForm(false);
    setShippingInfo({
      name: "",
      email: "",
      street: "",
      city: "",
      zip: "",
      notes: "",
    });
    toggleCart(false);
  };

  const closeCart = () => {
    toggleCart(false);
    setShowCheckoutForm(false);
  };

  return (
    <div className="cartMainDiv">
      {cartOpen ? (
        <>
          {/* Overlay to close cart when clicking outside */}
          <div className="cartOverlay" onClick={closeCart} />
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="cartHeader">
              <button className="closeCartBtn" onClick={closeCart}>
                ✕ Close
              </button>
              <div className="cartSummary">
                <GiShoppingCart size={40} />
                <span className="itemCount">{quantity} items</span>
                <span className="totalCost">${totalCost}</span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="openedCart">
              {allCartItems.length === 0 && (
                <h1 className="noItems">You have no items selected yet! :( </h1>
              )}

              {allCartItems.length > 0 && !showCheckoutForm && (
                <>
                  <h1 className="yourSelections">Your Selections:</h1>
                  {allCartItems.map((product, key) => (
                    <div className="eachProductDiv" key={key}>
                      <p className="productName">{getProductDisplayName(product)}</p>
                      <p className="productPrice">${product.price} each</p>
                      <p className="productQuantity">
                        Quantity: {product.quantity}
                      </p>
                      <div className="cartBtnDiv">
                        <button
                          className="merchItemBtnCart blue"
                          onClick={() => handleQuantity("-", product)}
                        >
                          -
                        </button>
                        <button
                          className="merchItemBtnCart green"
                          onClick={() => handleQuantity("+", product)}
                        >
                          +
                        </button>
                        <button
                          className="merchItemBtnCart red"
                          onClick={() => handleQuantity("REMOVE", product)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="checkoutBtn"
                    onClick={() => setShowCheckoutForm(true)}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}

              {/* Shipping Form - shown before PayPal */}
              {allCartItems.length > 0 && showCheckoutForm && (
                <>
                  <div className="checkoutFormContainer">
                    <button
                      className="backToCartBtn"
                      onClick={() => setShowCheckoutForm(false)}
                    >
                      ← Back to Cart
                    </button>
                    <h2 className="checkoutTitle">Shipping Information</h2>
                    <p className="checkoutSubtitle">
                      Please fill out your shipping details before payment
                    </p>

                    <div className="checkoutForm">
                      <label className="checkoutLabel">
                        Name*
                        <input
                          className="checkoutInput"
                          type="text"
                          placeholder="Uncle Viktor"
                          value={shippingInfo.name}
                          onChange={(e) =>
                            handleShippingChange("name", e.target.value)
                          }
                        />
                      </label>
                      <label className="checkoutLabel">
                        Email*
                        <input
                          className="checkoutInput"
                          type="email"
                          placeholder="mgmt@auntvicki.rocks"
                          value={shippingInfo.email}
                          onChange={(e) =>
                            handleShippingChange("email", e.target.value)
                          }
                        />
                      </label>
                      <label className="checkoutLabel">
                        Street Address*
                        <input
                          className="checkoutInput"
                          type="text"
                          placeholder="69 Chicken Alley"
                          value={shippingInfo.street}
                          onChange={(e) =>
                            handleShippingChange("street", e.target.value)
                          }
                        />
                      </label>
                      <label className="checkoutLabel">
                        City*
                        <input
                          className="checkoutInput"
                          type="text"
                          placeholder="Asheville"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            handleShippingChange("city", e.target.value)
                          }
                        />
                      </label>
                      <label className="checkoutLabel">
                        Zip Code*
                        <input
                          className="checkoutInput"
                          type="text"
                          placeholder="28805"
                          value={shippingInfo.zip}
                          onChange={(e) =>
                            handleShippingChange("zip", e.target.value)
                          }
                        />
                      </label>
                      <label className="checkoutLabel">
                        Notes (optional)
                        <textarea
                          className="checkoutTextarea"
                          placeholder="Any notes for dear old Aunt V?"
                          value={shippingInfo.notes}
                          onChange={(e) =>
                            handleShippingChange("notes", e.target.value)
                          }
                        />
                      </label>
                    </div>

                    {/* PayPal only shows after shipping is filled */}
                    {isShippingValid ? (
                      <div className="paypalContainer">
                        <p className="readyToPay">Ready to pay!</p>
                        <Paypal
                          key={paypalAmount}
                          cartData={allCartItems}
                          handlePaymentSuccess={onPaymentSuccess}
                          payPalValue={paypalAmount}
                        />
                      </div>
                    ) : (
                      <p className="fillFieldsMsg">
                        Please fill in all required fields (*) to continue
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="cartClosed" onClick={() => toggleCart(true)}>
          <GiShoppingCart size={40} />
          <div className="cartClosedInfo">
            <span className="cartClosedLabel">Cart</span>
            <span className="cartClosedCount">
              {quantity} items · ${totalCost}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
