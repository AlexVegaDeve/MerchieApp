import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;

            const itemExists = state.cartItems.find(productId => productId.product === item.product )

            if(itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map( product => product.product === itemExists.product ? item : product )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(product => product.product !== action.payload)
            }

        default: 
            return state;
    }
}