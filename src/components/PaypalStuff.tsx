import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Product } from "../apiService";
import { CurrencyContext } from "../components/CurrencyDetector";

type MessageProps = {
  content: string;
};

type PayPalData = {
  orderID: string;
};

type PayPalActions = {
  restart: () => void;
};

interface Address {
  address_line_1: string;
  admin_area_2: string;
  city: string | null;
  country_code: string;
  postal_code: string;
  state: string | null;
  phone: string | null;
  normalization_status: string | null;
  type: string | null;
  email_address: string | null;
  recipient_name: string | null;
}

interface Name {
  given_name: string | null;
  surname: string | null;
  full_name: string;
}

interface ShippingDetail {
  name: Name;
  address: Address;
}

interface Capture {
  id: string;
  status: string;
}

interface Payments {
  captures: Capture[];
}

interface PurchaseUnit {
  payments: Payments;
  shipping: ShippingDetail;
}

interface Payer {
  name: {
    given_name: string;
    surname: string;
  };
  email_address: string;
}

interface ErrorDetail {
  issue: string;
  description: string;
  debug_id: string;
}

interface OrderData {
  id: string;
  status: string;
  payer: Payer;
  purchase_units: PurchaseUnit[];
  details?: ErrorDetail[];
}

interface PaypalStuffProps {
  cart: Product[];
}

function Message({ content }: MessageProps) {
  return <p>{content}</p>;
}

function PaypalStuff({ cart }: PaypalStuffProps) {
  const { currency } = useContext(CurrencyContext);
  const initialOptions = {
    clientId: "Ae0Eij5luUZwEf84_pZ3l5F7Jz_InbCqBGntP-nsQZPZIjXQ9McXuY0AtPWUsZCCSf96TeSniMih1eId", // Replace with your PayPal Client ID
    "enable-funding": "venmo",
    currency,
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState<string>("");
  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
    console.log('Updated cart state in ref:', cartRef.current);
  }, [cart]);

  const createOrder = useCallback(async () => {
    const currentCart = cartRef.current;
    console.log('Creating order with cart:', currentCart);

    try {
      const response = await fetch("https://joart.azurewebsites.net/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Cart: currentCart, Currency: currency }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error creating order: ${errorText}`);
        setMessage(`Error creating order: ${errorText}`);
        return;
      }

      const orderData = await response.json();

      if (orderData.orderId) {
        console.log(`Order created successfully: ${orderData.orderId}`);
        setMessage(`Order created successfully: ${orderData.orderId}`);
        return orderData.orderId;
      } else {
        console.error(`Order creation failed: ${JSON.stringify(orderData)}`);
        setMessage(`Order creation failed: ${JSON.stringify(orderData)}`);
      }
    } catch (error) {
      console.error(`Could not initiate PayPal Checkout:`, error);
      if (error instanceof Error) {
        setMessage(`Could not initiate PayPal Checkout: ${error.message}`);
      } else {
        setMessage(`Could not initiate PayPal Checkout: ${String(error)}`);
      }
    }
  }, [currency]);

  const onApprove = useCallback(async (data: PayPalData, actions: PayPalActions) => {
    try {
      const response = await fetch(
        `https://joart.azurewebsites.net/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: data.orderID, emailParams: { /* Your email params here */ } }) // Ensure email params are passed
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error capturing order: ${errorText}`);
        setMessage(`Error capturing order: ${errorText}`);
        return;
      }

      const orderData: OrderData = await response.json();
      console.log("Capture result", orderData);

      if (!orderData.purchase_units) {
        console.error("purchase_units is undefined", orderData);
        setMessage(`Transaction ${orderData.status}: ${orderData.id}. No purchase_units in response.`);
        return;
      }

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${errorDetail.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
        console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));

        // Backend will handle sending order details and thank you emails
      }
    } catch (error) {
      console.error("Error occurred during transaction:", error);
      if (error instanceof Error) {
        setMessage(`Sorry, your transaction could not be processed...${error.message}`);
      } else {
        setMessage(`Sorry, your transaction could not be processed...${String(error)}`);
      }
    }
  }, []);

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaypalStuff;

