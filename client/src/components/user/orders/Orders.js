import React, { useEffect, useState } from 'react'
import "./Orders.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { url } from '../../../redux/utils/url'
import { toast, ToastContainer } from 'react-toastify'

const Orders = () =>
{
    const [orders, setOrders] = useState([])
    console.log(orders)
    const [show, setShow] = useState(false)

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    const cancelUserOrder = async (id) =>
    {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`${url}/order/delete/${id}`, config)
            .then(res =>
            {
                toast.success(res.data)
                setTimeout(() =>
                {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => console.log(err))
    }

    useEffect(() =>
    {

        const fetchOrderDetails = async () =>
        {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.get(`${url}/order/find/${userInfo._id}`, config)
                .then(res =>
                {
                    setOrders(res.data)
                    setShow(true)
                })
                .catch(err =>
                {
                    setOrders([])
                    console.log(err)
                })
        }

        fetchOrderDetails()
    }, [userInfo])
    return (
        <>
            {
                show ?
                    <div>
                        <ToastContainer autoClose={2000} />
                        {
                            orders.map(item => (
                                <section key={item._id} className='userOrders'>
                                    <p>Order Id: {item._id}</p>
                                    <p>Order Placed on: {item.createdAt.slice(0, item.createdAt.indexOf("T"))}</p>
                                    <p>No. Of Items: {item.products.length}</p>
                                    <p>Order Status: {item.status}</p>
                                    <p>Total Amount: ₹ {item.amount}</p>
                                    <button type='button' onClick={() => cancelUserOrder(item._id)}>Cancel this Order</button>
                                </section>
                            ))
                        }

                    </div>
                    :
                    <section className='noOrders'>
                        <h1>You haven't placed any order yet :(</h1>
                    </section>
            }

        </>
    )
}

export default Orders