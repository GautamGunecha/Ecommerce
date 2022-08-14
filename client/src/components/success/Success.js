import React, { useEffect, useState } from 'react'
import "./Success.css"
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { url } from '../../redux/utils/url';
import { useNavigate } from 'react-router-dom';

const Success = () =>
{
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const location = useLocation();
    const data = location.state.stripeData
    const cart = location.state.products
    const total = location.state.total
    const navigate = useNavigate()

    const [orderId, setOrderId] = useState(null);

    useEffect(() =>
    {
        const createOrder = async () =>
        {
            try
            {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const res =
                    await axios.post(`${url}/order/placed`, {
                        userId: userInfo._id,
                        products: cart.map((item) => ({
                            productId: item.id,
                            quantity: item.qnty,
                        })),
                        amount: total,
                        address: data.billing_details.address,

                    }, config)
                setOrderId(res.data.msg._id);
            } catch (error)
            {
                console.log(error)
            }
        }
        data && createOrder();

    }, [cart, data, userInfo, total])

    const redirectToHome = () =>
    {
        navigate('/')
    }

    return (
        <>
            {orderId ? <div className='success'>
                <h1>Payment Successfull</h1>
                <AiOutlineCheckCircle className='checkIcon' size={35} />
                <p>Thank You!</p>
                <p>Order id - {orderId}</p>
                <span>check mail for more details.</span>
                <button onClick={redirectToHome}>
                    Go to Home Page.
                </button>
            </div> : ""}
        </>
    )
}

export default Success