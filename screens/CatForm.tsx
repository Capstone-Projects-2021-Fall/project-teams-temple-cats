import firebase from "firebase";
import React from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, Button} from "react-native";


const CatForm = () => {

  const [text1, media] = React.useState("");
  const [text2, uniqueFeatures] = React.useState("");
  const [text3, possibleName] = React.useState("");
  const [text4, behavior] = React.useState("");
  const [text6, ageEstimate] = React.useState("");
  const [text10, additionalComments] = React.useState("");
  const [text11, pinID] = React.useState("");
  const colors = ["Orange", "Brown", "Black", "White"];
  const scale = ["1", "2", "3", "4", "5"];
  const types = ["Stray", "Feral"];
  const conditions = ["Healthy", "Needs medical attention"];
  const eyeColors = ["Brown","Green","Blue","Black","Yellow","Orange","Hazel","Mixed"];
  let colorSelection = "";
  let eyeColorSelection = "";
  let conditionSelected = "";
  let friendlinessSelected = "";
  let typeSelected = "";
  
  
  return (
    <SafeAreaView>
        <ScrollView>

          <Text style={styles.text}>Cat Form</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Media</Text>

          <TextInput
            style={styles.input}
            onChangeText={media}
            value={text1} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Unique Features</Text>
          <TextInput
            style={styles.input}
            onChangeText={uniqueFeatures}
            value={text2} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Possible Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={possibleName}
            value={text3} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Behavior</Text>
          <TextInput
            style={styles.input}
            onChangeText={behavior}
            value={text4} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Color</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Color</Text>
            <SelectDropdown
              data={colors}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                colorSelection = selectedItem
                console.log(colorSelection)
               
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Age Estimate</Text>
          <TextInput
            style={styles.input}
            onChangeText={ageEstimate}
            value={text6} />

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Type</Text>
          <SelectDropdown
              data={types}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                typeSelected = selectedItem
                console.log(typeSelected)
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />        
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Condition</Text>

          <SelectDropdown
              data={conditions}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                conditionSelected = selectedItem
                console.log(conditionSelected)
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />
         
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Eye Color</Text>
            <SelectDropdown
              data={eyeColors}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                eyeColorSelection = selectedItem
                console.log(eyeColorSelection)
               
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />
         
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Friendliness</Text>
         
          <SelectDropdown
              data={scale}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                friendlinessSelected = selectedItem
                console.log(friendlinessSelected)
               
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
                return item;
              } } 
            />
         
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Additional Comments</Text>
          <TextInput
            style={styles.input}
            onChangeText={additionalComments}
            value={text10} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Pin ID</Text>
          <TextInput
            style={styles.input}
            onChangeText={pinID}
            value={text11} />

          <Button
            title="Submit"
            color="#8b0000"
            onPress={() => {
              if (!text1.trim() || !text2.trim() || !text3.trim() || !text4.trim()  || !text6.trim()
                || !text10.trim() || !text11.trim()) {
                alert('Please fill out all fields');
                return;
              }
              firebase.database().ref('Cats/' + "110192021-2").set({
                media: text1,
                uniqueFeatures: text2,
                strayOrFeral: typeSelected,
                possibleName: text3,
                behavior: text4,
                color: colorSelection,
                ageEstimate: text6,
                condition: conditionSelected,
                eyeColor: eyeColorSelection,
                friendliness: friendlinessSelected,
                additionalComments: text10,
                pinID: text11
              });
              console.log(text1,
                text2,
                typeSelected,
                text3,
                text4,
                colorSelection,
                text6,
                conditionSelected,
                eyeColorSelection,
                friendlinessSelected,
                text10,
                text11);
              alert('Submitted Successfully');
              return;
            } } 
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
  }
});

export default CatForm;

