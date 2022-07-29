import * as actionType from './cartType'
import axios from 'axios'
import { url } from '../../utils/url'

export const addToCart = (id, qnty, size) => async (dispatch, getState) =>
{
    const { data } = await axios.get(`${url}/products/getproduct/${id}`)
    dispatch({
        type: actionType.ADD_TO_CART,
        payload: {
            id: data._id,
            title: data.title,
            img: data.img,
            qnty,
            size,
            price: data.price * qnty
        }
    })

    localStorage.setItem('cart',
        JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) =>
{
    dispatch({
        type: actionType.REMOVE_FROM_CART,
        payload: id
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));

}