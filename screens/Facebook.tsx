import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet, StatusBar, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
/**
 * Function that renders the webview for displaying the Temple Cats Facebook Group.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function Facebook() {
  return (
    Alert.alert(
      'Alert',
      'Do you want to open the in the Facebook App?',
      [
        {
          text: 'No',
          onPress: () => console.log('Button pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Linking.openURL('fb://profile/250544657405'),
        },
      ],
      { cancelable: false },
    ),
    (<WebView styles={styles.container} source={{ uri: 'https://www.facebook.com/groups/templecats' }} />)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
