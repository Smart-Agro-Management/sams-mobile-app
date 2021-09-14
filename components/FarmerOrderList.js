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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class OrderList extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalVisible: false,
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
                        <View style={styles.straightline}></View>
                        <View style={styles.orderListStyle}>
                            <View>
                                <Text style={styles.orderTextStyle1}>Thanapara, Kushtia</Text>
                                <Text style={styles.orderTextStyle2}>Referenc no. </Text>
                                <Text style={styles.orderTextStyle2}>Purchase Cost: </Text>
                            </View>
                            <View style={styles.orderListInnerStyle}>
                                <Text style={styles.orderTextStyle3}>21.10.2021</Text>
                                <TouchableOpacity onPress={() => this.setState({isModalVisible: true})}>
                                    <Text style={styles.orderTextStyle4}>Received</Text>
                                </TouchableOpacity>
                                <Modal style={styles.modalStyle} animationType={'fade'} transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.setState({isModalVisible: false})}>
                                    <View style={styles.modalViewStyle1}>
                                        <TouchableWithoutFeedback style={styles.modalViewStyle2} onPress={() => this.setState({isModalVisible: false})}>
                                            <View style={styles.modalViewStyle3}>
                                            <View style={styles.modalViewStyle4}>
                                                <View style={styles.closeImageViewStyle}>
                                                    <TouchableOpacity onPress={() => this.setState({isModalVisible: false})}>
                                                        <Image source={require('../pictures/cancel.png')} style={styles.closeImageStyle}></Image>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity style={styles.buttonStyle}>
                                                    <Text style={styles.buttonTextStyle}>Requested</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.buttonStyle}>
                                                    <Text style={styles.buttonTextStyle}>Accepted</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.buttonStyle}>
                                                    <Text style={styles.buttonTextStyle}>Canceled</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.buttonStyle}>
                                                    <Text style={styles.buttonTextStyle}>Delivered</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </Modal>
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
});