import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { Container, Content, Separator } from "native-base";

export default class Rewards extends Component {
  constructor() {
		super();
		this.state = {
      userPoints: global.UP_Usable_Points,
      dataSource: [],
      rewardPoints: 0,
		}
  }

	redeemRewardDialog = () => {
    Alert.alert(
      "Redeem",
      "Are you sure you want to redeem this reward?",
      [
        { text: "Yes", onPress: () => this.redemnReward() },
        { text: "No", onPress: () => console.log("No was pressed"), style: "cancel" },
      ]
    );
  }

  noRedeemRewardDialog = () => {
    Alert.alert(
      "Redeem",
      "Sorry, you do not have sufficient points to redeem this reward",
    );
    console.log("Not enough points")
  }

  successfulRedeemRewardDialog = () => {
    Alert.alert(
      "Redeem",
      "You've successfully redeem the reward. More information will be sent to your email regarding the reward. Thank you",
    );
    console.log("Successful redeem")
  }

	async componentDidMount() {
		try {
			const response = await fetch('http://'+ global.db_IP +'/2203scripts/Rewards.php');
			const responseJson = await response.json();
			this.setState({
				dataSource: responseJson,
			});
		}
		catch (error) {
			console.error(error);
		}
  };
  
  redemnReward = async () => {
    const response = await fetch('http://'+ global.db_IP +'/2203scripts/RedeemRewards.php',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username: global.User_name,
        userPoints: this.state.userPoints,
        rewardPoints: this.state.rewardPoints,
      }),
    })
    .then((response) => response.json()).then((responseJsonFromServer) => {
      console.log("Points left:",responseJsonFromServer);
      this.setState({userPoints: responseJsonFromServer});
      this.successfulRedeemRewardDialog();
      this.componentDidMount();
    }).catch((error) => {
      console.error(error);
    });
  };

	renderHeader() {
		return (
		<View style={{ backgroundColor: "#119abf", padding: 25, alignItems: "center" }}>
			<Text style={{ color: "white", fontSize: 25 }}>Current Points: { this.state.userPoints }</Text>
		</View>
  )};

	renderItemOK = ({ item }) => {
    afterPoints = this.state.userPoints - item.reward_point;
    addPoints = item.reward_point - this.state.userPoints;
    if (this.state.userPoints >= item.reward_point) {
      return (
        <View style={{ flex: 0, flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={ .5 } onPress={ this.redeemRewardDialog }>
            { this.setState({rewardPoints: item.reward_point}) }
            <Image style={{ width: 80, height: 80, margin: 5 }} source={{ uri: item.reward_img }} />
          </TouchableOpacity>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>{ item.reward_name }</Text>
            <Text style={{ fontWeight: "bold", color: "green" }}>{ item.reward_point } points</Text>
            <Text>Adding redeeming, you'll have <Text style={{ fontWeight: "bold", color: "red" }}>{ afterPoints }</Text> points left</Text>
          </View>
        </View>
    )}
    else{
      return (
        <View style={{ flex: 0, flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={ .5 } onPress={ this.noRedeemRewardDialog }>
            <Image style={{ width: 80, height: 80, margin: 5 }} source={{ uri: item.reward_img }} />
          </TouchableOpacity>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>{ item.reward_name }</Text>
            <Text>{ item.reward_point } points</Text>
            <Text style={{ fontWeight: "bold", color: "red" }}>Require {addPoints} additional points to redeem</Text>
          </View>
        </View>
    )};
  }
	
	render() {
    console.disableYellowBox = true;
		return (
    <Container>
      { this.renderHeader() }
      <Content>
        <Separator bordered>
          <Text style={ styles.titleText }>Available Rewards</Text>
        </Separator>
        <FlatList data={ this.state.dataSource } renderItem={ this.renderItemOK } />
      </Content>
		</Container>
	)};
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});