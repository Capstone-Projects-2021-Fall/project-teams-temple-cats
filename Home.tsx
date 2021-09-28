
import React from "react";

import { View, ImageBackground, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <ImageBackground 
    source={{uri:
     'https://media.istockphoto.com/photos/small-kittens-picture-id516230467?k=6&m=516230467&s=612x612&w=0&h=Exd6B-5vXxg-4t_t_USCDGqKO6d-1KCmQkS_smprKnI='
    }}>
     
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1
  },
})


/*
const Home = () => {
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      
    </View>
  );
};
/// <Text>This is the home screen</Text>

*/
export default Home;