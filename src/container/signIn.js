import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'

import firebase from 'firebase'
// import Loading from '../Component/Loader';
import ErrorMessage from '../Component/errorMessage';
import { GoogleSignin } from 'react-native-google-signin';




import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";


import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "admin@gmail.com",
            password: "123456"
        };


    }


    _signInGoogle = () => {
        GoogleSignin.hasPlayServices().then(() => {
            console.log("HAS SERVICES")
        }).catch((err) => {
            console.log("Play service error", err.code, err.message);
        })

        GoogleSignin.configure({
            webClientId: '120528953275-l9vpn7p45qc828vmm2726hus9jhit1si.apps.googleusercontent.com'
        });

        GoogleSignin.signIn()
            .then(accessTokenData => {
                // alert(JSON.stringify(accessTokenData))
                console.log(accessTokenData, "signin++++++++++++");
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    accessTokenData
                );
                // alert(JSON.stringify(credential))
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(function (user) {
                        // alert(JSON.stringify(user))

                        console.log("Sign In Success", user);
                    });
                GoogleSignin.signOut()
            })
            .catch(err => {
                console.log(err)
                console.log(JSON.stringify(err))

                // console.log("WRONG SIGNIN----------", err);
            });

    };

    render() {

        return (
            <View style={{
                flex: 1,
                // height: "100%" 
                backgroundColor: "#2A2E43"
            }}>


                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 15,
                    marginHorizontal: "10%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginTop:
                    // backgroundColor:"yellow",
                }}>

                    <Button
                        style={{
                            width: "45%", height: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 18,
                        }}
                        onPress={() =>
                            Actions.signIn()
                        }

                    >
                        <Text style={{ color: "white" }}>SIGN IN</Text>
                    </Button>


                    <Button
                        style={{
                            width: "45%", height: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 18, backgroundColor: "#2A2E43",
                            borderColor: "#2A2E43"
                        }}
                        onPress={() =>
                            Actions.signUp()
                        }
                    >
                        <Text style={{ color: "white" }} >SIGN UP</Text>
                    </Button>

                </View>



                <View
                    style={{
                        flex: 8,
                        marginHorizontal: "5%",
                        alignItems: "center",
                        marginTop: 25
                        // backgroundColor: "red",
                    }}
                >
                    <Item style={styles.input}>
                        <Input
                            placeholder={"Email"}
                            placeholderStyle={{ fontSize: 10 }}
                            placeholderTextColor="#b3b3b3"
                            keyboardType={'email-address'}
                            style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                            onChangeText={(e) => { this.setState({ email: e }) }}
                            value={this.state.email}
                        />
                        <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                    </Item>
                    <Item style={styles.input}>
                        <Input
                            secureTextEntry
                            placeholder={"Password"}
                            placeholderStyle={{ fontSize: 10 }}
                            placeholderTextColor="#b3b3b3"
                            style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                            onChangeText={(e) => { this.setState({ email: e }) }}
                            value={this.state.email}
                        />
                        <Icon name='cellphone-lock' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                    </Item>



                    {
                        (this.props.isLoader === true) ?
                            (
                                <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                            ) :
                            (

                                <Button
                                    style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                    onPress={() => {
                                        this.props.getUserSignIn(this.state)
                                        // this.setState({
                                        //     email: '',
                                        //     password: ''
                                        // })
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Sign In</Text>
                                    
                                </Button>
                            )
                    }

                    {
                        (this.props.isError === true) ? (
                            <View style={{width:"90%"}}>
                                <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                            </View>

                        ) : null
                    }


                    <View style={{ marginTop: 20 }}>
                        <Text
                            onPress={() =>
                                Actions.forGotPassword()
                            }
                            style={{ color: "#959DAD", textDecorationLine: "underline" }}>Forgot Password?</Text>
                    </View>



                    <View style={{ marginTop: 25 }}>
                        <Item style={{ borderBottomColor: "#2A2E43" }}>
                            <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                            <Text
                                style={{ color: "red", marginHorizontal: 8 }}
                            >OR</Text>
                            <View><Text style={{ top: -3, color: "#959DAD" }}>____________________</Text></View>
                        </Item>
                    </View>


                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 15,
                        justifyContent: "space-between",
                        alignItems: "center",
                        // backgroundColor:"yellow",
                    }}>

                        <Button
                            style={{
                                width: "45%", height: 50, justifyContent: "center",
                                alignItems: "center", borderRadius: 10, backgroundColor: "#3A559F"
                            }}
                        >
                            <Icon name='facebook' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                            <Text style={{ color: "white", left: -10 }}>Facebook</Text>
                        </Button>


                        <Button
                            style={{
                                width: "45%", height: 50, justifyContent: "center",
                                alignItems: "center", borderRadius: 10, backgroundColor: "#ffff",
                                borderColor: "#2A2E43"
                            }}
                            onPress={this._signInGoogle}
                        >

                            <Image style={{ width: 30, height: 22, marginRight: 20 }}
                                source={require('../assets/Images/google.jpg')}
                                resizeMode="contain"
                            />

                            <Text style={{ color: "#2A2E43", left: -10 }} >Google</Text>
                        </Button>

                    </View>















                </View>
            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        getUserSignIn: (data) => {
            dispatch(signinAction(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        backgroundColor: '#454F63',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#454F63',

        width: '100%',
        borderRadius: 18
    },


});