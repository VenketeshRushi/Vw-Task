import {
  Accordion,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Error } from "../Components/Error";
import { Loading } from "../Components/Loding";
import { OrderSection } from "../Components/OrderSection";
import { dateFormator } from "../Utils/dateFormator";
function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getOrderData();
  }, []);

  // This function is for getting all orders data
  async function getOrderData() {
    try {
      setIsLoading(true);
      let { data } = await axios.get("http://localhost:8080/order");
      data = data.reverse();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  }
  if (data.length === 0) {
    return (
      <Box>
        <Center h={"40vh"}>
          <Text fontSize={"20px"}>Your orders will be displayed here.</Text>
        </Center>
      </Box>
    );
  }

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <Accordion defaultIndex={[0]} allowMultiple>
      {data?.map((item) => {
        const { date, time } = dateFormator(item.createdAt);
        return (
          <OrderSection date={date} time={time}>
            {" "}
            <Box key={item.id}>
              <Grid
                templateColumns={[
                  "100%",
                  "100%",
                  "48% 48%",
                  "32% 31% 33%",
                  "31% 30% 31%",
                ]}
                gap={["20px", "20px", "4%", "2%", "4%"]}
              >
                {" "}
                <Box py={"15px"} px={"25px"}>
                  <Text textAlign={"left"} fontSize={"20px"} fontWeight={600}>
                    Ordered Items
                  </Text>
                  <Divider mb={"20px"} />
                  {item.cartItems.map((product) => (
                    <Grid
                      key={product.price}
                      templateColumns={"100px 60%"}
                      p={"5px"}
                    >
                      <Box w={"100px"} overflow={"hidden"}>
                        <Image src={product.img} />
                      </Box>
                      <Center>
                        <Box textAlign={"left"} px={"20px"} w={"100%"}>
                          <Text fontWeight={600}>{product.title}</Text>
                          <Text>Price: ₹ {product.price}</Text>
                          <Text>Quantity: {product.quantity}</Text>
                        </Box>
                      </Center>
                    </Grid>
                  ))}
                </Box>
                <Box py={"15px"} px={"25px"}>
                  <Text textAlign={"left"} fontSize={"20px"} fontWeight={600}>
                    Shipping Address
                  </Text>

                  <Divider mb={"20px"} />

                  <Flex
                    flexDirection={"column"}
                    gap={"5px"}
                    my={"20px"}
                    fontSize={"18px"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text>Full Name</Text>
                      <Text>{item.shippingdata.name}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Email</Text>
                      <Text>{item.shippingdata.email}</Text>
                    </Flex>
                    <Divider my={"10px"} />
                    <Flex justifyContent={"space-between"}>
                      <Text>Address</Text>
                      <Text>{item.shippingdata.addressLine}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>City</Text>
                      <Text>{item.shippingdata.locality}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>State</Text>
                      <Text>{item.shippingdata.state}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Country</Text>
                      <Text>{item.shippingdata.country}</Text>
                    </Flex>

                    <Divider my={"10px"} />
                  </Flex>
                </Box>
                <Box py={"15px"} px={"25px"}>
                  <Text textAlign={"left"} fontSize={"20px"} fontWeight={600}>
                    Summary
                  </Text>
                  <Divider />
                  <Flex
                    flexDirection={"column"}
                    gap={"5px"}
                    my={"20px"}
                    fontSize={"18px"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text>Quantity</Text>
                      <Text>{item.ordersummry.quantity}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Text>Total</Text>
                      <Text>{item.ordersummry.total}</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Grid>
            </Box>
          </OrderSection>
        );
      })}
    </Accordion>
  );
}
export default Orders;
