import { PRODUCTS, FRESH_FINDS } from '../../data/dummy-data';
import { LIKE_PRODUCT } from '../actions/product_action';

const initialState = {
    products: PRODUCTS,
    freshFinds: FRESH_FINDS,
    likedProducts: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_PRODUCT:
            const existingIndex = state.likedProducts.findIndex(prod => prod.id === action.prodId);
            if (existingIndex >= 0) {
                const updatedLikedProducts = [...state.likedProducts];
                updatedLikedProducts.splice(existingIndex, 1);
                return { ...state, likedProducts: updatedLikedProducts };
            }
            else {
                const newLikedProd = state.products.find(prod => prod.id === action.prodId) ? state.products.find(prod => prod.id === action.prodId) : state.freshFinds.find(prod => prod.id === action.prodId);
                return { ...state, likedProducts: state.likedProducts.concat(newLikedProd) };
            }
        default:
            return state;
    }
};

export default productsReducer;