import * as actionTypes from '../../actions/services/cartType'

const initialState = { cartItems: [] }

export const cartReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionTypes.ADD_TO_CART:
            const product = action.payload
            const ifProduct = state.cartItems.find((item) => item.id === product.id)

            if (ifProduct)
            {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.id === ifProduct.id ? product : x)
                }
            } else
            {
                return {
                    ...state,
                    cartItems: [...state.cartItems, product]
                }
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.id !== action.payload)
            }
        default:
            return state
    }
}