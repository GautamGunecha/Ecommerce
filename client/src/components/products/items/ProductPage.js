import React, { useEffect, useState } from 'react'
import Footer from '../../home/footer/Footer'
import Header from '../../home/header/Header'
import { useParams } from 'react-router-dom'
import "./ProductPage.css"
import axios from 'axios'
import { url } from '../../../redux/utils/url'


const ProductPage = () =>
{
    let { productID } = useParams()
    const [product, setProduct] = useState([])

    const fetchProduct = async () =>
    {
        await axios.get(`${url}/products/getproduct/${productID}`)
            .then(res => setProduct(res.data))
            .catch(err => setProduct([]))
    }

    useEffect(() =>
    {
        fetchProduct()
    }, [])

    return (
        <>
            <Header />
            <div className='productPage'>
                <img src={product.img} alt={product.title} />
                <section>
                    <h1>{product.title}</h1>
                    <p className='productPageDetails'>{product.description}</p>
                    <p className='productPagePricing'>₹ {product.price}</p>
                    <span className='productPageSize'>
                        <p>Size Available</p>
                        <select></select>
                    </span>
                    <span className='productPageFunctions'>
                        <button>Add To Cart</button>
                    </span>
                    <p className='productColor'>Color Shown - <span>{product.color[0]}</span></p>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default ProductPage