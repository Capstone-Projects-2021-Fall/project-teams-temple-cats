import React, { useEffect, useState } from "react";
import { Button, CheckBox, Header, Divider, Text, Icon} from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Cat } from "../types";
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
  View
} from "react-native";
import CatImagePicker from "../components/ImagePicker";

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
  const [image, setImage] = useState<string>("./assets/images/cat-placeholder-tall.svg");
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
        <Modal animationType="slide" visible={locationModalVisible}>
          <LocationPicker
            onCancel={() => {
              setLocationModalVisible(false);
            }}
            onConfirm={onLocationPick}
          />
        </Modal> 
        <Text h3 h3Style={{textAlign: "center"}}> Required Fields </Text>
        <Divider style={{marginBottom: 12}} color="#9D2235" />
        {image && (<Image source={{ uri: image }} style={{ width: 250, height: 250, alignSelf: "center", borderColor: "#9D2235", borderWidth: 5 }} />)}
        <CatImagePicker onSetImage={handleSetImage} onCloseModal={() => setModalVisible(false)} modalVisible={modalVisible}/>
        <Button
          title="Upload Image"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => setModalVisible(true)} />
        <Text h3 h3Style={{ borderColor: "white", borderWidth: 1, fontSize: 18 }}> {cat.location ? cat.location.latitude + "," + cat.location.longitude : "Location"}
          <Icon /> </Text>
        <Button
          title="Add Location"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => setLocationModalVisible(true)}
        />
        


        <Text h3 h3Style={{textAlign: "center"}}> Additional Fields </Text>
        <Divider style={{ marginBottom: 8 }} color="#9D2235" />
        <View
        style= {styles.checkboxes}> 
        <CheckBox
          containerStyle={{
            padding: 0,
            backgroundColor: "transparent",
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
            checkedColor="#9D2235"
        />
        <CheckBox
          containerStyle={{
            padding: 0,
            backgroundColor: "transparent",
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
            checkedColor="#9D2235"
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
            checkedColor="#9D2235"
        />
        </View>


        {/* <View style={styles.image}>
        
        </View>
       
        <View style={styles.image}>
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
        */}
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
    padding: 0,

  },
  buttonStyle: {
    width: 150,
    backgroundColor: "#9D2235",
    borderRadius: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  }
});

{/* <TextInput
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
        /> */}
