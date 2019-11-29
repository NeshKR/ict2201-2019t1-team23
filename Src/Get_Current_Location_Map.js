import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";


class ExampleMapA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zy_latitude: null,
      zy_longitude: null,
      error:null,
      coordinates: null,
    };
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //      (position) => {
  //         console.log(position);
  //         global.zy_latitude = position.coords.latitude,
  //         global.zy_longitude = position.coords.longitude
  //         this.setState({
  //           zy_latitude: global.zy_latitude,
  //           zy_longitude: global.zy_longitude,
  //           coordinates: [
  //             { latitude: zy_latitude, longitude: zy_longitude, },
  //             { latitude: 1.300155, longitude: 103.845115, },
  //           ],
  //         })
  //         console.log("HERE");
  //         console.log(this.state.coordinates);
  //      },
  //      (error) => this.setState({ error: error.message }),
  //      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  //    );
  //  }


  render() {
    return (
      <View>
        <Text> {this.state.zy_latitude} </Text>
        <Text> {this.state.zy_longitude} </Text>
        <Text> {this.state.error} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ExampleMapA;