import * as React from 'react';
import {
  StyleSheet, ImageBackground, SafeAreaView, View, ScrollView, Text,
} from 'react-native';
import {
  Card, ListItem, Button, Icon,
} from 'react-native-elements';

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
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('../assets/images/rewards_ombre.jpeg')} resizeMode="cover" style={styles.backgroundImage}>
          <Card>
            <Card.Image style={styles.pointContainer} source={require('../assets/images/rewards.jpg')}>
              <View style={styles.pointInfo}>
                <Text style={styles.text}> 2,092 Points</Text>
              </View>
            </Card.Image>
          </Card>
          <Card>
            <Card.Title>Temple Cats Tee-Shirt</Card.Title>
            <Card.Divider />
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              3000 Points
            </Text>
            <Card.Image style={{ height: 310, marginBottom: 20 }} source={require('../assets/images/shirt.jpeg')} />
            <Button
              icon={<Icon name="redeem" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 40, backgroundColor: '#8B0000',
              }}
              title="Redeem"
            />
          </Card>
          <Card>
            <Card.Title>Temple Cats Magnet</Card.Title>
            <Card.Divider />
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              1500 Points
            </Text>
            <Card.Image style={{ height: 200, marginBottom: 20 }} source={require('../assets/images/carMag.jpeg')} />
            <Button
              icon={<Icon name="redeem" color="#ffffff" />}
              buttonStyle={{
                marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: 40, backgroundColor: '#8B0000',
              }}
              title="Redeem"
            />
          </Card>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  pointInfo: {
    borderRadius: 40,
    backgroundColor: '#8b0000',
    padding: 20,
  },
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
