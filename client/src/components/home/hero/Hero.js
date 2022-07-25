import React from 'react'
import './Hero.css'
import heroData from '../../data/Hero.json'
import { Link } from 'react-router-dom'

const Hero = () =>
{
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
                    <Link to={heroData.button.link}>
                        <button>{heroData.button.text}</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Hero