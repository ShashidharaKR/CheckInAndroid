import React, { Component } from 'react';
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { BASE_URL } from '../Envirnments/Envirnments';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    submit = () => {

        if (this.state.username == '' || this.state.password == '') {
            alert("Please fill both fields");
        } else {

            //  Actions.home();

            fetch(BASE_URL+'login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                     alert(responseJson.message);
                   // Actions.home();
                })
                .catch((error) => {
                    console.error(error);
                });;


            // This is another method to call apis

            // const serverport = JSON.stringify({
            //     user_name: this.state.username,
            //     user_password: this.state.password
            // });
            // axios.post('https://obaba.shop/obaba_shop_api/index.php/UserLogin_c/userLogin', serverport)
            //     .then((response) => {
            //         if (response.data.status) {
            //             alert("Logged In");

            //                  Actions.home();

            //         } else {
            //             alert("Invalid Credentials");
            //         }
            //     })
            //     .catch((error) => {
            //         alert(error)
            //     })

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <OutlinedTextField
                    label='Username'
                    keyboardType='text'
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    onChangeText={(username) => this.setState({ username })}
                />
                <OutlinedTextField
                    onChangeText={(password) => this.setState({ password })}
                    label='Password'
                    keyboardType='text'
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                />
                <TouchableOpacity onPress={(e) => this.submit(e)} style={styles.buttons}>
                    <Text style={styles.text} >LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff0f7',
        justifyContent: "center",
        padding: '10%',
        flex: 1,
    },
    buttons: {
        backgroundColor: '#3b8dd4',
        marginTop: 8,
        padding: 13,
        alignItems: "center",
        borderRadius: 4,
    },
    text: {
        color: '#FFF',
    }
});
