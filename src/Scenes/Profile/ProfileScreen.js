
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Icon from "react-native-feather1s";
import 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';




export default class ProfileScreen extends Component {
  state = { name: null };
  constructor(props) {
    super(props)

    this.state = {
      
      // username: this.props.route.params.user,
      name: this.props.route.params.user.name,
      username: this.props.route.params.user.username,
      city: this.props.route.params.user.city,
      occupation: this.props.route.params.user.occupation,
      user_type: this.props.route.params.user.user_type,
      id: this.props.route.params.user.id,
      image: this.props.route.params.user.image,
      PartnerID:"",

      projects: [],
      partners: []
      



    }
  }


  componentDidMount() {

   

    axios.post('http://192.168.1.101/partner_project_backend/project_detail_profile.php',
      {

        username: this.props.route.params.user.username

      })
      .then(res => {
        // console.log(res.data)
        const projects = res.data;
        this.setState({ projects });

      })
    axios.post('http://192.168.1.101/partner_project_backend/partner_detail_profile.php',
      {

        username: this.props.route.params.user.username

      })
      .then(res => {
        // console.log(res.data)
        const partners = res.data;
        this.setState({ partners });

      }) 

  }


  render() {
    StatusBar.setBarStyle('light-content', true);
    return (

      <SafeAreaView style={[styles.container]}>
                  <View style={[styles.container2]}>
                    <TouchableOpacity
                       onPress={() => {
                        { this.props.navigation.navigate('AddPartner', {username: this.state.username}) }
                      }}
                      style={styles.userCard}
                    >
                      <View style={styles.userCardRight}>
                        <Text
                          style={{ color: '#fff'   , marginLeft:20, }}
                        >
                          {/* {`${this.state.Username} `} */}
                        </Text>

                      </View>
                      <Icon
                          name="file-text"
                          size={31}
                          style= {{marginRight:10}} 
                          color="#27AE60"
                          thin={false}
                        />

                    </TouchableOpacity>
                    {/* Project BUTTON */}
                    <TouchableOpacity
                      style={styles.userCard}
                      onPress={() => {
                        { this.props.navigation.navigate('AddProject', {username: this.state.username}) }
                      }}
                    >
                      <View style={styles.userCardRight}>
                        <Text
                          style={{ color: '#fff' }}
                        >
                          {/* {`${this.state.Username} `} */}
                        </Text>

                      </View>
                      <Ionicons name='person-add' color={'#fec432'} size={32} style= {{marginRight:10}} />

                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.userCard}
                      onPress={() => Actions.jump('login')}>
                    
                      <View style={styles.userCardRight}>
                      <Text
                          style={{ color: '#fff' }}
                        >
                          {/* {`${this.state.Username} `} */}
                        </Text>

                      </View>
                      <Icon
                          name="log-out"
                          size={31}
                          style= {{marginRight:10}} 
                          color="#ea0b34"
                          thin={false}
                        />

                    </TouchableOpacity>


                  </View>
        
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>

            <View style={styles.profileImage}>
              <Image style={{width: 200, height: 200, borderRadius: 400/ 2}} 
                      source={this.state.image != null ? {uri:'http://192.168.1.101/partner_project_backend/'+ this.state.image} :
                      require('../../Images/Profile.jpg')} 
              />
            </View>
            {/* <View style={styles.dm}>
              <MaterialIcons name="mail" size={22} color="#DFD8C8"></MaterialIcons>
            </View> */}
            {/* <View style={styles.active}></View> */}
            <TouchableOpacity
                style={styles.add}
                    onPress={() => {
                      { this.props.navigation.navigate('ProfileEdit', { id: this.state.id }) }
                    }}
                    >
                 
               <Ionicons name="build" size={25} color="#DFD8C8" style={{ marginTop: 4, marginLeft: 2 }}></Ionicons>
            

            </TouchableOpacity>
            
          </View>

          <View style={styles.infoContainer}>


            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.name}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.username}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statsBox]}>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#00BFD8"></Ionicons>

              <Text style={[styles.text, styles.subText]}>{this.state.user_type}</Text>
            </View>
            <View style={[styles.statsBox]}>
              <Ionicons name="pin" size={24} color="#00BFD8"></Ionicons>
              <Text style={[styles.text, styles.subText]}>{this.state.city}</Text>
            </View>

            {/* <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Ionicons name="ios-hand-right" size={24} color="#52575D"></Ionicons>
                <Text style={[styles.text, styles.subText]}>Meslek</Text>
            </View> */}

            <View style={styles.statsBox}>
              <Ionicons name="pencil" size={24} color="#00BFD8"></Ionicons>
              <Text style={[styles.text, styles.subText]}>{this.state.occupation}</Text>
            </View>
            
           


          </View>

  
          {/* <Text style={[styles.subText, styles.recent, { borderColor: 'white', borderBottomWidth: 1, marginLeft:0 }]}>  </Text> */}
            <View style={{ alignItems: 'flex-start', marginLeft: 16 , marginTop: 20}}>
              {/* PROJECTS */}
              {this.state.projects.map(project =>
               <SafeAreaView  style={{ flexDirection: "row"}}>
                <TouchableOpacity key={project.id}
                
                onPress={() => {
                  
                    this.props.navigation.navigate('ProjectDetailProfile', {
                      id: project.id
                    })
                  }
                }
                >
                <View style={styles.recentItem}>
                  <View style={styles.activityIndicatorproject}></View>
                  <View style={{ width: 300 }}>
                    
                    <Text style={[styles.text, { fontWeight: "500", fontSize: 16 }]}>
                      {project.name}
                    </Text>
                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    {project.industry} 
                    {/* <Text style={{ fontWeight: "400" }}></Text>  */}
                            {/* and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text> */}
                    </Text>
                  </View>
                  <Text style={[styles.text, { color: "#34FFB9",  marginLeft: 0}]}>
              
                    <Ionicons name="chevron-forward-outline" size={30} color="#34FFB9" />
                
                  </Text>
                 
                </View>
                </TouchableOpacity>
                </SafeAreaView>
              )}
                {/* PARTNERS */}
              {this.state.partners.map(partner =>

              <SafeAreaView  style={{ flexDirection: "row"}}>
                  <TouchableOpacity
                      key={Math.random()}

                      onPress={() => {
                        
                          this.props.navigation.navigate('PartnerDetailProfile', {
                            id: partner.id
                          })
                        }
                      }
                    >
                <View style={styles.recentItem}>
                  <View style={styles.activityIndicatorpartner}></View>
                  <View style={{ width: 300 }}>
                    <Text style={[styles.text, { fontWeight: "300", fontSize: 16 }]}>
                      {partner.title}
                    </Text>
                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    {partner.industry} 
                   
                    </Text>
                    
                  </View>
                  <Text style={[styles.text, { color: "#41444B",  marginLeft: 0}]}>
              
                    <Ionicons name="chevron-forward-outline" size={30} color="#EF7F1D" />
                
                  </Text>
                </View>
               
                </TouchableOpacity>
              
                  
               

             
              </SafeAreaView>
              )}
             
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
    paddingTop: 0
  },
  userCardRight: {
    paddingLeft:10
  },
  container2: {
    flexDirection: 'row',

    justifyContent: 'flex-end'
  ,
  
  },
  text: {
    color: "#fff",
  },
  image: {
    flex: 1,
    width: 200
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
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    backgroundColor: "#ea0b34",
    // backgroundColor: "#41444B",
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
    backgroundColor: "#fec432",
    paddingTop:30,
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  activityIndicatorpartner: {
    backgroundColor: "#27AE60",
    paddingTop:30,
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 100,
    marginTop: 3,
    marginRight: 20
  },
  hiddenInput: {
    width: 0,
    height: 0,
  },
});
