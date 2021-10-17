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
import { Modal, TextInput, SafeAreaView } from "react-native";

export const CatForm2 = () => {
  const colors = ["Cat Color", "Orange", "Brown", "Black", "White"];
  const eyeColors = [
    "Eye Color",
    "Brown",
    "Green",
    "Blue",
    "Black",
    "Yellow",
    "Orange",
    "Hazel",
    "Mixed",
  ];

  const [color, setColor] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [friendly, setFriendly] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const [kitten, setKitten] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

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
    time: null,
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
      <View>
        <TextInput
          value={cat.name}
          placeholder={"enter possible name here"}
          onChangeText={(text) =>
            setCat((currentState) => ({
              ...currentState,
              name: text,
            }))
          }
        />
        <TextInput
          value={cat.comments}
          placeholder={"enter additional information"}
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
          title="submit cat"
          onPress={() => {
            addCat(cat);
            addPin(pin);
          }}
        />
        <Button
          title="add location"
          color="#2126F3"
          onPress={() => setLocationModalVisible(true)}
        />
        <Button
          title="print objects"
          onPress={() => {
            console.log(cat);
            console.log(pin);
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
      </View>
    </SafeAreaView>
  );
};
