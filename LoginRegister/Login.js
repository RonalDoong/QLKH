import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FontAwesome } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordEErr] = useState('');

  const [users, setUsers] = useState([]);

  const ClearInput = () => {
    setUsername('');
    setPassword('');
  };
  const ClearErr = () => {
    setUsernameErr('');
    setPasswordEErr('');
  };

  async function fetchData() {
    try {
      const API_URL = 'http://192.168.10.5:3000/users';
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch data failed ' + error);
    }
  };

  useEffect(() => {
    fetchData();
    // Thiết lập Polling bằng cách gửi yêu cầu và cập nhật thông tin mới từ máy chủ mỗi 5 giây
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    // Xóa Polling khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  const saveUserInfoToStorage = async (userInfo) => {
    try {
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('userInfo', jsonValue);
    } catch (error) {
      console.error('Error saving manager info to AsyncStorage: ' + error)
    }
  };

  const doLogin = () => {
    if (username.length == 0) {
      setUsernameErr('Vui lòng không để trống tên đăng nhập!');
      return;
    } if (password.length == 0) {
      setPasswordEErr('Vui lòng không để trống mật khẩu đăng nhập!');
      return;
    }
    let request = { username: username, password: password };

    console.log('auInfo: ' + JSON.stringify(request));

    const userInfo = users.find((users) => users.username === request.username);

    if (userInfo) {
      if (userInfo.password !== request.password) {
        ClearErr();
        setPasswordEErr('Nhập sai Password! Vui lòng nhập lại');
        return;
      } else {
        ClearErr();
        Alert.alert('Notification', 'Bạn có chắc muốn đăng nhập ' + request.username, [
          {
            text: 'OK',
            onPress: () => {
              navigateToHome();
              saveUserInfoToStorage(userInfo); // Lưu thông tin tài khoản vào AsyncStorage
              ClearErr();
              ClearInput();
            },
          },
          { text: 'Cancel', onPress: () => console.log('Press Cancel') },
        ]);
        return;
      }
    }
    ClearErr();
    setUsernameErr('Nhập sai Username! Vui lòng nhập lại');
  };;

  const navigateToRegister = () => {
    props.navigation.navigate('Register');
  };
  const navigateToHome = () => {
    props.navigation.navigate('Home');
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: '10%', alignItems: 'center' }}>
        <Image source={require('../Image/Logo1.jpg')} style={styles.Logo} />
        <View style={[styles.TextInput, { flexDirection: "row", alignItems: 'center', padding: 10 }]}>
          <Icon name='person' size={25} color={'#EE4000'} />
          <TextInput placeholder='Nhap username' value={username} onChangeText={setUsername} style={{ marginLeft: 10 }}></TextInput>
        </View>
        <Text style={styles.txtErr}>{usernameErr}</Text>
        <View style={[styles.TextInput, { flexDirection: "row", alignItems: 'center', padding: 10 }]}>
          <FontAwesome name='lock' size={25} color={'#EE4000'} />
          <TextInput placeholder='Nhap password' value={password} onChangeText={setPassword} secureTextEntry={true} style={{ marginLeft: 15 }}></TextInput>
        </View>
        <Text style={styles.txtErr}>{passwordErr}</Text>
        <TouchableOpacity onPress={doLogin} style={styles.btn}>
          <Text style={{color:'#EE4000', fontSize:17, fontWeight:'bold'}}>Đăng nhập</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  Logo: {
    width: 150,
    height: 150
  },
  TextInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 2,
  },
  btn: {
    width: '90%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    marginTop: 10,
    borderRadius:10,
  },
  txtErr: {
    color: 'red',
  }
})