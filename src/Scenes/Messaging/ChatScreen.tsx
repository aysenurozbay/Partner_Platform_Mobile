import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';



export interface Message {
  user: string;
  timestamp: number;
  chat_message?: string;
  otheruser?: string;
}
export interface ChatState {
  messages: Message[];
}
const emptyMessage: Message = {
  user: '',
  timestamp: new Date().getTime(),
  chat_message: '',
};
// Android'de 10.2.2.2 IP'si üzerinden localhost'a erişiliyor
const domain = Platform.OS === 'ios' ? 'localhost' : '192.168.1.101';
let ws: WebSocket;



const ChatScreen = (props ) => {

 
   

  const [message, setMessage] = useState<Message>(emptyMessage);
  const [chat, setChat] = useState<ChatState>({
    messages: [],
  });
useEffect(() => {
    startWebSocket();
  }, []);
  console.log("******");
  
  console.log(props);
const startWebSocket = () => {
    console.log('Websocket started.');
    ws = new WebSocket(`ws://'$domain':8080`);
    axios.post('http://192.168.1.101/partner_project_backend/get_message.php',
    {
       to_id: props.route.params.to_id,
       from_id : props.route.params.user.id
    })


    .then((response) => {
      // if (response.data != "Success") {
      //   alert("Bir hatayla karşılaşıldı. Daha sonra tekrar deneyin.");
      // }
 
      console.log('============databaseden geldi=======');
      console.log(response.data);
      console.log('====================================');
      
      const newChat = {...chat};
      const messages =  {...response.data}
     
      const _messages = Object.values(messages)
      // console.log(_messages);
      _messages.map( mes => { 
        // console.log(mes);   
        newChat.messages.push(mes);

      })

      newChat.messages.push({...response.data});
      setChat(newChat);
      // console.log('NEWCHAT: ' , newChat);
  
   
      
      })
    .catch((error) => {
        console.error(error);
    });
    ws.onmessage = (e) => {
          // console.log(`Received: ${e.data}`);
          var msg = JSON.parse(e.data);
          console.log(msg);
          // handleReceive(msg);
        };
    ws.onclose = (e) => {
          console.log('Reconnecting: ', e.message);
          setTimeout(startWebSocket, 5000);
        };
    ws.onerror = (e) => {
          console.log(`Error: ${e.message}`);
        };
  };
// const handleReceive = (receivedMsg: Message) => {
//     const newChat = {...chat};
//     const msg = {...receivedMsg, user: 'otherUser'};
//     newChat.messages.push(msg);
//     console.log(newChat.messages);
//     setChat(newChat);
//   };
const handleSend = () => {
    const me = props.route.params.user.id;
    console.log('YouSent:' + message);
    if (message.chat_message === '') {
      return;
    }
    axios.post('http://192.168.1.101/partner_project_backend/send_message.php',
    {
       message: message,
       from_id : me
      
 
    })


    .then((response) => {
      if (response.data != "Success") {
        alert("Bir hatayla karşılaşıldı. Daha sonra tekrar deneyin.");
      }
      //  console.log('========STACK===============');
      //  console.log(response.data);
      //  console.log('====================================');
      
      })
    .catch((error) => {
        console.error(error);
    });

    
    ws.send(JSON.stringify(message));
    const newChat = {...chat};
    newChat.messages.push({...message});
    setChat(newChat);
    setMessage(emptyMessage);

    
      // console.log('========STACK===============');
      //  console.log(newChat);
      //  console.log('====================================');

  };

const handleChangeText = (e: string) => {
    setMessage({
      chat_message: e,
      timestamp: new Date().getTime(),
      user: props.route.params.to_id,
    });
  };
  const formatTime = (timestamp: number) => {
    let unix_timestamp = timestamp;

  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  // console.log(formattedTime);
  return formattedTime;
  };
 

  const _renderItem = ({item}) => {
  
         return (
           <View>
               {/* <Image
                  style={styles.userProfileImage}
                  source={item.image != null ? {uri:'http://192.168.1.101/partner_project_backend/'+item.image} :
                  require('../../Images/Profile.jpg')} 
                /> */}
           
            <View
              style={{
                ...styles.messageContainer,
                ...(item.from_user_id !== props.route.params.user.id ? styles.messageContainerReceived : {}),
                flex: 1,
              }}>
               
            
              {item.chat_message && <Text style={styles.messageText}>{item.chat_message}</Text>}
              <Text style={styles.messageTime}>{item.timestamp}</Text>
            </View>
          </View>
         );
    
  };
  
return (
    <SafeAreaView style={styles.container}>
       <FlatList
         data={chat.messages}
         keyExtractor={(item,index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: '#3a6ee8',
                    alignSelf:
                    item.from_user_id !== props.route.params.user.id
                        ? 'flex-start'
                        : 'flex-end',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                    item.from_user_id !== props.route.params.user.id ? 0 : 8,
                    borderBottomRightRadius:
                    item.from_user_id !== props.route.params.user.id ? 8 : 0,
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                  >
                    {item.chat_message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />


      {/* <FlatList
        data={chat.messages}
        keyExtractor={(item,index) => index.toString()}
        renderItem={_renderItem}
      /> */}
        
        <KeyboardAvoidingView 
        enabled={true}
        {...(Platform.OS === 'ios' && {behavior: 'padding'})}
        style={{ paddingVertical: 10 }}
        >
          <View style={styles.messageInputView}>
            <TextInput
              style={styles.messageInput}
              onChangeText={handleChangeText}
              onSubmitEditing={handleSend}
              value={message.chat_message}
              returnKeyType="send"
             
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                message.chat_message!.length > 0 ? handleSend() : console.log()
              }}
            >
              <Icon name='send' type='material'  size={30} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 7,
    flex: 1,
    justifyContent: 'space-between',
  },
  messageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
    backgroundColor: '#1976d2',
    borderRadius: 3,
    marginBottom: 5,
    flexDirection: 'row',
    maxWidth: 300,
  },
  messageContainerReceived: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#00796b',
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
    marginEnd: 40,
    padding: 5,
  },
  messageTime: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginStart: 10,
    position: 'absolute',
    end: 10,
    bottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#448aff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  sendButton: {
    paddingStart: 10,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  imageButton: {
    width: 24,
    height: 24,
    tintColor: '#448aff',
  },
  image: {
    height: 100,
    flex: 1,
  },
  sendButtonText: {color: '#448aff'},
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: { width: 20, aspectRatio: 1, borderRadius: 100 },
  
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    // marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
export default ChatScreen;