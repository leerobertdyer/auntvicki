import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
// import { useEffect, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID

const initialOptions= {
    clientId: CLIENT_ID,
    currency: 'USD',
    intent: "capture",
    // deferLoading: true
}

interface CartItem {
    name: string,
    price: number,
    quantity: number
}


interface PaypalProps {
    cartData: CartItem[],
    handlePaymentSuccess: () => void,
    payPalValue: string
  }

const Paypal: React.FC<PaypalProps> = ({ cartData, handlePaymentSuccess, payPalValue }) => {
      
    return (<>
        <PayPalScriptProvider options={ initialOptions }>
            <PayPalButtons style={{ layout: "vertical" }} 
             createOrder={(_data, actions) => {
                 return actions.order.create({
                     purchase_units: [
                    {
                      amount: {
                                    value: payPalValue,
                                    currency_code: "USD",
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: payPalValue,
                                          }
                                    }   
                      },
                      items: cartData.map((item) => ({
                        name: item.name,
                        unit_amount: {
                          value: item.price.toFixed(2), 
                          currency_code: 'USD',
                        },
                        quantity: item.quantity.toString(), 
                      })),
                    },
                  ],
                });
              }}

              
              
              onApprove={ async(data) => {
                handlePaymentSuccess();
                console.log(data)
              }}

              onError={(err) => {
                // Handle payment error screen and info
                console.error('Payment error:', err);
                console.log('payPalValue value', payPalValue);

              }}/>

            </PayPalScriptProvider>
    </>
    )
}


export default Paypal