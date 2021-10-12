import firebase from "firebase";
import React from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, Button, View} from "react-native";

const CatForm = () => {

  const [content, media] = React.useState("");
  const [catLocation, location] = React.useState("");
  const [features, uniqueFeatures] = React.useState("");
  const [name, possibleName] = React.useState("");
  const [catBehavior, behavior] = React.useState("");
  const [age, ageEstimate] = React.useState("");
  const [comments, additionalComments] = React.useState("");
  const [id, catID] = React.useState("");
  const colors = ["Orange", "Brown", "Black", "White"];
  const scale = ["1", "2", "3", "4", "5"];
  const types = ["Stray", "Feral"];
  const conditions = ["Healthy", "Needs medical attention"];
  const eyeColors = ["Brown","Green","Blue","Black","Yellow","Orange","Hazel","Mixed"];
  
  let colorSelection= 0;
  let eyeColorSelection = 0;
  let conditionSelected = 0;
  let friendlinessSelected = 0;
  let typeSelected = 0;
  
  
  return (
    
    <SafeAreaView>
        <ScrollView>
        <Text style={styles.text}>Cat Form</Text>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
        <Text style={{ fontSize: 15, fontStyle: "italic"}}> fields are required</Text>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Media</Text>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
        </View>
          <TextInput
            style={styles.input}
            onChangeText={media}
            value={content} />
          
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Location</Text>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
        </View>
          <TextInput
            style={styles.input}
            onChangeText={location}
            value={catLocation} />

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Unique Features</Text>
          <TextInput
            style={styles.input}
            onChangeText={uniqueFeatures}
            value={features} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Possible Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={possibleName}
            value={name} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Behavior</Text>
          <TextInput
            style={styles.input}
            onChangeText={behavior}
            value={catBehavior} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Color</Text>
            <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
          </View>
            <SelectDropdown
              data={colors}
              onSelect={(selectedItem: any, index: any) =>{
               colorSelection = index;
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
            value={age} />

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Type</Text>
          <SelectDropdown
              data={types}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                typeSelected = index;
                console.log(typeSelected)
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />        
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Condition</Text>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
          </View>
          <SelectDropdown
              data={conditions}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                conditionSelected = index;
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
                eyeColorSelection = index;
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
                friendlinessSelected = index;
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
            value={comments} />
          <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Cat ID</Text>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={catID}
            value={id} />

          <Button
            title="Submit"
            color="#8b0000"
            onPress={() => {
             /* if (!text1.trim() || !text2.trim() || !text3.trim() || !text4.trim()  || !text6.trim()
                || !text10.trim() || !text11.trim()) {
                alert('Please fill out all required fields');
                return;
              }*/
              //colorSelected = colorSelection;
              firebase.database().ref('Cats/' + "110192021-333").set({
                
               
                media: content,
                location: catLocation,
                uniqueFeatures: features,
            
                possibleName: name,
                behavior: catBehavior,
               
                ageEstimate: age,
                strayOrFeral: types[typeSelected],
                color: colors[colorSelection],
                condition: conditions[conditionSelected],
                eyeColor: eyeColors[eyeColorSelection],
                friendliness: scale[friendlinessSelected],
                additionalComments: comments,
                catID: id
              
              });
              console.log(
                SelectDropdown
              );
              
             
              alert('Submitted Successfully');
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
  }
});

export default CatForm;

