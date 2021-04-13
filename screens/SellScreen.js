import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';


const SellScreen = props => {
    const items = useSelector(state => state.sellItem.sellItems);
    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={item => item.imageUrl}
                renderItem={(itemData) => {
                    return (
                        <View style={{ padding: 5, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: itemData.item.imageUrl }} style={{ width: 80, height: 80, borderRadius: 80 }} />
                                <View style={{ marginLeft: 20, alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7f8080' }}>{itemData.item.name}</Text>
                                    <Text>S${itemData.item.price}</Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export const screenOptions = navData => {
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Like"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('SellNew');
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default SellScreen;
