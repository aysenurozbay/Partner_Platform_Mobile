import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class ContactsScreen extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      persons: [],
      from_id: this.props.route.params.user.id,
      me: this.props.route.params.user.username
      // username: this.props.route.params.username
    }
 
  }

componentDidMount() {
  // console.log(this.props.route.params.user.id);
  console.log('**************************');
  
  
  
  axios.post('http://192.168.1.101/partner_project_backend/chat_list.php',
  {
    from_id: this.state.from_id
  })
  .then(res => {
    console.log(res.data);
    const persons = res.data;
    this.setState({ persons });
  })
}


  render() {
    StatusBar.setBarStyle('light-content', true);
    return (

         
      <View style={styles.container}>
        
        <Text style={styles.header} >SOHBETLER</Text>

        <ScrollView>
         { this.state.persons.map(person =>
        
          
            <SafeAreaView>
          {person.from_user_name !== this.state.me ? 
            
            <View style={styles.postsView}   >
           
          <View style={styles.postView} key={person.id}>
          <TouchableOpacity
             onPress={() => {
              { this.props.navigation.navigate('ChatScreen', {to_id: person.from_user_id}) }
            }}
          >
       
          <View style={styles.postHeader}>      
                <Image style={styles.userProfileImage}
                    source={person.image != null ? {uri:'http://192.168.1.101/partner_project_backend/'+person.image} :
                    require('../../Images/Profile.jpg')} 
                />
       
      
            
      
            <View style={{ flex: 1, paddingHorizontal: 0 }}>
              
              <Text style={{ color: '#fff', fontSize: 18 }}>
                {person.from_user_name} 
               
      
                
              </Text>
            </View>
                    
         
               
           
            
            
          </View>
          </TouchableOpacity>
        
        
          
        
          </View>
        </View>
      
                     
                  : null}
              </SafeAreaView>
       
         )}
           </ScrollView> 
      
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    color: '#c1c1c1',
    marginTop: 0
   
  },

  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  showAllText: {
    color: '#c1c1c1',
    fontSize: 18,
  },


  postsView: { paddingHorizontal: 10, marginTop: 10 },
  postView: {
    paddingVertical: 10,
  
    // borderBottomWidth: 2,
    // borderBottomColor: '#333',
 
  },
  userProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 20
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  postStatsOpacity: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header:{
    margin: 10,
    marginBottom:10,
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold', 
  } 
});