import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
          <View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'arial',
            fontWeight: 'bold',
            fontSize: 30,
            color: 'rgba(126,211,33,1)',
            marginTop: 35,
          }}>
          SAMS
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'cambria',
            fontSize: 12,
            marginTop: -8,
            marginBottom: 50,
          }}>
          Smart Agro Management System
        </Text>
      </View>
      </View>
    );
  }
}
