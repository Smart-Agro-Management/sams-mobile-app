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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Stock extends Component{
    constructor(props){
        super(props);

        this.state = {
            dataset: [],
            quantity: 0,
        }
    }

    Navigation = () =>{
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');

        if(UserCategory == 'Agent'){
            this.props.navigation.navigate('AgentDashboard')
        }else{
            this.props.navigation.navigate('FarmerDashboard')
        }
    }


    Deletion = (ID) =>{

        fetch('http://192.168.1.5:8080/SP02/DeleteProduct.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ID,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            alert(responseJson);
        })
        .catch((error)=>{
            alert(error);
        })
    }

    Summation = (value, ID) =>{
        var sumValue = parseInt(value)+parseInt(this.state.quantity);

        fetch('http://192.168.1.5:8080/SP02/UpdateProductQuantity.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ID,
                quantity: sumValue,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            alert(responseJson);
        })
        .catch((error)=>{
            alert(error);
        })
    }


    Subtraction = (value, ID) =>{
        var sumValue = parseInt(value)-parseInt(this.state.quantity);

        if(parseInt(value) >= 20){
        fetch('http://192.168.1.5:8080/SP02/UpdateProductQuantity.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ID,
                quantity: sumValue,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            alert(responseJson);
        })
        .catch((error)=>{
            alert(error);
        })
        }else{
            alert("Stock for any product cannot be less than 20Kg!");
        }
    }

    componentDidMount(){

        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');


        fetch('http://192.168.1.5:8080/SP02/ProductList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserName,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                isloading: false,
                dataset: responseJson,
            });
        })
        .catch((error)=>{
            alert(error);
        })
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.viewStyle}>
            <ScrollView style={styles.viewStyle}>
                <View>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity onPress={this.Navigation}>
                            <Image style={styles.headerImageStyle1} source={require('../pictures/previous.png')}></Image>
                        </TouchableOpacity>
                        <View style={styles.headerViewStyle}>
                            <Text style={styles.headerTextStyle1}>MANAGE</Text>
                            <Text style={styles.headerTextStyle2}>YOUR</Text>
                            <Text style={styles.headerTextStyle3}>STOCK</Text>
                        </View>
                        <Image style={styles.headerImageStyle2} source={require('../pictures/packages.png')}></Image>
                    </View>
                    <View style={styles.straightline}></View>
                    <View>
                        <Text style={styles.productListTextStyle1}>Product List</Text>
                        <View>{this.state.dataset.map((val, index)=>(
                        <View style={styles.productListViewStyle1} key={index}>
                            <View>
                                <Text>{val.Name} - {val.Price}৳ / kg</Text>
                            </View>
                            <View style={styles.productListViewStyle2}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UpdateItem', {id: val.ID})}>
                                    <Text style={styles.productListTextStyle2}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={(id)=>this.Deletion(val.ID)}>
                                    <Text style={styles.productListTextStyle3}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        ))}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.productListTextStyle1}>In Stock</Text>
                        <View>{this.state.dataset.map((val, index)=>(
                        <View style={styles.productListViewStyle1} key={index}>
                            <View>
                                <Text>{val.Name} - {val.Quantity}kg</Text>
                            </View>
                            <View style={styles.productListViewStyle2}>
                                <View style={styles.textInputViewStyle}>
                                    <TextInput style={styles.textInputStyle} onChangeText={(quantity)=>this.setState({quantity})}></TextInput>
                                </View>
                                <TouchableOpacity style={styles.touchableOpacityTextInputStyle1} onPress={(value, id)=>{this.Summation(val.Quantity, val.ID)}}>
                                    <Text style={styles.productListTextStyle4}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touchableOpacityTextInputStyle2} onPress={(value, id)=>{this.Subtraction(val.Quantity, val.ID)}}>
                                    <Text style={styles.productListTextStyle4}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    headerImageStyle1:{
        height: 35,
        width: 35,
    },

    headerImageStyle2:{
        height: 65,
        width: 65,
        alignSelf: 'center',
        marginLeft: 5,
    },

    headerStyle:{
        margin: 10,
        marginTop: 20,
        flexDirection: 'row',
    },

    headerViewStyle:{
        alignItems: 'center',
        marginLeft: 80,
    },

    headerTextStyle1:{
        fontSize: 18,
        fontFamily: 'times new roman',
        fontWeight: 'bold',
    },

    headerTextStyle2:{
        fontSize: 32,
        fontFamily: 'calibri',
        fontWeight: 'bold',
        marginTop: -12,
    },

    headerTextStyle3:{
        fontSize: 28,
        fontFamily: 'courier',
        fontWeight: 'bold',
        marginTop: -12,
    },

    viewStyle:{
        backgroundColor: '#fff',
        flex: 1,
    },

    straightline:{
        borderTopWidth: 2,
    },

    productListTextStyle1:{
        textAlign: 'center',
        fontSize: 18,
        marginTop: 25,
        fontWeight: 'bold',
    },

    productListViewStyle1:{
        width: 180,
        flexDirection: 'row',
        margin: 10,
        marginTop: 20,
        alignItems: 'center',
    },

    productListViewStyle2:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 170,
        alignItems: 'center',
    },

    productListTextStyle2:{
        marginLeft: 15,
        fontWeight: 'bold',
        color: "rgba(126,211,33,1)",
    },

    productListTextStyle3:{
        marginLeft: 15,
        fontWeight: 'bold',
        color: 'rgba(255, 99, 71, 1)',
    },

    productListTextStyle4:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },

    textInputStyle:{
        height: 30,
        width: 65,
        fontSize: 14,
        padding: 0,
    },

    textInputViewStyle:{
        height: 30,
        width: 70,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
    },

    touchableOpacityTextInputStyle1:{
        height: 30,
        width: 30,
        backgroundColor: "rgba(126,211,33,1)",
        borderRadius: 20,
        justifyContent: 'center',
        marginLeft: 5,
    },

    touchableOpacityTextInputStyle2:{
        height: 30,
        width: 30,
        backgroundColor: 'rgba(255, 99, 71, 1)',
        borderRadius: 20,
        justifyContent: 'center',
        marginLeft: 5,
    },
});