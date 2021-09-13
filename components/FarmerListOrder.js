import { BlurView } from '@react-native-community/blur';
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
} from 'react-native';

export default class FarmerListOrder extends Component {
    constructor(props){
        super(props);

        this.state={
            isloading: true,
            dataset: [],
            Username: '',
            Category: '',
            SearchName: '',
            isModalVisible: false,
        }
    }

    Search = () =>{
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');

        const {SearchName} = this.state;

        if(this.state.SearchName != ''){
        fetch('http://192.168.1.5:8080/SP02/SearchFarmer.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserName,
                searchName: SearchName,
            }),
        })
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                isloading: false,
                dataset: responseJson,
                SearchName: '',
            });
        })
        .catch((error)=>{
            alert(error);
        })
        }else{
        
        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');


        fetch('http://192.168.1.5:8080/SP02/FarmerList.php', {
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
    }

    componentDidMount(){

        const {navigation} = this.props;
        const UserName = navigation.getParam('username', 'No User');
        const UserCategory = navigation.getParam('category', 'No Category');


        fetch('http://192.168.1.5:8080/SP02/FarmerList.php', {
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
            <ScrollView>
            <View>
            <View style={{backgroundColor: '#fff', margin: 10,
            height: 45,
            shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderRadius: 10,
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput placeholder="Type farmer's name" style={{backgroundColor: 'rgba(240,240,240,1)', margin: 5, borderRadius: 10, width: 260}} onChangeText={(SearchName)=> this.setState({SearchName})} value={this.state.SearchName}></TextInput>
                    </View>
                    <TouchableOpacity style={{height: 36, width: 65, backgroundColor: "rgba(126,211,33,1)", justifyContent: 'center', alignSelf: 'center', borderRadius: 10}} onPress={this.Search}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>Serach</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            {this.state.dataset.map((val, index)=>(
                <View key= {index}>
            <View style={{backgroundColor: '#fff', borderRadius: 10, margin: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 20,}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('FarmerOrderList', {username: val.Username})}>
                    <View style={{height: 120, width: 120, justifyContent: 'center', borderColor: 'rgba(155,155,155,1)', borderWidth: 1, borderRadius: 10, margin: 10}}>
                        <Image source={require("../pictures/man.png")} style={{height: 100, width: 100, alignSelf: 'center'}}></Image>
                    </View>
                    <View>
                    <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20, width: 200}}>{val.Name}</Text>
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/location.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{width: 200, marginLeft: 5}}>{val.City}</Text>
                    </View>
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <View style={{ alignSelf: 'center'}}><Image source={require('../pictures/phone.png')} style={{height: 15, width: 15}}></Image></View>
                        <Text style={{width: 200, marginLeft: 5}}>{val.Phone}</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            ))}
            </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    addButtonStyle:{
        height: 36,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "rgba(126,211,33,1)",
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 5,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        justifyContent: 'center',
    },

    addButtonTextStyle:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});