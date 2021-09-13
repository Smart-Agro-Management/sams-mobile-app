import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, HeaderBackButton, HeaderHeightContext, useHeaderHeight} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import Test, {Username, Language} from './components/Test';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';
import Header from './components/Header';
import PlaceOrder from './components/PlaceOrder';
import Profile from './components/Profile';
import PlaceOrderItem from './components/PlaceOrderItem';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import Farmer from './components/Farmer';
import FarmerOrderList from './components/FarmerOrderList';
import Stock from './components/Stock';
import AddItem from './components/AddItem';
import FarmerListOrder from './components/FarmerListOrder';
import FarmerListStock from './components/FarmerListStock';
import FarmerListAddItem from './components/FarmerListAddItem';
import UpdateItem from './components/UpdateItem';
import AddFarmer from './components/AddFarmer';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerLeft: () => {
        return null;
      },
    },
  },
  FarmerDashboard: {
    screen: FarmerDashboard,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerLeft: () => {
        return null;
      },
    },
  },
  AgentDashboard: {
    screen: AgentDashboard,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerLeft: () => {
        return null;
      },
    },
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      headerShown: false,
    },
  },
  PlaceOrder: {
    screen: PlaceOrder,
  },
  Test: {
    screen: Test,
  },
  
  Profile: {
    screen: Profile,
  },
  PlaceOrderItem: {
    screen: PlaceOrderItem,
    navigationOptions: {
      headerShown: false,
    },
  },
  Cart: {
    screen: Cart,
  },
  OrderList: {
    screen: OrderList,
  },
  Farmer: {
    screen: Farmer,
  },
  FarmerOrderList: {
    screen: FarmerOrderList,
  },
  Stock: {
    screen: Stock,
    navigationOptions: {
      headerShown: false,
    },
  },
  AddItem: {
    screen: AddItem,
  },
  FarmerListOrder: {
    screen: FarmerListOrder,
  },
  FarmerListStock: {
    screen: FarmerListStock,
  },
  FarmerListAddItem: {
    screen: FarmerListAddItem,
  },
  UpdateItem: {
    screen: UpdateItem,
  },
  AddFarmer: {
    screen: AddFarmer,
  },
});

const AppContainer = createAppContainer(AppNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
