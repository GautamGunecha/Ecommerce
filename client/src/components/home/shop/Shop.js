import React from 'react'
import Mens from './mens/Mens'
import "./Shop.css"
import Womens from './womens/Womens'

const Shop = () =>
{
    return (
        <>
            <div className='shop'>
                <h1>Shop</h1>
            </div>
            <Mens title={'Mens'} />
            <Womens title={'Womens'} />
        </>
    )
}

export default Shop