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
    <View style={{ flex: 1, padding: 24, margin: 50, alignItems: 'center' }}>
      <Text style={styles.titleText}>GIPHY Project</Text>
      <Text>Click to get a random cat gif!</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 200,
    height: 200,
    margin: 20
  },
  titleText: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  }
});
