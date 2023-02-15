import axios from "axios";
import { orderSuccess } from "../../Redux/products/actions";


export const sendOrderRequest = async (shippingdata, orderId, response, ordersummry, cartItems, token, toast, dispatch, navigate) => {

    const payload = {
        ordersummry,
        cartItems,
        shippingdata,
        paymentDetails: {
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id
        }
    };

    try {
        await axios.post('https://vowel-web-bgr7.onrender.com/order', payload, { headers: { 'Authorization': `Bearer ${token}` } });

        toast({
            title: 'Order placed successfully',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });

        //Empty the cart
        localStorage.removeItem("cartItems");
        localStorage.removeItem("ordersummry");
        dispatch(orderSuccess());
        navigate("/");

    } catch (err) {
        console.log(err);
    }
};