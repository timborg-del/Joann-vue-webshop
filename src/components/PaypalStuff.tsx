import { useState, useEffect, useCallback, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from 'emailjs-com';
import { Product } from "../apiService"; // Ensure this path is correct

type MessageProps = {
  content: string;
};

type PayPalData = {
  orderID: string;
};

type PayPalActions = {
  restart: () => void;
};

interface PaypalStuffProps {
  cart: Product[];
}

function Message({ content }: MessageProps) {
  return <p>{content}</p>;
}

function PaypalStuff({ cart }: PaypalStuffProps) {
  const initialOptions = {
    clientId: "Ae0Eij5luUZwEf84_pZ3l5F7Jz_InbCqBGntP-nsQZPZIjXQ9McXuY0AtPWUsZCCSf96TeSniMih1eId", // Replace with your PayPal Client ID
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "SEK",
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
        body: JSON.stringify({ Cart: currentCart }),
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
  }, []);

  const onApprove = useCallback(async (data: PayPalData, actions: PayPalActions) => {
    try {
      const response = await fetch(
        `https://joart.azurewebsites.net/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error capturing order: ${errorText}`);
        setMessage(`Error capturing order: ${errorText}`);
        return;
      }

      const orderData = await response.json();
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
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
        console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));

        // Send order details to the delivery service via email
        await sendOrderToDeliveryService(orderData, cartRef.current);
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

  const sendOrderToDeliveryService = async (orderData: any, cart: Product[]) => {
    const payer = orderData.payer ? {
      name: `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`,
      email: orderData.payer.email_address
    } : {
      name: "Unknown",
      email: "Unknown"
    };

    const emailParams = {
      orderID: orderData.id,
      status: orderData.status,
      payer: payer.name,
      purchaseUnits: JSON.stringify(orderData.purchase_units, null, 2),
      cart: cart.map(item => `${item.Name} (Quantity: ${item.quantity}, Price: ${item.Price})`).join("\n"),
      to_email: "timl@live.com",
      subject: "New Delivery Address and Order Details",
      message: `You have a new order.`
    };

    console.log('Email Parameters:', emailParams);

    try {
      const response = await emailjs.send(
        'service_r1vze7i',
        'template_l85pyi9',
        emailParams,
        '04zjQJsqKjSBMMjMB'
      );

      if (response.status === 200) {
        console.log("Order details sent to email successfully");
      } else {
        console.error("Failed to send order details to email");
      }
    } catch (error) {
      console.error("Error sending order details to email:", error);
    }
  };

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


















