import {
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_OUT,
} from "./auth.types";
import axios from "axios";
import Cookies from "js-cookie";

export const loginAPI = (data, toast, navigate) => async (dispatch) => {
  try {
    let response = await axios.post(" http://localhost:8080/user/login", data);
    console.log(response);
    if (response.status === 201) {
      Cookies.set("jwttoken", response.data.jwttoken, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      Cookies.set("userid", response.data.userid, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      Cookies.set("role", response.data.role, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      Cookies.set("name", response.data.name, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      dispatch({
        type: AUTH_LOG_IN_SUCCESS,
        payload: response.data,
      });
      if (response.data.role === "admin") {
        navigate("/products");
        toast({
          title: "Logged In Successfully AS A Admin",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        navigate("/");
        toast({
          title: "Logged In Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  } catch (error) {
    toast({
      title: error.response.data.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
};

export const logoutAPI = () => ({ type: AUTH_LOG_OUT });
