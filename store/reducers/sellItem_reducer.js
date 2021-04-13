import {NEW_SELL_ITEM} from '../actions/sellItem_action';
import SellItem from '../../models/sellItem';

const initialState = {
    sellItems: []
};

const sellItemReducer = (state = initialState, action) => {
    switch(action.type){
        case NEW_SELL_ITEM:
            const newItem = new SellItem(action.imageUrl, action.name, action.price);
            return {
                sellItems: state.sellItems.concat(newItem)
            };
    }
    return state;
};

export default sellItemReducer;