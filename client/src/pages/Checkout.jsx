import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Summary from "../Components/Summary";
import { orderSuccess } from "../Redux/products/actions";
import { initPayment } from "./payment/razorpay";
function Checkout() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ordersummry = useSelector((state) => state.productReducer.ordersummry);
  const cartItems = useSelector((state) => state.productReducer.cartItems);
  const token=Cookies.get('token');

  const initState = {
    name: "",
    addressLine: "",
    locality: "",
    state: "",
    country: "",
    email: "",
  };

  const [shippingdata, setshippingdata] = useState(initState);

  function handlechnage(e) {
    let name = e.target.name;
    let value = e.target.value;
    setshippingdata({ ...shippingdata, [name]: value });
  }
  async function handleorder() {
    if (
      shippingdata.name === "" &&
      shippingdata.addressLine === "" &&
      shippingdata.locality === "" &&
      shippingdata.state === "" &&
      shippingdata.country === "" &&
      shippingdata.email === ""
    ) {
      toast({
        title: "Fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      //To get order id
      const { data } = await axios.post(
        "http://localhost:8080/api/payment/order",
        {
          amount: ordersummry.total,
        }
      );

      initPayment(
        shippingdata,
        data,
        ordersummry,
        cartItems,
        token,
        toast,
        dispatch,
        navigate
      );

      // let res = await axios.post("http://localhost:8080/order", {
      //   ordersummry,
      //   cartItems,
      //   shippingdata,
      // });
      // toast({
      //   title: "Order placed successfully",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      //   position: "top",
      // });
      // localStorage.removeItem("cartItems");
      // localStorage.removeItem("ordersummry");
      // dispatch(orderSuccess());
      // navigate("/");
    }
  }
  return (
    <Box
      p={"50px"}
      display={"grid"}
      gap={["40px", "40px", "40px", "10%", "10%"]}
      gridTemplateColumns={["100%", "100%", "100%", "55% 35%", "60% 30%"]}
    >
      {" "}
      <Box>
        <Text textAlign={"left"} fontSize={"25px"} fontWeight={600} mb={"20px"}>
          Enter your name and address:
        </Text>

        <Flex flexDirection={"column"} gap={"20px"}>
          <Input
            onChange={handlechnage}
            type={"text"}
            name={"name"}
            placeholder={"Name*"}
          />
          <Input
            onChange={handlechnage}
            type={"text"}
            name={"addressLine"}
            placeholder={"Address Line"}
          />
          <Flex gap={"20px"}>
            <Input
              onChange={handlechnage}
              type={"text"}
              name={"locality"}
              placeholder={"City/Locality*"}
            />
          </Flex>
          <Flex gap={"20px"}>
            <Input
              onChange={handlechnage}
              type={"text"}
              name={"state"}
              placeholder={"State/Territory*"}
            />
            <Input
              onChange={handlechnage}
              type={"text"}
              name={"country"}
              placeholder={"Country*"}
            />
          </Flex>
          <Text
            textAlign={"left"}
            fontSize={"25px"}
            fontWeight={600}
            mt={"30px"}
          >
            What's your contact information?
          </Text>
          <Input
            onChange={handlechnage}
            type={"email"}
            name={"email"}
            placeholder={"Email*"}
          />
        </Flex>
      </Box>
      <Summary {...ordersummry} name={"Place Order"} onClick={handleorder} />
    </Box>
  );
}
export default Checkout;
