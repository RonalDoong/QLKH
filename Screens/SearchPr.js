import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ItemPrr from '../Item/ItemPrr';

const SearchPr = (props) => {
    const [Pr, setPr] = useState([]); // Danh sách kho
    const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
    const [filteredPr, setFilteredPr] = useState([]); // Danh sách kho đã lọc

    useEffect(() => {
        fetchpR();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchKeyword]);

    const fetchpR = async () => {
        try {
            const response = await fetch('http://192.168.10.5:3000/Product');
            const data = await response.json();
            if (data) {
                setPr(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Chức năng tìm kiếm
    // const handleSearch = () => {
    //   if (wareHouse && searchKeyword) {
    //     const filteredWH = wareHouse.filter(wh =>
    //       wh.nameWarehouse && wh.nameWarehouse.toLowerCase().includes(searchKeyword.toLowerCase())
    //     );
    //     setFilteredWH(filteredWH);
    //   }
    // };

    // Chức năng tìm kiếm
    const handleSearch = () => {
        if (searchKeyword.trim() === '') {
            setFilteredPr([]); // Xóa danh sách đã lọc khi searchKeyword trống rỗng
        } if (Pr && searchKeyword) {
            const filteredPr = Pr.filter(pr =>
                pr.namePr && pr.namePr.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setFilteredPr(filteredPr);
        }
    };

    const navigateToDetaiProduct = (id) => {
        props.navigation.navigate('DetailPr', { id });
    };

    const navigateToBack = () => {
        props.navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#EE4000' }}>
            <View style={{ flexDirection: 'row', marginTop: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={navigateToBack}>
                    <Icon name='chevron-back' size={35} />
                </TouchableOpacity>
                <View style={styles.txtSearch}>
                    <Icon name='search' size={30} />
                    <TextInput placeholder='Mời nhập tên sản phẩm cần tìm...' onChangeText={text => setSearchKeyword(text)}
                        value={searchKeyword}></TextInput>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', height: '90%', marginTop: 10 }}>
                <ScrollView>
                    {filteredPr.map((pr, index) => (
                        <ItemPrr key={index} pr={pr} navigateToDetaiProduct={navigateToDetaiProduct} />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default SearchPr

const styles = StyleSheet.create({
    txtSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 310,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 10,
    },
})