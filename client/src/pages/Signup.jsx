import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
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
  // This function Handles Signup
  const handleSubmit = async () => {
    try {
      let response = await axios.post(
        "http://localhost:8080/user/signup",
        signUpcreds
      );
      toast({
        title: "Signup Successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Flex
      minH={"92.5vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="Name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" onChange={hanldeChange} type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" onChange={hanldeChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  onChange={hanldeChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                bgColor={"black"}
                color={"white"}
                _hover={{
                  bgColor: "blue",
                }}
                borderColor={"transparent"}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack>
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                Already a user?{" "}
                <Link to={"/login"}>
                  <Text
                    ml={1}
                    textDecorationLine={"underline"}
                    color={"blue.400"}
                  >
                    Login
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
