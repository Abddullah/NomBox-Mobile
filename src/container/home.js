import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'

// import firebase from 'firebase'
import firebase from 'react-native-firebase'

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


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }



    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43",
                alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: "red",

            }}>
                <Text>
                    Home
                </Text>


                <TouchableOpacity onPress={()=>{firebase.auth().signOut()}}>
                <Text>Logout</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
let mapStateToProps = state => {
    return {


    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({



});