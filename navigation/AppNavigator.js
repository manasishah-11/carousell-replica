import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen, { screenOptions as HomeScreenOptions } from '../screens/HomeScreen';
import CategoryScreen, { screenOptions as CategoryScreenOptions } from '../screens/CategoryScreen';
import CategoriesScreen, { screenOptions as CategoriesScreenOptions } from '../screens/CategoriesScreen';
import SubCategoryScreen, { screenOptions as SubCategoryScreenOptions } from '../screens/SubCategoryScreen';
import ProductDetailsScreen, { screenOptions as ProductDetailsScreenOptions } from '../screens/ProductDetailsScreen';
import BuyNowScreen from '../screens/BuyNowScreen';
import SellScreen, { screenOptions as SellScreenOptions } from '../screens/SellScreen';
import SellNewScreen from '../screens/SellNewScreen';
import LikedItemsScreen from '../screens/LikedItemsScreen';

const defaultNavOptions = {
    headerTintColor: '#bf0a46'
}

const ExploreNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={defaultNavOptions}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={HomeScreenOptions}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={CategoryScreenOptions}
            />
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={CategoriesScreenOptions}
            />
            <Stack.Screen
                name="SubCategory"
                component={SubCategoryScreen}
                options={SubCategoryScreenOptions}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={ProductDetailsScreenOptions}
            />
            <Stack.Screen
                name="BuyNow"
                component={BuyNowScreen}
            />
            <Stack.Screen
                name="LikedItems"
                component={LikedItemsScreen}
            />
        </Stack.Navigator>
    );
};

const SellNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={defaultNavOptions}>
            <Stack.Screen
                name="Sell"
                component={SellScreen}
                options={SellScreenOptions}
            />
            <Stack.Screen
                name="SellNew"
                component={SellNewScreen}
            />
        </Stack.Navigator>
    );
};

const AppNavigator = props => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'red',
                    labelStyle: {
                        fontSize: 14
                    }
                }}
            >
                <Tab.Screen
                    name="Explore"
                    component={ExploreNavigator}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Ionicons name={Platform.OS === 'android' ? 'md-search' : 'ios-search'} size={25} color={color} />
                            );
                        }
                    }}
                />
                <Tab.Screen
                    name="Sell"
                    component={SellNavigator}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={25} color={color} />
                            );
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;