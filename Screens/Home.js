import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemH from '../Item/ItemH';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = (props) => {
    const [modal, setModal] = useState('');
    const [nameWarehouse, setNameWarehouse] = useState('');
    const [nameWarehouseErr, setNameWarehouseErr] = useState('');

    const [listWarehouse, setListWarehouse] = useState('');

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

    const addWarehouse = async () => {
        if (nameWarehouse.length === 0) {
            setNameWarehouseErr('Vui lòng nhập tên kho hàng.');
            return;
        }
        const data = {
            nameWarehouse: nameWarehouse,
        }
        try {
            const response = await fetch('http://192.168.10.5:3000/Warehose', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Them thanh cong');
                closeModal('');
                setNameWarehouse('');
            } else {
                // Handle error response
                console.error('Them that bai:', response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchListWarehouse = async () => {
        try {
            const response = await fetch('http://192.168.10.5:3000/Warehose');
            const data = await response.json();
            setListWarehouse(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchListWarehouse();
        // Thiết lập Polling bằng cách gửi yêu cầu và cập nhật thông tin mới từ máy chủ mỗi 5 giây
        const interval = setInterval(() => {
            fetchListWarehouse();
        }, 1000);

        // Xóa Polling khi component bị hủy
        return () => clearInterval(interval);
    }, []);

    const showModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
        setNameWarehouseErr('');
    }

    const navigateToWarehouse = (id) => {
        props.navigation.navigate('Warehouse', { id });
    };
    const navigateToAddPr = () => {
        props.navigation.navigate('Add');
    };
    const navigateToProducts = () => {
        props.navigation.navigate('Products');
    };

    const navigateToSearch = () => {
        props.navigation.navigate('Search');
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#EE4000' }}>
            <View style={{ marginTop: '15%', alignItems: 'center' }}>
                <Icon name='cube' size={35} marginBottom={5}/>
                <TouchableOpacity style={styles.txtSearch} onPress={navigateToSearch}>
                    <Icon name='search' size={30} />
                    <Text style={{ color: 'gray' }}>Tìm kiếm kho hàng...</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'white', height: '82%', marginTop: '2%', borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={showModal} style={styles.btnAdd}><Text style={{ color: 'white', fontWeight: 'bold' }}>Thêm kho</Text></TouchableOpacity>
                    <TouchableOpacity onPress={navigateToAddPr} style={styles.btnAdd}><Text style={{ color: 'white', fontWeight: 'bold' }}>Thêm sản phẩm</Text></TouchableOpacity>
                </View>

                <Text style={{ color: 'black', fontWeight: 'bold' }}>Danh sách sản phẩm:</Text>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={navigateToProducts} style={styles.btnListPr}>
                        <Icon name='cart' color={'#EE4000'} size={40} />
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>Sản phẩm ({numberProduct})</Text>
                        <Icon name='list' color={'white'} size={29} marginLeft={'auto'} />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 10 }}>Danh sách kho hàng:</Text>
                <ScrollView>
                    {listWarehouse && listWarehouse.map((Warehouse, index) => (
                        <ItemH key={index} Warehouse={Warehouse} navigateToWarehouse={navigateToWarehouse} />
                    ))}
                </ScrollView>
            </View>
            <Modal visible={modal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Icon name='cube' size={40} />
                        <TextInput placeholder='Nhap ten kho hang moi' value={nameWarehouse} onChangeText={setNameWarehouse} style={styles.modalInput} />
                        <Text style={styles.txtErr}>{nameWarehouseErr}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={addWarehouse} style={styles.modalBtn}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold" }}>Thêm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.modalBtn}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold" }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    txtSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 330,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 10
    },
    btnAdd: {
        backgroundColor: 'black',
        width: 150,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    btnListPr: {
        backgroundColor: 'black',
        width: '100%',
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        flexDirection: 'row'
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
    modalInput: {
        width: '95%',
        height: 40,
        justifyContent: "center",
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        paddingLeft: 10,
    },
    modalBtn: {
        backgroundColor: 'black',
        width: '45%',
        height: 35,
        margin: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    txtErr: {
        color: 'red'
    }
})