import React from 'react';
import {StyleSheet, BackHandler, Text, View, ActivityIndicator, Button, ImageBackground, Image, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

class HomepageLogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../Pictures/homepage_icon.jpg')}
        style={{ width: 200, height: 45 }}
      />
    );
  }
}

export default class HomePage extends React.Component {
  static navigationOptions = {
    headerStyle: { height: 50 }, // Customize Header Height
    headerTitle: () => <HomepageLogoTitle />, // Picture Header
    // headerRight: () => (
    //   <Button
    //     onPress={() => alert('This is a button!'), BackHandler.exitApp()}
    //     title="Exit"
    //     color="#180321" // Back color
    //   />
    // ),
  };
  
  render(){
    return(    
      <View style = {styles.container}>
        {/* This is the Map button for our app, for users to provide their feedbacks here. */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map_Screen')} style={styles.loginBtn}>
          <Text style={styles.text2}>Map</Text>
        </TouchableOpacity>

        {/* This is the Feedback button for our app, for users to provide their feedbacks here. */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback_Screen')} style={styles.loginBtn}>
          <Text style={styles.text2}>Feedback</Text>
        </TouchableOpacity>

        {/* This is the Challenge button for our app, for users to view and choose the challenges available. */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Challenge_Screen')} style={styles.loginBtn}>
          <Text style={styles.text2}>Challenges</Text>
        </TouchableOpacity>

        {/* This is the Reward button for our app, for users to view and choose the challenges available. */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Reward_Screen')} style={styles.loginBtn}>
          <Text style={styles.text2}>Reward</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'rgb(255,255,255)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  rect: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  imageLogo: {
      width: 162,
      height: 162,
      marginLeft: "auto",
      marginRight: "auto",
  },
  icon: {
      color: "rgba(0,42,90,1)",
      fontSize: 33,
      marginLeft: 20,
      marginRight: 20,
      alignSelf: "center",
  },
  UserInputBox: {
      width: '80%',
      height: 59,
      backgroundColor: "rgba(254, 235, 254, 1)",
      opacity: 1,
      borderRadius: 5,
      flexDirection: "row",
      marginTop: 41,
  },
  UserInputText: {
      height: 30,
      color: "rgba(0,42,90,1)",
      flex: 1,
      marginTop: 14,
  },
  loginBtn: {
      width: '80%',
      height: 59,
      backgroundColor: "rgba(254, 235, 254, 1)",
      borderRadius: 5,
      justifyContent: "center",
      marginTop: 30,
      marginLeft: "auto",
      marginRight: "auto",
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row", //inline
  },
  text2: {    // Button Text
      color: "rgba(rgba(84, 49, 58, 1))",
      alignSelf: "center",
      fontWeight: "bold",
  },
  CreateAccount: { // Text - Don't have an account? Sign Up!
      marginTop: "3%",
      marginLeft: "auto",
      marginRight: "auto",
      color: "rgba(255,255,255,1)",
      textDecorationLine: "underline",
  }
});
