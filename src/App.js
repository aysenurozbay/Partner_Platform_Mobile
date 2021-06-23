import 'react-native-gesture-handler';
import React, {Fragment, Component} from 'react';
import  LoadingScene from './Scenes/LoadingScene';

class App extends Component{
  
    render(){
        
        return <LoadingScene/>;
            // "start": "concurrently \"react-native start\" \"nodemon server.js\"",
    }
}

export default App;