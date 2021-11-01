import axios from 'axios';
import { 
    PRODUCT_LIST_FAILURE, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_CREATE_REVIEW_FAILURE, 
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET
} from '../constants/productConstants';

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`${process.env.API_ENDPOINT || ''}/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}`);

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ 
            type: PRODUCT_LIST_FAILURE, 
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        })
    }
}

export const listProductDetails = ( id ) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

        const { data } = await axios.get(`${process.env.API_ENDPOINT || ''}/api/v1/products/${id}`);

        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ 
            type: 'PRODUCT_DETAILS_FAILURE', 
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        })
    }
}

export const CreateProductReview = ( productId, review ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        let userSession = JSON.parse(sessionStorage.getItem('userInfo'));

        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
              username: userSession.username,
            }
        }

        await axios.post(
            `${process.env.API_ENDPOINT || ''}/api/v1/products/${productId}/reviews`, review, config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    }    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAILURE,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}