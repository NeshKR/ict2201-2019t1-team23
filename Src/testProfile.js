import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

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

export default class testProfile extends Component {
  static navigationOptions = {
    headerStyle: { height: 50 }, // Customize Header Height
    headerTitle: () => <ChallengeLogoTitle />, // Picture Header
  };

  render() {
    return (
      <Container>
        <Content>
            <Card>
              <CardItem>
                <Text>1. Daily 10,000 Stepup challenge</Text>
                <Right style={styles.ArrowHeadStyle} >
                  <Icon name="arrow-forward" button onPress={() => this.props.navigation.navigate('Login_Screen')}/>
                </Right>
              </CardItem>
            </Card>
          <Card>
            <CardItem>
              <Text>2. Complete a route</Text>
              <Right style={styles.ArrowHeadStyle} >
                <Icon name="arrow-forward" button onPress={() => alert("This is Card Header")}/>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>3. Walk and collect points</Text>
              <Right style={styles.ArrowHeadStyle} >
                <Icon name="arrow-forward" button onPress={() => alert("This is Card Header")}/>  
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  ArrowHeadStyle: {
    marginLeft: "auto",
    marginRight: "5%",
    fontSize: 20,  
    justifyContent: 'flex-end',
  },

  BtnText: {
    color: "white",
    alignSelf: "center",
    fontSize: 15,
    marginTop: "10%",
    marginBottom: "10%",
  },
  infoBtn: {
    width: 45,
    height: 30,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: "0%",
    marginRight: "0%",
    justifyContent: 'flex-end',
  },
});
