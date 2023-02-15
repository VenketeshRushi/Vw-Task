import { Center, Box, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAPI } from "../Redux/authentication/auth.action";
function Navbar() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((store) => store.authReducer.data.role);
  const token = useSelector((store) => store.authReducer.data.token);

  const handlelogout = () => {
    toast({
      title: "Logout Successful",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    Cookies.remove("jwttoken");
    Cookies.remove("name");
    Cookies.remove("userid");
    Cookies.remove("role");
    dispatch(logoutAPI());
    navigate("/");
  };

  function handleAdminClick() {
    toast({
      title: "You have To Login Firstly Using Admin Email Or",
      description:
        "Example For Signup Or Login Email As Admin Is abc@admin.com",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    navigate("/signup");
  }

  return (
    <>
      {role === "admin" ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["5px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/products"}>All Products</Link>
          </Center>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["5px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/addnew"}>Add Products</Link>
          </Center>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["5px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/orders"}>Orders</Link>
          </Center>

          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["5px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
            onClick={handlelogout}
          >
            Logout
          </Center>
        </Box>
      ) : (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["2px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/"}>Products</Link>
          </Center>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["2px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/cart"}>Cart</Link>
          </Center>
          <Center
            h={"60px"}
            cursor={"pointer"}
            paddingX={["2px","5px","10px","15px"]}
            _hover={{
              borderBottom: `2px solid blue`,
            }}
          >
            <Link to={"/checkout"}>Checkout</Link>
          </Center>
          {role === "user" ? (
            ""
          ) : (
            <Center
              h={"60px"}
              cursor={"pointer"}
              paddingX={["2px","5px","10px","15px"]}
              _hover={{
                borderBottom: `2px solid blue`,
              }}
              onClick={handleAdminClick}
            >
              Admin
            </Center>
          )}
          {token ? (
            <Center
              h={"60px"}
              cursor={"pointer"}
              paddingX={["2px","5px","10px","15px"]}
              _hover={{
                borderBottom: `2px solid blue`,
              }}
              onClick={handlelogout}
            >
              Logout
            </Center>
          ) : (
            <>
              <Center
                h={"60px"}
                cursor={"pointer"}
                paddingX={["2px","5px","10px","15px"]}
                _hover={{
                  borderBottom: `2px solid blue`,
                }}
              >
                <Link to="/login">Login</Link>
              </Center>
              <Center
                h={"60px"}
                cursor={"pointer"}
                paddingX={["2px","5px","10px","15px"]}
                _hover={{
                  borderBottom: `2px solid blue`,
                }}
              >
                <Link to="/SignUp">SignUp</Link>
              </Center>
            </>
          )}
        </Box>
      )}
    </>
  );
}
export default Navbar;
