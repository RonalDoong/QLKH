import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'

const Register = (props) => {
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordEErr] = useState('');

    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const ClearInput = () => {
        setUsername('');
        setPassword('');
    }
    const ClearErr = () => {
        setUsernameErr('');
        setPasswordEErr('');
    }

    const Register =async () => {
        if (username.length === 0) {
            setPasswordEErr("kHONG de trong name");
            return;
        } if (password.length === 0) {
            setPasswordEErr("khog de trong pass");
            return;
        } else {
            ClearErr();
            try {
                const respone = await fetch("http://192.168.10.5:3000/users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username, password: password, avatar: avatar }),
                  })
                  console.log(respone);
                  if (respone.ok) {
                    //Xử lý thành công
                    console.log("Data posted successfully");
                    ClearInput();
                  } else {
                    //Xử lý khi request không thành công
                    console.log("failed to post data");
                  }
            } catch (error) {

            }
        }
    };

    const SuccessModal = () => {
        return (
          <Modal style={styles.Modal} isVisible={successModalVisible} onBackdropPress={() => setSuccessModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Đăng kí thành công!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setSuccessModalVisible(false)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        );
      };

      const navigateToLogin = () =>{
        props.navigation.navigate('Login');
      };

    return (
        <View style={{flex:1, marginTop:'10%'}}>
            <TextInput placeholder='Nhap username' value={username} onChangeText={setUsername}></TextInput>
            <Text style={styles.txtErr}>{usernameErr}</Text>
            <TextInput placeholder='Nhap password' value={password} onChangeText={setPassword}></TextInput>
            <Text style={styles.txtErr}>{passwordErr}</Text>
            <TouchableOpacity onPress={Register}>
                <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToLogin}> 
                <Text>Login</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    txtErr:{
        color:'red',
    }
})