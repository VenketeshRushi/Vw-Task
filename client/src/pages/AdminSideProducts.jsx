import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Admin() {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getdata();
  }, []);

  // This function is for getting all products data
  async function getdata() {
    try {
      let res = await axios.get(`https://vowel-web-bgr7.onrender.com/allproducts`);
      setdata(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // This function is for delting perticular all product
  async function handledelete(id) {
    console.log(id);
    try {
      let res = await axios.delete(
        `https://vowel-web-bgr7.onrender.com/allproducts/delete/:${id}`
      );
      toast({
        title: "Product deleted Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      getdata();
    } catch (error) {
      toast({
        title: "Something Went Wrong Try Again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      getdata();
    }
  }
  return (
    <>
      <Box>
        <Grid
          gap={[2, 4]}
          p={["10px", "10px", "20px", "20px", "20px"]}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {data?.map((product, index) => (
            <Flex
              flexDirection={"column"}
              cursor="pointer"
              mb={"10px"}
              key={product._id}
            >
              <Box overflow={"hidden"}>
                <Image src={product.img} />
              </Box>
              <Box>
                <Text
                  fontSize={["13px", "15px", "17px", "17px", "18px"]}
                  fontWeight={600}
                >
                  {product.title}
                </Text>
                <Text
                  fontSize={["12px", "12px", "13px", "16px", "17px"]}
                  color={"gray"}
                >
                  {product.gender}
                </Text>
                <Text
                  fontSize={["15px", "20px", "17px", "20px", "20px"]}
                  fontWeight={600}
                  my={"6px"}
                >
                  ₹{product.price}.00
                </Text>
              </Box>
              <VStack w={"100%"}>
                <Button
                  bgColor={"black"}
                  color={"white"}
                  _hover={{
                    bgColor: "blue",
                  }}
                  borderColor={"transparent"}
                  onClick={() => navigate(`/products/:${product._id}`)}
                  w={"100%"}
                >
                  Edit
                </Button>
                <Button
                  bgColor={"black"}
                  color={"white"}
                  _hover={{
                    bgColor: "blue",
                  }}
                  borderColor={"transparent"}
                  onClick={() => handledelete(product._id)}
                  w={"100%"}
                >
                  Delete
                </Button>
              </VStack>
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
}
export default Admin;
