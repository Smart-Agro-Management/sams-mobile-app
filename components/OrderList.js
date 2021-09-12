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

export default class OrderList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.bodyStyle}>
                        <Text style={styles.userInfoText1}>Mridul</Text>
                        <Text style={styles.userInfoText2}>Thanapara, Kushtia</Text>
                        <View style={styles.straightline}></View>
                        <View style={styles.orderListStyle}>
                            <View>
                                <Text style={styles.orderTextStyle1}>Thanapara, Kushtia</Text>
                                <Text style={styles.orderTextStyle2}>Referenc no. </Text>
                                <Text style={styles.orderTextStyle2}>Purchase Cost: </Text>
                            </View>
                            <View style={styles.orderListInnerStyle}>
                                <Text style={styles.orderTextStyle3}>21.10.2021</Text>
                                <Text style={styles.orderTextStyle3}>Received</Text>
                            </View>
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

    orderListInnerStyle:{
        width: 120,
    },
});