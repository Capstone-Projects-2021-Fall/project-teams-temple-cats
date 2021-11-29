import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
/**
 * Function that renders the screen for displaying info about the points/scoring system.
 * @component
 * @returns {JSX.Element} JSX element of the scoring info screen
 */
export default function ScoringInfoModal() {
  const pointsInfo = [
    { points: 5, description: 'Report a new cat' },
    { points: 20, description: 'Gave this cat food/water' },
    { points: 30, description: 'Completed feeding station request (feeders only)' },
    { points: 50, description: 'Took cat to get scanned for a microchip' },
    { points: 200, description: 'Trap/neuter/returned this cat' },
    { points: 200, description: 'Took this cat to a no-kill shelter' },
    { points: 200, description: 'Fostering this cat' },
    { points: 300, description: 'Returned this cat to it\'s owner' },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
        <Text style={styles.title}>Scoring System</Text>
        <View style={styles.separator}/>
        <Text style={styles.subtitle}>You can earn points by completing various actions to helps cats! Once you have earned enough points, you can redeem them for various rewards found in the rewards tab in the account page.</Text>
        <View style={styles.listContainer}>
          {pointsInfo.map((item, index) => (
            <View style={styles.infoContainer} key={index}>
              <Text style={styles.points}>♥ {item.points} points</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Note: you may only earn points for actions within the boundaries of Temple's campus (shown by the red border on the map). If a moderator finds your post innapropriate and deletes it, the points you earned for that action will be deducted from your total.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 20,
    height: 3,
    width: '80%',
    backgroundColor: 'rgba(160, 28, 52, 0.75)',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    width: 350,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(160, 28, 52, 0.75)',
    borderWidth: 1,
  },
  points: {
    flex: 1,
    margin: 10,
  },
  description: {
    flex: 2,
    margin: 10,
  },
  note: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});
