import React, { Component } from 'react';
import { StyleSheet,View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Button, Icon, Text, Card, Divider } from 'react-native-elements';
import { Pedometer } from "expo-sensors";

class ChallengeLogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../Pictures/challenge_icon.jpg')}
        style={{ width: 200, height: 45 }}
      />
    );
  }
}

export default class Challenge extends Component {
  componentDidMount() {
    try {
      const multipleSelectedDataLimited = global.challengestatus;
      this.setState({ current_challengestatus3 : multipleSelectedDataLimited })
    }
    catch(err){
      console.log('Failed to load button state')
    }
  }
  
  constructor()
  {
    super();
    global.challenge3 = false;
    global.click_challenge1 = 0;
    global.click_challenge2 = 0;
    global.click_challenge3 = 0;
    this.state = {
      challenge_num: '',
      App_challenges: '',
      current_challengestatus1: global.challengestatus,
      current_challengestatus2: global.challengestatus,
      current_challengestatus3: false,
      click_challenge1: 0,
      click_challenge2: 0,
      click_challenge3: 0,
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0
    }
  };

  static navigationOptions = {
    headerStyle: { height: 50 }, // Customize Header Height
    headerTitle: () => <ChallengeLogoTitle />, // Picture Header
  };

  startButtonPress = (cnum) => {
    if (cnum == 1) {
      this.setState({ current_challengestatus1: true }); // It will show red color challenge name, indicating that the challenge is in progress.
      if (global.click_challenge1 == 0) {
        global.click_challenge1 = 1;
        this._subscribe();
      }
      if (global.click_challenge1 == 1) {
        if (this.state.currentStepCount <= 10000) {
          alert("This challenge is in progress. You have walked " + this.state.currentStepCount + " steps.");
        }
        // Pedometer starts here 
        this.checkIfChallengeNo1IsCompleted();
      } else if (global.click_challenge1 == 2) {
        this.setState({ current_challengestatus1: !this.state.current_challengestatus1 }); // This will toggles the color of the challenge back to black, indicating that the challenge is completed.
        Alert.alert(
          'Congrats!',
          'No.1 challenge is completed! You have earn 200 points!',
          [
            {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
          ],
          {cancelable: false},
        );
        this._unsubscribe();
      }
    }
    if (cnum == 2) {
      this.setState({ current_challengestatus2: true }); // It will show red color challenge name, indicating that the challenge is in progress.
      if (global.click_challenge2 == 0) {
        global.click_challenge2 = 1;
      }
      if (global.click_challenge2 == 1) {
        alert("This challenge is in progress. Please note that exitting of this app will forfeit this challenge.");
      } else if (global.click_challenge2 == 2) {
        this.setState({ current_challengestatus2: !this.state.current_challengestatus2 }); // This will toggles the color of the challenge back to black, indicating that the challenge is completed.
        Alert.alert(
          'Congrats!',
          'No.2 challenge is completed! You have earn 30 points!',
          [
            {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
          ],
          {cancelable: false},
        );
      }
    }
    if (cnum == 3) {
      this.setState({ current_challengestatus3: true }); // It will show red color challenge name, indicating that the challenge is in progress.
      if (global.click_challenge3 == 2 || this.state.click_challenge3 == 2 || global.click_challenge3_1 == 2) {
        this.setState({ current_challengestatus3: false }); // This will toggles the color of the challenge back to black, indicating that the challenge is completed.
        Alert.alert(
          'Congrats!',
          'No.3 challenge is completed! You have earn 50 points!',
          [
            {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
          ],
          {cancelable: false},
        );
      } else if (global.click_challenge3 == 1) {
        alert("This challenge is in progress.");
      } else if (global.click_challenge3 == 0) {
        global.click_challenge3 = 1;
      }
    }
  }

  Get_Challenges = (num) =>
  { 
    fetch('http://'+ global.db_IP +'/2203scripts/get_challenges.php',
    {
      method: 'POST',
      headers: 
      {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
      username : num,
      })
    }).then((response) => response.json()).then((responseJsonFromServer) =>
    {
      this.setState({ ActivityIndicator_Loading : false });
      if(responseJsonFromServer != "Error!"){
        // If the data are fetch successfully it will display when use press the Info button.
        this.state.App_challenges = responseJsonFromServer;
        if (num == 1) {
          Alert.alert(
            'Daily 10,000 Stepup challenge',
            this.state.App_challenges,
            [
              {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else if (num == 2) {
          Alert.alert(
            'QRcode Scanning Challenge',
            this.state.App_challenges,
            [
              {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else if (num == 3) {
          Alert.alert(
            'Complete a route to get points',
            this.state.App_challenges,
            [
              {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
            ],
            {cancelable: false},
          );
        }
        
      }
    }).catch((error) =>
    {
      console.error(error);
      this.setState({ ActivityIndicator_Loading : false});
    });
  }

  // The function to start the step counter
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  // The function to stop the step counter
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  // The function to check if the No.1 challenge is completed
  checkIfChallengeNo1IsCompleted = () => {
    if (this.state.currentStepCount >= 10000 || this.state.currentStepCount >= "10000") {
      global.click_challenge1 = 2;
    }
  }

  render(){ 
    return(  //<ScrollView contentContainerStyle = {styles.container}>
      <View style = {styles.container}>
        <ScrollView>
          <Card containerStyle={styles.card}>
            <Text
              style={[
                styles.TextInput,
                {
                  color: this.state.current_challengestatus1 ? 'red' : 'black',
                  //updating the challenge text color on true/false to see if the challenge is completed
                  //red = challenge not completeed
                  //black = chalenge completed 
                },
              ]}
            >1. Daily 10,000 Stepup challenge</Text>
            <Text>Start this challenge, walk and watch this go up: {this.state.currentStepCount}</Text>
            <Divider style={{ backgroundColor: 'grey', marginVertical:10}} />
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              <Button buttonStyle={styles.infoBtn}
              title='Info' onPress={() => {this.Get_Challenges(1); }}/>

              <Button buttonStyle={styles.startBtn}
              title='Start Now'onPress={() => { this.startButtonPress(1); }}/>
            </View>
          </Card>

          <Card containerStyle={styles.card}>
            <Text
              style={[
                styles.TextInput,
                {
                  color: this.state.current_challengestatus2 ? 'red' : 'black',
                  //updating the challenge text color on true/false to see if the challenge is completed
                  //red = challenge not completeed
                  //black = chalenge completed 
                },
              ]}
            >2. QRcode Scanning Challenge</Text>

            <Divider style={{ backgroundColor: 'grey', marginVertical:10}} />
          
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              <Button buttonStyle={styles.infoBtn}
              title='Info' onPress={() => {this.Get_Challenges(2); }}/>

              <Button buttonStyle={styles.startBtn}
              title='Start Now' onPress={() => { this.startButtonPress(2); }}/>
            </View>
          </Card>

          <Card containerStyle={styles.card}>
            <Text
              style={[
                styles.TextInput,
                {
                  //color: global.challengestatus ? 'red' : 'black',
                  color: this.state.current_challengestatus3 ? 'red' : 'black',
                  //updating the challenge text color on true/false to see if the challenge is completed
                  //red = challenge not completeed
                  //black = chalenge completed 
                },
              ]}
            >3. Complete a route to get points</Text>

            <Divider style={{ backgroundColor: 'grey', marginVertical:10}} />
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              <Button buttonStyle={styles.infoBtn}
              title='Info' onPress={() => {this.Get_Challenges(3); }}/>

              <Button buttonStyle={styles.startBtn}
              title='Start Now' onPress={() => { this.startButtonPress(3); }}/>
            </View>
          </Card>

        </ScrollView>         
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: "rgba(255,245,238,0.7)",
    borderWidth:1,
    borderColor: "#fce2d1",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  infoBtn: {
    width: 100,
    height: 40,
    backgroundColor: "#4c97df",
    borderRadius: 3,
    alignSelf: "center",
  },
  startBtn: {
    width: 100,
    height: 40,
    backgroundColor: "green",
    borderRadius: 3,
    alignSelf: "center",
  },
    
});