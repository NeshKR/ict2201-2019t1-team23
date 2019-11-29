import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right, Left, Header } from 'native-base';
import { StyleSheet } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const bookIcon = (<FontAwesome name="user-circle-o" size={22} color="black" />);
export const passwordIcon = (<FontAwesome name="unlock-alt" size={22} color="black" />);
export const feedbackIcon = (<FontAwesome name="commenting-o" size={22} color="black" />);
export const faqIcon = (<FontAwesome name="question-circle-o" size={22} color="black" />);
export const aboutIcon = (<FontAwesome name="info-circle" size={22} color="black" />);
export const exit = (<FontAwesome name="sign-out" size={22} color="black" />);

export default class RewardPage extends Component {
    static navigationOptions = {
        header: null
    };
    
    render() {
        return (
            <Container>
                <Header style={{height: 20}}/>
                <Content>
                    <Card>
                        <CardItem bordered>
                            <Left>
                                <Icon>{feedbackIcon}</Icon> 
                                <Text>Feedback</Text>
                            </Left>
                            <Right style={styles.ArrowHeadStyle} >
                            <Icon name="arrow-forward" button onPress={() => this.props.navigation.navigate('Login_Screen')}/>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                        <Left>
                            <Icon>{faqIcon}</Icon> 
                            <Text>FAQ</Text>
                        </Left> 
                        <Right style={styles.ArrowHeadStyle} >
                            <Icon name="arrow-forward" button onPress={() => alert("This is Card Header")}/>
                        </Right>
                        </CardItem>
                        <CardItem bordered>
                        <Left>
                            <Icon>{aboutIcon}</Icon> 
                            <Text>About Us</Text>
                        </Left>   
                        <Right style={styles.ArrowHeadStyle} >
                            <Icon name="arrow-forward" button onPress={() => alert("This is Card Header")}/>  
                        </Right>
                        </CardItem>
                        <CardItem bordered>
                        <Left>
                            <Icon>{exit}</Icon> 
                            <Text>Sign Out</Text>
                        </Left> 
                        <Right style={styles.ArrowHeadStyle} >
                            <Icon name="arrow-forward" button onPress={() => alert("This is Card Header")}/>  
                        </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );}
    }

const styles = StyleSheet.create({
  ArrowHeadStyle: {
    marginLeft: "auto",
    marginRight: "5%",
    fontSize: 20,  
    justifyContent: 'flex-end',
  },
});
