import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import ItemPrr from '../Item/ItemPrr';
import Icon from 'react-native-vector-icons/Ionicons';


const WareHouse = (props) => {
  const [selectedPr, setSelectedPr] = useState('');
  const [Prlist, setPrlist] = useState([]);
  const [Pr, setPr] = useState([]);
  const [WareHouse, setWareHouse] = useState([]);
  const [modalAddPr, setModalAddpr] = useState('');

  const [numberProducts, setNumberProducts] = useState(0);

  useEffect(() => {
    setNumberProducts(Pr?.length || 0);
  }, [Pr]);

  const showModal = () => {
    setModalAddpr(true);
  }
  const closeModal = () => {
    setModalAddpr(false);
  }

  //lấy ra thông tin sản phẩm
  useEffect(() => {
    fetchPrList();
  }, []);
  const fetchPrList = async () => {
    try {
      const response = await fetch('http://192.168.10.5:3000/Product');
      const data = await response.json();
      setPrlist(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //Lay ra thong tin kho
  useEffect(() => {
    // Thiết lập Polling bằng cách gửi yêu cầu và cập nhật thông tin mới từ máy chủ mỗi 5 giây
    const interval = setInterval(() => {
      fetch('http://192.168.10.5:3000/Warehose')
        .then(response => response.json())
        .then(data => {
          const WarehouseData = data.find(item => item.id === props.route.params.id);
          setWareHouse(WarehouseData);
          setPr(WarehouseData.Products)
        })
        .catch(error => {
          console.error(error);
        });
    }, 1000);

    // Xóa Polling khi component bị hủy
    return () => clearInterval(interval);
  }, []);


  //them san pham
  const AddPr = async () => {
    try {
      if (WareHouse) {
        const updatedProducts = [
          ...(WareHouse.Products || []),
          {
            namePr: selectedPr,
            ...(Prlist.find((Pr) => Pr.namePr === selectedPr) || {}),
          },
        ];
  
        const response = await fetch(`http://192.168.10.5:3000/Warehose/${props.route.params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Products: updatedProducts,
          }),
        });
  
        if (response.ok) {
          closeModal();
          console.log("Thêm thành công!")
        } else {
          console.log("Thêm thất bại!")
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigateToDetaiProduct = (id) => {
    props.navigation.navigate('DetailPr', { id });
  };

  const navigateToBack = () => {
    props.navigation.goBack();
};

  return (
    <View style={{ backgroundColor: '#EE4000' }}>
      <View style={{ marginTop: "10%", flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={navigateToBack}>
          <Icon name='chevron-back' size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{WareHouse.nameWarehouse}</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={showModal}>
          <Icon name='add-circle' size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>Số lượng mặt hàng: {numberProducts}</Text>
        <ScrollView>
          {Pr && Pr.map((pr, index) => (
            <ItemPrr key={index} pr={pr} navigateToDetaiProduct={navigateToDetaiProduct} />
          ))}
        </ScrollView>
      </View>

      <Modal visible={modalAddPr} animationType='silde' transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name='cube' size={30}/>
            <Text style={styles.modalText}>{selectedPr}</Text>
            <Picker style={styles.modalText} selectedValue={selectedPr}
              onValueChange={(itemValue) => setSelectedPr(itemValue)}>
              {Prlist.map((Pr, index) => (
                <Picker.Item key={index} label={Pr.namePr} value={Pr.namePr} />
              ))}
            </Picker>
            <TouchableOpacity onPress={AddPr} style={styles.modalButom}>
              <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={[styles.modalButom,{backgroundColor:'gray'}]}>
              <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>

  )
}

export default WareHouse

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalText: {
    marginBottom:5,
    width: '90%',
    height: 30,
    backgroundColor: '#F5F5F5'
  },
  modalButom:{
    width:'90%',
    height:30,
    backgroundColor:'#00BFFF',
    borderRadius:10,
    justifyContent:'center',
    alignItems:"center",
    marginBottom:5
  }
})