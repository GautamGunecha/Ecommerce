import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../../../redux/utils/url";

import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Womens = ({ title }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .get(`${url}/products?category=womens`)
      .then((res) => setData(res.data))
      .catch((err) => setData([]));
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`${url}/products/deleteproduct/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => toast(res.data.msg))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mensSection">
      <ToastContainer autoClose={1000} />
      <p>{title}</p>
      <section className="mens-category">
        {data.map((item) => (
          <section key={item._id}>
            <Link to={`/product/page/${item._id}`}>
              <img className="womens-img" src={item.img} alt="" />
            </Link>
            {userInfo ? (
              userInfo.isAdmin ? (
                <button onClick={() => deleteProduct(item._id)}>
                  Delete Product
                </button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </section>
        ))}
      </section>
    </div>
  );
};

export default Womens;
