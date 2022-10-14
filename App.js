import React, { useState, useEffect } from 'react';
import { REACT_APP_GIPHY_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  return (
    <View style={styles.view}>
      <Text style={styles.titleText}>Cats GIFs Galore</Text>
      <Text style={styles.subtitleText}>Click to get a random cat gif!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={getGif}
        title="Click Here!"
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
  gif: {
    width: 250,
    height: 250,
    margin: 20
  },
  titleText: {
    color: '#2f4f4f',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  subtitleText: {
    color: '#2f4f4f',
    fontSize: 15,
    marginBottom: 10
  },
  view: {
    backgroundColor: '#f0ffff',
    flex: 1, 
    padding: 25, 
    marginTop: 50, 
    alignItems: 'center'
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: '#a9a9a9'
  }
});
