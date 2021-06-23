import React, { useState, Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import UserProfile from '../Investor/UserProfile';
import ProjectScreen from '../Project/ProjectScreen';
import ProjectDetail from '../Project/ProjectDetail';



const Stack = createNativeStackNavigator();
export default class ProjectMain extends Component {
  
  // componentDidMount(){
  //   console.log('====================================');
  //   console.log(this.props.route.params.Username);
  //   console.log('====================================');
  // }


  render() {
    StatusBar.setBarStyle('dark-content', true);


    return (

      <Stack.Navigator initialRouteName="ProjectScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      
      </Stack.Navigator>
    );
  }
}
