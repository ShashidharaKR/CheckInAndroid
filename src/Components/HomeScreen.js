import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-crop-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { BASE_URL } from '../Envirnments/Envirnments';
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idType: [], contactType: [], vistorType: [], selectedVisiterType: '', selectedIdType: '', selectedContactType: '',
            path: 'https://boostlikes-bc85.kxcdn.com/blog/wp-content/uploads/2018/04/Short-URL-Illustration.jpg',
            dates: '', time: '', name: '', mobile: '', email: '', company: '', cont_person: '',
            purpose: '', id_type: '', id_no: '', goods: '', address: '', remarks: '',
            date: new Date(),
            isUploaded: false,
            next: false,
        };
    }

    componentDidMount() {

        this.getDrpdowns();

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    next = () => {
        //alert(this.state.date.toLocaleDateString()+'----'+this.state.date.toLocaleTimeString())
        this.setState({ next: true, dates: this.state.date.toLocaleDateString(), time: this.state.date.toLocaleTimeString() });
    }

    getDrpdowns = async () => {
        let res = await axios.get(BASE_URL + 'CtypeAndVtype')
        this.setState({
            idType: res.data.idType, contactType: res.data.contactType, vistorType: res.data.vistorType
        });

    }

    submit = () => {

        if (this.state.dates == '' || this.state.time == '' ||
            this.state.name == '' || this.state.mobile == '' ||
            this.state.selectedVisiterType == '0' || this.state.selectedContactType == '0' ||
            this.state.purpose == '' || this.state.selectedIdType == '0' ||
            this.state.id_no == '') {
            alert("Please Enter Mandatory Fileds");
        } else {


            const data = new FormData();

            data.append('date', this.state.dates);
            data.append('time', this.state.time);
            data.append('name', this.state.name);
            data.append('mobile', this.state.mobile);
            data.append('email', this.state.email);
            data.append('company', this.state.company);
            data.append('visiter_type', this.state.selectedVisiterType);
            data.append('contact_type', this.state.selectedContactType);
            data.append('contact_person', this.state.cont_person);
            data.append('purpose', this.state.purpose);
            data.append('gid_type', this.state.selectedIdType);
            data.append('gid_no', this.state.id_no);
            data.append('goods', this.state.goods);
            data.append('address', this.state.address);
            data.append('remarks', this.state.remarks);
            data.append('file', {
                uri: this.state.path,
                type: 'image/jpeg',
                name: 'testPhotoName'
            });

            fetch(BASE_URL + 'add', {
                method: 'post',
                body: data
            }).then((response) => response.json())
                .then(responseJson => {
                    var ss = responseJson.status;
                    if (responseJson.status) {
                        alert('Successfully Uploaded');
                    } else {
                        alert('Something went wrong');
                    }
                    console.log('RESP ::   ' + JSON.stringify(responseJson));
                }).catch((error) => {
                    console.error(error);
                    alert('Server Error! Try again later');
                });
        }
    }

    takePic = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            useFrontCamera: true,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            freeStyleCropEnabled: true,

        }).then(image => {
            // console.log(image);
            //alert(image.path);
            this.setState({ path: image.path });
            this.setState({ isUploaded: true });
        });
    }
    render() {
        if (this.state.next) {
            return (
                <KeyboardAvoidingView >
                    <ScrollView>
                        <View style={styles.nn}>
                            <OutlinedTextField
                                label='Name *'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                returnKeyLabel={"next"}
                                returnKeyType={"next"}
                                keyboardType='text'
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(name) => this.setState({ name })}
                            />
                            <OutlinedTextField
                                label='Mobile No *'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                keyboardType='text'
                                returnKeyLabel={"next"}
                                returnKeyType={"next"}
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(mobile) => this.setState({ mobile })}
                            />
                            <OutlinedTextField
                                label='E-Mail'
                                keyboardType='text'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                returnKeyLabel={"next"}
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(email) => this.setState({ email })}
                            />
                            <OutlinedTextField
                                label='Comapny *'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                keyboardType='text'
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(company) => this.setState({ company })}
                            />
                            <Picker
                                selectedValue={this.state.selectedVisiterType}
                                onValueChange={(visiterType, itemIndex) =>
                                    this.setState({ selectedVisiterType: visiterType })}>

                                {<Picker.Item label='Select Visiter Type' value='0' />}
                                {this.state.vistorType.map(user => (
                                    <Picker.Item label={user.Visitor_Type_Name} value={user.id} />)
                                )}

                            </Picker>
                            <Picker
                                selectedValue={this.state.selectedContactType}
                                onValueChange={(value, index) => {
                                    this.setState({ selectedContactType: value });
                                }}>

                                {<Picker.Item label='Select Department' value='0' />}
                                {
                                    this.state.contactType.map(user => (
                                        <Picker.Item label={user.Contact_Type_Name} value={user.id} />)
                                    )}

                            </Picker>

                            <OutlinedTextField
                                label='Contact Person'
                                keyboardType='text'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                returnKeyType={"next"}
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(cont_person) => this.setState({ cont_person })}
                            />
                            <OutlinedTextField
                                label='Purpose *'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                keyboardType='text'
                                formatText={this.formatText}
                                returnKeyType={"next"}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(purpose) => this.setState({ purpose })}
                            />
                            <Picker
                                selectedValue={this.state.selectedIdType}
                                onValueChange={(id_type, itemIndex) =>
                                    this.setState({ selectedIdType: id_type })}>

                                {<Picker.Item label='Select Govt Id' value='0' />}
                                {
                                    this.state.idType.map(user => (
                                        <Picker.Item label={user.Id_Name} value={user.id} />)
                                    )}
                            </Picker>

                            <OutlinedTextField
                                label='Id No. (if other mention id name) *'
                                keyboardType='text'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                formatText={this.formatText}
                                returnKeyType={"next"}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(id_no) => this.setState({ id_no })}
                            />
                            <OutlinedTextField
                                label='Goods/Vehicle/Other'
                                keyboardType='text'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                returnKeyType={"next"}
                                multiline
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(goods) => this.setState({ goods })}
                            />
                            <OutlinedTextField
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                label='Address'
                                keyboardType='text'
                                multiline
                                returnKeyType={"next"}
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(address) => this.setState({ address })}
                            />
                            <OutlinedTextField
                                label='Remarks'
                                inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                                keyboardType='text'
                                returnKeyType={"next"}
                                multiline
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                onChangeText={(remarks) => this.setState({ remarks })}
                            />
                            <View style={styles.btncontainer}>
                                <TouchableOpacity onPress={(e) => this.submit(e)} style={styles.buttons}>
                                    <Text style={styles.text} >CheckIn</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
        if (this.state.isUploaded) {
            return (<View style={styles.contd}>
                <View style={styles.container}>
                    <Image source={{ uri: this.state.path }} style={styles.next_container} />
                    <OutlinedTextField
                        label='Date *'
                        keyboardType='text'
                        inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                        returnKeyLabel={"next"}
                        returnKeyType={"next"}
                        formatText={this.formatText}
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        value={this.state.date.toLocaleDateString()}
                        onChangeText={(date) => this.setState({ date })}
                    />
                    <OutlinedTextField
                        label='Time *'
                        keyboardType='text'
                        inputContainerStyle={{ backgroundColor: '#FFF', borderRadius: 5 }}
                        returnKeyType={"go"}
                        formatText={this.formatText}
                        value={this.state.date.toLocaleTimeString()}
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        onChangeText={(time) => this.setState({ time })}
                    />
                    <View style={styles.btncontainer}>
                        <TouchableOpacity onPress={(e) => this.next(e)} style={styles.buttons}>
                            <Text style={styles.text} >NEXT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            );
        } else {
            return (
                <View style={styles.cont}>
                    <Image style={styles.welcome_img} source={require('../images/welcome.png')} ></Image>
                    <Text style={styles.welcome_text}>Welcome  </Text>
                    <Text style={styles.welcome}> Obaba Business Solutions Pvt. Ltd</Text>
                    <TouchableOpacity onPress={(e) => this.takePic(e)} style={styles.buttons}>
                        <Text style={styles.text} >PROCEED</Text>
                    </TouchableOpacity>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        flex: 1,

    },
    next_container: {
        width: 250,
        height: 250,
        margin: '2%'
    },
    btncontainer: {
        textAlign: 'right',
        alignSelf: 'flex-end',
    },
    buttons: {
        backgroundColor: '#c20ca0',
        margin: '10%',
        padding: 10,
        alignItems: "center", alignSelf: 'flex-end',
        borderRadius: 5,
    },
    text: {
        color: '#FFF',
        fontSize: 15
    },
    nn: {
        justifyContent: "space-between",
        backgroundColor: '#a6acec',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingBottom: '4%',
        paddingTop: '4%',
        flex: 1
    },
    welcome: {
        fontSize: 22,
        padding: 5,
        fontFamily: 'Roboto',
        color: '#FFF',
        marginTop: '-25%',
        alignSelf: 'center'
    },
    cont: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: '#005b96',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    welcome_text: {
        fontSize: 30,
        padding: 5,
        fontFamily: 'sans-serif-light',
        color: '#FFF',
        alignSelf: 'center'
    },
    welcome_img: {
        marginTop: '30%',
        padding: 5,

        color: '#FFF',
        alignSelf: 'center'
    },
    contd: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: '#8b9dc3',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});
