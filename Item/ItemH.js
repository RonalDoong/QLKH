import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const ItemH = ({ Warehouse, navigateToWarehouse }) => {
  const HandlePress = () => {
    navigateToWarehouse(Warehouse.id);
  }
  return (
    <View style={{flex:1, marginTop:10}}>
      <TouchableOpacity onPress={HandlePress} style={styles.container}>
        <Icon name="cube" size={60} color="#EE4000" />
        <Text style={{color:'white', fontSize:18, fontWeight:'bold', marginLeft:10}}>{Warehouse.nameWarehouse}</Text>
        <Icon name='list' size={19} color="white" marginLeft={'auto'}/>
      </TouchableOpacity>
    </View>
  )
}

export default ItemH

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: 'black',
    borderRadius:5,
    padding:10
  }
})