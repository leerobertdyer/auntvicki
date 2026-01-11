import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { IcartItem } from "./types";

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const initialOptions = {
  clientId: CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

// Helper to format item name with variants for PayPal
const getPayPalItemName = (item: IcartItem): string => {
  let name = item.name;
  if (item.selectedSize || item.selectedColor) {
    const variants = [item.selectedSize, item.selectedColor]
      .filter(Boolean)
      .join(", ");
    name += ` (${variants})`;
  }
  return name;
};

interface PaypalProps {
  cartData: IcartItem[];
  handlePaymentSuccess: () => void;
  payPalValue: string;
}

const Paypal: React.FC<PaypalProps> = ({
  cartData,
  handlePaymentSuccess,
  payPalValue,
}) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
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
                    },
                  },
                },
                items: cartData.map((item) => ({
                  name: getPayPalItemName(item),
                  unit_amount: {
                    value: item.price.toFixed(2),
                    currency_code: "USD",
                  },
                  quantity: item.quantity.toString(),
                })),
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          console.log("PayPal onApprove data:", data);

          try {
            if (actions && actions.order) {
              const captureDetails = await actions.order.capture();

              if (captureDetails.status === "COMPLETED") {
                console.log("Payment executed successfully:", captureDetails);
                handlePaymentSuccess();
              } else {
                console.error("Payment execution failed:", captureDetails);
              }
            }
          } catch (error) {
            console.error("Payment execution error:", error);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          console.log("payPalValue:", payPalValue);
          console.log("cartData:", cartData);
        }}
        onCancel={(data) => {
          console.log("Payment cancelled:", data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
