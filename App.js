import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './LoginRegister/Login';
import Register from './LoginRegister/Register';
import Home from './Screens/Home';
import Serach from './Screens/Serach';
import Add from './Screens/Add';
import WareHouse from './Screens/WareHouse';
import Proudcts from './Screens/Proudcts';
import DetailPr from './Screens/DetailPr';
import SearchPr from './Screens/SearchPr';

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Login'>
        <stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <stack.Screen name='Search' component={Serach} options={{headerShown: false}}/>
        <stack.Screen name='Add' component={Add} options={{headerShown: false}}/>
        <stack.Screen name='Warehouse' component={WareHouse} options={{headerShown: false}}/>
        <stack.Screen name='Products' component={Proudcts} options={{headerShown: false}}/>
        <stack.Screen name='DetailPr' component={DetailPr} options={{headerShown: false}}/>
        <stack.Screen name='SearchPr' component={SearchPr} options={{headerShown: false}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
