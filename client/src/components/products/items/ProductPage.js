import React, { useEffect, useState } from "react";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header/Header";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import axios from "axios";
import { url } from "../../../redux/utils/url";
import Mens from "../../home/shop/mens/Mens";
import Womens from "../../home/shop/womens/Womens";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/services/cartAction";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import UpdateProduct from "../../../admin/update/UpdateProduct";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

Modal.setAppElement("#admin");

const ProductPage = () => {
  let { productID } = useParams();

  const [product, setProduct] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [show, setShow] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const fetchProduct = async () => {
    await axios
      .get(`${url}/products/getproduct/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setSize(res.data.size[0]);
        if (res.data.categories[0] === "mens") {
          setShow(false);
        } else {
          setShow(true);
        }
      })
      .catch((err) => setProduct({}));
  };

  const handleQuantity = (count) => {
    if (count === "add") setQuantity(quantity + 1);

    if (count === "dec" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = (id, qnty, size) => {
    dispatch(addToCart(id, qnty, size));
    setQuantity(1);
    toast.success("Product added to cart!");
  };

  useEffect(() => {
    fetchProduct();
  }, [productID]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Header />
      <div className="productPage">
        <img src={product.img} alt={product.title} />
        <section>
          <h1>{product.title}</h1>
          <p className="productPageDetails">{product.description}</p>
          <p className="productPagePricing">₹ {product.price}</p>
          <span className="productPageSize">
            <p>Size Available</p>
            <select onChange={(e) => setSize(e.target.value)}>
              {product.size?.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </span>
          {/* Product Quantity and add to cart option */}
          <div className="productFunctions">
            <span>
              <AiOutlineMinus
                onClick={() => handleQuantity("dec")}
                className="icon dec"
                size={20}
              />
              <p>{quantity}</p>
              <AiOutlinePlus
                className="icon add"
                size={20}
                onClick={() => handleQuantity("add")}
              />
            </span>
            <button onClick={() => handleAddToCart(productID, quantity, size)}>
              Add To Basket
            </button>
          </div>
          <p className="productColor">
            Color Shown - <span>{product.color}</span>
          </p>
          {userInfo
            ? userInfo.isAdmin && (
                <section className="admin-update">
                  <p>Update Product</p>
                  <button
                    onClick={() => {
                      setIsModal(true);
                    }}
                  >
                    Admin Update
                  </button>
                </section>
              )
            : ""}
        </section>
      </div>
      {show ? (
        <Mens title={"Options For him"} />
      ) : (
        <Womens title={"Options For her"} />
      )}

      <Modal
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
        style={customStyles}
      >
        <UpdateProduct id={productID} />
      </Modal>
      <Footer />
    </>
  );
};

export default ProductPage;
