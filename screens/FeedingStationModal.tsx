import React from "react";
import { StyleSheet, Image} from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<"Home">) {
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params.title}
      </Text>
      <Image
        style={{ width: 200, height: 200, top: -150 }}
        source={{
          uri: "https://media.istockphoto.com/vectors/pet-food-food-for-cats-bowl-packaging-advertising-vector-simple-flat-vector-id1176308523?k=20&m=1176308523&s=612x612&w=0&h=dtUknn9C3iCgRDNkwbnuKUO9rwgf_5rNjLkPEX5_xiM="
        }}
      />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />      

      {route.params.info.map((item) => {
        return (
            <View style={styles.content}>
              <Text style={styles.contentList}>
                {"Status: " + item.status}
                {'\n'}
                {"Ingredients Needed: " + item.ingredients}
                {'\n'}
                {"Time: " + item.time}
                {'\n\n'}
              </Text>
            </View> 
        )
      })}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    top: 100
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: "80%",
    top: -140
  },
  content: {
    fontSize: 20,
    top: -160,
    left: -150
  },
  contentList: {
    left: 100, 
    top: 25 
  },

});