import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
// import { useEffect, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID

const initialOptions = {
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
    <PayPalScriptProvider options={initialOptions}>
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



        onApprove={async (data, actions) => {
          //now payment goes through. But I need to collect information and notify myself
          const resp = await fetch('https://wabs-server.onrender.com/portfolio/contact', {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              senderEmail: 'leerobertdyer@gmail.com',
              message: `New AV SALE!`
            })
          });
          if (resp.ok) {
            console.log('message sent');
          }
          try {
            if (actions && actions.order) {

              const captureDetails = await actions.order.capture();

              if (captureDetails.status === 'COMPLETED') {
                console.log('Payment executed successfully');
                handlePaymentSuccess();
                console.log(data)
              } else {
                console.error('Payment execution failed');
              }
            }
          } catch (error) {
            console.error('Payment execution error:', error);
          }
        }}

        onError={(err) => {
          console.error('Payment error:', err);
          console.log('payPalValue value', payPalValue);

        }} />

    </PayPalScriptProvider>
  </>
  )
}


export default Paypal