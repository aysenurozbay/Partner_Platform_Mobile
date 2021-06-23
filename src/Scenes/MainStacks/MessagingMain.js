import React, { useState, Component } from 'react';
import {
  StatusBar,
  Text
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ContactsScreen from '../Messaging/ContactsScreen';
import ChatScreen from '../Messaging/ChatScreen';
import ChatRoom from '../Messaging/ChatRoom';




const Stack = createNativeStackNavigator();
export default class MessagingMain extends Component {

  componentDidMount(){
    console.log('====================================');
    // console.log(this.props.route.params.user);

    // console.log(this.props);
    console.log('====================================');
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
  
  return (

    
        <Stack.Navigator initialRouteName="ContactsScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ContactsScreen" component={ContactsScreen}   
                  initialParams = {{ user : this.props.route.params.user}}/> 
            <Stack.Screen name="ChatRoom" component={ChatRoom}   
                  initialParams = {{ user : this.props.route.params.user}}/>  
            <Stack.Screen name="ChatScreen" component={ChatScreen}   initialParams = {{ user : this.props.route.params.user}}/>  
            {/* <Stack.Screen name="ChatRoom" component={ChatRoom}   initialParams = {{ user : this.props.user}}/>   */}

        
        </Stack.Navigator>

  );
}
};

