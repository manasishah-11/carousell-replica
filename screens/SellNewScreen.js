import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as ImagePicker from 'expo-image-picker';
import CustomHeaderButton from '../components/CustomHeaderButton';
import * as sellItemActions from '../store/actions/sellItem_action';

const SellNewScreen = props => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const saveItem = () => {
        dispatch(sellItemActions.newSellItem(image, name, price));
        props.navigation.navigate('Sell');
    };
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='OK'
                        iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                        onPress={saveItem}
                    />
                </HeaderButtons>
            ),
            headerTitle: 'Add'
        });
    }, [saveItem]);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const changeNameHandler = text => {
        setName(text);
    }
    const changePriceHandler = text => {
        setPrice(text);
    }
    return (
        <View style={{ margin: 30 }}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeNameHandler}
                value={name}
            />
            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changePriceHandler}
                value={price}
            />
            {!image &&
                <View style={{ width: 250, alignSelf: 'center', marginVertical: 10 }}>
                    <Button title="Pick an image from gallery" onPress={pickImage} color='#bf0a46' />
                </View>
            }
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    label: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default SellNewScreen;
