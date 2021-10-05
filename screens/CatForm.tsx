import React from "react";
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, View, Button, Alert} from "react-native";


const Information = () => {
  const [text1, media] = React.useState("");
  const [text2, uniqueFeatures] = React.useState("");
  const [text3, possibleName] = React.useState("");
  const [text4, behavior] = React.useState("");
  const [text5, color] = React.useState("");
  const [text6, ageEstimate] = React.useState("");
  const [text7, condition] = React.useState("");
  const [text8, friendliness] = React.useState("");
  const [text9, additionalComments] = React.useState("");
  const [text10, pinID] = React.useState("");
  //const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <ScrollView>
     
      <Text style={styles.text}>Cat Form</Text>
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Media</Text>
      <TextInput
        style={styles.input}
        onChangeText={media}
        value={text1}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Unique Features</Text>
      <TextInput
        style={styles.input}
        onChangeText={uniqueFeatures}
        value={text2}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Possible Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={possibleName}
        value={text3}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Behavior</Text>
      <TextInput
        style={styles.input}
        onChangeText={behavior}
        value={text4}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Color</Text>
      <TextInput
        style={styles.input}
        onChangeText={color}
        value={text5}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Age Estimate</Text>
      <TextInput
        style={styles.input}
        onChangeText={ageEstimate}
        value={text6}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Condition</Text>
      <TextInput
        style={styles.input}
        onChangeText={condition}
        value={text7}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Friendliness</Text>
      <TextInput
        style={styles.input}
        onChangeText={friendliness}
        value={text8}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Additional Comments</Text>
      <TextInput
        style={styles.input}
        onChangeText={additionalComments}
        value={text9}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Pin ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={pinID}
        value={text10}
      />

       <Button
        title="Submit"
        color="#8b0000"
        onPress={() => 
          {
            if (!text1.trim() ||  !text2.trim() || !text3.trim() || !text4.trim() || !text5.trim() || !text6.trim()
            || !text7.trim() || !text8.trim() || !text9.trim() || !text10.trim()) {
            alert('Please fill out all fields');
            return;
          }
          Alert.alert('Submitted Successfully')}}
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

export default Information;