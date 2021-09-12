import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {Row, Table} from 'react-native-table-component';

export default class FarmerDashboard extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const {navigation} = this.props;
    const UserName = navigation.getParam('usernameInput', 'No user');
    const UserCategory = navigation.getParam('category', 'No Category');

    return (
      <View>
        <View
          style={{
            height: 200,
            width: 340,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 6,
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 0,
              height: 0
              },
            elevation: 5,
            shadowOpacity: 0.5,
            shadowRadius: 20,
          }}>
          <Swiper autoplay={true} autoplayTimeout={2.5}>
          <View>
              <Image
                source={require('../pictures/1.jpg')}
                style={{height: 200, width: 338, borderRadius: 6,}}
              />
          </View>
          <View>
              <Image
                source={require('../pictures/3.jpg')}
                style={{height: 200, width: 338, borderRadius: 6,}} />
          </View>
          <View>
              <Image
                source={require('../pictures/2.jpg')}
                style={{height: 200, width: 338, borderRadius: 6,}} />
          </View>
        </Swiper>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Profile', {username: UserName, category: UserCategory})}>
            <Image
              source={require('../pictures/farmer.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => this.props.navigation.navigate('FarmerOrderList', {username: UserName, category: UserCategory})}>
            <Image
              source={require('../pictures/icons8-list-60.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Order List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('Stock', {username: UserName, category: UserCategory})}>
            <Image
              source={require('../pictures/packages.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Stock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button4Row}>
          <TouchableOpacity style={styles.button4}>
            <Image
              source={require('../pictures/item.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5} onPress={() => this.props.navigation.navigate('Login')}>
            <Image
              source={require('../pictures/logout.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 104,
    height: 104,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  button2: {
    width: 104,
    height: 104,
    marginLeft: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  button3: {
    width: 104,
    height: 104,
    marginLeft: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  buttonRow: {
    height: 74,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  button4: {
    width: 104,
    height: 104,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  button5: {
    width: 104,
    height: 104,
    marginLeft: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  button6: {
    width: 104,
    height: 104,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginLeft: 12,
  },
  button4Row: {
    height: 74,
    flexDirection: 'row',
    marginTop: 45,
    marginLeft: 10,
    marginRight: 10,
  },
  profileStyle: {
    width: 74,
    height: 74,
    alignSelf: 'center',
  },
  profileTextStyle: {
    textAlign: 'center',
  },
});
