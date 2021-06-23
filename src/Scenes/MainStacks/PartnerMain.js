import React, { useState, Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import PartnerScreen from '../Partner/PartnerScreen';
import PartnerDetail from '../Partner/PartnerDetail';


import UserProfile from '../Investor/UserProfile';



const Stack = createNativeStackNavigator();
export default class PartnerMain extends Component {

  render() {
    StatusBar.setBarStyle('dark-content', true);
  
  return (
    <Stack.Navigator initialRouteName="PartnerScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PartnerScreen" component={PartnerScreen} />
        <Stack.Screen name="PartnerDetail" component={PartnerDetail} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      
      </Stack.Navigator>
  );
}
};

