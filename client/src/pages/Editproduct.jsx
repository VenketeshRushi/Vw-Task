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

function EditProduct() {
  const [data, setdata] = useState({});
  const [productdata, setproductdata] = useState({});

  const param = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  // This function is for getting all products data
  async function getdata() {
    try {
      let res = await axios.get(
        `https://vowel-web-bgr7.onrender.com/allproducts/single/:${param.id}`
      );
      setdata(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const hanldeChange = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  // This function is For updating the product
  async function handleSubmit() {
    try {
      let res = await axios.patch(
        `https://vowel-web-bgr7.onrender.com/allproducts/update/:${param.id}`,
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
    console.log(productdata);
  }
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
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
          key={data._id}
          width={"250px"}
          box-shadow={
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }
        >
          <Box overflow={"hidden"}>
            <Image src={productdata.img ? productdata.img : data?.img} />
          </Box>
          <Box>
            <Text
              fontSize={["13px", "15px", "17px", "17px", "18px"]}
              fontWeight={600}
            >
              {productdata.title ? productdata.title : data?.title}
            </Text>
            <Text
              fontSize={["12px", "12px", "13px", "16px", "17px"]}
              fontWeight={600}
            >
              {productdata.gender ? productdata.gender : data?.gender}
            </Text>
            <Text
              fontSize={["15px", "20px", "17px", "20px", "20px"]}
              fontWeight={600}
              my={"6px"}
            >
              {productdata.price
                ? `₹${productdata.price}.00`
                : `₹${data?.price}.00`}
            </Text>
          </Box>
        </Flex>
        <Flex width={["100%","100%","60%","40%"]}  flexDirection={"column"}>
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
            Upadte
          </Button>
        </Flex>
      </Box>
    </>
  );
}
export default EditProduct;
