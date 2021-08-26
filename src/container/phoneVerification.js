import PhoneAuth from 'react-native-phone-auth-component';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
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
      codeInput: ''
    };


  }


  verifyPhone = () => {
    

    let number = '+923342665897'
    console.log(number, "NUMBER")
    console.log(firebase.auth().currentUser,"current User")
    firebase.auth().signInWithPhoneNumber(number)
      .then(
        (confirmResult) => {
          this.setState({ confirmResult, message: 'Code has been sent!' })
          let codeInput = '123456'
          confirmResult.confirm(codeInput)
            .then((user) => {
              console.log(user, "USER")
              console.log(user.getIdToken(),'token')
              const credential = firebase.auth.PhoneAuthProvider.credential(user.uid)
              console.log(credential,"credentialPHONE")
              this.setState({ message: 'Code Confirmed!' });
firebase.auth().currentUser.linkWithCredential(credential).then((userCred)=>{
console.log(userCred,"userCred")
})
            })
            .catch((error) => {
              this.setState({ message: `Code Confirm Error: ${error.message}` })
              console.log(error, "errorcodeconfirmation")

            });
          console.log(confirmResult, 'confirmResult')
        }
      )
      .catch((error) => {
        this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
        console.log(error, "ERROR")
      });


  }

  confirmCode = () => {

    const { codeInput, confirmResult } = this.state;
    console.log(codeInput, "CODE INPUT")
    console.log(confirmResult, "confirmResultconfirmResultconfirmResult")
    if (confirmResult && codeInput.length) {
      console.log("IF")
      confirmResult.confirm(codeInput)
        .then((user) => {
          console.log(user, "USER")
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch((error) => {
          this.setState({ message: `Code Confirm Error: ${error.message}` })
          console.log(error, "errorcodeconfirmation")

        });
    }
  };

  render() {
    console.log(this.props.authFirebase,"AUTHFIREBASE")
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#2A2E43",
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: "red",

      }}>
        <TouchableOpacity onPress={this.verifyPhone}>
          <Text style={{ color: 'white' }}>
            tap to  Phone verfication
              </Text>
        </TouchableOpacity>
        <Item style={styles.input}>
          <Input
            placeholder={"Verification Code"}
            placeholderStyle={{ fontSize: 10 }}
            placeholderTextColor="#b3b3b3"
            style={{ marginLeft: 15, fontSize: 15, color: "white" }}
            onChangeText={(e) => { this.setState({ codeInput: e }) }}
            value={this.state.codeInput}
          />
          <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
        </Item>
        <TouchableOpacity onPress={this.confirmCode}>
          <Text style={{ color: 'white' }}>
            Verify code
              </Text>
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






















// *****************************************************
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
//   Linking,
// } from 'react-native';
// import PhoneInput from 'react-native-phone-input';
// import { Actions } from 'react-native-router-flux';
// import firebase from 'firebase'

// export default class PhoneVerification extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: '',
//       countryCode: '',
//       num: '',

//       height: 0,
//       shouldDisableButton: false,
//       error: false,
//     };
//   }
//   loginSubmit = () => {
//     // let number = "+" + this.state.countryCode + this.state.num
//     // console.log(number,"number");
//     // console.log(typeof number,"type");
//     // if (number) 
//     // {
//     //   this.props.Login({
//     //     number: number,

//     //   });
//     //   Keyboard.dismiss();
//     // } else {
//     //   Alert.alert('Error', 'Enter Number');
//     //   this.setState({ error: true });
//     // }
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     let number = '+923342665897'
//     var appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(number, appVerifier)
//       .then(function (confirmationResult) {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         console.log(confirmationResult,"confirmationResult")
//         window.confirmationResult = confirmationResult;
//       }).catch(function (error) {
//         console.log(error,"ERROR")
//         // Error; SMS not sent
//         // ...
//       });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View
//           style={{
//             margin: 20,
//             justifyContent: 'center',

//           }}
//         >
//           <View style={{ alignItems: 'center' }}>
//             <Text style={{ color: 'white', fontSize: 19 }}>What's your phone number?</Text>
//           </View>
//           <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 20 }}>
//             <View style={{
//               width: 80, borderBottomColor: "lightgray", borderBottomWidth: 1.5,
//               padding: 15, marginHorizontal: 5
//             }}>
//               <PhoneInput
//                 textStyle={{ fontSize: 18, color: 'white' }}
//                 flagStyle={{ marginLeft: -20 }}

//                 onSelectCountry={(value) => {
//                   console.log(value, "before")
//                   console.log(value.dialCode, "before")
//                   this.setState({
//                     countryCode: value.dialCode
//                   })
//                   console.log(value.dialCode, "after")
//                 }}
//                 onChangePhoneNumber={(value) => {
//                   console.log(value, "num")
//                   if (this.state.number.length === 2) {
//                     this.setState({ countryCode: value })
//                     this.NumInput.focus();
//                   } else {
//                     this.setState({ num: value })
//                   }
//                 }}

//                 ref={ref => (this.phone = ref)} />
//             </View>
//             <View style={{ flex: 4, marginHorizontal: 5, borderColor: 'lightgray', borderBottomWidth: 1.5, }}>
//               <TextInput
//                 value={this.state.num}
//                 ref={(ref) => { this.NumInput = ref }}
//                 keyboardType={'phone-pad'}
//                 style={{ paddingBottom: 15, fontSize: 18, color: 'white' }}
//                 underlineColorAndroid={'rgba(0, 0, 0, 0)'}
//                 onChangeText={(number) => {
//                   console.log(number, "number")
//                   this.setState({ num: number })
//                 }}
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={this.loginSubmit}
//           >
//             <Text style={styles.button}>Send Confirmation Code</Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2A2E43",
//   },
//   input: {
//     height: 40,
//     textAlign: 'center',
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     // backgroundColor: 'white',
//     marginVertical: 20,
//     color: 'white'
//   },
//   text: {
//     textAlign: 'center',
//     // color: appStyle.buttonColor,
//     fontWeight: '200',
//     fontSize: 10,
//     margin: 5,
//     color: 'white'
//   },
//   buttonContainer: {
//     backgroundColor: "white",
//     height: 40,
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginTop: 5
//   },
//   button: {
//     textAlign: 'center',
//     color: '#2A2E43',
//     fontSize: 17
//   },
// });