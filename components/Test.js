import React, {Component} from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';


//export var Username = 'Username';
//export var Language = "English";

export default class Test extends Component {
  constructor(props){
        super(props);

        this.state={
            isloading: true,
            dataset: [],
            Username: '',
            Category: '',
        }
    }

    showData = ({item}) =>{
        return(
            <View>
                <Text>{item.Username + "'s user type is " + item.Category}</Text>
            </View>
        );
    }

    render(){
        const {navigation} = this.props;
        const userName = navigation.getParam('username', 'No User');
        return(
            <View>
            <Text>{userName}</Text>
            <Button title="Back" onPress={() => this.props.navigation.navigate('PlaceOrder')}></Button>
      </View>
        );
    }
}

// export function changeLanguage(){
//   var Language = "English";
//   var Username = 'Username';
//   if(Language == "বাংলা"){
//     this.Username = 'সংক্ষিপ্ত নাম';
//   }
// }
