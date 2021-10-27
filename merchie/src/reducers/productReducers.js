import 
{ 
    PRODUCT_LIST_FAILURE, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_CREATE_REVIEW_FAILURE, 
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page };
        case PRODUCT_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default :
            return state;
    };
};

export const productDetailsReducer = (state = { product: { reviews: []} }, action) => {
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'PRODUCT_DETAILS_SUCCESS':
            return { loading: false, product: action.payload };
        case 'PRODUCT_DETAILS_FAILURE':
            return { loading: false, error: action.payload };
        default :
            return state;
    };
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAILURE:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}