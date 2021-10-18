import React, { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { View } from "./components/Themed";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Cat, Pin } from "./types";
import { addCat, addPin } from "./utils/dbInterface";
import { LatLng } from "react-native-maps";
import LocationPicker from "./screens/LocationPicker";
import {
  Modal,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import CatImagePicker from "./components/ImagePicker";
import Camera from "./components/Camera";
import useColorScheme from "./hooks/useColorScheme";

export const CatForm2 = () => {
  const colors = ["Orange", "Brown", "Black", "White"];
  const eyeColors = [
    "Brown",
    "Green",
    "Blue",
    "Black",
    "Yellow",
    "Orange",
    "Hazel",
    "Mixed",
  ];

  const colorScheme = useColorScheme();

  // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeTextStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;

  const [color, setColor] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [friendly, setFriendly] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const [kitten, setKitten] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [camModalVisible, setCamModalVisible] = useState(false);

  const [cat, setCat]: Cat = useState({
    catID: uuidv4(),
    comments: "",
    name: "",
    color: "",
    eyeColor: "",
    media: "",
    friendly: false,
    healthy: false,
    kitten: false,
    pinID: uuidv4(),
  });

  const [pin, setPin]: Pin = useState({
    pinID: cat.pinID,
    location: "",
    time: new Date(),
    votes: 0,
    accountID: "",
    type: cat.catID,
  });

  function onLocationPick(coordinate: LatLng) {
    setPin((currentState) => ({
      ...currentState,
      location: coordinate,
    }));
    setLocationModalVisible(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          value={cat.name}
          selectionColor="white"
          placeholder="Enter possible name here"
          placeholderTextColor="black"
          onChangeText={(text) =>
            setCat((currentState) => ({
              ...currentState,
              name: text,
            }))
          }
          style={styles.input}
        />
        <TextInput
          style={styles.input}
          selectionColor="white"
          placeholder="Enter additional information here"
          placeholderTextColor="black"
          value={cat.comments}
          onChangeText={(text) =>
            setCat((currentState) => ({
              ...currentState,
              comments: text,
            }))
          }
        />
        <CheckBox
          title="Friendly?"
          checked={friendly}
          onPress={() => {
            setFriendly(!friendly);
            cat.friendly = !cat.friendly;
          }}
        />
        <CheckBox
          title="Healthy?"
          checked={healthy}
          onPress={() => {
            setHealthy(!healthy);
            cat.healthy = !cat.healthy;
          }}
        />
        <CheckBox
          title="Kitten?"
          checked={kitten}
          onPress={() => {
            setKitten(!kitten);
            cat.kitten = !cat.kitten;
          }}
        />
        <Picker
          style={{ backgroundColor: "white" }}
          selectedValue={color}
          onValueChange={(item) => {
            setColor(item);
            cat.color = colors[item];
          }}
        >
          {colors.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
        <Picker
          style={{ backgroundColor: "white" }}
          selectedValue={eyeColor}
          onValueChange={(item) => {
            setEyeColor(item);
            cat.eyeColor = eyeColors[item];
          }}
        >
          {eyeColors.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
        <Button
          title="print objects"
          onPress={() => {
            console.log(cat);
            console.log(pin);
          }}
        />
        <CatImagePicker />

        {/* <Button title="Open Camera" onPress={() => setCamModalVisible(true)} />

        <Modal
          animationType="slide"
          onRequestClose={() => setCamModalVisible(!camModalVisible)}
          transparent={true}
          visible={camModalVisible}
        >
          <Camera />
        </Modal> */}
        <Button
          title="add location"
          color="#2126F3"
          onPress={() => setLocationModalVisible(true)}
        />

        <Button
          title="submit cat"
          onPress={() => {
            addCat(cat);
            addPin(pin);
            alert("Cat submitted reload app");
            return;
          }}
        />

        <Modal animationType="slide" visible={locationModalVisible}>
          <LocationPicker
            onCancel={() => {
              setLocationModalVisible(false);
            }}
            onConfirm={onLocationPick}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  lightInput: {
    color: "black",
  },
  darkInput: {
    color: "white",
  },
  multiLine: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#8b0000",
    marginBottom: 30,
  },

  text2: {
    fontSize: 20,
    color: "red",
    fontWeight: "normal",
  },

  text3: {
    fontSize: 15,
    fontStyle: "italic",
  },
  text4: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
