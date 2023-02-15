import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
function Addnew() {
  const [productdata, setproductdata] = useState({});

  const param = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const hanldeChange = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };
  // This function is for Adding New Product
  async function handleSubmit() {
    if (
      (productdata.img === "" &&
        productdata.title === "" &&
        productdata.gender == "" &&
        productdata.price === null) ||
      productdata.price == undefined
    ) {
      toast({
        title: "Fill All The Details",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        let res = await axios.post(
          `https://vowel-web-bgr7.onrender.com/allproducts/add`,
          productdata
        );
        console.log(res);
        navigate("/products");
        toast({
          title: "Product Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        console.log(error);
        navigate("/products");
        toast({
          title: "Something Went Wrong Try Again",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }

    console.log(productdata);
  }
  return (
    
      <Box
        display={"flex"}
        flexDirection={["column","column","column","row"]}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"center"}
        gap={5}
        mt={5}
        m="auto"
        width={"100%"}

      >
        <Flex
          flexDirection={"column"}
          cursor="pointer"
          mb={"10px"}
          key={productdata.title}
          width={"250px"}
          box-shadow={
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }
        >
          <Box overflow={"hidden"}>
            <Image
              src={
                productdata.img
                  ? productdata.img
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7KInQmflJL-HdQWdGpJNpsVxtbI8Peba29j1WN7gk9ttDVVmI98aIH_Zz74hsDnASGk&usqp=CAU"
              }
            />
          </Box>
          <Box>
            <Text
              fontSize={["13px", "15px", "17px", "17px", "18px"]}
              fontWeight={600}
            >
              {productdata.title}
            </Text>
            <Text
              fontSize={["12px", "12px", "13px", "16px", "17px"]}
              fontWeight={600}
            >
              {productdata.gender}
            </Text>
            <Text
              fontSize={["15px", "20px", "17px", "20px", "20px"]}
              fontWeight={600}
              my={"6px"}
            >
              ₹{productdata?.price}.00
            </Text>
          </Box>
        </Flex>
        <Flex width={["100%","100%","60%","40%"]} flexDirection={"column"}>
          <Input
            name="img"
            onChange={(e) => hanldeChange(e)}
            mb={4}
            placeholder="Enter Image Link"
            type="url"
          />
          <Input
            mb={4}
            placeholder="Enter Title"
            type="text"
            name="title"
            onChange={(e) => hanldeChange(e)}
          />
          <Input
            name="gender"
            onChange={(e) => hanldeChange(e)}
            mb={4}
            type="text"
            placeholder="Enter gender"
          />
          <Input
            name="price"
            onChange={(e) => hanldeChange(e)}
            mb={4}
            placeholder="Enter Price"
            type={"number"}
          />
          <Button
            bgColor={"black"}
            color={"white"}
            _hover={{
              bgColor: "blue",
            }}
            borderColor={"transparent"}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Flex>
      </Box>
    
  );
}
export default Addnew;
