import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';
import firebase from '../utils/firebase';

export default function Mod() {
  return (
    <>
      <Button
        color="#8b0000"
        title="Report"
        onPress={() => {
          alert('Report button pressed');
        }}
      />
      <Button
        color="#8b0000"
        title="Annoucements"
        onPress={() => {
          alert('Annoucements button pressed');
        }}
      />
    </>

  );
}
