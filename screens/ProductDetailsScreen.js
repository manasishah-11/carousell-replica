import React from 'react';
import { View, Text, Button, Dimensions, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImageCarousel from '../components/ImageCarousel';
import { PRODUCTS } from '../data/dummy-data';
import * as productActions from '../store/actions/product_action';

const width = Dimensions.get('window').width;
const height = width * 0.9;

const ProductDetailsScreen = props => {
    const category = props.route.params?.category ?? '';
    const subCategory = props.route.params?.sub ?? '';
    const prodName = props.route.params?.title ?? '';
    const prodId = props.route.params?.id ?? '';
    const product = PRODUCTS.find(prod => prod.catName === category && prod.subName === subCategory && prod.name === prodName);
    const currentProductIsLiked = useSelector(state => state.products.likedProducts.some(prod => prod.id === prodId));
    const dispatch = useDispatch();
    const addToLiked = () => {
        dispatch(productActions.likeProduct(prodId));
    }
    return (
        <ScrollView>
            <ImageCarousel
                imageUrls={product.imageUrls}
                height={height}
                width={width}
            />
            <Text style={{ fontWeight: "800", fontSize: 22, marginTop: 10, marginLeft: 5 }}>S${product.price}</Text>
            <View style={{ flexDirection: 'row', margin: 5 }}>
                <Image
                    source={{ uri: 'https://previews.123rf.com/images/telmanbagirov/telmanbagirov1701/telmanbagirov170100150/69471209-thin-line-clock-icon-on-white-background.jpg' }}
                    style={{ width: 45, height: 45, borderRadius: 50 }}
                />
                <Text style={{ alignSelf: 'center', paddingLeft: 5, fontSize: 16 }}>{product.createdAt}</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 5 }}>
                <Image
                    source={{ uri: 'https://media.istockphoto.com/vectors/checklist-icon-in-flat-style-to-do-list-symbol-vector-id944990946?k=6&m=944990946&s=170667a&w=0&h=ncmf9VANoJGY-lVNRyK2TNLW_VVAIBBq_ZDrkP6NP14=' }}
                    style={{ width: 45, height: 45, borderRadius: 50 }}
                />
                <Text style={{ alignSelf: 'center', paddingLeft: 5, fontSize: 16 }}>In {product.catName.trim()}</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, paddingHorizontal: 5, width: width / 1.15 }}>
                <Image
                    source={{ uri: 'https://previews.123rf.com/images/mattbadal/mattbadal1910/mattbadal191000007/132568508-pen-icon-vector-illustration-isolated-on-white-background.jpg' }}
                    style={{ width: 45, height: 45, borderRadius: 50 }}
                />
                <Text style={{ alignSelf: 'center', paddingLeft: 5, fontSize: 16 }}>{product.description}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}>
                <View style={{ width: 150 }}>
                    <Button title="Buy Now" onPress={() => { props.navigation.navigate('BuyNow', {id: prodId}) }} color='#bf0a46' />
                </View>
                <View style={{ width: 150 }}>
                    <Button
                        title={currentProductIsLiked ? "Unlike" : "Like"}
                        onPress={addToLiked}
                        color='#bf0a46' />
                </View>
            </View>
        </ScrollView>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.title ? navData.route.params.title : navData.route.params.category
    };
};

export default ProductDetailsScreen;