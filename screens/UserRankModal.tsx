import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { View } from '../components/Themed';


export default function UserRankModal() {
  


    return (
      <View style={styles.container}>
          <Image
        style={{ width: 200, height: 200, top: 5 }}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2018/06/18/14/20/cat-3482623_960_720.jpg',
        }}
      />
      
       <Input
          style={styles.nameInput}
          value={announcement.subject}
          selectionColor="blue"
          placeholder="Enter subject here..."
          placeholderTextColor="black"
          onChangeText={(text) =>  setAnnouncement((currentState: Announcement) => ({
            ...currentState,
            subject: text,
      
          }))}
        />
       <Input
          style={styles.additionalInput}
          selectionColor="blue"
          placeholder="Enter announcement here..."
          placeholderTextColor="black"
          value={announcement.content}
          onChangeText={(text) => setAnnouncement((currentState: Announcement) => ({
            ...currentState,
            content: text,
          }))
          }
        />
      <Button
          title="Submit"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            submitAnnouncement();
            return;
          }}
        />


        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    additionalInput: {
      height: 120,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      backgroundColor: 'white',
    },
    nameInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      backgroundColor: 'white',
    },
    buttonStyle: {
      width: 150,
      padding: 10,
      backgroundColor: '#9D2235',
      borderRadius: 30,
    },
  });
  