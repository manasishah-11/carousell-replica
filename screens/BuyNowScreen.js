import React, { useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { PRODUCTS, FRESH_FINDS } from '../data/dummy-data';

const BuyNowScreen = props => {
	const prodId = props.route.params?.id ?? '';
	const product = PRODUCTS.find(prod => prod.id === prodId) ? PRODUCTS.find(prod => prod.id === prodId) : FRESH_FINDS.find(prod => prod.id === prodId);
	const [address, setAddress] = useState(null);
	const _getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			setAddress('Permission to access location was denied');
		}
		let location = await Location.getCurrentPositionAsync({});
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude
			},${location.coords.longitude
			}&key=AIzaSyCw5XeWs_aLFGwYHBFwvclHCFJUmC0JkCM`);
		const resData = await response.json();
		let formattedAddress = resData.results[0].formatted_address;
		setAddress(formattedAddress);
	};
	return (
		<View style={{ margin: 5 }}>
			<View style={{ padding: 5, marginVertical: 5 }}>
				<View style={{ flexDirection: 'row' }}>
					<Image source={{ uri: product.imageUrls[0] }} style={{ width: 80, height: 80, borderRadius: 80 }} />
					<View style={{ marginLeft: 20, alignSelf: 'center' }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7f8080' }}>{product.name}</Text>
						<Text>S${product.price}</Text>
					</View>
				</View>
			</View>
			{address ?
				<View style={{ flexDirection: 'row', padding: 5, marginVertical: 5 }}>
					<Text style={{ fontSize: 16, fontWeight: '700', width: '37%', color: '#bf0a46' }}>Current Address: </Text>
					<Text style={{ fontSize: 16, width: '63%' }}>{address}</Text>
				</View> :
				<View style={{ padding: 10 }}>
					<View style={{ width: 150, alignSelf: 'flex-end' }}>
						<Button title="Get Location" onPress={_getLocationAsync} color='#bf0a46' />
					</View>
				</View>
			}
			<View style={{ padding: 5, marginVertical: 5 }}>
				<Text style={{ fontSize: 18, fontWeight: '700', color: '#bf0a46' }}>Payment</Text>
				<View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 5, marginVertical: 5 }}>
					<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 5 }}>
						<Image
							source={{ uri: 'https://images.news18.com/ibnlive/uploads/2020/02/UPI.jpg' }}
							style={{ width: 35, height: 35, borderRadius: 35 }}
						/>
						<Text style={{ paddingLeft: 15, alignSelf: 'center', color: '#2a2b2a' }}>UPI</Text>
					</View>
					<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 5 }}>
						<Image
							source={{ uri: 'https://w7.pngwing.com/pngs/98/991/png-transparent-computer-icons-bank-icon-design-screenshot-bank-blue-angle-logo.png' }}
							style={{ width: 35, height: 35, borderRadius: 35 }}
						/>
						<Text style={{ paddingLeft: 15, alignSelf: 'center', color: '#2a2b2a' }}>Net Banking</Text>
					</View>
					<View style={{ flexDirection: 'row', padding: 5 }}>
						<Image
							source={{ uri: 'https://img.flaticon.com/icons/png/512/1554/1554401.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' }}
							style={{ width: 35, height: 35, borderRadius: 35 }}
						/>
						<Text style={{ paddingLeft: 15, alignSelf: 'center', color: '#2a2b2a' }}>Cash on Delivery</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default BuyNowScreen;