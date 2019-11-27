import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { Form, Card, CardItem }from "native-base";
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
        Validate_status: false,
        a: "",
        b: "",
        c: "",
        d: "",
        }
    }

    // When on this function is called, it will toggle the variable isEditable from
    // true to false, then from false to true.
    // It will also toggle the button text from 'Edit Mode On' to 'Edit Mode Off',
    // and vice-versa. This function will allows the users to see and update their profile.
    _clickhandler(){
        //Handler to enable of disable TextInput
        this.setState({ isEditable: !this.state.isEditable });
        //Make TextInput Enable/Disable
        this.setState({ 
            //Updating the label of the button
            buttonLabel: this.state.isEditable ? 'Edit Mode On':'Edit Mode Off' 
        });
    }

    Validation = (nric, email, phonenumber, physicalstatus, dob) => {
        user_nric = this.ValidateNRIC(nric);
        user_email = this.ValidateEmailAddress(email);
        user_phonenumber = this.ValidatePhoneNumber(phonenumber);
        user_physicalstatus = this.ValidatePhysicalStatus(physicalstatus);
        user_dob = this.ValidateDateOfBirth(dob);
        if (user_dob == true) {
            if (user_nric == true && user_email == true && user_phonenumber == true && user_physicalstatus == true) {
                //this.setState({ Validate_status: true }); // Requires 2 click
                this.state.Validate_status = true;
            } else if (user_nric == true && user_email == true && user_phonenumber == true && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid Physical status (healthy or disabled)!");
            } else if (user_nric == true && user_email == true && user_phonenumber == false && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid Mobile number!");
            } else if (user_nric == true && user_email == true && user_phonenumber == false && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid Mobile number and Physical status (healthy or disabled)!");
            } else if (user_nric == true && user_email == false && user_phonenumber == true && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid Email address!");
            } else if (user_nric == true && user_email == false && user_phonenumber == true && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid Email address and Physical status (healthy or disabled)!");
            } else if (user_nric == true && user_email == false && user_phonenumber == false && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid Email address and Mobile number!");
            } else if (user_nric == true && user_email == false && user_phonenumber == false && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid Email address, Mobile number and Physical status (healthy or disabled)!");
            } else if (user_nric == false && user_email == true && user_phonenumber == true && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC!");
            } else if (user_nric == false && user_email == true && user_phonenumber == true && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC and Physical status (healthy or disabled)!");
            } else if (user_nric == false && user_email == true && user_phonenumber == false && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC and Mobile number!");
            } else if (user_nric == false && user_email == true && user_phonenumber == false && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC, Mobile number and Physical status (healthy or disabled)!");
            } else if (user_nric == false && user_email == false && user_phonenumber == true && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC and Email address!");
            } else if (user_nric == false && user_email == false && user_phonenumber == true && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC, Email address and Physical status (healthy or disabled)!");
            } else if (user_nric == false && user_email == false && user_phonenumber == false && user_physicalstatus == true) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC, Email address and Mobile number!");
            } else if (user_nric == false && user_email == false && user_phonenumber == false && user_physicalstatus == false) {
                this.state.Validate_status = false;
                alert("Please fill in valid NRIC, Email address, Mobile number and Physical status (healthy or disabled)!");
            }
        } else {
            this.state.Validate_status = false;
            alert("Please fill in valid Date format (YYYY-MM-DD or YYYY/MM/DD)!");
        }
    }

    ValidateNRIC = (nric) => {
        user_nric_string = nric;
        //Split NRIC to a list.
        user_nric_array = user_nric_string.split("");
        // Validate PART 1 - check if user input is 9 alpha-numberic long, first and last character is a alphabet 
        if(user_nric_array.length == 9) {
            if ((user_nric_array[0] == "t") || (user_nric_array[0] == "T") || (user_nric_array[0] == "s") || (user_nric_array[0] == "S")) {
                lastcharcheck = /[A-Za-z]$/.test(user_nric_array);
                if (lastcharcheck == true) {
                    return (true);
                } else {
                    return (false);
                }
            } else {
                return (false);
            }
        } else {
            return (false);
        }
    }

    ValidateEmailAddress = (email) => {
        user_email = email;
        emailmatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email)
        if (emailmatch == true) {
            return (true);
        } else {
            return (false);
        }
    }

    ValidatePhoneNumber = (phonenumber) => {
        user_phonenumber_string = phonenumber;
        //Split mobile number to a list.
        user_phonenumber_array = user_phonenumber_string.split("");
        if(user_phonenumber_array.length == 8) {
            //isNaN function to determine if a value does not convert to a number
            if (isNaN(phonenumber)) 
            {
                return (false);
            } else {
                if ((user_phonenumber_array[0] == "9") || (user_phonenumber_array[0] == "8")) {
                    return (true);
                } else {
                    return (false);
                }
            }
        } else {
            return (false);
        }
    }

    ValidatePhysicalStatus = (physicalstatus) => {
        user_physicalstatus_string = physicalstatus.toLowerCase();
        if ((user_physicalstatus_string == "healthy") || (user_physicalstatus_string == "disabled")) {
            return (true);
        } else {
            return (false);
        }
    }

    ValidateDateOfBirth = (dob) => {
        user_dob_string = dob;
        dobmatch = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(user_dob_string)
        if (dobmatch == true) {
            return (true);
        } else {
            return (false);
        }
    }

    Update_Profile = () =>
    {      
        temp_nric = this.state.UP_Nric;
        temp_email = this.state.UP_Email;
        temp_phonenumber = this.state.UP_Mobile_Number;
        temp_physicalstatus = this.state.UP_Physical_Status;
        temp_dob = this.state.UP_Date_Of_Birth;
        this.Validation(temp_nric, temp_email, temp_phonenumber, temp_physicalstatus, temp_dob);
        if (this.state.Validate_status == true) {
            this.setState({ ActivityIndicator_Loading : true }, () => {
                fetch('http://'+ global.db_IP +'/2203scripts/Update_edited_profile.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username : this.state.UP_Username,
                        nric : this.state.UP_Nric,
                        mobile_number : this.state.UP_Mobile_Number,
                        email : this.state.UP_Email,
                        dob : this.state.UP_Date_Of_Birth,
                        gender : this.state.value,
                        physical_status : this.state.UP_Physical_Status,
                        orginal_username : global.User_name,
                    }),
                }).then((response) => response.json()).then((responseJsonFromServer) =>
                {
                    alert(responseJsonFromServer);
                    this.setState({ ActivityIndicator_Loading : false });
                }).catch((error) =>
                {
                    console.error(error);
                    this.setState({ ActivityIndicator_Loading : false});
                });
            });
        }  
    }

    render(){
        return(
            <View style = {styles.container0}>
                <ImageBackground style={{height: "100%", width: "100%"}} source = {require("../Pictures/profile_background.jpg")}>
                <View style = {styles.container1}>
                    <Form style={styles.Form}>
                        <Text style = {styles.textStyle}>Username: </Text>
                        <View>
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
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Username : text })}
                            />
                        </View>

                        <Text style = {styles.textStyle}>NRIC: </Text>
                        <View>
                            <TextInput
                                value={this.state.UP_Nric}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                        borderColor: this.state.isEditable ? 'red' : 'blue',
                                        //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Nric : text })}
                            />
                        </View>

                        <Text style = {styles.textStyle}>Mobile Number: </Text>
                        <View>
                            <TextInput
                                value={this.state.UP_Mobile_Number}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                        borderColor: this.state.isEditable ? 'red' : 'blue',
                                        //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Mobile_Number : text })}
                            />
                        </View>

                        <Text style = {styles.textStyle}>Email: </Text>
                        <View>
                            <TextInput
                                value={this.state.UP_Email}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                        borderColor: this.state.isEditable ? 'red' : 'blue',
                                        //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Email : text })}
                            />
                        </View>

                        <Text style = {styles.textStyle}>Date Of Birth: </Text>
                        <View>
                            <TextInput
                                value={this.state.UP_Date_Of_Birth}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                        borderColor: this.state.isEditable ? 'red' : 'blue',
                                        //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Date_Of_Birth : text })}
                            />
                        </View>

                        <Text style = {styles.textStyle}>Gender: </Text>
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
                        
                        <Text style = {styles.textStyle}>Physical Status: </Text>
                        <View>
                            <TextInput
                                value={this.state.UP_Physical_Status}
                                editable={this.state.isEditable}
                                selectTextOnFocus={false}
                                style={[
                                    styles.TextInput,
                                    {
                                        borderColor: this.state.isEditable ? 'red' : 'blue',
                                        //updating the border color on enable/disable 
                                    },
                                ]}
                                placeholderTextColor="rgba(0,42,90,1)"
                                secureTextEntry={false}
                                onChangeText={text => this.setState({ UP_Physical_Status : text })}
                            />
                        </View>
                        <View style={styles.container2}> 
                            <TouchableOpacity style={styles.editBtn} onPress={this._clickhandler.bind(this)}>
                                <Text style={styles.BtnText}>{this.state.buttonLabel}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.saveBtn} onPress={() => {this.Update_Profile(); }}> */}
                            <TouchableOpacity style={styles.saveBtn} onPress={this.Update_Profile.bind(this)}>
                                <Text style={styles.BtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
                </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    TextInput: {
        textAlign: "left",
        height: 45,
        borderWidth: 2,
        marginTop: 0,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        backgroundColor: "rgb(225, 238, 255)",
        opacity: 0.9,
    },

    backgroundScreen: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    container0: {
        backgroundColor: "rgb(255, 255, 255)",
        alignItems: "center",
        justifyContent: "center",
    },

    container1: {
        marginTop: "1%",
        alignItems: 'center',
        justifyContent: 'center',
    },
	
	container2: {
		flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
	},
    
    Form: {
        height: "100%",
        width: "80%",
    },

    textStyle: {
        textAlign: "left",
        width: "80%",
        fontSize: 13,
        marginBottom: "0%",
        marginTop: "1%",
        fontWeight: "bold",
    },

    saveBtn: {
        width: "40%",
        height: 45,
        backgroundColor: "rgba(0, 79, 173, 1)",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 0,
        marginLeft: "5%",
        marginRight: "0%",
    },

    editBtn: {
        width: "40%",
        height: 45,
        backgroundColor: "rgba(0, 79, 173, 1)",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 0,
        marginLeft: "0%",
        marginRight: "5%",
    },

    BtnText: {
        color: "rgba(255, 255, 255, 1)",
        alignSelf: "center",
        fontWeight: "bold",
    },
});