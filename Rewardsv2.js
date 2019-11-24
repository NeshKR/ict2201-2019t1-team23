import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { Container, Content, Separator } from "native-base";

// Unable create session with user; Predefined user points
const userPoints = 13000;

export default class Rewards extends Component {
	constructor(props) {
		super(props);
		this.state = {
      dataSource: [],
      collapsed:true,
		}
	}

	redeemreward = () => {
    Alert.alert(
      "Redeem",
      "Are you sure you want to redeem this reward?",
      // Add additional stuff for backend; Add reward for user, Minus available points for user
      [
        {text: "Yes", onPress: () => console.log("Yes was pressed")},
        {text: "No", onPress: () => console.log("No was pressed"), style: "cancel"},
      ]
    );
  }

  noredeemreward = () => {
    Alert.alert(
      "Redeem",
      "Sorry, you do not have sufficient points to redeem this reward",
    );
  }

	async componentDidMount() {
		try {
			const response = await fetch("http://192.168.1.193/2203scripts/Rewards.php");
			const responseJson = await response.json();
			this.setState({
				dataSource: responseJson,
			});
		}
		catch (error) {
			console.error(error);
		}
	};

	renderHeader() {
		return (
		<View style={{ backgroundColor: "#119abf", padding: 15, paddingTop: 35, alignItems: "center" }}>
			<Text style={{ fontSize: 25, color: "white" }}>Rewards</Text>
		</View>
  )};

	renderItemOK = ({ item }) => {
    afterPoints = userPoints - item.reward_point;
    if (userPoints >= item.reward_point) {
      return (
        <View style={{ flex: 0, flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={ .5 } onPress={ this.redeemreward }>
            <Image style={{ width: 80, height: 80, margin: 5 }} source={{ uri: item.reward_img }} />
          </TouchableOpacity>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>{ item.reward_name }</Text>
            <Text style={{ fontWeight: "bold", color: "green" }}>{ item.reward_point } points</Text>
            <Text>Adding redeeming, you'll have <Text style={{ fontWeight: "bold", color: "red" }}>{ afterPoints }</Text> points left</Text>
          </View>
        </View>
    )};
  }

  renderItemKO = ({ item }) => {
    addPoints = item.reward_point - userPoints;
    if (userPoints < item.reward_point) {
      return (
        <View style={{ flex: 0, flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={ .5 } onPress={ this.noredeemreward }>
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
		return (
		<Container> 
			{ this.renderHeader() }
      <Content>
        <Separator bordered>
          <Text style={ styles.titleText }>Redeemable Rewards</Text>
        </Separator>
        <FlatList data={ this.state.dataSource } renderItem={ this.renderItemOK } />
        <Separator bordered>
          <Text style={ styles.titleText }>Unredeemable Rewards</Text>
        </Separator>
        <FlatList data={ this.state.dataSource } renderItem={ this.renderItemKO } />
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