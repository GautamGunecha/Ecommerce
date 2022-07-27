import React from 'react'
import Coursel from '../../../home/coursel/Coursel'
import Footer from '../../../home/footer/Footer'
import Header from '../../../home/header/Header'
import Banner from '../banner/Banner'
import Mens from '../../../home/shop/mens/Mens'
import Shoes from './shoes/Shoes'
import Sunglass from './sunglass/Sunglass'

// mens-shoes
const Male = () =>
{
    return (
        <>
            <Header />
            <Banner text={"men's collections"} />
            <Coursel />
            <Mens title={"Men's t-shirts"} />
            <Shoes title={"Men's sneakers"} category={'mens-shoes'} />
            <Sunglass title={"Men's sunglasses"} category={'mens-glass'} />
            <Footer />
        </>
    )
}

export default Male