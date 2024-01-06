import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


const Add = (props) => {
  const [image, setImage] = useState(null);
  const [namePr, setNamePr] = useState('')
  const [codePr, setCodePr] = useState('')
  const [describePr, setDescribePr] = useState('')
  const [pricePr, setPricePr] = useState('')
  const [numberPr, setNumberPr] = useState('')

  const [namePrErr, setNamePrErr] = useState('')
  const [codePrErr, setCodePrErr] = useState('')
  const [describePrErr, setDescribePrErr] = useState('')
  const [pricePrErr, setPricePrErr] = useState('')
  const [numberPrErr, setNumberPrErr] = useState('')

  //Camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission denied');
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

//libary
const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission denied');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

  const addProduct = async () => {
    if (namePr.length === 0) {
      setNamePrErr('Không để trống mục cần điển');
      return;
    } else {
      setNamePrErr('');
    }
    if (codePr.length === 0) {
      setCodePrErr('Không để trống mục cần điển');
      return;
    } else {
      setCodePrErr('');
    }
    if (describePr.length === 0) {
      setDescribePrErr('Không để trống mục cần điển');
      return;
    } else {
      setDescribePrErr('');
    }
    if (pricePr.length === 0) {
      setPricePrErr('Không để trống mục cần điển');
      return;
    } else {
      setPricePrErr('');
    }
    if (numberPr.length === 0) {
      setNumberPrErr('Không để trống mục cần điển');
      return;
    } else {
      setNumberPrErr('');
    }
    const data = {
      image: image,
      namePr: namePr,
      codePr: codePr,
      describePr: describePr,
      pricePr: pricePr,
      numberPr: numberPr,
    }
    try {
      const response = await fetch('http://192.168.10.5:3000/Product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Them thanh cong');
        clearInput('');
      } else {
        // Handle error response
        console.log('Them that bai');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const clearInput = () => {
    setImage(''),
    setNamePr(''),
      setCodePr('');
    setDescribePr('');
    setPricePr('');
    setNumberPr('')
  };

  const navigateToBack = () => {
    props.navigation.goBack();
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#EE4000' }}>
      <View style={{ marginTop: '7%' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateToBack}>
            <Icon name='chevron-back' size={35} />
          </TouchableOpacity>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Thêm sản phẩm</Text>
        </View>

        <View style={{ alignItems: 'center', backgroundColor:'white', height:'100%' }}>
          <View style={{marginTop:5}}>
          {image ? (
                    <Image source={{ uri: image }} style={styles.Image} onChangeText={setImage}/>
                ) : (
                    <View style={styles.Image} onChangeText={setImage}></View>
                )}
            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
              <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
                <Icon name='camera' size={30} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCamera} onPress={chooseImage}>
                <Icon name='image' size={30} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput placeholder='Nhập tên sản phẩm' value={namePr} onChangeText={setNamePr} style={styles.TextInput} />
          <Text style={styles.txtErr}>{namePrErr}</Text>
          <TextInput placeholder='Nhập mã sản phẩm' value={codePr} onChangeText={setCodePr} style={styles.TextInput} />
          <Text style={styles.txtErr}>{codePrErr}</Text>
          <TextInput placeholder='Mô tả sản phẩm' value={describePr} onChangeText={setDescribePr} style={styles.TextInput} />
          <Text style={styles.txtErr}>{describePrErr}</Text>
          <TextInput placeholder='Nhập giá sản phẩm' value={pricePr} onChangeText={setPricePr} style={styles.TextInput} />
          <Text style={styles.txtErr}>{pricePrErr}</Text>
          <TextInput placeholder='Nhập số lượng sản phẩm' value={numberPr} onChangeText={setNumberPr} style={styles.TextInput} />
          <Text style={styles.txtErr}>{numberPrErr}</Text>
          <TouchableOpacity onPress={addProduct} style={styles.btnBtn}>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Thêm sản phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearInput} style={styles.btnBtn}>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Hủy</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default Add

const styles = StyleSheet.create({
  TextInput: {
    width: '90%',
    height: 40,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10
  },
  Image: {
    borderWidth: 0.5,
    width: 320,
    height: 190,
  },
  btnCamera: {
    width: 130,
    height: 40,
    backgroundColor: 'black',
    margin: 10,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 5
  },
  btnBtn: {
    width: '90%',
    height: 40,
    backgroundColor: 'black',
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtErr: {
    color: 'red',
  }
})