import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';

export default class UpdateItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalVisible: false,
            Name: '',
            Price: '',
            Description: '',
            Photo: '',
            Unit: '',
        }
    }


    componentDidMount(){
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'No ID');

    var APIurl = 'http://192.168.1.5:8080/SP02/ProductData.php';

    fetch(APIurl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
              Name: responseJson[0].Name,
              Price: responseJson[0].Price,
              Description: responseJson[0].Description,
              Unit: responseJson[0].Unit,
          });
        })
        .catch(Error => {
          alert(Error);
        });
  };


    Unit = ['kg', 'liter', 'dozen'];


    Action = () => {
    const {Name} = this.state;
    const {Price} = this.state;
    const {Description} = this.state;
    const {Unit} = this.state;

    const {navigation} = this.props;
    const id = navigation.getParam('id', 'No ID');

    var APIurl = 'http://192.168.1.5:8080/SP02/UpdateProduct.php';

    if (
      this.state.Name == '' ||
      this.state.Price == ''
    ) {
      alert("Field cannot be empty!");
    } else {
      fetch(APIurl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: Name,
          price: Price,
          description: Description,
          unit: Unit,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          ToastAndroid.show(responseJson, ToastAndroid.SHORT);
        })
        .catch(Error => {
          alert(Error);
        });
    }
  };

    render(){
        return(
            <KeyboardAvoidingView style={styles.KeyboardAvoidingViewStyle}>
            <ScrollView style={styles.ScrollViewStyle}>
                <View>
                    <View style={styles.bodyStyle}>
                        <View>
                            <Text>Item's Image:</Text>
                            <TouchableOpacity onPress={() => this.setState({isModalVisible: true})}>
                                <Image style={styles.imageStyle} source={require('../pictures/vegItem.jpg')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewStyle1}>
                            <View>
                                <Text>Item Name:</Text>
                                <View style={styles.textInputViewStyle1}>
                                    <TextInput style={styles.textInputStyle1} onChangeText={(Name) => this.setState({Name})} value={this.state.Name}></TextInput>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.textInputHeaderStyle1}>Price / Unit:</Text>
                                <View style={styles.textInputViewStyle2}>
                                    <TextInput style={styles.textInputStyle2} onChangeText={(Price) => this.setState({Price})} value={this.state.Price}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Description:</Text>
                                <View style={styles.textInputViewStyle3}>
                                    <TextInput multiline={true} numberOfLines={4} style={styles.textInputStyle3} onChangeText={(Description) => this.setState({Description})} value={this.state.Description}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text>Unit: </Text>
                            <SelectDropdown data={this.Unit} defaultButtonText={this.state.Unit} onSelect={(slectedItem, index)=>{this.setState({Unit: slectedItem})}} buttonTextAfterSelection={(slectedItem)=>{return slectedItem}} buttonStyle={styles.SelectDropdownButtonStyle} buttonTextStyle={styles.SelectDropdownButtonTextStyle}></SelectDropdown>
                        </View>
                        <TouchableOpacity style={styles.buttonStyle1}>
                            <Text style={styles.buttonTextStyle} onPress={this.Action}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal style={styles.modalStyle} animationType={'fade'} transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.setState({isModalVisible: false})}>
                        <View style={styles.modalViewStyle1}>
                            <TouchableWithoutFeedback style={styles.modalViewStyle2} onPress={() => this.setState({isModalVisible: false})}>
                                <View style={styles.modalViewStyle3}>
                                    <View style={styles.modalViewStyle4}>
                                        <Text style={styles.modalTextStyle}>Choose Photo</Text>
                                        <TouchableOpacity style={styles.buttonStyle2}>
                                            <Text style={styles.buttonTextStyle}>Open camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonStyle2}>
                                            <Text style={styles.buttonTextStyle}>Chose from Gallery</Text>
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
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    KeyboardAvoidingViewStyle:{
        flex: 1,
    },

    ScrollViewStyle:{
        flex: 1,
    },

    bodyStyle:{
        flex: 1,
        width: '70%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 5,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        padding: 20,
    },

    imageStyle:{
        height: 100,
        width: '100%',
        borderRadius: 10,
    },

    modalStyle:{
        flex: 1,
    },

    modalViewStyle1:{
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)',
        height: '100%',
        width: '100%',
    },

    modalViewStyle2:{
        flex: 1,
        height: '100%',
        width: '100%',
    },

    modalViewStyle3:{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },

    modalViewStyle4:{
        backgroundColor: '#fff',
        width: '70%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },

    modalTextStyle:{
        fontSize: 22, 
        fontWeight: 'bold', 
        marginTop: 10, 
        marginBottom: 15,
        textAlign: 'center',
    },

    buttonTextStyle: {
        fontFamily: 'roboto-regular',
        color: '#fff',
        height: 40,
        width: 227,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    },

    buttonStyle1: {
        justifyContent: 'center',
        width: 212,
        height: 39,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(126,211,33,1)',
        borderRadius: 5,
        alignSelf: 'center',
    },

    buttonStyle2: {
        justifyContent: 'center',
        height: 39,
        width: 200,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(126,211,33,1)',
        borderRadius: 5,
        alignSelf: 'center',
    },

    viewStyle1:{
        flexDirection: 'row',
        marginTop: 5,
    },

    textInputHeaderStyle1:{
        marginLeft: 10,
    },

    textInputStyle1:{
        width: 100,
        padding: 0,
    },

    textInputStyle2:{
        width: 70,
        padding: 0,
    },

    textInputStyle3:{
        padding: 0,
    },

    textInputViewStyle1:{
        width: 110,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 5,
    },

    textInputViewStyle2:{
        width: 80,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
    },

    textInputViewStyle3:{
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 5,
    },

    SelectDropdownButtonStyle:{
        borderWidth: 0.8,
        borderRadius: 5,
        backgroundColor: '#fff',
        height: 35,
    },
});