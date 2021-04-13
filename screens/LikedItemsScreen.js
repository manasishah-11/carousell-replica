import React from 'react';
import { FlatList, View, Text } from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../components/ProductItem';

const LikedItemsScreen = props => {
    const products = useSelector(state => state.products.likedProducts);
    if(products.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>No liked items!</Text>
            </View>
        );
    }
    return (
        <FlatList
            keyExtractor={item => item.id}
            data={products}
            numColumns={2}
            renderItem={(itemData) => {
                return (
                    <ProductItem
                        navigation={props.navigation}
                        imageUrls={itemData.item.imageUrls}
                        catName={itemData.item.catName}
                        subName={itemData.item.subName}
                        name={itemData.item.name}
                        price={itemData.item.price}
                        id={itemData.item.id}
                    />
                );
            }}
        />
    );
};

export default LikedItemsScreen;