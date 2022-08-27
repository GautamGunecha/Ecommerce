import React, { useState } from "react";

import "./AddProduct.css";

const AddProduct = () => {
  const [jsonFile, setJsonFile] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e, data) => {
    e.preventDefault();
  };

  const handleJsonValidation = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      const jsonData = await JSON.parse(jsonFile);
      for (let i = 0; i < jsonData.length; i++) {
        let data = {
          title: jsonData[i].title,
          description: jsonData[i].description,
          categories: jsonData[i].categories,
          img: jsonData[i].img,
          size: jsonData[i].size,
          color: jsonData[i].color,
          price: jsonData[i].price,
        };
        setTimeout(() => {
          handleSubmit(data);
        }, 2000);
      }
    } catch (error) {
      if (error) setErr("Invalid Json File");
    }
  };
  return (
    <div className="add-product">
      <h1>Add Products</h1>
      <div className="add-product-forms">
        <form onSubmit={handleSubmit}>
          <section>
            <label>Title</label>
            <input type="text" />
          </section>
          <section>
            <label>Description</label>
            <input type="text" />
          </section>
          <section>
            <label>Category</label>
            <input type="text" />
          </section>
          <section>
            <label>Image</label>
            <input type="text" />
          </section>
          <section>
            <label>Size</label>
            <input type="text" />
          </section>
          <section>
            <label>Color</label>
            <input type="text" />
          </section>
          <section>
            <label>Price</label>
            <input type="text" />
          </section>
          <button>Submit</button>
        </form>
        <form onSubmit={handleJsonValidation}>
          <textarea cols="30" rows="18"></textarea>
          <p>{err}</p>
          <button>Import Json Data</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
