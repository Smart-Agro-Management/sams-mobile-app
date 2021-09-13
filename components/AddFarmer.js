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
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {TextInput} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {Cell, Row} from 'react-native-table-component';

export default class AddFarmer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: '',
      Name: '',
      City: '',
      Phone: '',
      NID: '',
      DateOfBirth: 'Date of Birth',
      ButtonActivity: '',
      ErrorMessage: '',
    };
  }

  nameValidation = value => {
    var pattern = '@#$%^&*.!-_0123456789<>';
    if (pattern.match(value) != null) {
      this.setState({ButtonActivity: true});
      this.setState({
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
    } else {
      this.setState({ErrorMessage: ''});
      this.setState({Phone: value});
      this.setState({ButtonActivity: false});
    }
  };

  usernameValidation = value => {
    var x = '';
    x = value;
    var pattern = '@#$%^&*.!-_0123456789<>';
    if (pattern.match(x.charAt(0))) {
      this.setState({
        ErrorMessage: 'Username cannot start with number or character.',
      });
      this.setState({ButtonActivity: true});
    } else {
      this.setState({ErrorMessage: ''});
      this.setState({Username: value});
      this.setState({ButtonActivity: false});
    }
  };

  showErrorMessage = () => {
    if (
      this.state.Name == '' ||
      this.state.City == '' ||
      this.state.Phone == '' ||
      this.state.NID == '' ||
      this.state.Username == ''
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
    const {Username} = this.state;
    const {Name} = this.state;
    const {City} = this.state;
    const {Phone} = this.state;
    const {NID} = this.state;
    const {DateOfBirth} = this.state;

    const {navigation} = this.props;
    const UserName = navigation.getParam('username', 'No User');

    var APIurl = 'http://192.168.1.5:8080/SP02/AddFarmer.php';

    if (
      this.state.Name == '' ||
      this.state.City == '' ||
      this.state.Phone == '' ||
      this.state.NID == '' ||
      this.state.Username == '' ||
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
          agentUsername: UserName,
          username: Username,
          name: Name,
          city: City,
          phone: Phone,
          nid: NID,
          dob: DateOfBirth,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson);
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
        <Text style={styles.bodyText}>ADD NEW FARMER</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onBlur={this.showErrorMessage}
          onChangeText={text => this.nameValidation(text)}
        />
        <TextInput
          placeholder="City"
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onChangeText={City => this.setState({City})}
          onBlur={this.showErrorMessage}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="rgba(126,211,33,1)"
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={text => this.phoneValidation(text)}
          onBlur={this.showErrorMessage}
        />
        <TextInput
          placeholder="NID"
          placeholderTextColor="rgba(126,211,33,1)"
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={NID => this.setState({NID})}
          onBlur={this.showErrorMessage}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(126,211,33,1)"
          style={styles.textInput}
          onChangeText={text => this.usernameValidation(text)}
          onBlur={this.showErrorMessage}
        />
        <DatePicker
          mode="date"
          format="DD-MM-YYYY"
          placeholder={this.state.DateOfBirth}
          onDateChange={DateOfBirth => this.setState({DateOfBirth})}
          style={styles.textInput}
          customStyles={{
            placeholderText: {fontSize: 16, color: 'rgba(126,211,33,1)'},
          }}
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
          onBlur={this.showErrorMessage}
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
    marginLeft: 130,
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
  backButtonStyle: {
    justifyContent: 'center',
    height: 39,
    width: 100,
    marginTop: 10,
    marginLeft: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(126,211,33,1)',
    borderRadius: 5,
  },
  buttonPortionStyle:{
    flexDirection: 'row',
  },
});
