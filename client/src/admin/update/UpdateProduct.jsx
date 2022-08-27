import axios from "axios";
import React, { useState } from "react";
import { url } from "../../redux/utils/url";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "./UpdateProduct.css";

const UpdateProduct = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);
  const [image, setImage] = useState("");
  const [avatarMessage, setAvatarMessage] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);

  const postDetails = (pics) => {
    setAvatarMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_API, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setAvatarMessage("Please Select an Image");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${url}/products/editproduct/${id}`,
        {
          title,
          description,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(res.data.msg);
        setTitle("");
        setPrice("");
        setDescription("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="updateProduct">
        <h1>UpdateProduct</h1>
        <p>{avatarMessage}</p>
        <div>
          <form onSubmit={handleFormSubmit}>
            <section>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>

            <section>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </section>

            <section>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </section>

            <section>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </section>
            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
