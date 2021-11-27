import * as React from 'react';
import {
  StyleSheet, ImageBackground, SafeAreaView, View, Image, Text,
} from 'react-native';

/**
 * Function that renders the screen for cashing in points for rewards.
 * @component
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function Rewards() {
  /**
   * The uri of an image to be used in the background of the login screen.
   * @constant {{uri: string}}
   */
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/rewards_ombre.jpeg')} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/rewards.jpg')}
            />
            <View style={styles.pointContainer}>
              <Text style={styles.text}> 2,092 Points</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 250,
    borderRadius: 40,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: 'white',
    fontSize: 22,
    lineHeight: 90,
    fontWeight: 'bold',
    backgroundColor: '#8b0000',
    margin: 15,
  },
  logoContainer: {
    height: 280,
    width: 355,
    backgroundColor: 'white',
    borderRadius: 40,
    marginBottom: 470,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  pointContainer: {
    alignItems: 'center',
    backgroundColor: '#8B0000',
    borderRadius: 40,
    marginBottom: 80,
  },
});
