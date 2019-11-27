import React from 'react';
import { Alert, StyleSheet, View, TextInput, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

class FeedbackLogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../Pictures/feedback_icon.jpg')}
        style={{ width: 200, height: 45 }}
      />
    );
  }
}

export default class Feedback extends React.Component
{
  static navigationOptions = {
    headerStyle: { height: 50 }, // Customize Header Height
    headerTitle: () => <FeedbackLogoTitle />, // Picture Header
  };

  constructor()
  {
    super();
    this.state = { 
      FB_Title: '', 
      FB_Username: '', 
      FB_Description: '',
      // Temp variables used to insert data into the database
      Temp_FB_Title: '', 
      Temp_FB_Username: '', 
      Temp_FB_Description: '',
      ActivityIndicator_Loading: false, 
    }
  }

  emptyFormsFields = () => {
    Alert.alert(
      "Feedback",
      "Empty field(s) detected! Please fill in all the necessary fields before submitting",
    );
    console.log("Empty field(s) detected")
  }

  Insert_Data_Into_MySQL = () =>
  {
    this.state.Temp_FB_Title = this.state.FB_Title;
    this.state.Temp_FB_Username = global.User_name;
    this.state.Temp_FB_Description = this.state.FB_Description;
    if (this.state.Temp_FB_Title != "" && this.state.Temp_FB_Username != "" && this.state.Temp_FB_Description != ""){
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
        fetch('http://'+ global.db_IP +'/2203scripts/Insert_Feedback.php',
        {
          method: 'POST',
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
          {
            title : this.state.Temp_FB_Title,
            username : this.state.Temp_FB_Username,
            description : this.state.Temp_FB_Description,
          })
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
      this.state.FB_Title = '',
      this.state.FB_Username = '',
      this.state.FB_Description = ''
    } else{
      this.emptyFormsFields();
    }
  }

  render()
  {
    return(
      <View style = { styles.container0 }>
        <View style = { styles.container }>
          <TextInput 
            placeholder = "Enter feedback title"
            style = { styles.TextInputStyleClass } 
            underlineColorAndroid = "transparent"
            onChangeText = {(text) => this.setState({ FB_Title : text })}
            value = {this.state.FB_Title}
          />
          
          <TextInput 
            //placeholder = "Enter username"
            placeholder = { global.User_name }
            style = { styles.TextInputStyleClass } 
            underlineColorAndroid = "transparent"
            //onChangeText = {(text) => this.setState({ FB_Username : text })} 
            value = {this.state.FB_Username}
          />

          <TextInput 
            placeholder = "Enter the feedback description"
            style = { styles.TextInputStyleClassForDescription } 
            underlineColorAndroid = "transparent"
            onChangeText = {(text) => this.setState({ FB_Description : text })}
            value = {this.state.FB_Description}
          />

          <TouchableOpacity 
            activeOpacity = { 0.5 } 
            style = { styles.TouchableOpacityStyle } 
            onPress = { this.Insert_Data_Into_MySQL}>
            <Text style = { styles.BtnTextStyle }>Submit</Text>
          </TouchableOpacity>

          {
            this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }       

        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create(
{
  container0: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    marginTop:20,
    width: "100%",
    alignItems: "center",
  },
 
  TextInputStyleClass:
  {
    textAlign: "center",
    height: "5%",
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7 ,
    marginBottom: 10,
    width: "95%"
  },
  
  TextInputStyleClassForDescription:
  {
    textAlign: "center",
    height: "75%",
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7 ,
    marginBottom: 10,
    width: "95%"
  },

  TouchableOpacityStyle:
  {
    width: "30%",
    height: 40,
    backgroundColor: "#009a9a", // Button color
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "2.5%",
    paddingVertical: 1,
    paddingHorizontal: 10,
    flexDirection: "row", //inline
  },
 
  BtnTextStyle:
  {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  },

  ActivityIndicatorStyle:{  
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  
});
