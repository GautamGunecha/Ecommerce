import React, { useEffect, useState } from 'react'
import Footer from '../../home/footer/Footer'
import Header from '../../home/header/Header'
import { useParams } from 'react-router-dom'
import "./ProductPage.css"
import axios from 'axios'
import { url } from '../../../redux/utils/url'
import Mens from '../../home/shop/mens/Mens'
import Womens from '../../home/shop/womens/Womens'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const ProductPage = () =>
{
    let { productID } = useParams()
    const [product, setProduct] = useState({})
    const [show, setShow] = useState(false)
    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState(1)

    const fetchProduct = async () =>
    {
        await axios.get(`${url}/products/getproduct/${productID}`)
            .then(res =>
            {
                setProduct(res.data)
                setSize(res.data.size[0])
                if (res.data.categories[0] === 'mens')
                {
                    setShow(false)
                } else { setShow(true) }
            })
            .catch(err => setProduct({}))
    }

    const handleQuantity = (count) =>
    {
        if (count === "add")
            setQuantity(quantity + 1)

        if (count === "dec" && quantity > 1) setQuantity(quantity - 1)
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
                        <select onChange={(e) => setSize(e.target.value)}>
                            {product.size?.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </span>
                    {/* Product Quantity and add to cart option */}
                    <div className='productFunctions'>
                        <span>
                            <AiOutlineMinus
                                onClick={() => handleQuantity("dec")} className='icon dec'
                                size={20}
                            />
                            <p>{quantity}</p>
                            <AiOutlinePlus
                                className='icon add'
                                size={20}
                                onClick={() => handleQuantity("add")}
                            />
                        </span>
                        <button>Add To Basket</button>
                    </div>
                    <p className='productColor'>Color Shown - <span>{product.color}</span></p>
                </section>
            </div >
            {show ? <Mens title={'Options For him'} target={"_blank"} /> : <Womens title={'Options For her'} target={"_blank"} />}
            <Footer />
        </>
    )
}

export default ProductPage