import { Box, Flex, Text, Button, Divider } from "@chakra-ui/react";
// This is Summary Section For Cart or CheckOut Details;
const Summary = ({ quantity, total, name, onClick }) => {
  return (
    <Box>
      <Text fontSize={"20px"} fontWeight={600}>
        Summary
      </Text>

      <Box my={"20px"} fontSize={"18px"}>
        <Flex mt={"5px"} justifyContent={"space-between"}>
          <Text>Quantity</Text>
          <Text>{quantity}</Text>
        </Flex>
        <Flex fontSize={"18px"} justifyContent={"space-between"} my={"20px"}>
          <Text>Total</Text>
          <Text fontWeight={500}>₹{total}.00</Text>
        </Flex>
      </Box>
      <Divider mb={"20px"} />

      <Button
        bgColor={"black"}
        color={"white"}
        _hover={{
          bgColor: "blue",
        }}
        width="100%"
        borderColor={"transparent"}
        onClick={onClick}
      >
        {name}
      </Button>
    </Box>
  );
};
export default Summary;
