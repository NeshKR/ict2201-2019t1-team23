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
            const response = await fetch('http://192.168.1.193/2203scripts/Leaderboard.php');
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
        <View style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', }}>Points LeaderBoard</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 20 }}></View>
        </View>
        )};

    render() {
        return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.renderHeader()}
            <Leaderboard 
            data={this.state.dataSource} 
            sortBy='total_trim_point' 
            labelBy='username' 
            icon="pic" />
        </View>
    )};
}
