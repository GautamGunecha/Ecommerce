import React from 'react'
import "./Success.css"
import { AiOutlineCheckCircle } from 'react-icons/ai'

const Success = ({ total }) =>
{
    return (
        <>
            <div className='success'>
                <h1>Payment Successfull</h1>
                <AiOutlineCheckCircle className='checkIcon' size={35} />
                <p>Check Mail for payment Details.</p>
            </div>
        </>
    )
}

export default Success