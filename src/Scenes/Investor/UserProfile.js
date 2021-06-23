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


export default class UserProfile extends Component {
  state = { name: null };
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


    console.log(this.props);
    axios.post('http://192.168.1.101/partner_project_backend/profile.php',
      {
        username: this.props.route.params.username
      })
      .then((response) => {
        console.log(response.data)
        this.setState({
          username: response.data[0].username,
          id: response.data[0].id,
          name: response.data[0].name,
          city: response.data[0].city,
          occupation: response.data[0].occupation,
          user_type: response.data[0].user_type,
          image: response.data[0].image,
          info: response.data[0].info,

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
        {/* <TouchableOpacity title="Go to Home"
          onPress={() => { this.props.navigation.navigate('Main') }} >
          <Ionicons name='arrow-back-outline' color={'white'} size={30} style={{ marginTop: 6, paddingLeft: 12 }} />
        </TouchableOpacity> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>

            <View style={styles.profileImage}>
                <Image style={{width: 200, height: 200, borderRadius: 400/ 2}} 
                    source={this.state.image != null ? {uri:'http://192.168.1.101/partner_project_backend/'+ this.state.image} :
                    require('../../Images/Profile.jpg')} 
                />
              {/* <Image  source={{uri:'http://192.168.1.101/partner_project_backend/'+ this.state.image}}
              style={styles.image} resizeMode="center"></Image> */}
            </View>
            <TouchableOpacity style={styles.dm}
              onPress={() => {
                this.props.navigation.navigate('MessagingMain', { screen: 'ChatScreen',
                params: {
                  to_id: this.state.id,
                  // receiver: 
                },
               },
               
                );
              }
              }
            >
              <Ionicons name="mail" size={30} color="#fff"></Ionicons>
            </TouchableOpacity>
            {/* <View style={styles.active}></View> */}
            {/* <View style={styles.add}>
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </View> */}
          </View>

          <View style={styles.infoContainer}>


            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.name}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.username}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statsBox]}>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#00BFD8"></Ionicons>
              <Text style={[styles.text, styles.subText]}>{this.state.user_type}
              </Text>
            </View>
            <View style={[styles.statsBox]}>
              <Ionicons name="pin" size={24} color="#00BFD8"></Ionicons>
              <Text style={[styles.text, styles.subText]}>{this.state.city}</Text>
            </View>

     

            <View style={styles.statsBox}>
              <Ionicons name="pencil" size={24} color="#00BFD8"></Ionicons>
              <Text style={[styles.text, styles.subText]}>{this.state.occupation}</Text>
            </View>


          </View>
    
          <Text style={[styles.subText, styles.recent, { borderColor: 'white', borderTopWidth: 0 }]}></Text>
            <View style={{ alignItems: 'flex-start', marginLeft: 16 }}>
              <View style={styles.recentItem}>
                
                <View style={{ width: '100%' }}>
            
                  <Text style={[styles.text, { fontWeight: "500", fontSize: 16 }]}>
                    HAKKINDA
                      </Text>
                </View>
              </View>

              <View style={styles.recentItem}>
               
                <View style={{ width: '100%' }}>
                  <Text style={[styles.text, { fontWeight: "300", fontSize: 16 }]}>
                  {this.state.info}
                      </Text>
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
    backgroundColor: "#1f1f1f",
    paddingTop: 30
  },
  text: {
    color: "#fff",
  },
  image: {
    flex: 1,
    width: 200,


  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 5
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#da1e37",
    position: "absolute",
    top: 10,
    marginLeft:-10,
    width: 50,
    height: 50,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32

  },
  statsBox: {
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 18,
    marginTop: 5,
    marginBottom: 6,
    fontSize: 20
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  activityIndicatorproject: {
    backgroundColor: "#34FFB9",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  activityIndicatorpartner: {
    backgroundColor: "#EF7F1D",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 100,
    marginTop: 3,
    marginRight: 20
  }
});