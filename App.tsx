import React from 'react';
import {Button, SafeAreaView, View, ImageBackground, Text, StyleSheet, Alert } from "react-native";

const image={uri:
  'https://media.istockphoto.com/photos/small-kittens-picture-id516230467?k=6&m=516230467&s=612x612&w=0&h=Exd6B-5vXxg-4t_t_USCDGqKO6d-1KCmQkS_smprKnI='
 };

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Temple Cats</Text>
        </ImageBackground>
      </View>
      
      <View>
        <Button
          title="Sign in"
          color="#8b0000"
          onPress={() => Alert.alert('Redirecting you to Facebook')}
        />
      </View>
    
      <View>
        <Separator />
      </View>

      <View>
      <Button 
          title="Create an account"
          color="#8b0000"
          onPress={() => Alert.alert('Redirecting you to Facebook')}
        />
      </View>
    </SafeAreaView>
  );
}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
    container: {
       flex: 1,
     },
     image: {
       flex: 1,
       justifyContent: "center"
     },

     title: {
      textAlign: 'center',
      marginVertical: 8,
      backgroundColor: "#2f4f4f"
      
    },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
     text: {
       color: "white",
       fontSize: 42,
       lineHeight: 84,
       fontWeight: "bold",
       textAlign: "center",
       backgroundColor: "#8b0000"
     },

     separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
   });
   
export default App;
/* <Text style={styles.title}>
Sign in
</Text>*/