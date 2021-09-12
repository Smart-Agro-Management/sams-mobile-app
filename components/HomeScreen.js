import { response } from 'express';
import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameInput: '',
      passwordInput: '',
      category: '',
      errorMessage: '',
    };
  }



  ShowErrorMessage = () =>{
    if(this.state.usernameInput == '' || this.state.passwordInput == ''){
      this.setState({errorMessage: 'Field Cannot be empty!'});
    }else{
      this.setState({errorMessage: ''});
    }
  }

  afterPressingButton = () => {

    const {usernameInput} = this.state;
    const {passwordInput} = this.state;

    if(usernameInput != '' || passwordInput != ''){
    fetch('http://192.168.1.5:8080/SP02/Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username : usernameInput,
        password : passwordInput,
      }),
    })
    .then(response => response.json())
    .then(response => {
      if(response[0].Category == 'Farmer'){
        this.props.navigation.navigate('FarmerDashboard', {usernameInput: response[0].Username, category: response[0].Category});
      }
      else if(response[0].Category == 'Customer'){
        this.props.navigation.navigate('Dashboard', {usernameInput: response[0].Username, category: response[0].Category});
      }
      else if(response[0].Category == 'Agent'){
        this.props.navigation.navigate('AgentDashboard', {usernameInput: response[0].Username, category: response[0].Category});
      }
      else{
        alert(response);
      }
    })
    .catch(Error => {
      alert(Error);
    });
    }else{
      this.setState({errorMessage: 'You must provide your Username & Password!'});
    }
  };

  render() {
    return (
      <View style={styles.bodyStyle}>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 60,
              color: 'rgba(126,211,33,1)',
            }}>
            SAMS
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'cambria',
              fontSize: 12,
              marginTop: -12,
              marginBottom: 50,
            }}>
            Smart Agro Management System
          </Text>
        </View>
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onBlur={this.ShowErrorMessage}
          onChangeText={usernameInput => this.setState({usernameInput})}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onBlur={this.ShowErrorMessage}
          onChangeText={passwordInput => this.setState({passwordInput})}
        />
        <Text style={styles.errorMessageStyle}>{this.state.errorMessage}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.afterPressingButton}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
        <View style={styles.newHereRow}>
          <Text style={styles.newHere}>New here?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Registration');
            }}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    justifyContent: 'center',
    height: 39,
    width: 131,
    marginTop: 25,
    marginLeft: 130,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(126,211,33,1)',
  },
  buttonTextStyle: {
    fontFamily: 'roboto-regular',
    color: '#fff',
    height: 40,
    width: 227,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 40,
    width: 227,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(155,155,155,1)',
    borderRadius: 4,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 74,
  },
  newHere: {
    fontFamily: 'roboto-regular',
    color: '#121212',
  },
  signUp: {
    fontFamily: 'roboto-700',
    fontWeight: 'bold',
    color: 'rgba(126,211,33,1)',
    marginLeft: 12,
  },
  newHereRow: {
    height: 17,
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 126,
    marginRight: 125,
  },

  errorMessageStyle:{
    color: '#f11',
    textAlign: 'center',
  },
});
