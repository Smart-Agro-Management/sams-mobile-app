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
  ToastAndroid,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class FarmerOrderList extends Component{
    constructor(props){
        super(props);

        this.state = {
            dataset: [],
            Name: '',
            City: '',
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


    OrderListData(){
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');


        fetch('http://192.168.1.5:8080/SP02/FarmerOrderList.php', {
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
                dataset: responseJson,
            });
        })
        .catch((error)=>{
            alert(error);
        })
    }

    componentDidMount(){
        this.OrderListData();
        this.CustomerData();
    }

    PressDelivered = (cartId, stockId, val, stockQuantity) =>{
        var quantity = (parseInt(stockQuantity) - parseInt(val));

        if(parseInt(quantity)>=20){
        fetch('http://192.168.1.5:8080/SP02/ProductDeliver.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartId: cartId,
                stockId: stockId,
                quantity: quantity,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            ToastAndroid.show(responseJson, ToastAndroid.SHORT);
            this.OrderListData();
            this.CustomerData();
        })
        .catch((error)=>{
            alert(error);
        })
        }else{
            alert("Please add some stocks then perform again!");
        }
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.bodyStyle}>
                        <Text style={styles.userInfoText1}>{this.state.Name}</Text>
                        <Text style={styles.userInfoText2}>{this.state.City}</Text>
                        <View style={styles.straightline}>
                        {this.state.dataset.map((val, index)=>{
                        if(val.ID != ''){return(
                        <View style={styles.orderListStyle} key={index}>
                            <View>
                                <Text style={styles.orderTextStyle1}>{val.City}</Text>
                                <Text style={styles.orderTextStyle2}>Referenc no. {val.ID}</Text>
                                <Text style={styles.orderTextStyle2}>{val.Name} {val.Quantity}kg</Text>
                                <Text style={styles.orderTextStyle2}>Purchase Cost: {val.Price}৳</Text>
                            </View>
                            <View style={styles.orderListInnerStyle}>
                                <Text style={styles.orderTextStyle3}>{val.Date}</Text>
                                <TouchableOpacity onPress={()=>this.PressDelivered(val.CartId, val.StockId, val.Quantity, val.StockQuantity)}>
                                    <Text style={styles.orderTextStyle4}>Delivered</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}else{
                            return(<Text key={index} style={styles.OrderListTextStyle}>No orders</Text>);
                        }
                        })}
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
        backgroundColor: '#fff',
    },

    bodyStyle:{
        margin: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    userInfoText1:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    userInfoText2:{
        textAlign: 'center',
    },

    straightline:{
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: 'rgba(120,120,120,0.5)',
    },

    orderTextStyle1:{
        fontSize: 14,
        fontWeight: 'bold',
        width: 200,
    },

    orderListStyle:{
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(120,120,120,0.5)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
    },

    orderTextStyle2:{
        fontSize: 12,
        width: 200,
    },

    orderTextStyle3:{
        fontSize: 12,
        textAlign: 'right',
    },

    orderTextStyle4:{
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
        color: "rgba(126,211,33,1)",
    },

    orderListInnerStyle:{
        width: 120,
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
        width: '40%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
    },

    buttonStyle:{
        height: 34,
        backgroundColor: "rgba(126,211,33,1)",
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,
    },

    buttonTextStyle:{
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },

    closeImageStyle:{
        width: 15,
        height: 15,
    },

    closeImageViewStyle:{
        alignSelf: 'flex-end',
        marginBottom: 5,
    },

  OrderListTextStyle:{
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
  },
});