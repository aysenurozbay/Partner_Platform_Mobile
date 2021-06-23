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


export default class PartnerScreen extends Component {

  constructor(props) {
    super();

    this.state = {
      partners: [],
      // username:this.props.route.params.Username,

    }

  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };



  componentDidMount() {
    axios.get('http://192.168.1.101/partner_project_backend/partner_list.php')
      .then(res => {
        const partners = res.data;
        this.setState({ partners });
      })

  }
  static navigationOptions = {
    title: 'ProjectScreen',
  };


  render() {
    StatusBar.setBarStyle('light-content', true);


    return (


      <View style={styles.container}>

        <Text style={styles.header} >ORTAKLIKLAR</Text>

        <ScrollView>
          {this.state.partners.map(person =>


            <SafeAreaView>

              {/* Posts View */}
              <View style={styles.postsView} >
                <View style={styles.postView} key={person.id}>
                  {/* Post Header */}
                  <View style={styles.postHeader}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 18,textTransform:'uppercase' }}>
                        {person.title}
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 14 }}>City</Text>
                    </View>
                    <TouchableOpacity 
                      style={{ marginTop: 0 }}
                      onPress={() => {
                          this.props.navigation.navigate('PartnerDetail', {
                          id: person.id,
                          username: person.username
                          })
                      }}>
                      <Ionicons name='ellipsis-horizontal-outline' color='#fff' size={28} />
                    </TouchableOpacity>
                </View>
                  <View style={styles.postHeader}>


                    <View style={{ flex: 1, paddingHorizontal: 0, marginTop:0}}>
                      {/* <Text style={{ color: '#fff', fontSize: 18 }}>
                        {person.name}
                      </Text>
                      <Text
                      style={{ color: '#fff', fontSize: 14 }}
                    >
                      City
                    </Text> */}
                   

                      <Text style={{ color: '#fff', fontSize: 14, paddingTop:5}}>
                        <Ionicons name="business-outline" size={18} color="#00BFD8"> </Ionicons>
                        {person.industry}
                        
                      </Text>
                      {/* <Text style={{ color: '#fff', fontSize: 14 }}> */}
                      {/* <Ionicons name="map-outline" size={18} color="#00BFD8"> </Ionicons>
                        {person.city}
                      </Text> */}
                   
                      
                    </View>

                   

                  </View>
                  {/* Post Content */}
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                      color: '#fafafa',
                      marginTop: 5,
                      fontSize: 15,
                      paddingHorizontal: 10,
                    }}>
                      {/* {post.postText} */}
                      {person.brief}

                    </Text>
                    {person.files ? (
                    <Image
                      style={{     
                        flex: 1, height: 300, width:'100%' , resizeMode: 'contain' ,marginTop:10
                      }}
                      source={
                        {uri:'http://192.168.1.101/partner_project_backend/'+ person.files}
                      }
                    />
                    ): null }
               


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