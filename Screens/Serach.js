import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ItemH from '../Item/ItemH';


const Serach = (props) => {
  const [wareHouse, setWareHouse] = useState([]); // Danh sách kho
  const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
  const [filteredWH, setFilteredWH] = useState([]); // Danh sách kho đã lọc

  useEffect(() => {
    fetchWH();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchKeyword]);

  const fetchWH = async () => {
    try {
      const response = await fetch('http://192.168.10.5:3000/Warehose');
      const data = await response.json();
      if (data) {
        setWareHouse(data);
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
      setFilteredWH([]); // Xóa danh sách đã lọc khi searchKeyword trống rỗng
    } if (wareHouse && searchKeyword) {
      const filteredWH = wareHouse.filter(wh =>
        wh.nameWarehouse && wh.nameWarehouse.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredWH(filteredWH);
    }
  };

  const navigateToWarehouse = (id) => {
    props.navigation.navigate('Warehouse', { id });
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
          <TextInput placeholder='Mời nhập tên kho cần tìm...' onChangeText={text => setSearchKeyword(text)}
            value={searchKeyword}></TextInput>
        </View>
      </View>
      <View style={{ backgroundColor: 'white', height: '90%', marginTop: 10 }}>
        <ScrollView>
          {filteredWH.map((Warehouse, index) => (
            <ItemH key={index} Warehouse={Warehouse} navigateToWarehouse={navigateToWarehouse} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Serach

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