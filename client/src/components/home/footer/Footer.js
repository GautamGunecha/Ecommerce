import React from 'react'
import './Footer.css'
import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'

const Footer = () =>
{
    return (
        <div className='footer'>
            <div className='footerOwnerShip'>
                <p>© 2022 Gautam Gunecha</p>
            </div>
            <div className='footerSocialLinks'>
                <a href="https://github.com/GautamGunecha">
                    <AiOutlineGithub size={25} />
                </a>
                <a href="https://www.linkedin.com/in/gunechagautam/">
                    <AiFillLinkedin size={25} />
                </a>
                <a href="mailto:gautamgunecha@gmail.com">
                    <AiOutlineMail size={25} />
                </a>
            </div>
        </div>
    )
}

export default Footer