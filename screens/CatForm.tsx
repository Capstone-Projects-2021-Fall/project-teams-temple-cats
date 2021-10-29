import React, { useEffect, useState } from "react";
import { Button, CheckBox} from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Cat, Pin } from "../types";
import { addCat, addPicture } from "../utils/dbInterface";
import { LatLng } from "react-native-maps";
import LocationPicker from "./LocationPicker";
import {
  Image,
  Modal,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import CatImagePicker from "../components/ImagePicker";
import { View } from "../components/Themed";

export const CatForm = () => {
  const colors = ["Cat Fur Color", "Orange", "Brown", "Black", "White"];
  const eyeColors = [
    "Cat Eye Color",
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
    accountID: ""
  });



  function onLocationPick(coordinate: LatLng) {
    setCat((currentState: Cat) => ({
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.nameInput}
          value={cat.name}
          selectionColor="white"
          placeholder="Enter possible name here"
          placeholderTextColor="black"
          onChangeText={(text) =>
            setCat((currentState: Cat) => ({
              ...currentState,
              name: text,
            }))
          }
        />
        <TextInput
          style={styles.additionalInput}
          selectionColor="white"
          placeholder="Enter additional information here"
          placeholderTextColor="black"
          value={cat.comments}
          onChangeText={(text) =>
            setCat((currentState: Cat) => ({
              ...currentState,
              comments: text,
            }))
          }
        />
        <View
        style= {styles.checkboxes}> 
        <CheckBox
          containerStyle={{
            padding: 0,
            backgroundColor: "white",
            borderWidth: 0,
          }}
          title="Friendly"
          checked={friendly}
          onPress={() => {
            setFriendly(!friendly);
            cat.friendly = !cat.friendly;
          }}
          checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#8b0000"
        />
        <CheckBox
          containerStyle={{
            padding: 0,
            backgroundColor: "white",
            borderWidth: 0
            }}
          title="Healthy"
          checked={healthy}
          onPress={() => {
            setHealthy(!healthy);
            cat.healthy = !cat.healthy;
          }}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0
          }}
          title="Kitten"
          checked={kitten}
          onPress={() => {
            setKitten(!kitten);
            cat.kitten = !cat.kitten;
          }}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        </View>
        <View style={styles.pickers}>
        <Picker
            style={{
              backgroundColor: "white",
              width: 175,
              height: 200,
            }}
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
          style={{ 
              backgroundColor: "white",
              width: 175,
              height: 200,
            }}
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
        </View>
        <View style={styles.buttons}>
        {image && (<Image source={{ uri: image }} style={{ width: 100, height: 100 }} />)}
        <CatImagePicker onSetImage={handleSetImage} onCloseModal={() => setModalVisible(false)} modalVisible={modalVisible}/>
        <Button
        title="Upload Image"
        buttonStyle={{
            width: 150,
            backgroundColor: "#8b0000"
          }}
          containerStyle={{
            alignItems: "center",
            marginBottom: 10,
          }}  color="#8b0000" onPress={() => setModalVisible(true)} />
        <Button
          title="Add Location"
          buttonStyle={{
            width: 150,
            backgroundColor: "#8b0000"
          }}
          containerStyle={{
            alignItems: "center",
            marginBottom: 10,
          }}
          backgroundColor="#8b0000"
          onPress={() => setLocationModalVisible(true)}
        />
        <Button
          title="Submit Cat"
          buttonStyle={{
            width: 150,
            backgroundColor: "#8b0000"
          }}
          containerStyle={{
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => {
            addCat(cat);
            addPicture(cat);
            alert("Cat submitted reload app");
            return; 
          }}
        />
        </View>
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
  nameInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  additionalInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  checkboxes: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 0,

  },
  pickers: {
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "white",
    height: 100,
    marginBottom: 20,

  },
  buttons: {
    padding: 0,
    backgroundColor: "white"

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  }
});
