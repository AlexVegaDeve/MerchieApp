import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer ,productReviewCreateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer
});

// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    // cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(...middleware));

export default store;