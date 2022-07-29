import React, { useEffect, useState } from 'react'
import "./CartItem.css"
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, emptyUserCart } from '../../../redux/actions/services/cartAction'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { url } from '../../../redux/utils/url';
import { useNavigate } from 'react-router-dom'

const PUBLISH_KEY = process.env.REACT_APP_STRIPE

const CartItem = () =>
{
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const cartItems = useSelector(state => state.cart.cartItems)
    const [subTotal, setSubTotal] = useState()
    const [total, setTotal] = useState()
    const [stripeToken, setStripeToken] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalAmount = () =>
    {
        let sum = 0
        for (let i = 0; i < cartItems.length; i++)
        {
            sum += cartItems[i].price
        }
        setSubTotal(sum)
        setTotal(Math.floor(sum - (5 / 100 * sum)) + 200)
    }

    const handleRemoveFromCart = (id) =>
    {
        dispatch(removeFromCart(id))
    }

    const authError = (e) =>
    {
        e.preventDefault()
        alert('SignIn for checkout')
    }

    const token = (token) =>
    {
        setStripeToken(token);
    }

    useEffect(() =>
    {
        totalAmount()
        const makePayment = async () =>
        {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(`${url}/payment`, {
                tokenId: stripeToken.id,
                amount: total * 100,
            }, config)
                .then(res =>
                {
                    dispatch(emptyUserCart())
                    navigate('/success')
                })
                .catch(err => console.log(err))
        }

        stripeToken && makePayment()
    }, [stripeToken])
    return (
        <div className='cartItem'>
            {cartItems.length !== 0 ?
                <section className='cartProduct'>
                    {cartItems.map((products) => (
                        <section className='cartProducts' key={products.id}>
                            <img src={products.img} alt="" />
                            <span>
                                <p>{products.title}</p>
                                <p>size selected: {products.size}</p>
                                <p>Quantity: {products.qnty}</p>
                                <p>Amount: ₹ {products.price}.00</p>
                                <button onClick={() => handleRemoveFromCart(products.id)}>Remove from Cart</button>
                            </span>
                        </section>
                    ))}
                </section>
                :
                <p>
                    Your cart is empty: (
                </p>
            }
            {cartItems.length !== 0 ?
                <section className='cartTotal'>
                    <h1>Order Summary</h1>
                    <section className='orderSummary'>
                        <p>No. of Items - {cartItems.length}</p>
                        <p>Subtotal - ₹ {subTotal}.00</p>
                        <p>Delivery charge - ₹ 200.00</p>
                        <p>Discount - 5% on subtotal.</p>
                        <p className='totalAmount'>Total - ₹ {total}.00</p>
                    </section>
                    {!userInfo ?
                        <button onClick={authError}>Checkout</button> :
                        <StripeCheckout
                            name='Mantra Store'
                            image='https://avatars.githubusercontent.com/u/82008149?v=4'
                            billingAddress
                            shippingAddress
                            description={`Total Amount ₹ ${total}`}
                            amount={total * 100}
                            stripeKey={PUBLISH_KEY}
                            token={token}
                        >
                            <button>Checkout</button>
                        </StripeCheckout>
                    }
                </section>
                : ""}
        </div>
    )
}

export default CartItem