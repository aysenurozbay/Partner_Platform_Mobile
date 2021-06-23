
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,

} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


export default class PartnerDetailProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      name: "",
      city: "",
      occupation: "",
      user_type: "",


    }

  }

  componentDidMount() {


    axios.post('http://192.168.1.101/partner_project_backend/partner_detail.php',
      {
        id: this.props.route.params.id

      })
      .then((response) => {
        this.setState({

          project: response.data,
          username: response.data[0].username,
          id: response.data[0].id,
          name: response.data[0].title,
          city: response.data[0].city,
          details: response.data[0].detail,
          district: response.data[0].district,
          amount: response.data[0].annual_earning,
          industry: response.data[0].industry,
          address: response.data[0].address,
          files: response.data[0].files,

        })
      })
      .catch((error) => {
        console.error(error);
      });

  }
  DeletePartnerButton = () => {
    const { PartnerID } = this.state;
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg', // <- this part is optional, you can pass an empty string
    //   [
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   {cancelable: false},
    // );
    axios.post('http://192.168.1.101/partner_project_backend/delete_partner.php',
      {

        id: this.state.id

      })
      .then((response) => {
        console.log(response.data)
        this.props.navigation.replace("ProfileScreen");

      })
      .catch((error) => {
        console.error(error);
      });


  }


  render() {

    StatusBar.setBarStyle('light-content', true);
    return (

      <SafeAreaView style={[styles.container]}>

        <ScrollView>

          {/* Posts View */}
          <View style={styles.postsView} >
            {/* {posts.map((post) => (
                    <Post post={post} />
                  ))} */}
            <View style={styles.postView} >
              {/* Post Header */}
              <View style={styles.postHeader}>

                <View style={{ flex: 1, paddingHorizontal: 0 }}>
                  <View style={[styles.container2]}>
                    <TouchableOpacity
                      onPress={() => {
                        { this.props.navigation.navigate('PartnerEdit', { project: this.state.project }) }
                      }}
                      style={styles.userCard}
                    >
                      <View style={styles.userCardRight}>
                        <Text
                          style={{ color: '#fff' }}
                        >
                          {/* {`${this.state.Username} `} */}
                        </Text>

                      </View>
                      <Ionicons name='ios-search-circle-outline' color={'#00bce4'} size={30} />

                    </TouchableOpacity>
                    {/* DELETE BUTTON */}
                    <TouchableOpacity
                      style={styles.userCard}
                      onPress={this.DeletePartnerButton}
                    >
                      <View style={styles.userCardRight}>
                        <Text
                          style={{ color: '#fff' }}
                        >
                          {/* {`${this.state.Username} `} */}
                        </Text>

                      </View>
                      <Ionicons name='close-circle-outline' color={'red'} size={30} />

                    </TouchableOpacity>


                  </View>
                  <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5, textTransform: 'uppercase' }}>
                    {this.state.name}
                    {/* {this.props.route.params.id} */}
                  </Text>

                  <Text style={{ color: '#fff', fontSize: 14 }}>
                    <Ionicons name="checkmark-done-circle-outline" size={18} color="#00BFD8"> </Ionicons>
                    {this.state.industry}
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 14 }} >
                    <Ionicons name="map-outline" size={18} color="#00BFD8"> </Ionicons>
                    {this.state.address} {this.state.city} /{this.state.district}
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 14 }} >
                    <Ionicons name="cash-outline" size={18} color="#00BFD8"> </Ionicons>
                    {this.state.amount}
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
                  {this.state.details}

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

        </ScrollView>
      </SafeAreaView>



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
    paddingTop: 0,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  postStatsOpacity: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  }
});