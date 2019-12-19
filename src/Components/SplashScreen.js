import { AppRegistry, StyleSheet, Dimensions, Text, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import React, { useState, useEffect, Component } from 'react';
import { Animated, Image, View } from 'react-native';

export default class Splash extends React.Component {

    static navigationOptions = ({ navigation }) => {
        title: 'Splash'
    }

    constructor(props) {
        super(props);
        navigate = props.navigation,
            this.state = { email: '', password: '', device_token: '', device_type: '' };
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        setTimeout(() => {
            this.setTimePassed();
        }, 4000);
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    render() {

        const FadeInView = (props) => {
            const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

            React.useEffect(() => {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: 5000,
                    }
                ).start();
            }, [])

            return (
                <Animated.View                 // Special animatable View
                    style={{
                        ...props.style,
                        opacity: fadeAnim,         // Bind opacity to animated value
                    }}>
                    {props.children}
                </Animated.View>
            );
        }

        if (this.state.timePassed) {
            Actions.login({ type: 'replace' });
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: "#fff", padding: 10 }}>
                    <FadeInView>
                        <Image source={{ uri: 'https://obabaerp.files.wordpress.com/2018/06/cropped-orignal-logo-copy-2.png?w=240' }}
                            style={{ width: 100, height: 100 }} />
                        <Text>Security CheckIn</Text>
                    </FadeInView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcometxt: {
        textAlign: 'center',
        fontSize: 20,
        color: '#10598F'
    },
    welcomeImage: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    container1: {
        marginTop: 24
    },
    drawerHeader: {
        height: 150,
        backgroundColor: '#0984e3'
    },
    drawerImage: {
        marginTop: 30,
        height: 80,
        width: 80,
        borderRadius: 0
    },
    txt: {
        paddingTop: 0,
    }
});

AppRegistry.registerComponent('ObabaCheckIn', () => Splash);