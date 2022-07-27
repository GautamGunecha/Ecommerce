import React from 'react'
import './Hero.css'
import heroData from '../../data/Hero.json'

const Hero = () =>
{
    const scrollDown = () =>
    {
        window.scrollTo({
            top: 635,
            behavior: "smooth"
        })
    }
    return (
        <React.Fragment>
            <div className='hero'>
                <div className='heroSale'>
                    <p>{heroData.offer.title}</p>
                </div>
                <div className='heroHeader'>
                    <p>{heroData.highlight.title}</p>
                </div>
                <div className='heroContent'>
                    <p>{heroData.description.text}</p>
                </div>
                <div className='heroShopNow'>
                    <button onClick={scrollDown}>{heroData.button.text}</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Hero