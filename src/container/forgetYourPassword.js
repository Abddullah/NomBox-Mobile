import React, { Component } from "react";
import { connect } from "react-redux";
import { forgotPassword } from '../Store/Action/action'
import { Actions } from 'react-native-router-flux'

import firebase from 'firebase'
import Loading from '../Component/Loader';
import ErrorMessage from '../Component/errorMessage';




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


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "abddullahshah@gmail.com",
            // password: ""
        };


    }

    render() {

        return (
            <View style={{
                flex: 1,
                // height: "100%" 
                backgroundColor: "#2A2E43"
            }}>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: "5%",
                        justifyContent: "center",
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




                    {
                        (this.props.isLoader === true) ?
                            (
                                <ActivityIndicator style={{ top: 10 }} />
                            ) :
                            (
                                <Button
                                    style={{ width: "100%", height: 49, justifyContent: "center", alignItems: "center", borderRadius: 18, marginTop: 20 }}
                                    onPress={() => {
                                        this.props.forgotPassword(this.state)
                                        // this.setState({
                                        //     email: '',
                                        //     password: ''
                                        // })
                                    }}
                              >
                                    <Text style={{ color: "white" }}>Send Email</Text>
                                </Button>
                            )
                    }

                    {
                        (this.props.isError === true) ? (
                            <View style={{ width: "90%" }}>
                                <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                            </View>
                        ) : null
                    }



                    <View style={{ marginTop: 20 }}

                    >
                        <Text
                            onPress={() =>
                                Actions.signIn()
                            }
                            style={{ color: "#959DAD", textDecorationLine: "underline" }}>Back to signin</Text>
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
        forgotPassword: (data) => {
            dispatch(forgotPassword(data))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
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