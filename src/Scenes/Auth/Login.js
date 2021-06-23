
import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,

} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.UserLoginFunction = this.UserLoginFunction.bind(this);

    this.state = {
      Username: "",
      Password: "",
    }
  }

  UserLoginFunction = () => {

    const  Username  = this.state.Username;
    const  Password  = this.state.Password;
      
    // console.log(this.props);
    
    axios.post('http://192.168.1.101/partner_project_backend/user_login.php',
    {
      username:Username,
      password:Password

    })
    .then((response) => {
    
      // console.log(response.data)
        if (response.data === 'Invalid Username or Password Please Try Again') {
          alert("Bir problem oluştu. Bilgilerinizi kontrol edin ya da daha sonra tekrar deneyin.");
        
        }
        else {
          this.props.navigation.replace('Main', { user: response.data});
          // this.props.navigation.navigate('MessagingMain', { user: response.data});
          
      
          
        }
    })
    .catch((error) => {
      console.error(error);
    });

  }
  render() {

    return (

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
          <SafeAreaView  style={styles.container} > 
     
            
          <Text style={styles.welcomeText}>Giriş Yap</Text>


          <TextInput
            placeholder='Kullanıcı Adı'
            placeholderTextColor='#808e9b'
            style={styles.input}
            onChangeText={Username => this.setState({ Username })}
          />

          <TextInput
            placeholder='Şifre'
            placeholderTextColor='#808e9b'
            style={styles.input}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={Password => this.setState({ Password })}
          />



          <TouchableOpacity style={styles.loginButton}
            title="Go to Details"
            onPress = {() => {
              this.UserLoginFunction()
            }}

            
       
          //  onPress={() => navigation.navigate('MainScreen')}
          >
            <Text style={styles.loginButtonText}>Giriş yap</Text>

          </TouchableOpacity>

          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Hesabınız yok mu?
            </Text>
            <TouchableOpacity>
              <Text style={[styles.signUpText, { color: '#538d22' }]}>

                {' Kayıt Ol'}
              </Text>

            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>





    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#538d22',
    marginBottom:20,
    alignSelf: 'center',
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
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#538d22',
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
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  pickerStyle: {
    color: '#808e9b',
  }
});