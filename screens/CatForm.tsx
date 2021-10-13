import firebase from "firebase";
import React from "react";
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, View, Button, Alert} from "react-native";
import ImagePickerExample from "../components/ImagePicker"

const CatForm = () => {
  // const [text1, media] = React.useState("");
  const [uniqueFeatures, setUniqueFeatures] = React.useState("");
  const [possibleName, setPossibleName] = React.useState("");
  const [behavior, setBehavior] = React.useState("");
  const [color, setColor] = React.useState("");
  const [ageEstimate, setAgeEstimate] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [eyeColor, setEyeColor] = React.useState("");
  const [friendliness, setFriendliness] = React.useState("");
  const [additionalComments, setAdditionalComments] = React.useState("");
  const [pinID, setPinID] = React.useState("");

  return (
    <SafeAreaView>
      <ScrollView>
     
      <Text style={styles.text}>Cat Form</Text>
      {/* <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Media</Text>
      <TextInput
        style={styles.input}
        onChangeText={media}
        value={text1}
      /> */}
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Media</Text>
      <ImagePickerExample />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Unique Features</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUniqueFeatures}
        value={uniqueFeatures}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Possible Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPossibleName}
        value={possibleName}
     />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Behavior</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBehavior}
        value={behavior}
       />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Color</Text>
      <TextInput
        style={styles.input}
        onChangeText={setColor}
        value={color}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Age Estimate</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAgeEstimate}
        value={ageEstimate}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Condition</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCondition}
        value={condition}
         />
       <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Eye Color</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEyeColor}
        value={eyeColor}
        />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Friendliness</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFriendliness}
        value={friendliness}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Additional Comments</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAdditionalComments}
        value={additionalComments}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Pin ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPinID}
        value={pinID}
      />

       <Button
        title="Submit"
        color="#8b0000"
        onPress={() => 
        {
            if ( !uniqueFeatures.trim() || !possibleName.trim() || !behavior.trim() || !color.trim() || !ageEstimate.trim()
            || !condition.trim() || !eyeColor.trim() || !friendliness.trim() || !additionalComments.trim() || !pinID.trim()) {
            alert('Please fill out all fields');
            return;
            }
            firebase.database().ref('Cats/'+ "110192021-2").set({
              // media: text1,
              uniqueFeatures: uniqueFeatures,
              possibleName: possibleName,
              behavior: behavior,
              color: color,
              ageEstimate: ageEstimate,
              condition: condition,
              eyeColor: eyeColor,
              friendliness: friendliness,
              additionalComments: additionalComments,
              pinID: pinID
            });
            console.log(
              uniqueFeatures,
              possibleName,
              behavior,
              color,
              ageEstimate,
              condition,
              eyeColor,
              friendliness,
              additionalComments,
              pinID)
            alert('Submitted Successfully')
            return;
          }
        }
        />

      
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
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
    marginBottom: 50,
  },
});

export default CatForm;

