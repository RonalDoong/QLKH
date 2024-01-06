import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import ItemPrr from '../Item/ItemPrr';
import Icon from 'react-native-vector-icons/Ionicons';


const Products = (props) => {
  const [listPr, setListPr] = useState([]);
  const [numberProduct, setNumberProduct] = useState(0);

  useEffect(() => {
    setNumberProduct(listPr.length);
  }, [listPr]);

  const fetchListPr = async () => {
    try {
      const response = await fetch('http://192.168.10.5:3000/Product');
      const data = await response.json();
      setListPr(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchListPr();

    const interval = setInterval(() => {
      fetchListPr();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navigateToDetaiProduct = (id) => {
    props.navigation.navigate('DetailPr', { id });
  };
  const navigateToBack = () => {
    props.navigation.goBack();
  };
  const navigateToSearchPr = () => {
    props.navigation.navigate('SearchPr');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EE4000' }}>
      <View style={{ flexDirection: 'row', marginTop: '10%', alignItems: 'center', padding:10 }}>
        <TouchableOpacity onPress={navigateToBack}>
          <Icon name='chevron-back' size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.txtSearch} onPress={navigateToSearchPr}>
          <Icon name='search' size={25} />
          <Text style={{color:'gray'}}>Tìm kiếm sản phẩm...</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 'auto', marginRight: 10 }}>SL: {numberProduct}</Text>
      </View>
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <ScrollView>
          {listPr && listPr.map((pr, index) => (
            <ItemPrr key={index} pr={pr} navigateToDetaiProduct={navigateToDetaiProduct} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  txtSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 260,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
  },
});