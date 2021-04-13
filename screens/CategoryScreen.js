import React from 'react';
import { Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { PRODUCTS } from '../data/dummy-data';
import ProductItem from '../components/ProductItem';

const CategoryScreen = props => {
    const category = props.route.params?.title ?? '';
    const subCategories = PRODUCTS.filter(prod => prod.catName === category);
    const uniqueSub = [];
    subCategories.map(prod => {
        var unique = uniqueSub.find(x => x.subName === prod.subName);
        if (!unique) {
            uniqueSub.push(prod);
        }
    });
    const products = PRODUCTS.filter(prod => prod.catName === category);
    if (!uniqueSub[0].subName) {
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
                        />
                    );
                }}
            />
        );
    }
    return (
        <SafeAreaView style={{ margin: 2, flex: 1 }}>
            <FlatList
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={uniqueSub}
                renderItem={(itemData) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('SubCategory', { category: itemData.item.catName, sub: itemData.item.subName }) }}
                            style={{ marginRight: 5, marginBottom: 10 }}
                        >
                            <Image
                                source={{ uri: itemData.item.subCatImageUrl }}
                                style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 5, position: 'relative', borderRadius: 10 }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    position: 'absolute',
                                    color: 'white',
                                    padding: 5
                                }}
                            >
                                {itemData.item.subName}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
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
        </SafeAreaView>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.title,
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

export default CategoryScreen;