import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert } from 'react-native';
import styled from 'styled-components';
import colours from '../components/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function TrackScreen({ navigation }) {
  const [text, setText] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [watchID, setWatchID] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const geolocationPositionOpts = {useSignificantChanges: true}

  const storeRoute = async () => {
    try {
      const value = await AsyncStorage.getItem('routes'); 
      if (value !== null) {
        data = JSON.parse(value);
        // Append new route to routes
        Object.assign(data, { [text]: trackingData });
        // TODO 6: Store new routes value in routes
      }
    } 
    catch (error) {
      console.log(error);
    }
  }

  const stopTracking = () => {
    // TODO 5: call ClearWatch here

    // Store the new route
    storeRoute();

    //Reset state
    setWatchID(false);
    setText('');
    setTrackingData([]);

    // TODO 7: Navigate to the Map screen and display the new route
  };

  // TODO 3: Implement onGeolocation function
  const onGeolocation = (position) => { 
    
  };

  const onGeolocationError = (positionError) => {
    alert('Geolocation error', JSON.stringify(positionError)); 
  };

  const startTracking = () => {
    if (text == '') {
      alert('please add a route name');
      return;
    }
    //TODO 2: Get watch id from navigator.geolocation.watchPosition and set this using setWatchID
  };

    
  return (
    <Container>
      <HeaderImage source={require('../assets/run1.jpg')} />
      <Body>
        <HeaderText>Start Tracking</HeaderText>
        <BodyText>
          Choose in a memorable name and hit "Track" then start running!
        </BodyText>

        <Divide />
        {watchID ?
          <Submit>
            {/* TODO 8: Call stopTracking when pressed */}
            <TouchButton onPress={null}>
              <BtnText>STOP</BtnText>
            </TouchButton>
          </Submit>
        : <RowStyle>
          <View style={{ paddingLeft: "5%" }}> 
            <ItemsLayout>
              <Holder>
                {/* TODO 1: Implement onChangeText */}
                <TextInput
                  style={{
                    flex: 2,
                    backgroundColor: "white",
                    borderRadius: 15,
                    marginRight: 5,
                    padding: 10,
                    height: 50,
                  }}
                  value={text}
                  placeholder="Name your route"
                  onChangeText={(value) => null}
                />
                <Submit>
                  {/* TODO 4: Call startTracking when pressed */}
                  <TouchButton onPress={null}>
                    <BtnText>Track</BtnText>
                  </TouchButton>
                </Submit>
              </Holder>
            </ItemsLayout>
          </View>
        </RowStyle> }
      </Body>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: ${colours.background};
`;
const Holder = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 40%;
  background: ${colours.blue};
`;

const Body = styled.ScrollView`
  background: ${colours.background};
  height: 80%;
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  position: absolute;
  top: 25%;
  padding: 10px;
`;
const ItemsLayout = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

const TouchButton = styled.TouchableOpacity``;

const Submit = styled.View`
  flex: 1;
  height: 50px;
  width: 100%;
  border-radius: 15px;
  margin-right: 20px;
  padding: 10px;
  background: ${colours.red};
  height: 50px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 25px;
  margin-top: 5%;
  margin-left: 20px;
  font-weight: bold;
`;

const BodyText = styled.Text`
  color: white;
  font-size: 15px;
  margin: 20px 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  text-align: center;
  line-height: 30px;
`;
const RowStyle = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Divide = styled.View`
  background: ${colours.blue};
  height: 1px;
  margin: 10px 20px;
  align-items: center;
`;

const Subtitle = styled.Text`
  font-size: 20px;
  color: ${colours.blue};
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 15px;
  padding-top: 15px;
`;
