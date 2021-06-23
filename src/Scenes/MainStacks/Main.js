import React, { Component } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  View,
  StyleSheet,
  StatusBar

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectMain from './ProjectMain';
import PartnerMain from './PartnerMain';
import InvestorMain from './InvesterMain';
import MessagingMain from './MessagingMain';
import ProfileMain from './ProfileMain';



const Tab = createBottomTabNavigator();



export default class Main extends Component {

  
  constructor(props) {
    super(props)

    // this.state = {
      user: this.props.navigation.state.params.user
   

    // }
  }
  componentDidMount() {
  //  console.log('===================Main===============');
  //  console.log(this.props.navigation.state.params.user);
  //  console.log('====================================');
  }
  

  render() {
    StatusBar.setBarStyle('light-content', true);
   
    return (

      <NavigationContainer style={{ backgroundColor: '#1f1f1f' }}>

       
        <Tab.Navigator
          initialRouteName="Project"
          tabBarOptions={{
            activeTintColor: '#ED4C67',
            inactiveTintColor: '#fafafa',
            activeBackgroundColor: '#222',
            inactiveBackgroundColor: '#222',
            showLabel: false,

          }}

          >
           
          <Tab.Screen
            name='Project'
            component={ProjectMain}
            style={styles.sakla}
            options={{
             
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='document-text-outline' color={color} size={size} />
              ),
            }}
            // initialParams={{ Username: this.state.username}} 

          />

          
          <Tab.Screen name="Partner" component={PartnerMain}
            options={{
              
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='people-outline' color={color} size={size} />
              ),
          }}
             />  
{/* 
             <Tab.Screen name="UserProfile" component={UserProfile}
            options={{
              
              tabBarIcon: ({ color, size }) => (
                <Icon name='x' color={color} size={size - 4} />
              ),
          }}
             /> */}


        <Tab.Screen name="InvestorMain" component={InvestorMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='pricetag-outline' color={color} size={size} />
            ),
          }}
          initialParams={{ user:this.props.navigation.state.params.user}} 
           /> 
        <Tab.Screen name="MessagingMain" component={MessagingMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='mail-open-outline' color={color} size={size} />
            ),
          }}
          initialParams={{ user:this.props.navigation.state.params.user}} 
           />
        
       

        <Tab.Screen name="ProfileMain" component={ProfileMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='person-outline' color={color} size={size} />
            ),
          }} 
          initialParams={{ user:this.props.navigation.state.params.user}} 
          />

 

        </Tab.Navigator>

      </NavigationContainer>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    paddingTop: 45,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  
  },
  sakla: {
    display: 'none',
  },

  userCard: {

    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',

    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 2,
    marginRight:0
  },
});
