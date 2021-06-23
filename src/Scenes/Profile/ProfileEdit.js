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
    TextInput
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';


export default class ProfileEdit extends Component {

    constructor(props) {
        super(props)
        this.uploadImage = this.uploadImage.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            user: {
                id: this.props.route.params.user.id,
                username: this.props.route.params.user.username,
                email: this.props.route.params.user.email,
                name: this.props.route.params.user.name,
                city: this.props.route.params.user.city,
                gender: this.props.route.params.user.gender,
                site: this.props.route.params.user.site,
                occupation: this.props.route.params.user.occupation,
                info: this.props.route.params.user.info,
                password: this.props.route.params.user.password,
                image: this.props.route.params.user.image,
            },
            password: "",
            // DropDown
            open: false,
            value: null,
            items: [
                { label: 'Kadın', value: 'Kadın', },
                { label: 'Erkek', value: 'Erkek', },
                { label: 'Diğer ', value: 'Diğer', },
            ]
        };

    }

    // DropDown
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {
   
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    //IMAGE 
    uploadImage = () => {
        const options = {
            quality: 1.0,
            mediaType: 'photo',
            
            includeBase64: true,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);
           
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({image:response}) 
    
            }
        
        })
        
      }
    EditProfileButton = () => {

        if (this.state.image) {
              axios.put('http://192.168.1.101/partner_project_backend/profile_edit_photo.php',
            {
        
                id: this.state.user.id,
                username: this.state.user.username,
                name: this.state.user.name,
                email: this.state.user.email,
                occupation: this.state.user.occupation,
                gender: this.state.value,
                city: this.state.user.city,
                info: this.state.user.info,
                site: this.state.user.site,
                password: this.state.user.password,
                image: this.state.image,
            
          
            })

            .then((response) => {
                if (response.data === "Success") {
                    alert("Güncellendi");
                }
                    console.log('====================================');
                    console.log(response.data);
                    console.log('====================================');
              
              })
            .catch((error) => {
                console.error(error);
            });

           
            
        }
        else{
             axios.put('http://192.168.1.101/partner_project_backend/profile_edit.php',
            {
                photo: "NO",
                id: this.state.user.id,
                username: this.state.user.username,
                name: this.state.user.name,
                email: this.state.user.email,
                occupation: this.state.user.occupation,
                gender: this.state.value,
                city: this.state.user.city,
                info: this.state.user.info,
                site: this.state.user.site,
                password: this.state.user.password,
            
          
            })

            .then((response) => {
                if (response.data === "Success") {
                    alert("Güncellendi");
                }
                    console.log('====================================');
                    console.log(response.data);
                    console.log('====================================');
              
              })
            .catch((error) => {
                console.error(error);
            });


        }

 
      
    }




    render() {

            StatusBar.setBarStyle('light-content', true);
        return (

            <SafeAreaView style={[styles.container]}>

                <TouchableOpacity title="Go to Home"
                    onPress={() => { this.props.navigation.navigate('ProfileScreen') }} >

                    <Ionicons name='arrow-back-outline' color={'white'} size={30} style={{ marginTop: 20, color: 'black', paddingLeft: 12, fontSize: 18, fontWeight: 'bold', }} >Profili Güncelle </Ionicons>

                </TouchableOpacity>

                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>

                        <TouchableOpacity onPress={this.uploadImage}>

                            <Image style={{ width: 100, height: 100, borderRadius: 400 / 2 }}
                                source={this.state.user.image != null ? { uri: 'http://192.168.1.101/partner_project_backend/' + this.state.user.image } :
                                    require('../../Images/Profile.jpg')}
                            />

                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: '#808e9b', paddingVertical: 15 }}>
                            Profil fotoğrafı yükle
                    </Text>

                    </View>

                    {/* Posts View */}
                    <View style={styles.postsView} >

                        {/* {posts.map((post) => (
                    <Post post={post} />
                  ))} */}
                        <View style={styles.postView} >
                            {/* Post Header */}
                            <View style={styles.postHeader}>

                                <View style={{ flex: 1, paddingHorizontal: 0 }}>


                                </View>



                            </View>
                            {/* Post Content */}
                            <View style={{ flexDirection: 'column' }}>
                                <View>
                                    <Text>Kullanıcı Adı</Text>
                                    <TextInput
                                        placeholder={this.state.user.username}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(username) => this.state.user.username = username}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>İsim Soyisim</Text>
                                    <TextInput
                                        placeholder={this.state.user.name}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(name) => this.state.user.name = name}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Email</Text>
                                    <TextInput
                                        placeholder={this.state.user.email}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(email) => this.state.user.email = email}
                                    />
                                </View>
                               
                                <View style={{ marginTop: 10 }}>
                                    <Text>Meslek</Text>
                                    <TextInput
                                        placeholder={this.state.user.occupation}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(occupation) => this.state.user.occupation = occupation}
                                    />
                                </View>

                                <View style={{ marginTop: 10}}>
                                    <Text style={{ marginBottom: 10}} >Cinsiyet</Text>
                                    <DropDownPicker
                                    style={styles.dropDownContainerStyle}
                                   
                                    open={this.state.open}
                                    value={this.state.value}
                                    items={this.state.items}
                                    setOpen={this.setOpen}
                                    setValue={this.setValue}
                                    setItems={this.setItems}
                                    
                                />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Şehir</Text>
                                    <TextInput
                                        placeholder={this.state.user.city}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(city) => this.state.user.city = city}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Site</Text>
                                    <TextInput
                                        placeholder={this.state.user.site}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(site) => this.state.user.site = site}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Hakkımda</Text>
                                    <TextInput
                                        placeholder={this.state.user.info}
                                        placeholderTextColor='black'
                                        style={styles.biginput}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(info) => this.state.user.info = info}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Şifre</Text>
                                    <TextInput
                                        placeholder={this.state.user.password}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        secureTextEntry={true}
                                        numberOfLines={50}
                                        textContentType='password'
                                        onChangeText={(password) => this.state.user.password = password}
                                    />
                                </View>


                                <TouchableOpacity style={styles.loginButton}
                                    title="Go to Details"
                                    onPress={this.EditProfileButton}
                                >
                                    <Text style={styles.loginButtonText}>Kaydet</Text>

                                </TouchableOpacity>


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
        backgroundColor: 'white',
        color: '#fff',
        marginTop: 0

    },
    dropDownContainerStyle:{
   
        borderWidth:0,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 50,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
      },
    ImageContainer: {
        borderRadius: 400 / 2,
        width: 100,
        height: 100,
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
        // backgroundColor: '#247BA0',

        // shadowColor: '#1e1e1e',
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
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,

    },
    loginButton: {
        backgroundColor: '#911b2c',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 25,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fafafa',
        alignSelf: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 50,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
    biginput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 150,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
});