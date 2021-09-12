import { response } from 'express';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {Cell, Row} from 'react-native-table-component';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: '',
      Password: '',
      Name: '',
      City: '',
      Phone: '',
      NID: '',
      Category: '',
      DateOfBirth: 'Date of Birth',
      Photo: '',
      ButtonActivity: '',
      ErrorMessage: '',
      isModalVisible: false,
    };
  }



  componentDidMount(){
        
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');

        this.setState({
          Username: UserName,
          Category: UserCategory,
        });
        
        fetch('http://192.168.1.5:8080/SP02/ProfileData.php', {
          method: 'POST',
          headers: {
            'Accpet': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: UserName,
            category: UserCategory,
          }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                Name: responseJson[0].Name,
                City: responseJson[0].City,
                Phone: responseJson[0].Phone,
                NID: responseJson[0].NID,
                Password: responseJson[0].Password,
                DateOfBirth: responseJson[0].DOB,
                Photo: responseJson[0].Photo,
            });
        })
        .catch((error)=>{
            alert(error);
        })
    }



  nameValidation = value => {
    var pattern = '@#$%^&*.!-_0123456789<>';
    if (pattern.match(value) != null) {
      this.setState({ButtonActivity: true});
      this.setState({
        Name: value,
        ErrorMessage: 'Name cannot contain any character or number.',
      });
    } else {
      this.setState({Name: value});
      this.setState({ErrorMessage: ''});
      this.setState({ButtonActivity: false});
    }
  };

  phoneValidation = value => {
    var x = '';
    x = value;
    if (
      (x.substring(0, 3) != '017' &&
        x.substring(0, 3) != '013' &&
        x.substring(0, 3) != '015' &&
        x.substring(0, 3) != '016' &&
        x.substring(0, 3) != '019' &&
        x.substring(0, 3) != '018') ||
      x.length != 11
    ) {
      this.setState({ErrorMessage: 'Give a valid phone number.'});
      this.setState({ButtonActivity: true});
      this.setState({Phone: value});
    } else {
      this.setState({ErrorMessage: ''});
      this.setState({Phone: value});
      this.setState({ButtonActivity: false});
    }
  };

  passwordValidation = value => {
    this.setState({Password: value});
    if (this.state.Password.length < 7) {
      this.setState({ButtonActivity: true});
      this.setState({ErrorMessage: 'Password must be atleast 8 characters.'});
    } else {
      this.setState({ErrorMessage: ''});
      this.setState({ButtonActivity: false});
    }
  };

  UserCategory = ['Customer', 'Farmer', 'Agent'];

  showErrorMessage = () => {
    if (
      this.state.Name == '' ||
      this.state.City == '' ||
      this.state.Phone == '' ||
      this.state.NID == '' ||
      this.state.Password == ''
    ) {
      var message = 'Field cannot be empty!';
      this.setState({ErrorMessage: message});
      this.setState({ButtonActivity: true});
    } else {
      var message = '';
      this.setState({ErrorMessage: message});
      this.setState({ButtonActivity: false});
    }
  };

  Action = () => {
    const {Name} = this.state;
    const {City} = this.state;
    const {Password} = this.state;
    const {Phone} = this.state;
    const {NID} = this.state;
    const {DateOfBirth} = this.state;

    const {navigation} = this.props;
    const UserName = navigation.getParam('username', 'No User');
    const UserCategory = navigation.getParam('category', 'No Category');

    var APIurl = 'http://192.168.1.5:8080/SP02/UpdateProfile.php';

    if (
      this.state.Name == '' ||
      this.state.City == '' ||
      this.state.Phone == '' ||
      this.state.NID == '' ||
      this.state.Password == '' ||
      this.state.DateOfBirth == 'Date of Birth'
    ) {
      var message = 'Field cannot be empty!';
      this.setState({ErrorMessage: message});
      this.setState({ButtonActivity: true});
    } else {
      fetch(APIurl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: UserName,
          password: Password,
          name: Name,
          city: City,
          phone: Phone,
          nid: NID,
          category: UserCategory,
          dob: DateOfBirth,
        }),
      })
        .then(ResponseJson => ResponseJson.json())
        .then(ResponseJson => {
          alert(ResponseJson);
          this.props.navigation.navigate('Profile', {username: UserName, category: UserCategory});
        })
        .catch(Error => {
          alert(Error);
        });
    }
  };

  render() {


    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.container}>
        <View style={styles.container}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                backgroundColor: 'rgba(240,240,240,1)',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10,
              }}>
        <TouchableOpacity onPress={() => this.setState({isModalVisible: true})}>
            <Image source={require('../pictures/man.png')} style={{height: 90, width: 90, alignSelf: 'center', borderRadius: 100,}} ></Image>
        </TouchableOpacity>
        <Modal
            style={{flex: 1,}}
            transparent={true}
            animationType= 'fade'
            visible={this.state.isModalVisible}
            onRequestClose={() => this.setState({isModalVisible: false})}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({isModalVisible: false})}
              style={{flex: 1, width: '100%', height: '100%',}}>
                    <View
                      style={{
                        alignSelf: 'center',
                        height: '100%',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          width: '70%',
                          top: 200,
                          backgroundColor: '#fff',
                          alignSelf: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          padding: 20,
                        }}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 10, marginBottom: 15}}>Choose Photo</Text>
            <TouchableOpacity style={styles.buttonStyle2}>
              <Text style={styles.buttonTextStyle}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle2}>
              <Text style={styles.buttonTextStyle}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle2} onPress={() => this.setState({isModalVisible: false})}>
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </TouchableOpacity>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </View>
            </Modal>
        </View>
        <TextInput
          placeholder='Name'
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onBlur={this.showErrorMessage}
          onChangeText={text => this.nameValidation(text)}
          value={this.state.Name}
        ></TextInput>
        <TextInput
          placeholder='City'
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onChangeText={City => this.setState({City})}
          onBlur={this.showErrorMessage}
          value={this.state.City}
        ></TextInput>
        <TextInput
          placeholder='Phone'
          placeholderTextColor="rgba(126,211,33,1)"
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={text => this.phoneValidation(text)}
          onBlur={this.showErrorMessage}
          value={this.state.Phone}
        ></TextInput>
        <TextInput
          placeholder='NID'
          placeholderTextColor="rgba(126,211,33,1)"
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={NID => this.setState({NID})}
          onBlur={this.showErrorMessage}
          value={this.state.NID}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onChangeText={text => this.passwordValidation(text)}
          onBlur={this.showErrorMessage}
          value={this.state.Password}
        ></TextInput>
        <DatePicker
          mode="date"
          format="DD-MM-YYYY"
          placeholder={this.state.DateOfBirth}
          onDateChange={DateOfBirth => this.setState({DateOfBirth})}
          style={styles.textInput}
          customStyles={{
            placeholderText: {fontSize: 16, color: 'rgba(126,211,33,1)'},
          }}
          date={this.state.DateOfBirth}
        />
        <Text
          style={{
            color: '#ff0303',
            textAlign: 'center',
            fontFamily: 'arial',
          }}>
          {this.state.ErrorMessage}
        </Text>
        <View style={styles.buttonPortionStyle} >
          <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: this.state.ButtonActivity
                ? '#76cc85'
                : 'rgba(126,211,33,1)',
            },
          ]}
          onPress={this.Action}
          disabled={this.state.ButtonActivity}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyText: {
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 16,
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
    alignSelf: 'center',
  },
  dropdownStyle: {
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 227,
    height: 40,
    borderColor: 'rgba(155,155,155,1)',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    justifyContent: 'center',
    height: 39,
    width: 100,
    marginTop: 10,
    marginLeft: 133,
    alignItems: 'center',
    borderRadius: 5,
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
  buttonStyle2: {
    justifyContent: 'center',
    height: 39,
    width: 200,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(126,211,33,1)',
    borderRadius: 5,
  },
  buttonPortionStyle:{
    flexDirection: 'row',
  },
});
