import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Form, Button, Card, CardItem }from "native-base";
import { RadioButton } from 'react-native-paper';

export default class Profile extends React.Component{
    static navigationOptions = {
        header: null
    };

    constructor()
    {
        super();
        this.state = { 
        editable: false,
        isEditable: false,
        buttonLabel: 'Edit Mode On',
        UP_Username: global.User_name,
        UP: global.User_profile_details,
        UP_Nric: global.UP_Nric, 
        UP_Mobile_Number: global.UP_Mobile_Number,
        UP_Email: global.UP_Email,
        UP_Date_Of_Birth: global.UP_Date_Of_Birth,
        value: global.UP_Gender,
        UP_Physical_Status: global.UP_Physical_Status,
        ActivityIndicator_Loading: false, 
        }
    }

    _clickhandler(){
        //Handler to enable of disable TextInput
          this.setState({ isEditable: !this.state.isEditable });
          //Make TextInput Enable/Disable
          this.setState({ 
                buttonLabel: this.state.isEditable ? 'Edit Mode On':'Edit Mode Off' 
               //updating the label of the button
          });
    }

    render(){
        return(
            <View style = {styles.container}>
                    <Form style={styles.Form}>
                        <Text style = {styles.text1}>Username: </Text>
                        <View style={styles.Placeholder}>
                            <TextInput
                                value={this.state.UP_Username}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                //style={styles.TextInput}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Username : text })}
                            />
                        </View>

                        <Text style = {styles.text1}>NRIC: </Text>
                        <View style={styles.Placeholder}>
                            <TextInput
                                value={this.state.UP_Nric}
                                //editable={this.state.editable}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                //style={styles.TextInput}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Nric : text })}
                            />
                        </View>

                        <Text style = {styles.text1}>Mobile Number: </Text>
                        <View style={styles.Placeholder}>
                            <TextInput
                                value={this.state.UP_Mobile_Number}
                                //editable={this.state.editable}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                //style={styles.TextInput}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Mobile_Number : text })}
                            />
                        </View>

                        <Text style = {styles.text1}>Email: </Text>
                        <View style={styles.Placeholder}>
                            <TextInput
                                value={this.state.UP_Email}
                                //editable={this.state.editable}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                //style={styles.TextInput}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Email : text })}
                            />
                        </View>

                        <Text style = {styles.text1}>Date Of Birth: </Text>
                        <View style={styles.LastPlaceholder}>
                            <TextInput
                                value={this.state.UP_Date_Of_Birth}
                                //editable={this.state.editable}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                //style={styles.TextInput}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Date_Of_Birth : text })}
                            />
                        </View>

                        <Text style = {styles.text1}>Gender: </Text>
                        <Card style={{ width: "100%"}}>
                            <CardItem>
                                <RadioButton.Group 
                                onValueChange={value => this.setState({ value })}
                                value={this.state.value}
                                >
                                    <View style={{flexDirection: "row", marginRight: "10%"}}>
                                        <Text style={{alignSelf:"center"}}>Female</Text>
                                        <RadioButton disabled value="female" />
                                    </View>
                                    <View style={{flexDirection: "row", marginRight: "10%"}}>
                                        <Text style={{alignSelf:"center"}}>Male</Text>
                                        <RadioButton disabled value="male" />
                                    </View>
                                    <View style={{flexDirection: "row", marginRight: "10%"}}>
                                        <Text style={{alignSelf:"center"}}>Others</Text>
                                        <RadioButton disabled value="others" />
                                    </View>
                                </RadioButton.Group>
                            </CardItem>
                        </Card>
                        
                        <Text style = {styles.text1}>Physical Status: </Text>
                        <View style={styles.Placeholder}>
                            <TextInput
                                value={this.state.UP_Physical_Status}
                                //editable={this.state.editable}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                //style={styles.TextInput}
                                style={[
                                    styles.TextInput,
                                    {
                                      borderColor: this.state.isEditable ? 'red' : 'blue',
                                      //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                style={styles.Input}
                                onChangeText={text => this.setState({ UP_Physical_Status : text })}
                            />
                        </View>
                        <View style={styles.container2}> 
                            <TouchableOpacity style={styles.editBtn} onPress={this._clickhandler.bind(this)}>
                                <Text style={styles.BtnText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveBtn}>
                                <Text style={styles.BtnText}>{this.state.buttonLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
                {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login2_Screen")}
                style={styles.signupBtn}
                >
                    <Text style={styles.text2}>Save</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    TextInput: {
        textAlign: 'center',
        height: 40,
        borderWidth: 3,
        marginTop: 10,
        marginBottom: 10,
    },

    container: {
        marginTop: "1%",
        backgroundColor: "rgb(255, 255, 255)",
        alignItems: 'center',
        justifyContent: 'center',
    },
	
	container2: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
	},
    
    Form:{
        height: "100%",
        width: "80%",
    },

    text1: {
        textAlign: "left",
        width: "80%",
        fontSize: 20,
        marginBottom: "0%",
        marginTop: "1%"
    },
    
	buttonContainer: {
		flex: 1,
	},
	
    signuptext: {
        color: "rgba(0,42,90,1)",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 92,
    },

    Placeholder: {
        width: "100%",
        height: 45,
        backgroundColor: "rgba(63, 191, 191, 0.6)",
        opacity: 1,
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 0,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },

    LastPlaceholder: {
        width: "100%",
        height: 45,
        backgroundColor: "rgba(63, 191, 191, 0.6)",
        opacity: 1,
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 0,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },

    Input: {
        height: 30,
        color: "rgba(0, 42, 90, 1)",
        flex: 1,
        marginRight: 11,
        marginLeft: 18,
        marginTop: 8,
    },

    saveBtn: {
        width: "20%",
        height: 45,
        backgroundColor: "rgba(0, 79, 173, 1)",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 0,
        marginLeft: "5%",
        marginRight: "0%",
        //alignSelf: "flex-end",
        flex: 1,
    },

    editBtn: {
        width: "20%",
        height: 45,
        backgroundColor: "rgba(0, 79, 173, 1)",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 0,
        marginLeft: "0%",
        marginRight: "5%",
        //alignSelf: "flex-start",
        flex: 1,
    },

    BtnText: {
        color: "rgba(255, 255, 255, 1)",
        alignSelf: "center",
        fontWeight: "bold",
    },

    genderCard: {
        backgroundColor: "rgba(63, 191, 191, 0.6)",
        height: 45,
    }
});