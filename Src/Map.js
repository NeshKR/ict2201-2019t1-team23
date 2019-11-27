import React, { Component } from 'react';
import { Alert, StyleSheet, Platform, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { Card } from "native-base";
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import MyView from './MyView';
import haversine from "haversine";
import getNearestMrt from 'nearest-mrt'
import Challenge from './Challenge';
import ThreeAxisSensor from 'expo-sensors/build/ThreeAxisSensor';

const { width, height } = Dimensions.get('window');
// Center of Singapore Coordinate
const LATITUDE = 1.290270;
const LONGITUDE = 103.851959;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDFp2yQywbjLji78WiX8whPVBa4ClRwuCk';

class MapLogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../Pictures/map_icon.png')}
        style={{ width: 200, height: 45 }}
      />
    );
  }
}

class ExampleMap extends Component {
  static navigationOptions = {
    headerStyle: { height: 50 }, // Customize Header Height
    headerTitle: () => <MapLogoTitle />, // Picture Header
  }

  constructor(props) {
    super(props);
    this.checkIfUserHaveReachLM = this.checkIfUserHaveReachLM.bind(this);
    obj_challengecomplete = new Challenge,
    this.state = {
      jsonData: '',
      zy_lm_latitude: '',
      zy_lm_longitude: '',
      zy_lm_long_lat: '',
      zy_end_api: '',
      zy_end_json: '',
      a: '', // Dest lat
      b: '', // Dest long
      error: null,
      MAP_StartLoc: '', 
      MAP_EndLoc: '', 
      ActivityIndicator_Loading: false, 
      coordinates: global.coordinates,
      status: false, //For the display of map
      mapstatus : false,
      latitude: LATITUDE, // current latitude (REAL_TIME)
      longitude: LONGITUDE, // current longitude (REAL_TIME)
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      current_location: [ global.zy_longitude, global.zy_latitude ],
      fm_mrt_coordinates: [],
      aa: '',
      bb: '',
      cc: '',
      dd: '',
      ee: '',
      ff: '',
      display: true,
    };
    this.mapView = null;
  }

  ShowEndLocEmpty = () => {
    Alert.alert(
      'Invalid Input',
      'Destination cannot be empty! Please enter a destination in the field!',
    )
    console.log("Empty Destination")
  }

  ShowHideTextComponentView = () => {
    Alert.alert(
      'Challenge No.3: Complete a route to get points',
      'Do you want to start this challenge?',
      [
        {text: 'OK', onPress: () => { global.challenge3 = true, this.state.status==true, this.get_Destination() }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},    
      ],
      {cancelable: false},
    );
    //this.get_Destination()
    //this.state.status == true
  }

  ShowHideMapView = () => {
    if ((this.state.zy_lm_latitude) && (this.state.zy_lm_longitude)) {
      this.state.mapstatus = true
    }
    return(this.state.mapstatus)
  }

  get_Destination = () => {
    this.state.MAP_EndLoc =  this.state.MAP_EndLoc.replace(/\s+/g, '+').toLowerCase();
    if (this.state.MAP_EndLoc != ""){
      if (this.state.MAP_EndLoc.endsWith("+")) {
        this.state.MAP_EndLoc = this.state.MAP_EndLoc.substring(0, this.state.MAP_EndLoc.length - 1);
      }
      this.state.zy_end_api = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.MAP_EndLoc + "&components=country:sg" + "&key=" + GOOGLE_MAPS_APIKEY;
      console.log(this.state.zy_end_api)
      fetch(this.state.zy_end_api, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseData) => {
        this.setState({
          jsonData: JSON.stringify(responseData)
        });
        var regex = /location\":\{\"lat\":(.*),\"lng\":(.*)\},\"\+\+\+\+/i;
        this.state.jsonData =  this.state.jsonData.replace(/location_type/g, '++++').toLowerCase();
        //console.log(this.state.jsonData)
        var matches = this.state.jsonData.match(regex);
        this.state.a = matches[1]; // latitude
        this.state.b = matches[2]; // longitude
        // Insert user destination (longitude and latitude) into the DB
        fetch('http://'+ global.db_IP +'/2203scripts/Insert_long_lat.php',
        {
          method: 'POST',
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name : this.state.MAP_EndLoc,
            latitude : this.state.a,
            longitude : this.state.b,
          })
        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
          console.log(responseJsonFromServer)
          this.setState({ ActivityIndicator_Loading : false });
        }).catch((error) =>
        {
          console.error(error);
          this.setState({ ActivityIndicator_Loading : false});
        });
        
        //Get longitude and latitude from DB
        fetch('http://'+ global.db_IP +'/2203scripts/get_long_lat.php',
        {
          method: 'POST',
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude : this.state.a,
            longitude : this.state.b,
          })
        }).then((response2) => response2.json()).then((responseJsonFromServer2) =>
        {
          this.setState({ ActivityIndicator_Loading : false });
          if(responseJsonFromServer2 != "Long lat not found!"){
            this.state.zy_lm_long_lat = responseJsonFromServer2;
            //console.log("r:",responseJsonFromServer2)
            this.setFMLongLat();
          }
        }).catch((error2) =>
        {
          console.error(error2);
          this.setState({ ActivityIndicator_Loading : false});
        });
      })
    } 
    else{
      this.ShowEndLocEmpty();
    }
  }

  setFMLongLat() 
  {
    var needTakeMRT = this.checkIfUserNeedsToTakeMRT();
    //alert(needTakeMRT)
    if (needTakeMRT) {
      // Get Last Mile Destination
      // Code need to be here
      var temp = this.state.zy_lm_long_lat
      var myArray = temp.split(',');
      for (var i = 0; i < myArray.length; i++) {
        if (i==0) {
          this.state.zy_lm_latitude = myArray[i]
        } else if (i==1) {
          this.state.zy_lm_longitude = myArray[i]
        }
      }

      // Using current location and try to find the nearest MRT
      var target = this.state.current_location
      nearestMRT = getNearestMrt(target, false, 2000)
      nearestMRT = JSON.stringify(nearestMRT)
      nearestMRT = nearestMRT.replace(/\s+/g, '+')
      var regex2 = /rank\":2.*/i;
      var matches2 = nearestMRT.match(regex2);
      nearestMRT = nearestMRT.replace(matches2, '')
      var regex3 = /rank\":1.*longitude\":(.*?),\"latitude\":(.*?),/i;
      var matches3 = nearestMRT.match(regex3);
      fm_long = matches3[1]; // fm mrt longitude
      fm_lat = matches3[2]; // fm mrt latitude
      this.state.cc = fm_lat
      this.state.dd = fm_long
      // Set coordinates to let user view his/her first mile from his/her current location to the nearest mrt station
      this.setState({
        coordinates : [
          { latitude: global.zy_latitude, longitude: global.zy_longitude, },
          { latitude: fm_lat, longitude: fm_long, },
        ],
        fm_mrt_coordinates: {
          latitude: fm_lat, longitude: fm_long
        },
        display: true,
      });
    } 
    else {
      this.setState({
        coordinates : [
          { latitude: global.zy_latitude, longitude: global.zy_longitude, },
          { latitude: this.state.zy_lm_latitude, longitude: this.state.zy_lm_longitude, },
        ],
        display : false,
      });
    }
  }

  setLMLongLat() 
  {
    var target2 = [this.state.zy_lm_longitude, this.state.zy_lm_latitude]
    nearestMRT = getNearestMrt(target2, false, 2000)
    nearestMRT = JSON.stringify(nearestMRT)
    //console.log(nearestMRT)
    nearestMRT = nearestMRT.replace(/\s+/g, '+')
    var regex2 = /rank\":2.*/i;
    var matches2 = nearestMRT.match(regex2);
    nearestMRT = nearestMRT.replace(matches2, '')
    var regex3 = /rank\":1.*longitude\":(.*?),\"latitude\":(.*?),/i;
    var matches3 = nearestMRT.match(regex3);
    lm_long = matches3[1]; // lm mrt longitude
    lm_lat = matches3[2]; // lm mrt latitude
    this.state.ee = lm_lat
    this.state.ff = lm_long
    this.setState({
      coordinates : [
        { latitude: this.state.ee, longitude: this.state.ff, },
        { latitude: this.state.zy_lm_latitude, longitude: this.state.zy_lm_longitude, },
      ],
    });
  }

  checkIfUserNeedsToTakeMRT() {
    // Get Last Mile Destination
    // Code need to be here
    var temp = this.state.zy_lm_long_lat
    var myArray = temp.split(',');
    for (var i = 0; i < myArray.length; i++) {
      if (i==0) {
        this.state.zy_lm_latitude = myArray[i]
      } else if (i==1) {
        this.state.zy_lm_longitude = myArray[i]
      }
    }
    const start2 = {
      latitude: global.zy_latitude,  // current location latitude and longitude
      longitude: global.zy_longitude
    }
    const end2 = {
      latitude: this.state.zy_lm_latitude, // FM mrt latitude and longitude
      longitude: this.state.zy_lm_longitude
    }
    dist_diff = haversine(start2, end2)
    if (dist_diff >= 3) {
      return(true) // User need to take mrt
    } else {
      return(false) // User dont need to take mrt
    }
  }

  checkIfUserHaveReachFM(){
    const start = {
      latitude: this.state.latitude, // current location latitude and longitude
      longitude: this.state.longitude
    }
    const end = {
      latitude: this.state.cc, // FM mrt latitude and longitude
      longitude: this.state.dd
    }
    var needTakeMRT = this.checkIfUserNeedsToTakeMRT();
    dist_diff = haversine(start, end)
    if (dist_diff <= 0.5) {
      alert("You have finished your FM")
      // Display FM
      if (needTakeMRT == true) {
        alert("You have not finish your FM")
        if (this.state.display == true) {
          this.setLMLongLat();
        }
      } else if (needTakeMRT == false) {
        global.click_challenge3 = 2;
        if (global.challenge3 == true && global.click_challenge3 == 2 ) {
          Alert.alert(
            'Congrats!',
            'No.3 challenge is completed! You have earn 50 points!',
            [
              {text: 'OK', onPress: () => global.click_challenge3_1 = 2, style: 'cancel'},
            ],
            {cancelable: false},
          );
        }
        global.click_challenge3_1 = 2;
        global.click_challenge3 = 2;
        if (this.state.display == true) {
          this.setLMLongLat();
        }
      }
    } else {
      alert("You have NOT finished your FM!")
    }
  }

  checkIfUserHaveReachLM(){
    const start = {
      latitude: this.state.latitude, // current location latitude and longitude
      longitude: this.state.longitude
    }
    const end = {
      latitude: this.state.ee, // FM mrt latitude and longitude
      longitude: this.state.ff
    }
    dist_diff = haversine(start, end)
    if (dist_diff <= 0.5) {
      alert("You have finished your LM")
      // Display LM
      global.click_challenge3 = 2;
      if (global.challenge3 == true && global.click_challenge3 == 2 ) {
        Alert.alert(
          'Congrats!',
          'No.3 challenge is completed! You have earn 50 points!',
          [
            {text: 'OK', onPress: () => global.click_challenge3_1 = 2, style: 'cancel'},
          ],
          {cancelable: false},
        );
      }
      global.click_challenge3_1 = 2;
      global.click_challenge3 = 2;
    } else {
      alert("You have not finish your LM")
    }
  }

  getCurrentLoc() {
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          aa: position.coords.latitude,
          bb: position.coords.longitude,
        });
      },
      current_loc = { latitude: this.state.aa, longitude: this.state.bb },
      { enableHighAccuracy: true, timeout: 20000},
    );
  }

  componentDidMount() {
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        // Check if user is using android or apple phone
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });

        // Challenge points
        if (this.state.distanceTravelled >= 0.1) {
          var temp_dist_travelled = this.state.distanceTravelled
          global.points_earned = (temp_dist_travelled / 0.1 ) * 100
          global.points_earned = parseFloat(global.points_earned).toFixed(2)
        }else {
          //alert("You earn 0 point.")
        }
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    console.disableYellowBox = true;
    return (
      <View style = {styles.container}>
        <Text style = {styles.text1}>Enter start location: </Text>
        <TextInput 
          style = { styles.TextInputStyleClass } 
          underlineColorAndroid = "transparent"
          onChangeText = {(text) => this.setState({ MAP_StartLoc : text })}
          //value = {this.state.MAP_StartLoc}
          value = " User's current location"
          editable = {false}
        />
        <Text style = {styles.text1}>Enter end location: </Text>
        <TextInput 
          style = { styles.TextInputStyleClass } 
          underlineColorAndroid = "transparent"
          onChangeText = {(text) => this.setState({ MAP_EndLoc : text })}
          value = {this.state.MAP_EndLoc}
        />
        <View style={styles.container2}> 
          <TouchableOpacity style={styles.startWalkingBtn} onPress={() => {this.ShowHideTextComponentView(); }}>
            <Text style={styles.BtnText}>Let's start walking!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.FMLMBtn} onPress={() => { this.checkIfUserHaveReachFM(); }}>
            <Text style={styles.BtnText}>FM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.FMLMBtn} onPress={() => { this.state.display && this.checkIfUserHaveReachLM(); }}>
            <Text style={styles.BtnText}>LM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
          <MyView hide={this.state.status} style={styles.container4}> 
            <Card style={styles.CardSize}>
            {this.ShowHideMapView() && <MapView
                // provider={PROVIDER_GOOGLE}
                provider={PROVIDER_GOOGLE}
                showUserLocation
                followUserLocation
                loadingEnabled
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
                    origin={ this.state.coordinates[0] }
                    waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null }
                    destination={ this.state.coordinates[this.state.coordinates.length-1] }
                    mode="WALKING"
                    apikey={ GOOGLE_MAPS_APIKEY }
                    strokeWidth={ 3 }
                    strokeColor="darkgrey"
                    optimizeWaypoints={ true }
                    onStart={ (params) => {
                      console.log(`Started routing between "${ params.origin }" and "${ params.destination }"`);
                    }}
                    onReady={result => {
                      console.log(`Distance: ${ result.distance } km`)
                      console.log(`Duration: ${ result.duration } min.`)
                      
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
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                <Marker.Animated
                title={"User location"}
                description={"HERE"}
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
              />
              </MapView>}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bubble, styles.button]}>
                  <Text style={styles.bottomBarContent}>
                    {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </MyView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  container2: {
    backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    height: "10%",
    width: "100%",
	},

  container3: {
    backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'center',
    height: "70%",
    width: "100%",
    marginBottom: "1%",
  },
  
  container4: {
    backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
	},

  viewChallengeBtn: {
    width: "30%",
    height: "50%",
    backgroundColor: "rgba(0, 79, 173, 1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 0,
    marginLeft: "0%",
  },

  startWalkingBtn: {
    width: "60%",
    height: "50%",
    backgroundColor: "rgba(0, 79, 173, 1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 0,
    marginRight: "0%",
    marginLeft: "1%",
  },

  FMLMBtn: {
    width: "15%",
    height: "50%",
    backgroundColor: "rgba(0, 79, 173, 1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 0,
    marginRight: "0%",
    marginLeft: "1%",
  },

  text1: {
    textAlign: "left",
    width: "95%",
    color: "black",
  },

  BtnText: {    // Button Text
    color: "#e1ffeb",
    alignSelf: "center",
    fontWeight: "bold",
  },

  TextInputStyleClass:
  {
    height: "5%",
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    marginTop: "1%",
    width: '95%',
  },

  CardSize:
  {
    width: '95%',
    height: '100%'
  },

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

  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },

  latlng: {
    width: 200,
    alignItems: "stretch"
  },

  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },

  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default ExampleMap;