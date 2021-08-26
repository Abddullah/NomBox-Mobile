import ActionTypes from '../Constant/constant';
import { Actions } from 'react-native-router-flux';
// import firebase from 'firebase';
import firebase from 'react-native-firebase'

var config = {
    apiKey: "AIzaSyCkWo2gOBHS00Uft4ZtLyeA_bAJUGxDy_k",
    authDomain: "nombox-1529885929392.firebaseapp.com",
    databaseURL: "https://nombox-1529885929392.firebaseio.com",
    projectId: "nombox-1529885929392",
    storageBucket: "nombox-1529885929392.appspot.com",
    messagingSenderId: "120528953275"
};
firebase.initializeApp(config);

export function signUpAction(data) {
    return dispatch => {
        console.log(data, "action working")
        dispatch({ type: ActionTypes.LOADER })
        if (data.password === data.repeatPassword) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((user) => {
                    
                    // alert("signup")

                    
                    // Actions.signIn()
                    dispatch({ type: ActionTypes.LOADER })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    // alert(errorMessage)
                    console.log(errorMessage, "save authentication");
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        } else {
            // alert("Please check password")
            var errorMessage = "Please check password";
            // alert(errorMessage)
            dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
    }
}

export function signinAction(users) {
    return dispatch => {
        console.log(users,"ACTION")
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().signInWithEmailAndPassword(users.email, users.password)
            .then((signedinUser) => {
console.log(signedinUser,"SIGNINUSER")
                // alert("sign in")
                // if (signedinUser.uid === 'LB2xoa0PGee9wqEgr52Sei7vnM03') {
                //     Actions.AdminHome()
                // }
                // else {
                //     firebase.database().ref('/users/' + signedinUser.uid).once('value')
                //         .then((userData) => {

                //             console.log(userData.val(), "user in signin func")
                //             dispatch({ type: ActionTypes.CURRENTUSER, payload: userData.val() })
                //             dispatch(allCoupons())
                //             Actions.Home()

                //         })
                // }
                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((error) => {
                var errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorMessage, "save authentication");
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })




    }
}


export function logOut() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            Actions.signIn()
        }, function (error) {
            // An error happened.
            console.log('log out nahen hua', error.message)
        });

    }
}


export function forgotPassword(user) {
    return dispatch => {
        console.log(user, "userrrrrrrr")
        dispatch({ type: ActionTypes.LOADER })
        firebase.auth().sendPasswordResetEmail(user.email)
            .then(function (user) {
                dispatch({ type: ActionTypes.LOADER })
                alert("Please check your Email  ")
                Actions.signIn()
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }
}
