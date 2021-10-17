import React, { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { View } from "./components/Themed";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "./hooks/useForm";
import { v4 as uuidv4 } from "uuid";
import { Cat, Pin } from "./types";
import { addCat, addPin } from "./utils/dbInterface";
import { LatLng } from "react-native-maps";

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

  function onLocationPick(coordinate: LatLng) {
    setPin((pin.location = coordinate));
    setLocationModalVisible(false);
  }

  const [values, handleChange]: Cat = useForm({
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
    pinID: values.pinID,
    location: null,
    time: null,
    votes: 0,
    accountID: "",
    type: values.catID,
  });

  console.log(values);

  return (
    <View>
      <input
        name="name"
        value={values.name}
        placeholder={"enter possible name here"}
        onChange={handleChange}
      />
      <input
        name="comments"
        value={values.features}
        placeholder={"enter additional information"}
        onChange={handleChange}
      />
      <div>
        <CheckBox
          title="Friendly?"
          checked={friendly}
          onPress={() => {
            setFriendly(!friendly);
            values.friendly = !values.friendly;
          }}
        />
        <CheckBox
          title="Healthy?"
          checked={healthy}
          onPress={() => {
            setHealthy(!healthy);
            values.healthy = !values.healthy;
          }}
        />
        <CheckBox
          title="Kitten?"
          checked={kitten}
          onPress={() => {
            setKitten(!kitten);
            values.kitten = !values.kitten;
          }}
        />
      </div>
      <div>
        <Picker
          selectedValue={color}
          onValueChange={(item) => {
            setColor(item);
            values.color = colors[item];
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
            values.eyeColor = eyeColors[item];
          }}
        >
          {eyeColors.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
      </div>
      <Button
        title="submit cat"
        onPress={() => {
          addCat(values);
          addPin(pin);
        }}
      />
      <Button
        title="print objects"
        onPress={() => {
          console.log(values);
          console.log(pin);
        }}
      />
    </View>
  );
};
