import React, { Component } from 'react';
// import firebase from 'firebase'
import firebase from 'react-native-firebase'

import { Actions } from 'react-native-router-flux'
import { Container, Header, Drawer, Left, Body, Right, Title, Item, Input, Picker, Form, Item as FormItem } from 'native-base';
import { StyleSheet, View, Image, Text, AppRegistry, Alert, StatusBar, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
class Splash extends Component {
    componentDidMount() {
        console.log("DIDMOUNT")
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                console.log(user)
                console.log(user.uid)
                if (user.uid == 'GTuxxZbYygZ4EXXCXyL6XwXHe0A2') {
                    console.log('ADMINHOME')
                    Actions.AdminHome()
                } else {
                    console.log(Actions, "Actions")
                    console.log(Actions.currentScene, "CURRENTSCREEN")
                    if (Actions.currentScene == 'signUp') {
                        let userData = {
                            uid: user.uid,
                            userEmail: user.email,
                            date: Date.now()
                        }
                        console.log(userData, "userData")
                        // firebase.database().ref('users/' + user.uid + '/').set(userData)
                        let authFirebase = firebase.auth().currentUser
                        Actions.PhoneVerification({authFirebase:authFirebase})
                    }
                    else {
                        Actions.Home()
                    }
                }
            }
            else {
                console.log('no user')
                Actions.signIn()
            }
        })
    }
    render() {
        return (
            <View>
                <Text>
                    Splash Screen
                </Text>
            </View>
            // <ImageBackground source={require('../Images/Photo.png')}
            //     style={{
            //         backgroundColor: '#fd902a', flex: 1,
            //         justifyContent: 'center', alignItems: 'center'
            //     }}>
            //     <StatusBar
            //         backgroundColor='#fd902a'
            //         barStyle="light-content"
            //     />
            //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //         <Image style={{ flex: 1, resizeMode: 'contain', height: 112, width: 300 }}
            //             source={require('../Images/Logo.png')}
            //         />
            //     </View>
            // </ImageBackground>
        )
    }
}
export default Splash