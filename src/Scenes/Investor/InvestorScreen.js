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

export default class InvestorScreen extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      persons: [],
      // username: this.props.route.params.username
    }
 
  }

componentDidMount() {
  // console.log('====================================');
  // console.log(this.props);
  // console.log('====================================');
  
  
  axios.get('http://192.168.1.101/partner_project_backend/investor_list.php',
  {
    user_type: "Yatırımcı"
  })
  .then(res => {
    // console.log(res.data);
    const persons = res.data;
    this.setState({ persons });
  })
}


  render() {
    StatusBar.setBarStyle('light-content', true);
    return (

         
      <View style={styles.container}>
        
        <Text style={styles.header} >YATIRIMCILAR</Text>

        <ScrollView>
         { this.state.persons.map(person =>
        
          
            <SafeAreaView>
          
             {/* Posts View */}
              <View style={styles.postsView}   >
                  {/* {posts.map((post) => (
                    <Post post={post} />
                  ))} */}
                <View style={styles.postView} key={person.id}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                {/* <Image    
                     style={styles.userProfileImage}
                    source={{uri:'http://192.168.1.101/partner_project_backend/'+ person.image}}
        
                 /> */}
                      <Image style={styles.userProfileImage}
                          source={person.image != null ? {uri:'http://192.168.1.101/partner_project_backend/'+ person.image} :
                          require('../../Images/Profile.jpg')} 
                      />
                         {/* {person.files ? (
                    <Image
                      style={{     
                        flex: 1, height: 300, width:'100%' , resizeMode: 'contain' 
                      }}
                      source={
                        {uri:'http://192.168.1.101/partner_project_backend/'+ person.files}
                      }
                    />
                    ): null } */}
            
                  
            
                  <View style={{ flex: 1, paddingHorizontal: 0 }}>
                    
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                      {person.name} 
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 14, marginTop:5 }} >
                      <Ionicons name="pencil-outline" size={18} color="#00BFD8"> </Ionicons>
                      {person.occupation}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 14, marginTop:5 }} >
                      <Ionicons name="map-outline" size={18} color="#00BFD8"> </Ionicons>
                      {person.city}
                    </Text>
                  </View>
                     
                  <TouchableOpacity
                      style={{ marginTop: -40 }}

                      onPress={() => {
                        this.props.navigation.navigate('UserProfile', {
                          username: person.username,
                        })
                        console.log(person.id);
                      }
                      }
                    >
                      <Ionicons name='ellipsis-horizontal-outline' color='#fff' size={28} />
                    </TouchableOpacity>
                  
                  
                </View>
              
              
                
              
                </View>
              </View>
            
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

  storyUserProfileImage: { width: 60, height: 60, borderRadius: 100 },
  postsView: { paddingHorizontal: 10, marginTop: 10 },
  postView: {
    paddingVertical: 10,
   
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#1e1e1e',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
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