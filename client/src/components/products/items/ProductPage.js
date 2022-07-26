import React, { useEffect } from 'react'
import Footer from '../../home/footer/Footer'
import Header from '../../home/header/Header'
import { useParams } from 'react-router-dom'
import "./ProductPage.css"
import axios from 'axios'
import { url } from '../../../redux/utils/url'


const ProductPage = () =>
{
    let { productID } = useParams()

    const fetchProduct = async () =>
    {
        await axios.get(`${url}products/getproduct/${productID}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() =>
    {
        fetchProduct()
    }, [])
    return (
        <>
            <Header />
            <div className='productPage'>
            </div>
            <Footer />
        </>
    )
}

export default ProductPage