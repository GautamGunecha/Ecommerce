import React from 'react'
import "./Banner.css"

const Banner = ({ text }) =>
{
    return (
        <div className='banner'>
            <section>
                <h1>{text}</h1>
                <p>from t-shirts, jeans, jackets, watches, bags, sunglasses.</p>
                <button>Shop Now</button>
            </section>
        </div>
    )
}

export default Banner