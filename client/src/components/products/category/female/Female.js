import React from 'react'
import Coursel from '../../../home/coursel/Coursel'
import Footer from '../../../home/footer/Footer'
import Header from '../../../home/header/Header'
import Banner from '../banner/Banner'
import Womens from '../../../home/shop/womens/Womens'
import Shoes from '../male/shoes/Shoes'
import Sunglass from '../male/sunglass/Sunglass'

const Female = () =>
{
    return (
        <>
            <Header />
            <Banner text={"women's collections"} />
            <Coursel />
            <Womens title={"women's t-shirts"} />
            <Shoes title={"Women's sneakers"} category={'womens-shoes'} />
            <Sunglass title={"Women's sunglasses"} category={'mens-glass'} />
            <Footer />
        </>
    )
}

export default Female