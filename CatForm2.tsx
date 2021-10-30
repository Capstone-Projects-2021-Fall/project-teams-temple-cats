import React, { useEffect, useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Cat, Pin } from "./types";
import { addCat, addPicture } from "./utils/dbInterface";
import { LatLng } from "react-native-maps";
import LocationPicker from "./screens/LocationPicker";
import {
  Image,
  Modal,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import CatImagePicker from "./components/ImagePicker";
import firebase from "./utils/firebase";

export const CatForm2 = () => {
  const colors = ["Set Cat Color", "Orange", "Brown", "Black", "White"];
  const eyeColors = [
    "Set Cat Eye Color",
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
  const [image, setImage] = useState<string>();
  const [friendly, setFriendly] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const [kitten, setKitten] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    location: "",
    time: new Date().toDateString(),
    votes: 0,
    accountID: firebase.auth().currentUser?.uid
  });

  

  function onLocationPick(coordinate: LatLng) {
    setCat((currentState) => ({
      ...currentState,
      location: coordinate,
    }));
    setLocationModalVisible(false);
  }
  
    
  const handleSetImage = (data: string) => {
    cat.media = data;
    setImage(data)
  };
 
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
        {image && (<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />)}
        <CatImagePicker onSetImage={handleSetImage} onCloseModal={() => setModalVisible(false)} modalVisible={modalVisible}/>
        <Button title="Upload Image" color="#2126F3" onPress={() => setModalVisible(true)} />
        <Button
          title="add location"
          color="#2126F3"
          onPress={() => setLocationModalVisible(true)}
        />
        <Button
          title="submit cat"
          onPress={() => {
            addCat(cat);
            addPicture(cat);
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
});
