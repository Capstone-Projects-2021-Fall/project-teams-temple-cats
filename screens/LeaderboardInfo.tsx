import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
/**
 * Function that renders the screen for displaying info about the points/scoring system.
 * @component
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function LeaderboardInfoModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoring System</Text>
      <View style={styles.separator} lightColor='rgba(160, 28, 52, 0.75)' darkColor='rgba(160, 28, 52, 0.75)' />
      <Text>You can earn points by completing various actions to helps cats! Once you have earned enough points, you can redeem them for various rewards found in the rewards tab in the account page.</Text>
      <Text>+5 points - Report a new cat</Text>
      <Text>Note: you may only earn points for actions witihn the boundaries of Temple's campus (shown by the red border on the map)</Text>
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
});
