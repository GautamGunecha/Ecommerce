import React from 'react'
import "./CartItem.css"

const CartItem = () =>
{
    return (
        <div className='cartItem'>
            <section className='cartProduct'>
                a
            </section>
            <section className='cartTotal'>
                <h1>Order Summary</h1>
                <section className='orderSummary'>
                    <p>No. of Items - 20</p>
                    <p>Subtotal - ₹ 100.00</p>
                    <p>Delivery charge - ₹ 100.00</p>
                    <p>Discount - ₹ 100.00</p>
                    <p className='totalAmount'>Total - ₹ 100.00</p>
                </section>
                <button>Checkout</button>
            </section>
        </div>
    )
}

export default CartItem