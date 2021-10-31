import * as React from "react";
import { Image, FlatList, Linking, StyleSheet, Pressable,SafeAreaView, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

/**
 * Function that renders the resources screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the resources button in navigation
 * @returns {JSX.Element} JSX element of the resources screen
 */
export default function ResourcesScreen ({ navigation }: RootTabScreenProps<"Resources">) {
  const urlPaws="https://phillypaws.org/clinic-services/"
  const urlForgottenCats="https://forgottencats.org/program-services-fees/"
  const pawsServices = [
    {key: 'Spay/Neuter'},
    {key: 'FVRCP'},
    {key: 'Rabies'},
    {key: 'Flea Meds'},
    {key: 'Eartip'},
    {key: 'Pain Medication'},
  ]
  const forgottenServices = [
    {key: 'Spay/Neuter'},
    {key: 'FVRCP'},
    {key: 'Rabies'},
    {key: 'Flea Meds'},
    {key: 'Eartip'},
    {key: 'Pain Medication'},
    {key: 'Dewormer'},
    {key: 'Penicillin Shot'},
    {key: 'Overnight Holding'},
  ]
  
  return (
    <SafeAreaView>
      <ScrollView >
        <View style={styles.topCatButtonWrapper}>
        <View style={styles.container}>
        <Image
          style = {styles.topCat}
          source={require("../assets/images/resource-cat.png")}
        />
        </View>
        <Pressable style={styles.button}
          onPress={() => Linking.openURL(urlPaws)}>
          <Text style={styles.text}>PAWS</Text>
        </Pressable>
        <View style={styles.listContainer}>
          <FlatList
            data={pawsServices}
            renderItem={({item}) => <Text style={styles.listItem}>{'♥'} {item.key}</Text>}
          />
        </View>
        <Pressable style={styles.button}
          onPress={() => Linking.openURL(urlForgottenCats)}>
          <Text style={styles.text}>FORGOTTEN CATS</Text>
        </Pressable>
        <View style={styles.bottomCatButtonWrapper}>
          <FlatList
            data={forgottenServices}
            renderItem={({item}) => <Text style={styles.listItem}>{'♥'} {item.key}</Text>}
          />
          <Image
          style = {{width:200, height: 300}}
          source={require("../assets/images/resource-cat2.png")}
        />
        </View>
        {/* <Image
          style = {{width:200, height: 300}}
          source={require("../assets/images/resource-cat2.png")}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
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
    letterSpacing: .25,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  listContainer: {
      height: 200,
      textAlign: 'left'
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  topCat: {
    width:250, 
    height: 150,
    alignSelf: 'flex-end',
    marginBottom: -25,
  },
  bottomCatButtonWrapper: {
    height: 200,
    textAlign: 'left',
    display: 'flex',
    flexDirection: "row"
},
});
