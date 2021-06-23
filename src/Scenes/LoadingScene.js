import React, { Component } from 'react'
import { View, Text, } from 'react-native'

import { Router, Scene } from "react-native-router-flux";

import AnimateScene from "./AnimateScene";
import Auth from "./Auth";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Chatroom from "./Chatroom";
import MessagingMain from "../Scenes/MainStacks/MessagingMain";
import Main from "./../Scenes/MainStacks/Main";

export default class LoadingScene extends Component {
    render() {
        return (

            <Router>
                <Scene key="root" hideNavBar={true}>

                    {/* SCENE  */}
                    <Scene
                        component={AnimateScene}
                        key="loading"
                        initial={true}
                        headerShown={false}
                    />
                    <Scene
                        component={Login}
                        key="login"
                        headerShown={false}
                    />
                    <Scene
                        component={Register}
                        key="register"
                        headerShown={false}
                    />
                    <Scene
                        component={Main}
                        key="Main"
                        headerShown={false}
                    />
                    <Scene
                        component={MessagingMain}
                        key="MessagingMain"
                        headerShown={false}
                    />
                    <Scene
                        component={Auth}
                        key="auth"
                        headerShown={false}
                    />
                </Scene>
            </Router>

        )
    }
}

