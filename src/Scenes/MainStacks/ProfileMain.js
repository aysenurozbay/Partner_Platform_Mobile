import React, { useState, Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import ProfileScreen from '../Profile/ProfileScreen';
import ProfileEdit from '../Profile/ProfileEdit';
import PartnerDetailProfile from '../Profile/PartnerDetailProfile';
import ProjectDetailProfile from '../Profile/ProjectDetailProfile';
import ProjectEdit from '../Profile/ProjectEdit';
import PartnerEdit from '../Profile/PartnerEdit';
import AddProject from '../Profile/AddProject';
import AddPartner from '../Profile/AddPartner';




const Stack = createNativeStackNavigator();
export default class PartnerMain extends Component {
    componentDidMount(){
        // console.log('====================================');
        // console.log(this.props.route.params.user);
        // console.log('====================================');
      }

  render() {
    StatusBar.setBarStyle('dark-content', true);
  
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  
          initialParams = {{ user : this.props.route.params.user}}
          />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit}
          initialParams = {{ user : this.props.route.params.user}}
         />
        <Stack.Screen name="PartnerDetailProfile" component={PartnerDetailProfile} />
        <Stack.Screen name="ProjectDetailProfile" component={ProjectDetailProfile} />
        <Stack.Screen name="ProjectEdit" component={ProjectEdit} />
        <Stack.Screen name="PartnerEdit" component={PartnerEdit} />
        <Stack.Screen name="AddProject" component={AddProject} />
        <Stack.Screen name="AddPartner" component={AddPartner} />
      
    </Stack.Navigator>
  );
}
};

