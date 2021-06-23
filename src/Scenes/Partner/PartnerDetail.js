
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class PartnerDetail extends Component {
  // state = { name: null };
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      name: "",
      city: "",
      occupation: "",
      user_type: "",
      userusername: "",

      city: "",
      occupation: "",
      usercity: "",


    }
 
    
  }
 
  componentDidMount() {
    // console.log(this.props);
    
    axios.post('http://192.168.1.101/partner_project_backend/partner_detail.php',
    {

      id: this.props.route.params.id

    })
    .then((response) => {
      // console.log(response.data)
      this.setState({
        username: response.data[0].username,
        title: response.data[0].title,
        city: response.data[0].city,
        detail: response.data[0].detail,
        district: response.data[0].district,
        annual_earning: response.data[0].annual_earning,
        industry: response.data[0].industry,
        district: response.data[0].district,
        activity_year: response.data[0].activity_year,
        files: response.data[0].files,

      })

      
    })
    .catch((error) => {
      console.error(error);
    });
    axios.post('http://192.168.1.101/partner_project_backend/profile.php',
    {

      username: this.props.route.params.username

    })
    .then((res) => {
      console.log(res.data)
      this.setState({
       
        ad: res.data[0].name,
        kullanıcıadı: res.data[0].username,
        usercity: res.data[0].city,
        userid: res.data[0].id,
        image: res.data[0].image,
      

      })
    })
    .catch((error) => {
      console.error(error);
    });
  

    

  }


  render() {

    StatusBar.setBarStyle('light-content', true);
    return (

      <SafeAreaView style={[styles.container]}>
       
     
        <SafeAreaView>

              {/* Posts View */}
              <View style={styles.postsView} >
                
                {/* {posts.map((post) => (
                    <Post post={post} />
                  ))} */}
                <View style={styles.postView} >
                <TouchableOpacity
                        style={{ marginTop:0 }}

                        onPress={() => {
                            this.props.navigation.navigate('UserProfile', {
                            username: this.state.username,
                            })
                        }}
                        >
                    <View style={styles.postHeader}>
                    <View>
                    <Image style={styles.userProfileImage}
                        source={this.state.files != null ? {uri:'http://192.168.1.101/partner_project_backend/'+ this.state.files} :
                        require('../../Images/Profile.jpg')} 
                    />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10,}}>
                    
                        <Text style={{ color: '#fff', fontSize: 18 }}>
                        {this.state.ad}
                        </Text>
           
                        <Text
                        style={{ color: '#fff', fontSize: 14 }}
                        >
                        {this.state.kullanıcıadı}
                        </Text>
                    </View>

                    </View>
                    </TouchableOpacity>
                  {/* Post Header */}
                  <View style={styles.postHeader}>

                  <View style={{ flex: 1, paddingHorizontal: 0 }}>
                  <Text style={{ color: '#fff', fontSize: 18 , marginTop:10, marginBottom:5, textTransform: 'uppercase'}}>
                      {this.state.title}
                       {/* {this.props.route.params.id} */}
                      </Text>

                      <Text style={{ color: '#fff', fontSize: 14 }}>
                        <Ionicons name="checkmark-done-circle-outline" size={18} color="#00BFD8"> </Ionicons>
                        {this.state.industry}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14 }} >
                        <Ionicons name="map-outline" size={18} color="#00BFD8"> </Ionicons>
                        {this.state.city} /{this.state.district}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14 }} >
                        <Ionicons name="ios-today-outline" size={18} color="#00BFD8"> </Ionicons>
                        {this.state.activity_year}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14 }} >
                        <Ionicons name="cash-outline" size={18} color="#00BFD8"> </Ionicons>
                        {this.state.annual_earning}   
                      </Text>
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
                      {this.state.detail}

                    </Text>
                    {this.state.files ? (
                  <Image
                    style={{
                      height: 300, resizeMode: 'contain', marginTop: 10
                    }}
                    source={
                      { uri: 'http://192.168.1.101/partner_project_backend/' + this.state.files }
                    }
                  />
                ) : null}


                  </View>



                </View>
              </View>

            </SafeAreaView>
      </SafeAreaView>
      


    );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    color: '#c1c1c1',
    paddingTop: 20

  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  userCardRight: {
    marginRight: 0
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
    paddingVertical: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#1e1e1e',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    paddingTop: 10,
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
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold', 
  } 
});