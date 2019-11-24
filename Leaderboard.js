import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import Leaderboard from 'react-native-leaderboard';

export default class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://192.168.1.193/2203scripts/Leaderboard.php'); // connection to the DB, phpMyAdmin
            const responseJson = await response.json();
            this.setState({                                                      // set current data in DB to update the ones in Leaderboard page
                dataSource: responseJson,
            });
        }
        catch (error) {
            console.error(error); // no response, error handling
        }
    };

    renderHeader() {      // alignments & style for Leaderboard Header 
        return (
        <View style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', }}>Points LeaderBoard</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 20 }}></View>
        </View>
        )};

    render() {
        return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>    // style for Leaderboard "ranking"
            {this.renderHeader()}
            <Leaderboard 
            data={this.state.dataSource}   // fetch data from phpMyAdmin
            sortBy='total_trim_point'     // sort users according to accumulated points 
            labelBy='username'           // display username
            icon="pic" />               // display dp of user 
        </View>
    )};
}
