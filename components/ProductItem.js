import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as productActions from '../store/actions/product_action';

const ProductItem = props => {
    const currentProductIsLiked = useSelector(state => state.products.likedProducts.some(prod => prod.id === props.id));
    const dispatch = useDispatch();
    const addToLiked = () => {
        dispatch(productActions.likeProduct(props.id));
    }
    return (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => { props.navigation.navigate('ProductDetails', { category: props.catName, sub: props.subName, title: props.name, id: props.id }) }}
        >
            <Image source={{ uri: props.imageUrls[0] }} style={{ width: '100%', height: 150 }} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                    <Text
                        style={{ paddingLeft: 8, paddingTop: 8, paddingBottom: 5, fontSize: 16, color: '#353636', fontWeight: 'bold' }}
                    >
                        {props.name}
                    </Text>
                    <Text style={{ paddingLeft: 8, paddingBottom: 8, fontSize: 16, color: '#444746' }}>S${props.price}</Text>
                </View>
                <TouchableOpacity onPress={addToLiked} style={{ width: '20%', paddingTop: 15 }}>
                    <Ionicons
                        name={Platform.OS === 'android' ?
                            currentProductIsLiked ? 'md-heart' : 'md-heart-outline' :
                            currentProductIsLiked ? 'ios-heart' : 'ios-heart-outline'
                        }
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});

export default ProductItem;