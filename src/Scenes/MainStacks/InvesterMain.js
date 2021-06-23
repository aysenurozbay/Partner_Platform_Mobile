import React, { useState, Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import InvestorScreen from '../Investor/InvestorScreen';
import UserProfile from '../Investor/UserProfile';
import ChatScreen from '../Messaging/ChatScreen';


const Stack = createNativeStackNavigator();
export default class InvestorMain extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      // username: this.props.route.params.username
    }
 
  }

  componentDidMount(){
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);


    return (

      <Stack.Navigator initialRouteName="InvestorScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InvestorScreen" component={InvestorScreen}  options={{ title: 'Home Screen' }}  />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen}   initialParams = {{ user : this.props.route.params.user}}/>  
 
      
      </Stack.Navigator>
    );
  }
}
