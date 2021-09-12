import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {Row, Table} from 'react-native-table-component';

export default class AgentDashboard extends Component {

  constructor(props){
    super(props);

    this.state={
      username: '',
      category: '',
      Name: '',
      City: '',
      Phone: '',
      NID: '',
      Password: '',
      DateOfBirth: '',
    }
  }


  // componentDidMount(){
        
  //       const {navigation} = this.props;
  //       const UserName = navigation.getParam('usernameInput', 'No User');
  //       const UserCategory = navigation.getParam('category', 'No Category');

  //       this.setState({
  //         username: UserName,
  //         category: UserCategory,
  //       });
    
  // }


  // ProfileDataFetching = () =>{

  //   const {username} = this.state;
  //   const {category} = this.state;
        
  //       fetch('http://192.168.1.5:8080/SP02/ProfileData.php', {
  //         method: 'POST',
  //         headers: {
  //           'Accpet': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           username: username,
  //           category: category,
  //         }),
  //       })
  //       .then(response=>response.json())
  //       .then(responseJson=>{
  //           this.props.navigation.navigate('Profile', {
  //               Name: responseJson[0].Name,
  //               City: responseJson[0].City,
  //               Phone: responseJson[0].Phone,
  //               NID: responseJson[0].NID,
  //               Password: responseJson[0].Password,
  //               DateOfBirth: responseJson[0].DOB,
  //           });
  //       })
  //       .catch((error)=>{
  //           alert(error);
  //       })
  //   }

  render() {

    const {navigation} = this.props;
    const UserName = navigation.getParam('usernameInput', 'No User');
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
              source={require('../pictures/man.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => this.props.navigation.navigate('Farmer')}>
            <Image
              source={require('../pictures/farmer.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Add Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('FarmerOrderList')}>
            <Image
              source={require('../pictures/icons8-list-60.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Order List</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button4Row}>
          <TouchableOpacity style={styles.button4} onPress={() => this.props.navigation.navigate('Stock')}>
            <Image
              source={require('../pictures/packages.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Stock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5} onPress={() => this.props.navigation.navigate('AddItem')}>
            <Image
              source={require('../pictures/item.png')}
              style={styles.profileStyle}
            />
            <Text style={styles.profileTextStyle}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button6} onPress={() => this.props.navigation.navigate('Login')} >
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
