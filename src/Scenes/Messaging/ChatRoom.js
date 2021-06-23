import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { CLIEngine } from 'eslint';
var SERVER_GET_MESSAGES_URL = 'http://192.168.1.101/partner_project_backend/get_messages.php';
var SERVER_ADD_MESSAGES_URL = 'http://192.168.1.101/partner_project_backend/add_message.php';
export default class ChatRoom extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage:'',
      chatMessage:'',
      receivedData:[]
    }
    this._onNewMsg();
    
  }
  
  componentDidMount() {

    // console.log('==================Chat e gelen ==============');
 
    //console.log(this.props.route.params.room);
    //this.update();
    this.getMessages()
  }

  getMessages() {
    let messages = this.state
    if (this.state.loading) {
      console.log("sdfsdf");
      return (
        <View>
          <ActivityIndicator size="large" animating />
        </View>
      )
    }
    else {
      axios.post(SERVER_GET_MESSAGES_URL,
        {
          id: this.props.route.params.user.id,
          contact_id: this.props.route.params.contact_id,
          room: this.props.route.params.room
        })
        .then((response) => {
          this.setState({receivedData:response.data})
          //this.state.receivedData.map(data => console.log(data))
        })
        .catch((error) => {
          console.error(error);
        });
  
      



    }
  }


  

  _onNewMsg = () => {
    // this.props.route.params.socket.on('chat message', (message) => {
    //   this.setState(prevState => ({
    //     messages: [...prevState.messages, message]
    //   }));
    //   this._scrollToBottom(70);
    // }, () => {});
  }
  update() {


    const interval = setInterval(() => {
      console.log('This will run every second!');
      this.getMessages();
    }, 1000);
    return () => clearInterval(interval);


  }

  _sendMessage() {
    console.log(this.props.route.params);
    //const {chatMessage} = this.state;
    //console.log(chatMessage, this.props);
    // this.props.route.params.socket.emit('chat message', {
    //   room:this.props.route.params.room,
    //   from_id: this.props.route.params.name,
    //   message: chatMessage?chatMessage:'Hello',
    //   createdAt: new Date().now
    // }, () => {
    //   this._scrollToBottom(50);
    // });
    // this.setState({chatMessage:''})



    axios.post(SERVER_ADD_MESSAGES_URL,
      {
   
        id: this.props.route.params.user.id,
        room: this.props.route.params.room,
        contact_id: this.props.route.params.from_id,
        message: this.state.newMessage,
        createdAt: new Date().now
      })
      .then((response) => {

        //console.log(response.data);
        this.getMessages()


      })
      .catch((error) => {
        console.error(error);
      });

  }

  _renderName = (name) => {
    return this.props.route.params.user.username !== name ? <Text style={{fontSize: 50, marginLeft: 5}}> {name} </Text> : null;
  }

  _scrollToBottom = (offset) => {
    const scrollHeight = this.contentHeight - this.scrollViewHeight + offset;
    if (scrollHeight > 0) {
      this.flatlist.scrollToOffset({ offset: scrollHeight, animated: true });
    }
  }
  

  render() {
    return (
      <SafeAreaView style={{flex: 1,}}>
        <FlatList
          ref={flatlist => this.flatlist = flatlist}
          data={this.state.receivedData}
          keyExtractor={(item, index) => `${index}`}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
          renderItem={({ item }) => {
            const cellStyle = {
              container: {
                justifyContent: 'center',
                alignItems: this.props.route.params.user.id === item.from_id ? 'flex-end' : 'flex-start',
              },
              textContainer: {
                maxWidth: '70%',
                marginHorizontal: 12,
                marginVertical: 0,
                paddingHorizontal: 13,
                paddingVertical: 8,
                backgroundColor: this.props.route.params.user.id === item.from_id ? '#2f73e0' : '#e2e2e2',
                borderRadius: 10,
                
              },
              text: {
                color: this.props.route.params.user.id === item.from ? '#ffffff' : '#282828',
                fontSize: 15,
              }
            }
            return (
              <View style={cellStyle.container}>
                {this._renderName(item.from)}
                <View style={cellStyle.textContainer}>
                  <Text style={cellStyle.text}> {item.message} </Text>
                </View>
              </View>
            );
          }}
        />
         <View style = {styles2.inputAndSendView}>
              <TextInput 
                ref = {'newMessage'}
                style = {{marginTop:10}}
                placeholder = {'Enter new message here'}
                text = {this.state.newMessage}
                onChangeText = {(e) => this.setState({newMessage: e})} />
              <TouchableHighlight 
                style = {styles2.sendButton}
                onPress = {() => this._sendMessage()}> 
                <Text style = {styles2.whiteText}>
                  SEND
                </Text>
              </TouchableHighlight>
            </View>
      </SafeAreaView>
    );
  }
}

const styles2 = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    width: '100%',
    height: 50,
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2f73e0',
  }
})

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1f1f1f',
    color: '#c1c1c1',
    marginTop: 0
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#538d22',
    marginBottom: 20,
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
  },
  item: {

    fontSize: 18,
    height: 44,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  userCard: {
    // backgroundColor: '#a8dadc',

    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 0,
  },
  header: {
    margin: 10,
    marginBottom: 10,
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  }
});