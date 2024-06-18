import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface PaypalStuffProps {
  cart: Product[];
  formData: FormData;
}

function Message({ content }: MessageProps) {
  return <p>{content}</p>;
}

function PaypalStuff({ cart, formData }: PaypalStuffProps) {
  const initialOptions = {
    clientId: "Ae0Eij5luUZwEf84_pZ3l5F7Jz_InbCqBGntP-nsQZPZIjXQ9McXuY0AtPWUsZCCSf96TeSniMih1eId", // Add your PayPal Client ID here
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "SEK",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState<string>("");

  const createOrder = async () => {
    try {
      const response = await fetch("https://joart.azurewebsites.net/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cart: cart,
          Fullname: formData.fullName,
          Email: formData.email,
          Address: formData.address,
          City: formData.city,
          PostalCode: formData.postalCode
        }),
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
  };

  const onApprove = async (data: PayPalData, actions: PayPalActions) => {
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

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
        console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
      }
    } catch (error) {
      console.error("Error occurred during transaction:", error);
      if (error instanceof Error) {
        setMessage(`Sorry, your transaction could not be processed...${error.message}`);
      } else {
        setMessage(`Sorry, your transaction could not be processed...${String(error)}`);
      }
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










