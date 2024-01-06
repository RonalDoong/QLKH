import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailPr = (props) => {
    const [namePrUp, setNamePrUp] = useState('');
    const [codePrUp, setCodePrUp] = useState('');
    const [describePrUp, setDescribePrUp] = useState('');
    const [pricePrUp, setPricePrUp] = useState('');
    const [numberPrUp, setNumberPrUp] = useState('');

    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);


    const showModelUpdate = () => {
        setModalUpdate(true);
    };
    const closeModalUpdate = () => {
        setModalUpdate(false);
    };

    const showModelDelete = () => {
        setModalDelete(true);
    };
    const closeModalDelete = () => {
        setModalDelete(false);
    };


    const [Pr, setPr] = useState({});
    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://192.168.10.5:3000/Product')
                .then(response => response.json())
                .then(data => {
                    const productsData = data.find(item => item.id === props.route.params.id);
                    setPr(productsData);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 1000);

        // Xóa Polling khi component bị hủy
        return () => clearInterval(interval);
    }, []);

    // Update
    const updateProduct = async () => {
        const data = {
            namePr: namePrUp,
            codePr: codePrUp,
            describePr: describePrUp,
            pricePr: pricePrUp,
            numberPr: numberPrUp,
        };

        try {
            const response = await fetch(
                `http://192.168.10.5:3000/Product/${props.route.params.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                // Xử lý khi cập nhật thành công
                console.log('Cập nhật thành công');
                closeModalUpdate();
            } else {
                // Xử lý khi cập nhật không thành công
                console.error('Lỗi khi cập nhật:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    //Delete
    const deleteProduct = async () => {
        try {
            const deleteResponse = await fetch(`http://192.168.10.5:3000/Product/${props.route.params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (deleteResponse.ok) {
                // Xóa thành công
                console.log('Xóa thành công');
                navigateToBack();
            } else {
                // Xóa không thành công
                console.log('Xóa không thành công');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };
    const navigateToBack = () => {
        props.navigation.goBack();
    };

    const imageSource = Pr.image ? { uri: Pr.image } : null;

    return (
        <View style={{ flex: 1, backgroundColor: '#EE4000' }}>
            <View style={{ flexDirection: 'row', marginTop: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={navigateToBack}>
                    <Icon name='chevron-back' size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Chi tiết sản phẩm</Text>
            </View>
            <View style={{ height: '100%', backgroundColor: 'white' }}>
                <View style={{ margin: 5 }}>
                    <View>
                        <ImageBackground
                            style={styles.image}
                            source={imageSource}        >
                        </ImageBackground>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Thông tin sản phẩm:</Text>
                    <View style={{ marginTop: 5 }}>
                        <Text>Tên sản phẩm:</Text>
                        <Text style={styles.Text}>{Pr && Pr.namePr}</Text>
                        <Text>Mã sản phẩm:</Text>
                        <Text style={styles.Text}>{Pr && Pr.codePr}</Text>
                        <Text>Mô tả sản phẩm:</Text>
                        <Text style={styles.Text}>{Pr && Pr.describePr}</Text>
                        <Text>Giá sản phẩm:</Text>
                        <Text style={styles.Text}>{Pr && Pr.pricePr}</Text>
                        <Text>Số lượng sản phẩm:</Text>
                        <Text style={styles.Text}>{Pr && Pr.numberPr}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={showModelUpdate} style={styles.btn}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}>Chỉnh sửa thông tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showModelDelete} style={[styles.btn, { backgroundColor: 'red' }]}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={modalUpdate} animationType='slide' transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Icon name='create' size={40} color={'#EE4000'} />
                            <TextInput value={namePrUp} onChangeText={setNamePrUp} style={styles.TextInput} />
                            <TextInput value={codePrUp} onChangeText={setCodePrUp} style={styles.TextInput} />
                            <TextInput value={describePrUp} onChangeText={setDescribePrUp} style={styles.TextInput} />
                            <TextInput value={pricePrUp} onChangeText={setPricePrUp} style={styles.TextInput} />
                            <TextInput value={numberPrUp} onChangeText={setNumberPrUp} style={styles.TextInput} />
                            <TouchableOpacity onPress={updateProduct} style={styles.modalBtn}><Text style={{ fontWeight: 'bold', color: 'white' }}>Chỉnh sửa</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModalUpdate} style={[styles.modalBtn, { backgroundColor: 'white', borderWidth: 2 }]}><Text style={{ fontWeight: 'bold' }}>Hủy bỏ</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <Modal visible={modalDelete} animationType='slide' transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Icon name='trash' size={20} color={'red'} />
                        <Text style={{ fontWeight: "bold" }}>Ban co chac muon xoa?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={deleteProduct} style={styles.bntDelete}><Text style={{ color: 'white', fontWeight: 'bold' }}>Xóa</Text></TouchableOpacity>
                            <TouchableOpacity onPress={closeModalDelete} style={[styles.bntDelete, { backgroundColor: '#00BFFF' }]}><Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DetailPr;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
    },
    Text: {
        height: 30,
        fontSize: 15,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: 'black',
        width: '90%',
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 10,
    },
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
    TextInput: {
        width: '90%',
        height: 30,
        fontSize: 15,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    modalBtn: {
        width: '80%',
        backgroundColor: 'black',
        height: 30,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    bntDelete: {
        width: 60,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    }
});