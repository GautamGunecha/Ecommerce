import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import { url } from "../../redux/utils/url";
import "./CustomerOrder.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#admin");

const CustomerOrder = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderUpdate, setOrderUpdated] = useState(false);
  const [status, setStatus] = useState("pending");
  const [id, setID] = useState("");

  const getID = (id) => {
    if (id) {
      setIsOpen(true);
      setID(id);
    }
  };

  const updateOrderStatus = async (e) => {
    await axios.put(
      `${url}/order/update/${id}`,
      {
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOrderUpdated(true);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get(`${url}/order`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.log(err));
    };

    fetchOrders();
  }, [orderUpdate]);
  return (
    <>
      <div className="customer-order">
        <h1>Customer Order</h1>
        <div>
          {orders?.map((content) => (
            <div className="all-orders" key={content._id}>
              <p>
                OrderID - <span>{content._id}</span>
              </p>
              <p>Products Placed - Id</p>
              <section className="order-product-details">
                <ul>
                  {content.products.map((item) => (
                    <li key={item.productId}>
                      {item.productId} <span>Qnty - {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <p>
                Total Amount Recieved - <span>₹ {content.amount}</span>
              </p>

              <p>Address</p>
              <section className="order-product-details">
                <ul>
                  <li>
                    City: <span>{content.address.city}</span>
                  </li>
                  <li>
                    State: <span>{content.address.state}</span>
                  </li>
                  <li>
                    Postal Code: <span>{content.address.postal_code}</span>
                  </li>
                </ul>
              </section>

              <p>Current Order Status - {content.status}</p>

              <button onClick={() => getID(content._id)}>
                Update Order Status
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <form onSubmit={updateOrderStatus} className="order-status-form">
          <p>Update Order Status</p>
          <p>Order ID - {id}</p>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">pending</option>
            <option value="order accepted">order accepted</option>
            <option value="shipping">shipping</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button type="submit">Update Order Status</button>
        </form>
      </Modal>
    </>
  );
};

export default CustomerOrder;
