export const NEW_SELL_ITEM = 'NEW_SELL_ITEM';

export const newSellItem = (imageUrl, name, price) => {
    return{
        type: NEW_SELL_ITEM,
        imageUrl,
        name,
        price
    };
};