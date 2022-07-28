import React, { useEffect, useState } from 'react'
import Footer from '../../home/footer/Footer'
import Header from '../../home/header/Header'
import { useParams } from 'react-router-dom'
import "./ProductPage.css"
import axios from 'axios'
import { url } from '../../../redux/utils/url'
import Mens from '../../home/shop/mens/Mens'
import Womens from '../../home/shop/womens/Womens'

const ProductPage = () =>
{
    let { productID } = useParams()
    const [product, setProduct] = useState({})
    const [size, setSize] = useState([])
    const [show, setShow] = useState(false)

    const fetchProduct = async () =>
    {
        await axios.get(`${url}/products/getproduct/${productID}`)
            .then(res =>
            {
                setProduct(res.data)
                setSize(res.data.size)
                if (res.data.categories[0] === 'mens')
                {
                    setShow(false)
                } else { setShow(true) }
            })
            .catch(err => setProduct({}))
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
                        <select>
                            {size.map((item, key) => (<option key={key} value={item}>{item}</option>))}
                        </select>
                    </span>
                    <span className='productPageFunctions'>
                        <button>Add To Cart</button>
                    </span>
                    <p className='productColor'>Color Shown - <span>{product.color}</span></p>
                </section>
            </div>
            {show ? <Mens title={'Options For him'} target={"_blank"} /> : <Womens title={'Options For her'} target={"_blank"} />}
            <Footer />
        </>
    )
}

export default ProductPage