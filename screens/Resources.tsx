import * as React from 'react';
import {
  Image, Linking, StyleSheet, Pressable, SafeAreaView, ScrollView,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/**
 * Function that renders the resources screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the resources button in navigation
 * @returns {JSX.Element} JSX element of the resources screen
 */
export default function ResourcesScreen({ navigation }: RootTabScreenProps<'Resources'>) {
  const urlPaws = 'https://phillypaws.org/clinic-services/';
  const urlForgottenCats = 'https://forgottencats.org/program-services-fees/';
  const pawsServices = [
    { key: 'Spay/Neuter' },
    { key: 'FVRCP' },
    { key: 'Rabies' },
    { key: 'Flea Meds' },
    { key: 'Eartip' },
    { key: 'Pain Medication' },
  ];
   const forgottenServices = [
    { key: 'Spay/Neuter' },
    { key: 'FVRCP' },
    { key: 'Rabies' },
    { key: 'Flea Meds' },
    { key: 'Eartip' },
    { key: 'Pain Medication' },
    { key: 'Dewormer' },
    { key: 'Penicillin Shot' },
    { key: 'Overnight Holding' },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.topCat}
            source={require('../assets/images/resource-cat.png')}
          />
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL(urlPaws)}
          >
            <Text style={styles.text}>PAWS </Text>
            <Text style={styles.text}>(South Philly)</Text>
          </Pressable>
          <View style={styles.listImageContainer}>
            <View style={styles.pawsServicesList}>
              {pawsServices.map((item) => (
                <Text style={styles.listItem}>
                  ♥
                  {' '}
                  {item.key}
                </Text>
              ))}
            </View>
            <Image
              style={{
                width: 20, height: 20, alignSelf: 'flex-end', marginBottom: 20, marginLeft: 'auto', marginRight: 40,
              }}
              source={require('../assets/images/paw-print.png')}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL(urlForgottenCats)}
          >
            <Text style={styles.text}>FORGOTTEN CATS</Text>
            <Text style={styles.text}>(Willow Grove)</Text>
          </Pressable>
          <View style={styles.listImageContainer}>
            <View style={styles.forgottenServicesList}>
              {forgottenServices.map((item) => (
                <Text style={styles.listItem}>
                  ♥
                  {' '}
                  {item.key}
                </Text>
              ))}
            </View>
            <Image
              style={{ width: 200, height: 250 }}
              source={require('../assets/images/resource-cat2.png')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 25,
    marginRight: 25,
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
  topCat: {
    width: 250,
    height: 150,
    alignSelf: 'flex-end',
    marginBottom: -25,
  },
  listImageContainer: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
  },
  forgottenServicesList: {
    display: 'flex',
    width: '50%',
    marginBottom: 20,
  },
  pawsServicesList: {
    marginBottom: 20,
  },
});
