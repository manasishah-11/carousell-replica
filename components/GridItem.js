import React from 'react';
import { View, StyleSheet } from 'react-native';

const GridItem = props => {
    return (
        <View style={styles.gridItem}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    }
});

export default GridItem;