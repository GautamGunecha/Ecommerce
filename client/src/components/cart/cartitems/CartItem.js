import React, { useEffect, useState } from 'react'
import "./CartItem.css"
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../../redux/actions/services/cartAction'

const CartItem = () =>
{
    const cartItems = useSelector(state => state.cart.cartItems)
    const [subTotal, setSubTotal] = useState()
    const [total, setTotal] = useState()

    const dispatch = useDispatch()

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
    useEffect(() => { totalAmount() })
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
                    <button>Checkout</button>
                </section>
                : ""}
        </div>
    )
}

export default CartItem