import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAPI } from "../Redux/authentication/auth.action";

export default function Login() {
  const [signUpcreds, setsignUpcreds] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setsignUpcreds({
      ...signUpcreds,
      [name]: value,
    });
  };

  // This function Handles Login
  const handleSubmit = async () => {
    dispatch(loginAPI(signUpcreds, toast, navigate));
  };

  let color = useColorModeValue("white", "gray.700");

  return (
    <>
      <Flex
        minH={"92.5vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login to your account</Heading>
          </Stack>
          <Box rounded={"lg"} bg={color} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" onChange={hanldeChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  onChange={hanldeChange}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text cursor={"pointer"} color={"blue.400"}>
                    Forgot password?
                  </Text>
                </Stack>
                <Button
                  bgColor={"black"}
                  color={"white"}
                  _hover={{
                    bgColor: "blue",
                  }}
                  borderColor={"transparent"}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Stack>
              <Stack>
                <Box
                  justifyContent={"center"}
                  alignItems={"center"}
                  display={"flex"}
                >
                  Want To Sign Up?{" "}
                  <Text
                    ml={3}
                    textDecorationLine={"underline"}
                    color={"blue.400"}
                    onClick={() => navigate("/signup")}
                  >
                    SignUp
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
