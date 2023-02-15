import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { addToCart, getdata } from "../Redux/products/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "../Components/Loding";
import { Error } from "../Components/Error";
function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getdata());
  }, []);

  const { products, isLoading, isError } = useSelector(
    (state) => state.productReducer
  );

  function handlecart(e) {
    let data = { ...e, quantity: 1 };
    dispatch(addToCart("add", data, toast));
  }

  return (
    <>
      <Box>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
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
            {products?.map((product, index) => (
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
                <Button
                  bgColor={"black"}
                  color={"white"}
                  _hover={{
                    bgColor: "blue",
                  }}
                  borderColor={"transparent"}
                  onClick={() => handlecart(product)}
                >
                  Add to Cart
                </Button>
              </Flex>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
export default Products;
