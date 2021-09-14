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

        this.state={
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


        fetch('http://192.168.1.5:8080/SP02/OrderList.php', {
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

    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.bodyStyle}>
                        <Text style={styles.userInfoText1}>{this.state.Name}</Text>
                        <Text style={styles.userInfoText2}>{this.state.City}</Text>
                        <View style={styles.straightline}>
                        {this.state.dataset.map((val, index)=>(
                        <View style={styles.orderListStyle} key={index}>
                            <View>
                                <Text style={styles.orderTextStyle1}>{val.City}</Text>
                                <Text style={styles.orderTextStyle2}>Referenc no. {val.ID}</Text>
                                <Text style={styles.orderTextStyle2}>Purchase Cost: {val.Price}</Text>
                            </View>
                            <View style={styles.orderListInnerStyle}>
                                <Text style={styles.orderTextStyle3}>{val.Date}</Text>
                                <Text style={styles.orderTextStyle3}>{val.Status}</Text>
                            </View>
                        </View>
                        ))}
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