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
                            <Text style={styles.ordersTextStyle}>Mohammad Mridul Hossain</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.ordersTextStyle}>Order Date:</Text>
                        <View style={{width: 160}}>
                            <Text style={styles.ordersTextStyle}>21.10.2021</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.ordersTextStyle}>Destination:</Text>
                        <View style={{width: 160}}>
                            <Text style={styles.ordersTextStyle}>Thanapara, Kushtia</Text>
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
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                            <View style={{width: 50}}>
                                <Text style={styles.ordersTextStyle}>Boro Rice</Text>
                            </View>
                            <View>
                                <Text style={styles.ordersTextStyle}>---</Text>
                            </View>
                            <View style={{width: 50}}>
                                <Text style={styles.ordersTextStyle}>10 kg</Text>
                            </View>
                            <View>
                                <Text style={styles.ordersTextStyle}>---</Text>
                            </View>
                            <View style={{width: 120}}>
                                <Text style={styles.ordersTextStyle}>270৳</Text>
                            </View>
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
                                <Text style={styles.ordersTextStyle}>1,00,00,000৳</Text>
                            </View>
                        </View>
                        <View style={styles.straightline3}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                            <View style={{width: 50}}>
                                <Text style={styles.ordersTextStyle}>T0tal</Text>
                            </View>
                            <View>
                                <Text style={styles.ordersTextStyle}>--------------</Text>
                            </View>
                            <View style={{width: 120}}>
                                <Text style={styles.ordersTextStyle}>1,00,00,000৳</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Place Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
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
        fontSize: 12,
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