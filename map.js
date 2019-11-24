import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Coordinates for the starting render of the map; The Center of Singapore
const { width, height } = Dimensions.get('window');
const LATITUDE = 1.290270;
const LONGITUDE = 103.851959;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDFp2yQywbjLji78WiX8whPVBa4ClRwuCk';

class ExampleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [
        { latitude: 1.288126, longitude: 103.809233, },
        { latitude: 1.300155, longitude: 103.845115, },
      ],
    };
    this.mapView = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <MapView
        initialRegion={{ 
          latitude: LATITUDE, 
          longitude: LONGITUDE, 
          latitudeDelta: 1, 
          longitudeDelta: 1
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            mode="WALKING"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="darkblue"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}

export default ExampleMap;