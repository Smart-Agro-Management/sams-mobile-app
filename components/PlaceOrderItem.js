import { response } from 'express';
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
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';

export default class PlaceOrderItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            dataset: [],
            isModalVisible: false,
            productName: '',
            productPrice: '',
            productDescription: '',
            productQuantity: '',
            productId: '',
            quantity: 0,
            unit: '',
            rate: [1, 2, 3, 4, 5],
            defaultRate: 0,
        }
    }
    


    Add = () =>{
        const {productId} = this.state;
        const {quantity} = this.state;

        const {navigation} = this.props;
        const userName = navigation.getParam('customerUsername', 'No User');

        var totalPrice = (parseInt(this.state.productPrice) * parseInt(this.state.quantity));

        if(parseInt(this.state.quantity) < 10 || (parseInt(this.state.productQuantity) - parseInt(this.state.quantity)) < 20 ){
            alert("Invalid Quantity!");
        }else{
            fetch('http://192.168.1.5:8080/SP02/AddinCart.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                    quantity: quantity,
                    price: totalPrice,
                    username: userName,
                })
            })
            .then(response=>response.json())
            .then(response=>{
                ToastAndroid.show(response, ToastAndroid.SHORT);
                this.setState({isModalVisible: false});
            })
            .catch((error)=>{
                alert(error);
            })
        }
    }


    Rating = (rate) =>{
        this.setState({defaultRate: rate});

        const {navigation} = this.props;
        const farmerUsername = navigation.getParam('username', 'No User');
        const customerUsername = navigation.getParam('customerUsername', 'No User');

        fetch('http://192.168.1.5:8080/SP02/RatingInsertUpdate.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerUsername: customerUsername,
                farmerUsername: farmerUsername,
                rate: rate,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            ToastAndroid.show(responseJson, ToastAndroid.SHORT);
        })
        .catch((error)=>{
            alert(error);
        });
    }


    RatingData = () =>{
        const {navigation} = this.props;
        const farmerUsername = navigation.getParam('username', 'No User');
        const customerUsername = navigation.getParam('customerUsername', 'No User');

        fetch('http://192.168.1.5:8080/SP02/RatingData.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerUsername: customerUsername,
                farmerUsername: farmerUsername,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                defaultRate: responseJson[0].Rate,
            });
        })
        .catch((error)=>{
            alert(error);
        });
    }


    componentDidMount(){
        const {navigation} = this.props;
        const userName = navigation.getParam('username', 'No User');
        const name = navigation.getParam('name', 'No name');
        const city = navigation.getParam('city', 'No city');
        const phone = navigation.getParam('phone', 'No phone');

        fetch('http://192.168.1.5:8080/SP02/ProductList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                dataset: responseJson,
            });
        })
        .catch((error)=>{
            alert(error);
        });
        this.RatingData();
    }


    render(){
        const {navigation} = this.props;
        const userName = navigation.getParam('username', 'No User');
        const name = navigation.getParam('name', 'No name');
        const city = navigation.getParam('city', 'No city');
        const phone = navigation.getParam('phone', 'No phone');

        return(
            <ScrollView style={{flex: 1}}>
                    <ImageBackground
                    source={require('../pictures/vegHeader.jpg')}
                    resizeMode={'cover'}
                    style={{
                        height: 100, 
                        width: '100%',
                        }}
                    imageStyle={{
                        borderBottomLeftRadius: 20, 
                        borderBottomRightRadius: 20,
                        }}>
                    <View style={{
                        flexDirection: 'row', 
                        height: 100, 
                        backgroundColor: 'rgba(240,240,240,0.7)',
                        }}>
                    <View style={{margin: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PlaceOrder')}>
                            <Image source={require('../pictures/previous.png')} style={{height: 40, width: 40}}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center',  marginLeft: 60}}>
                    <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{name}</Text>
                    <View style={{marginTop: 3, flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/location.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>{city}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/phone.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>{phone}</Text>
                    </View>
                    <View style={styles.RateTouchableOpacityStyle}>
                        {this.state.rate.map((num, index)=>(
                            <TouchableOpacity key={num} onPress={() => this.Rating(num)}>
                                <Image source={ num <= this.state.defaultRate ? require('../pictures/StarFilled.png') : require('../pictures/Star.png') } style={styles.RatingImageStyle}></Image>
                            </TouchableOpacity>
                        ))}
                    </View>
                    </View>
                    </View>
                    </ImageBackground>

                    <View>
                        {this.state.dataset.map((val, index) => {
                            if(val.Name != ''){return(
                            <View key={index}>
                            <View style={{borderColor: 'rgba(155,155,155,1)', width: 340, borderWidth: 1, margin: 10, alignSelf: 'center', borderRadius: 10, flexDirection: 'row'}}>
                            <View style={{margin: 5, width: 258}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>{val.Name}</Text>
                                <Text>{val.Price}??? / {val.Unit}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({isModalVisible: true, productName: val.Name, productPrice: val.Price, productDescription: val.Description, productQuantity: val.Quantity, productId: val.ID, unit: val.Unit,})} style={{height: 30, width: 65, backgroundColor: 'rgba(126,211,33,1)', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 5, borderRadius: 10}}>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>Add</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                            )}else{
                                return(<Text key={index} style={styles.ProductListTextStyle}>This farmer still haven't added any product</Text>);
                            }
                        })}
                    </View>

                    

                            <Modal
            style={{flex: 1,}}
            transparent={true}
            animationType= 'fade'
            visible={this.state.isModalVisible}
            onRequestClose={() => this.setState({isModalVisible: false})}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1,}}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({isModalVisible: false})}
              style={{flex: 1, width: '100%', height: '100%',}}>
                    <View
                      style={{
                        alignSelf: 'center',
                        height: '100%',
                        width: '100%',
                        flex: 1,
                      }}>
                      <View
                        style={{
                          width: '70%',
                          top: 100,
                          backgroundColor: '#fff',
                          alignSelf: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          padding: 10,
                        }}>
                        <ImageBackground 
                        source={require('../pictures/vegItem.jpg')}
                        resizeMode={'cover'}
                        imageStyle={{
                            borderRadius: 10,
                        }}
                        style={{
                            height: 100,
                            width: '100%',
                        }}
                        >
                            <TouchableOpacity onPress={() => this.setState({isModalVisible: false})}>
                            <Image 
                            source={
                                require('../pictures/cancel.png')
                            }
                            style={{
                                height: 20,
                                width: 20,
                                left: '90%',
                            }}></Image>
                            </TouchableOpacity>
                        </ImageBackground>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 10}}>{this.state.productName}</Text>
            <Text style={{}}>{this.state.productPrice}??? / {this.state.unit}</Text>
            <Text
            style={{
                textAlign: 'center',
                color: 'rgba(120,120,120,1)',
            }}
            >{this.state.productDescription}</Text>
            <View
            style={{
                borderRadius: 20,
                height: 35,
                width: '50%',
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                    backgroundColor: 'rgba(230,230,230,1)',
            }}>
                <TextInput 
                style={{
                    width: '45%',
                    alignSelf: 'center',
                    backgroundColor: 'rgba(230,230,230,1)'
                }}
                onChangeText={(quantity)=>this.setState({quantity})}
                ></TextInput>
            </View>
            <TouchableOpacity style={styles.buttonStyle2} onPress={this.Add}>
                <Text style={styles.buttonTextStyle}>Add</Text>
            </TouchableOpacity>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </View>
            </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonTextStyle: {
    fontFamily: 'roboto-regular',
    color: '#fff',
    height: 40,
    width: 227,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonStyle2: {
    justifyContent: 'center',
    height: 35,
    width: '50%',
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(126,211,33,1)',
    borderRadius: 20,
  },

  RatingImageStyle:{
      height: 20,
      width: 20,
  },

  RateTouchableOpacityStyle:{
      flexDirection: 'row',
  },

  ProductListTextStyle:{
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
  },
});