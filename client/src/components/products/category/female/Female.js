import React from 'react'
import Coursel from '../../../home/coursel/Coursel'
import Footer from '../../../home/footer/Footer'
import Header from '../../../home/header/Header'
import Banner from '../banner/Banner'
import Womens from '../../../home/shop/womens/Womens'

const Female = () =>
{
    return (
        <>
            <Header />
            <Banner text={"women's collections"} />
            <Coursel />
            <Womens title={"women's t-shirts"} />
            <div></div>
            <Footer />
        </>
    )
}

export default Female