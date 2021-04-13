import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { PRODUCTS } from '../data/dummy-data';
import moment from 'moment';

const CategoryItem = props => {
    const subCategories = PRODUCTS.filter(prod => prod.catName === props.title);
    const uniqueSub = [];
    subCategories.map(prod => {
        var unique = uniqueSub.find(x => x.subName === prod.subName);
        if (!unique) {
            uniqueSub.push(prod);
        }
    });
    return (
        <View>
            <FlatList
                listKey={moment().valueOf().toString()}
                data={uniqueSub}
                renderItem={(itemData) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('SubCategory', { category: itemData.item.catName, sub: itemData.item.subName })}
                        >
                            <Text style={{ fontSize: 16, marginVertical: 5 }}>{itemData.item.subName}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CategoryItem;