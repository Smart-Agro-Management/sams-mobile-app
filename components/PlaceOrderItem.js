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
        }
    }
    


    componentDidMount(){
        fetch('http://192.168.1.5:8080/SP02/FetchItems.php')
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                dataset: responseJson,
            });
        })
        .catch((error)=>{
            alert(error);
        });
    }


    render(){
        const {navigation} = this.props;
        const userName = navigation.getParam('username', 'No User');
        return(
            <ScrollView>
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
                    <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{userName}</Text>
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/location.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Thanapara, Kushtia</Text>
                    </View>
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/phone.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>0171111111111</Text>
                    </View>
                    </View>
                    </View>
                    </ImageBackground>

                    <View>
                        {this.state.dataset.map((val, index) => (
                            <View key={index}>
                            <View style={{borderColor: 'rgba(155,155,155,1)', width: 340, borderWidth: 1, margin: 10, alignSelf: 'center', borderRadius: 10, flexDirection: 'row'}}>
                            <View style={{margin: 5, width: 258}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>{val.Product_Name}</Text>
                                <Text>{val.Price}৳ / kg</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({isModalVisible: true, productName: val.Product_Name, productPrice: val.Price, productDescription: val.Product_Description})} style={{height: 30, width: 65, backgroundColor: 'rgba(126,211,33,1)', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 5, borderRadius: 10}}>
                                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>Add</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        ))}
                    </View>

                    

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
            <Text style={{}}>{this.state.productPrice}৳ / kg</Text>
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
                backgroundColor: 'rgba(126,211,33,1)',
            }}>
                <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    width: '22%',
                }}>
                    <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        color: '#fff',
                        textAlign: 'center',
                    }}>+</Text>
                </TouchableOpacity>
                <TextInput 
                style={{
                    width: '45%',
                    alignSelf: 'center',
                    backgroundColor: 'rgba(230,230,230,1)'
                }}></TextInput>
                <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    width: '22%',
                }}>
                    <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        color: '#fff',
                        textAlign: 'center',
                    }}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonStyle2}>
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
});