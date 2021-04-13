import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import moment from 'moment';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { PRODUCTS } from '../data/dummy-data';
import CategoryItem from '../components/CategoryItem';
import GridItem from '../components/GridItem';

const CategoriesScreen = props => {
    const categories = [];
    PRODUCTS.map(prod => {
        var unique = categories.find(x => x.catName === prod.catName);
        if (!unique) {
            categories.push(prod);
        }
    });
    return (
        <View>
            <FlatList
                listKey={moment().valueOf().toString()}
                numColumns={2}
                data={categories}
                renderItem={(itemData) => {
                    return (
                        <GridItem>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                <Image
                                    source={{ uri: itemData.item.iconUrl }}
                                    style={{ width: 30, height: 30 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        fontWeight: 'bold',
                                        padding: 10,
                                        alignSelf: 'center'
                                    }}
                                >
                                    {itemData.item.catName.trim()}
                                </Text>
                            </View>
                            <CategoryItem title={itemData.item.catName} navigation={props.navigation} />
                        </GridItem>
                    )
                }}
            />
        </View>
    );
};

export const screenOptions = navData => {
    return {
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

export default CategoriesScreen;