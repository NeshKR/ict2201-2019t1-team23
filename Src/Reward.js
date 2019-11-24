import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
export default class Reward extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Card transparent style={{width: "75%"}}>
                <Text>1. Get extra 1GB of data (Singtel User only)</Text>
              </Card>
              <Right style={styles.ArrowHeadStyle} >
                <TouchableOpacity style={styles.infoBtn} onPress={() => alert("This is Card Header")}>
                  <Text style={styles.BtnText}>Redeem</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Card transparent style={{width: "75%"}}>
                <Text>2. Get a free movie ticket (Shaw Theatre only)</Text>
              </Card>
              <Right style={styles.ArrowHeadStyle} >
                <TouchableOpacity style={styles.infoBtn} onPress={() => alert("This is Card Header")}>
                  <Text style={styles.BtnText}>Redeem</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Card transparent style={{width: "75%"}}>
                <Text>3. Get a free gym pass for a day (Community GYM only)</Text>
              </Card>
              <Right style={styles.ArrowHeadStyle} >
                <TouchableOpacity style={styles.infoBtn} onPress={() => alert("This is Card Header")}>
                  <Text style={styles.BtnText}>Redeem</Text>
                </TouchableOpacity>
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
    width: "5%",
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
    width: 65,
    height: 30,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: "0%",
    marginRight: "0%",
    justifyContent: 'flex-end',
  },
});
