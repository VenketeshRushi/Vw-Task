import axios from "axios";
import vw from "../../Images/vw.jpg";
import { sendOrderRequest } from "./sendOrderRequest";

export const initPayment = (
  shippingdata,
  orderDetails,
  ordersummry,
  cartItems,
  token,
  toast,
  dispatch,
  navigate
) => {
  const { name, email } = shippingdata;

  const options = {
    key: "rzp_test_EpEUZjh3akkK9N",
    order_id: orderDetails.id,
    amount: orderDetails.amount,
    currency: orderDetails.currency,
    image: vw,
    name: "Vowel Web",
    description: "Thanks for purchasing",

    prefill: {
      name: name,
      email: email,
    },

    handler: async function (response) {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/payment/verify",
          response
        );

        toast({
          title: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        sendOrderRequest(
          shippingdata,
          orderDetails.id,
          response,
          ordersummry,
          cartItems,
          token,
          toast,
          dispatch,
          navigate
        );
      } catch (error) {
        console.log(error);
        return { status: false };
      }
    },

    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);

  //If payment failed
  rzp.on("payment.failed", (response) => {
    console.log(response.error);
    alert("Payment failed, please try again");
    return { status: false };
  });

  //Open razorpay window
  rzp.open();
};
