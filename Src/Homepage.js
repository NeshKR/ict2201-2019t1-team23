import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ScrollableTab } from 'native-base';
import Tab1 from './Map';
import Tab2 from './Profile';
import Tab3 from './Challenge';
import Tab4 from './Reward';
import Tab5 from './Leaderboard';
import Tab6 from './Feedback';

export default class Homepage extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
        <Container>
            <Header style={{height: 20}}/>
            <Tabs renderTabBar={()=> <ScrollableTab />}>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="map-marked-alt" /><Text style={{ fontSize: 15}}>Map</Text></TabHeading>}>
                    <Tab1 />
                </Tab>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="user" /><Text style={{ fontSize: 15}}>Profile</Text></TabHeading>}>
                    <Tab2 />
                </Tab>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="tasks" /><Text style={{ fontSize: 15}}>Challenges</Text></TabHeading>}>
                    <Tab3 />
                </Tab>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="money-check-alt" /><Text style={{ fontSize: 15}}>Rewards</Text></TabHeading>}>
                    <Tab4 />
                </Tab>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="trophy" /><Text style={{ fontSize: 15}}>Leaderboard</Text></TabHeading>}>
                    <Tab5 />
                </Tab>
                <Tab heading={ <TabHeading><Icon style={{ fontSize: 15}} type="FontAwesome5" name="comment" /><Text style={{ fontSize: 15}}>Feedback</Text></TabHeading>}>
                    <Tab6 />
                </Tab>
            </Tabs>
        </Container>
        );
    }
}
