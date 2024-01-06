import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const ItemPrr = ({ pr, navigateToDetaiProduct }) => {
    const imageSource = pr.image ? { uri: pr.image } : null;
    const handlePress = () => {
        navigateToDetaiProduct(pr.id);
    };
    return (
        <View style={{ flex: 1, margin: 5, backgroundColor:'#F5F5F5' }}>
            <TouchableOpacity onPress={handlePress} style={{ flexDirection: 'row', alignItems: 'center', margin:5 }}>
                <View >
                    <ImageBackground
                        style={styles.image}
                        source={imageSource}        >
                    </ImageBackground>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{pr.namePr}</Text>
                    <Text>{pr.describePr}</Text>
                    <Text>Số lượng: {pr.numberPr}</Text>
                </View>
                <TouchableOpacity onPress={handlePress} style={{marginLeft:'auto'}}>
                <Icon name='eye' size={25}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default ItemPrr

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 5,
    }
})