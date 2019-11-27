import React from 'react';
import {StyleSheet, Keyboard, Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Alert} from 'react-native';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor()
    {
        super();
        global.User_Point = 0,
        global.a = '',
        global.b = '',
        global.db_IP = '172.30.139.56',
        //global.db_IP = '192.168.1.193',
        global.challengestatus = false,
		this.state = {
			LOGIN_username: '',
            LOGIN_password: '',
            Temp_LOGIN_username: '',
            Temp_LOGIN_password: '',
            UP: '',
            ActivityIndicator_Loading: false, 
		}
    }
    
    // This function is for Map.js (zhiying)
    // This will need to run from the first screen page, thus it is here.
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            global.zy_latitude = position.coords.latitude,
            global.zy_longitude = position.coords.longitude
            global.coordinates = [
                { latitude: global.zy_latitude, longitude: global.zy_longitude, },
                { latitude: 1.300155, longitude: 103.845115, },
            ]
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }
    
    // This function is for Login.js 
    // This will need to run by the first screen page to validate user login.
    Login_Func = () =>
    {
        if (this.state.LOGIN_username != '') {
            if (this.state.LOGIN_password != '') 
			{
				this.state.Temp_LOGIN_username = this.state.LOGIN_username;
				this.state.Temp_LOGIN_password = this.state.LOGIN_password;
				
				this.setState({ ActivityIndicator_Loading : true }, () =>
				{
                    fetch('http://'+ global.db_IP +'/2203scripts/Login_Validation.php',
					{
						method: 'POST',
						headers: 
						{
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(
						{
							username : this.state.Temp_LOGIN_username,
							password : this.state.Temp_LOGIN_password,
						})
					}).then((response) => response.json()).then((responseJsonFromServer) => {
                        if(responseJsonFromServer == "Successfully Login"){
                            this.setState({ ActivityIndicator_Loading : false });
                            global.User_name = this.state.LOGIN_username;
                            // Call the function for Profile.js (ZHIYING)
                            global.User_profile_details = this.Get_User_Profile_From_MySQL();
                            console.log("Successfully Login")
                            Alert.alert(
                                'Login',
                                'You have login successfully.',
                                [
                                  {text: 'OK', onPress: () => this.props.navigation.navigate("Homepage_Screen") },
                                ],
                                {cancelable: false},
                            );
                        } 
                        else{
                            Alert.alert(
                                'Login',
                                responseJsonFromServer,
                                [
                                    {text: 'OK', onPress: () => console.log('Invalid Login'), style: 'cancel'},
                                ],
                                {cancelable: false},
                            );
                        }
					}).catch((error) =>
					{
						console.error(error);
						this.setState({ ActivityIndicator_Loading : false});
					});
				});
                Keyboard.dismiss();
            } 
            else {
                alert('Please Enter Password');
            }
        } 
        else {
			alert('Please Enter Username');
        }
    }

    // This function is for Profile.js (ZHIYING)
    // This will need to run from the first screen page to retrieve all the user data from the db, thus it is here.
    Get_User_Profile_From_MySQL()
    { 
        fetch('http://'+ global.db_IP +'/2203scripts/get_user_profile.php',
        {
            method: 'POST',
            headers: 
            {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
            username : global.User_name,
            })
        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
            this.setState({ ActivityIndicator_Loading : false });
            if(responseJsonFromServer != "User profile not found!"){
                this.state.UP = responseJsonFromServer;
                this.setVariables();
            }
        }).catch((error) =>
        {
            console.error(error);
            this.setState({ ActivityIndicator_Loading : false});
        });
    }

    // This function is for Profile.js (ZHIYING)
    // This will need to run by the first screen page,
    // after getting the user profile from db and put
    // them into global variables so that it can be accessed
    // from the Profile.js
    setVariables() 
    {
        var temp = this.state.UP
        var myArray = temp.split(',');
        for (var i = 0; i < myArray.length; i++) {
            if (i==1) {
                global.UP_Nric = myArray[i]
            } else if (i==2) {
                global.UP_Mobile_Number = myArray[i]
            } else if (i==3) {
                global.UP_Email = myArray[i]
            } else if (i==4) {
                global.UP_Date_Of_Birth = myArray[i]
            } else if (i==5) {
                global.UP_Gender = myArray[i]
            } else if (i==6) {
               global.UP_Physical_Status = myArray[i]
            } else if (i==7){
                global.UP_Usable_Points = myArray[i]
            } else if (i==8){
                global.UP_Total_Points = myArray[i]
            } else if (i==9){
                global.UP_Avatar = myArray[i]
            }
        }
    }

    // Starts to draw the login screen which consists of a background image,
    // app title, app logo, username box, password box and login button.
    render(){
        return(    
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundScreen} source = {require("../Pictures/login_background_2.jpeg")}>
                    <Text style={styles.ApplicationName}>Walk-A-Smile</Text>
                    <Image source={require("../Pictures/TeamPoggerPic.png")} resizeMode="contain" style={styles.imgPicture} />
                    <Text style={{color: 'white'}}>Log in and take on challenges to earn rewards</Text>
                    <View style={styles.UserInputBox}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(0,42,90,1)"
                            secureTextEntry={false}
                            style={styles.UserInputText}
                            textAlign={'center'}
                            // onChangeText = {(text) => this.setState({ LOGIN_username : text })}
                            onChangeText={LOGIN_username => this.setState({LOGIN_username})}
                        />
                    </View>
                    <View style={styles.UserInputBox}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="rgba(0,42,90,1)"
                            secureTextEntry={true}
                            style={styles.UserInputText}
                            textAlign={'center'}
                            onChangeText={LOGIN_password => this.setState({LOGIN_password})}
                        />
                    </View>
                    {/* This is the login button for our app.
                    When this login button is clicked,
                    if user is valid, it will navigate to the Homepage.
                    Else, it will display a login error message and remains on this login page. */}
                    <TouchableOpacity onPress = { this.Login_Func} style={styles.loginBtn}>
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(255, 255, 255)",
        alignItems: "center",
        justifyContent: "center",
    },

    backgroundScreen: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    imgPicture: {
        width: 162,
        height: 162,
        marginLeft: "auto",
        marginRight: "auto",
    },

    ApplicationName: {
        color: "rgba(166, 6, 86, 0.5)",
        alignSelf: "center",
        fontSize: 50,
        fontStyle: "italic",
        fontWeight: "bold",
    },

    UserInputBox: {
        width: "80%",
        height: 59,
        backgroundColor: "rgba(254, 235, 254, 1)",
        opacity: 0.75,
        borderRadius: 5,
        flexDirection: "row",
        marginTop: "5%",
    },

    UserInputText: {
        height: 30,
        color: "rgba(0, 42, 90, 1)",
        flex: 1,
        marginTop: 14,
    },

    loginBtn: {
        width: "30%",
        height: 40,
        backgroundColor: "rgba(10, 228, 228, 0.5)",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "10%",
        paddingVertical: 1,
        paddingHorizontal: 10,
        flexDirection: "row",
    },

    loginBtnText: {
        color: "white",
        alignSelf: "center",
        fontSize: 20,
    },
});
