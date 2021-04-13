import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

const ImageCarousel = props => {
    const [active, setActive] = useState(0);
    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (active !== slide) {
            setActive(slide);
        }
    };
    return (
        <View>
            <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ width: props.width, height: props.height }}
                onScroll={change}
                scrollEventThrottle={25}
            >
                {
                    props.imageUrls.map((imageUrl, index) => (
                        <Image
                            key={index}
                            source={{ uri: imageUrl }}
                            style={{ width: props.width, height: props.height, resizeMode: 'cover' }}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.pagination}>
                {
                    props.imageUrls.map((i, k) => (
                        <Text key={k} style={k == active ? styles.activePaginationText : styles.paginationText}>●</Text>
                    ))
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    paginationText: {
        color: '#888',
        margin: 2
    },
    activePaginationText: {
        color: 'black',
        margin: 2
    }
});

export default ImageCarousel;