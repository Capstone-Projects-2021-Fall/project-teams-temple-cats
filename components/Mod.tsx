import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';
import firebase from '../utils/firebase';
import Navigation from '../navigation';

export default function Mod(props: {
  onReportedPostsPress: () => void;
  onDownvotedPostsPress: () => void;
}) {
  return (
    <>
      <Button
        color="#8b0000"
        title="Reported Posts"
        onPress={props.onReportedPostsPress}
      />
      <Button
        color="#8b0000"
        title="Downvoted Posts"
        onPress={props.onDownvotedPostsPress}
      />
    </>

  );
}
