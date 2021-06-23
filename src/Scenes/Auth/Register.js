import React, { useState, useEffect, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';


export default class Register extends Component {
  

  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.setValue = this.setValue.bind(this);

    this.state = {
      UserName: "",
      UserEmail: "",
      UserPassword: "",
      UserCPassword: "",
      UserUsername: "",

      // DropDown
      open: false,
      value: null,
      items: [ 
          {label: 'Yatırımcı', value: 'Yatırımcı',},
          {label: 'Proje Sahibi', value: 'Proje Sahibi',},
          {label: 'İş Yeri Sahibi ', value: 'İş Yeri Sahibi',},
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
  UserRegistrationFunction = () => {
    const { UserName } = this.state;
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    const { UserCPassword } = this.state;
    const { UserUsername } = this.state;

    // console.log(res);
    let data = {
      method: 'POST',
      
      body: JSON.stringify({
        image: this.state.image,
        role: this.state.value,
        username: UserUsername,
        name: UserName,
        password: UserPassword,
        email: UserEmail,

      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch('http://192.168.1.101/partner_project_backend/user_registration.php', data)
            .then(response => response.json())  // promise
            .then(json => {
              console.log('RESULT:',json);
            })
      

  }
  
 
 
   
render() {
  const { open, value, items } = this.state;
  return (
    <TouchableWithoutFeedback
    onPress={() => {
        Keyboard.dismiss();
    }}
>
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.welcomeText}>Bize Katılın! </Text>
                   
        <ScrollView style={{}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={this.uploadImage}>

                <Image style={styles.ImageContainer} 
                    source={this.state.image != null ? this.state.image :
                    require('../../Images/Profile.jpg')} 
                />

            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#808e9b', paddingVertical: 15 }}>
                Profil fotoğrafı yükle
            </Text>

          </View>
          <DropDownPicker
            style={styles.dropDownContainerStyle}
            open={open}
            value={value}
            items={items}
            setOpen={this.setOpen}
            setValue={this.setValue}
            setItems={this.setItems}
                    
          />
            
          <Text style={styles.roleText}>! Rolünüzü daha sonra değiştiremezsiniz</Text>
          <TextInput
                            placeholder='Kullanıcı Adı'
                            placeholderTextColor='#808e9b'
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={username => this.setState({ UserUsername: username })}
                        />

                        <TextInput
                            placeholder='İsim Soyisim'
                            placeholderTextColor='#808e9b'
                            style={styles.input}
                            onChangeText={name => this.setState({ UserName: name })}
                        />
                        <TextInput
                            placeholder='Email Adresi'
                            placeholderTextColor='#808e9b'
                            style={styles.input}
                            autoCorrect={true}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={email => this.setState({ UserEmail: email })}
                        />
                        <TextInput
                            placeholder='Şifre'
                            placeholderTextColor='#808e9b'
                            style={styles.input}
                            secureTextEntry={true}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            textContentType='password'
                            onChangeText={password => this.setState({  UserPassword: password })}
                        />
                        <TextInput
                            placeholder='Şifre (Tekrar)'
                            placeholderTextColor='#808e9b'
                            style={styles.input}
                            secureTextEntry={true}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            textContentType='password'
                            onChangeText={cpassword => this.setState({ UserCPassword: cpassword })}
                        />

          <TouchableOpacity style={styles.loginButton}
              title="Register"
              onPress={this.UserRegistrationFunction}
          //  onPress={() => navigation.navigate('MainScreen')}
          >
              <Text style={styles.loginButtonText}>Kayıt ol</Text>

          </TouchableOpacity>
   
          </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
  );
}
};


const styles = StyleSheet.create({

  ImageContainer: {
      borderRadius: 400/ 2,
      width: 100,
      height: 100,
      borderColor: '#9B9B9B',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: require('../../Images/Profile.jpg'),
   
    },
  container: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
  },
  welcomeText: {
      fontSize: 30,
      fontWeight: '900',
      color: '#ae2012',
      alignSelf: 'center',
      marginBottom: 15,
      fontWeight: 'bold'
  },
  loginText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#000',
    borderBottomWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },  
  inputDrop: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 6,
      borderColor: '#000',
      borderBottomWidth: 2,
      marginTop: 0,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#000',
  },
  fpText: {
      alignSelf: 'flex-end',
      color: '#B33771',
      fontSize: 18,
      fontWeight: '600',
      marginTop: 10,
  },
  loginButton: {
      backgroundColor: '#ae2012',
      paddingVertical: 12,
      borderRadius: 6,
      marginTop: 20,
  },
  loginButtonText: {
      fontSize: 20,
      fontWeight: '500',
      color: '#fafafa',
      alignSelf: 'center',
  },
  loginWithBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 50,
  },
  iconButton: {
      backgroundColor: '#333',
      padding: 14,
      marginHorizontal: 10,
      borderRadius: 100,
  },
  signUpTextView: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  signUpText: {
      color: '#000',
      fontSize: 20,
      fontWeight: '500',
  },

  select: {
      width: '100%',
      height: 50,
      backgroundColor: '#333',

      marginTop: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#808e9b',
      borderColor: '#000',
      borderBottomWidth: 2,
  },
  pickerStyle: {
      color: '#808e9b',
  },
  roleText: {
      marginTop: 5,
  },
  dropDownContainerStyle: {

    borderWidth: 0,
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
});