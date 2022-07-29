import React from "react";
import "./Cart.css";
import Header from "../home/header/Header";
import Footer from "../home/footer/Footer";
import { FiShoppingBag } from "react-icons/fi";
import CartItem from "./cartitems/CartItem";

const Cart = () =>
{
  document.title = "Mantra. | Cart";
  return (
    <React.Fragment>
      <Header />
      <div className="cart">
        <div className="cartHeader">
          <p>My Cart</p>
          <FiShoppingBag size={20} />
        </div>
        <div className="cartBottom"></div>
      </div>
      <CartItem />
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
