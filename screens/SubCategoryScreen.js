import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { PRODUCTS } from '../data/dummy-data';
import ProductItem from '../components/ProductItem';

const SubCategoryScreen = props => {
    const category = props.route.params?.category ?? '';
    const subCategory = props.route.params?.sub ?? '';
    const products = PRODUCTS.filter(prod => prod.catName === category && prod.subName === subCategory);
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

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.sub ? navData.route.params.sub : navData.route.params.category,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Like"
                    iconName={Platform.OS === 'android' ? 'md-heart-outline' : 'ios-heart-outline'}
                    onPress={() => {
                        navData.navigation.navigate('LikedItems');
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default SubCategoryScreen;