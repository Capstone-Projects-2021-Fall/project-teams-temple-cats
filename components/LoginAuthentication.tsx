import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { TouchableOpacity, StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import firebase from '../utils/firebase';

WebBrowser.maybeCompleteAuthSession();

// Request response token from user

/**
 * Function that renders the Login Authentication component with a button to log in via Facebook.
 * @component
 * @returns {JSX.Element} JSX element of the login
 */
export default function LoginAuthentication() {
  /**
   * Facebook authorization request's loaded request object.
   * @constant {FacebookAuthRequest} request
   * @memberof LoginAuthentication
   */
  /**
   * Facebook authorization request's response object.
   * @constant {AuthSessionResult} response
   * @memberof LoginAuthentication
   */
  /**
   * Facebook authorization request's prompt method.
   * @method promptAsync
   * @memberof LoginAuthentication
   * @throws Throws an exception if there was a problem in communicating with firebase or facebook authentication services. Catches exception with a message saying 'There was a problem reaching the authentication service. Please check your internet connection or try again later.' 
   */
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '562935831789483',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
      firebase.auth().signInWithCredential(credential);

      console.log('User added');
    }
  }, [response]);

  return (
    <TouchableOpacity
      disabled={!request}
      style={styles.buttonFacebookStyle}
      activeOpacity={0.5}
      onPress={() => {
        promptAsync();
      }}
    >
      <Image source={require('../assets/images/fb.jpg')} style={styles.buttonImageIconStyle} />
      <Text style={styles.buttonTextStyle}>Continue with Facebook </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 'auto',
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
