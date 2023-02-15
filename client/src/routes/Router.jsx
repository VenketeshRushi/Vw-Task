import { Route, Routes } from "react-router-dom";
import Addnew from "../pages/AdminSideAddNew";
import Admin from "../pages/AdminSideProducts";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import EditProduct from "../pages/Editproduct";
import Login from "../pages/Login";
import Navbar from "../pages/Navbar";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Signup from "../pages/Signup";
import { Private } from "./Private";
function AllRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/cart"
          element={
            <Private>
              <Cart />
            </Private>
          }
        />
        <Route
          path="/checkout"
          element={
            <Private>
              <Checkout />
            </Private>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Admin />} />
        <Route path="/products/:id" element={<EditProduct />} />
        <Route path="/addnew" element={<Addnew />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default AllRoutes;
