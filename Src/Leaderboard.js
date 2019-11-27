import React, { Component } from 'react';
import { Text, View, Image, ImageBackground} from 'react-native';
import Leaderboard from 'react-native-leaderboard';

export default class Rewards extends Component {
    constructor() {
        super();
        this.state = {
            userRank: 0,
            userPoints: global.UP_Total_Points,
            userAvatar: global.UP_Avatar,
            dataSource: [],
        }
    }

    async componentDidMount() {
        try {
            // connection to the DB, phpMyAdmin
            const response = await fetch('http://'+ global.db_IP +'/2203scripts/Leaderboard.php'); 
            const responseJson = await response.json();
            
            // set current data in DB to update the ones in Leaderboard page
            this.setState({ 
                dataSource: responseJson,
            });

            temp_rank = 0;
            for (var i=0; i < this.state.dataSource.length; i++){
                if (this.state.dataSource[i].username == global.User_name){
                    temp_rank = this.state.dataSource[i].rank;
                }
            }
            this.setState({ userRank: temp_rank, });
        }
        catch (error) {
            // no response, error handling
            console.error(error);
        }
    };

    // alignments & style for Leaderboard Header 
    renderHeader() {   
        return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                    { ordinal_suffix_of(this.state.userRank) }
                </Text>
                <Image style={{ height: 50, width: 50, borderRadius: 25 }}
                    source={{ uri: this.state.userAvatar }} />
                <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                    { this.state.userPoints }pts
                </Text>
            </View>
        </View>
        )};

    render() {
        return (
            <ImageBackground style={{ height: "100%", width: "100%" }} source = { require("../Pictures/external-content.duckduckgo.com.jpeg") }>
                <View style={{ flex: 1 }}>
                    { this.renderHeader() }
                    <Leaderboard
                    // fetch data from phpMyAdmin
                    data={ this.state.dataSource }
                    // sort users according to accumulated points
                    sortBy='total_points'
                    // display username
                    labelBy='username'
                    // display dp of user
                    icon="avatar" />                
                </View>
            </ImageBackground>
    )};
}

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}