import React, { useState, useEffect } from 'react';
import { REACT_APP_GIPHY_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const apiUrl = process.env.REACT_APP_GIPHY_URL

  useEffect(() => {
    getGif();
  }, []);

  const getGif = async () => {
    console.log('in getGif');
    try {
      const response = await fetch(`${REACT_APP_GIPHY_URL}`);
      const json = await response.json();
      setData(json.data);
      console.log(json.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error making API request.');
    }
  }
  //   setLoading(true);
  //   fetch(`${REACT_APP_GIPHY_URL}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //  )
  //  .then((response) => response.json())
  //  .then((json) => {
  //     setData(json.data);
  //     console.log(json.data);
  //     setLoading(false);
  //  }).catch(error => {
  //   Alert.alert('Error making API request.');
  //   console.log(error);
  //  });
   // end getGif

  return (
    <View style={{ flex: 1, padding: 24, margin: 50, alignItems: 'center' }}>
      <Text>Click to get a random cat gif!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={getGif}
        title="Get a gif!"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
       {isLoading ? <ActivityIndicator/> : (
        <Image 
          style={styles.gif}
          source={{uri: data.images.downsized.url}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 200,
    height: 200,
  }
});
