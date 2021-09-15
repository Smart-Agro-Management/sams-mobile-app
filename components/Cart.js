import { response } from 'express';
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Cart extends Component{
    constructor(props){
        super(props);

        var today = new Date();
        var todaysDate = today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear();

        this.state={
            date: todaysDate,
            Name: '',
            City: '',
            dataset: [],
            price: '',
            VAT: '',
        }
    }


    CustomerData(){
        
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');
        
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
            });
        })
        .catch((error)=>{
            alert(error);
        })
    }


    TotalPrice(){
        
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');
        
        fetch('http://192.168.1.5:8080/SP02/TotalPrice.php', {
          method: 'POST',
          headers: {
            'Accpet': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: UserName,
          }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            if(responseJson == null){
                this.setState({price: ''});
            }else{
                var vat = parseFloat((parseFloat(responseJson)*5)/100);
                var total = parseFloat(parseFloat(responseJson)+parseFloat(vat));
                this.setState({
                     price: total,
                     VAT: vat,
                    });
            }
        })
        .catch((error)=>{
            alert(error);
        })
    }


    OrderList(){
        
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');
        
        fetch('http://192.168.1.5:8080/SP02/CartList.php', {
          method: 'POST',
          headers: {
            'Accpet': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: UserName,
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
        })
    }


    getRandomString() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 10; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }


    componentDidMount(){
        this.CustomerData();
        this.OrderList();
        this.TotalPrice();
    }


    PlaceOrder = () =>{
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');

        const {price} = this.state;
        const {City} = this.state;

        var ID = this.getRandomString();

        if(price == ''){
            alert("There is nothing in cart to order!");
        }else{
            fetch('http://192.168.1.5:8080/SP02/PlaceOrder.php', {
                method: 'POST',
                headers: {
                    'Accpet': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: UserName,
                    price: price,
                    city: City,
                    id: ID,
                }),
            })
            .then(response=>response.json())
            .then(responseJson=>{
                alert(responseJson);
                this.setState({
                    dataset: [],
                    price: '',
                    VAT: '',
                });
            })
            .catch((error)=>{
                alert(error);
            })
        }
    }


    ClearCart = () =>{
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');


        fetch('http://192.168.1.5:8080/SP02/ClearOrder.php', {
          method: 'POST',
          headers: {
            'Accpet': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: UserName,
          }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            if(responseJson == ''){
            this.setState({
                dataset: [],
                price: '',
                VAT: '',
            });
            }
        })
        .catch((error)=>{
            alert(error);
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <View style={styles.bodyStyle}>
                    <Text style={styles.headerStyle1}>SAMS</Text>
                    <Text style={styles.headerStyle2}>Smart Agro Management System</Text>
                    <View style={styles.straightline1}></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.ordersTextStyle}>Customer's Name:</Text>
                        <View style={{width: 160}}>
                            <Text style={styles.ordersTextStyle}>{this.state.Name}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.ordersTextStyle}>Order Date:</Text>
                        <View style={{width: 160}}>
                            <Text style={styles.ordersTextStyle}>{this.state.date}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.ordersTextStyle}>Destination:</Text>
                        <View style={{width: 160}}>
                            <Text style={styles.ordersTextStyle}>{this.state.City}</Text>
                        </View>
                    </View>
                    <Text
                    style={{
                        fontSize: 14,
                        marginTop: 20,
                        textAlign: 'center',
                    }}>Order List</Text>
                    <View style={styles.straightline2}></View>
                    <View>
                        <View style={{justifyContent: 'center', marginTop: 20}}>{this.state.dataset.map((val, index)=>(
                        <View key={index}>
                            <View>
                                <Text style={styles.ordersTextStyle}>{val.Name} --- {val.Quantity}kg --- {val.Price}৳</Text>
                            </View>
                        </View>
                        ))}
                        </View>
                        <View style={styles.straightline3}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                            <View style={{width: 50}}>
                                <Text style={styles.ordersTextStyle}>VAT (5%)</Text>
                            </View>
                            <View>
                                <Text style={styles.ordersTextStyle}>--------------</Text>
                            </View>
                            <View style={{width: 120}}>
                                <Text style={styles.ordersTextStyle}>{this.state.VAT}৳</Text>
                            </View>
                        </View>
                        <View style={styles.straightline3}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                            <View style={{width: 55}}>
                                <Text style={styles.ordersTextStyle}>Total</Text>
                            </View>
                            <View>
                                <Text style={styles.ordersTextStyle}>--------------</Text>
                            </View>
                            <View style={{width: 120}}>
                                <Text style={styles.ordersTextStyle}>{this.state.price}৳</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.PlaceOrder}>
                        <Text style={styles.buttonTextStyle}>Place Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.ClearCart}>
                        <Text style={styles.buttonTextStyle}>Clear Cart</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },

    bodyStyle:{
        width: '85%',
        paddingBottom: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 5,
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },

    headerStyle1:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'rgba(126,211,33,1)',
        marginTop: 10,
    },

    headerStyle2:{
        fontSize: 10,
        textAlign: 'center',
        marginTop: -8,
    },

    straightline1:{
        margin: 10,
        borderTopWidth: 5,
        borderTopColor: 'rgba(126,211,33,1)',
    },

    ordersTextStyle:{
        marginLeft: 10,
        fontFamily: 'courier',
        fontSize: 14,
        fontWeight: 'bold',
    },

    straightline2:{
        borderTopWidth: 0.5,
        width: 70,
        alignSelf: 'center',
    },

    straightline3:{
        borderTopWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
        marginTop: 5,
    },

    buttonStyle: {
    justifyContent: 'center',
    height: 39,
    width: 100,
    marginTop: 30,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(126,211,33,1)',
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
    fontWeight: 'bold',
  },
});