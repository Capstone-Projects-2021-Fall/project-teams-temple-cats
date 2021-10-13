import firebase from "firebase";
import React, { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, Button, View, TextInputProps} from "react-native";
import { color } from "react-native-reanimated";

const CatForm = () => {

  const [content, media] = React.useState("");
  const [catLocation, location] = React.useState("");
  const [features, uniqueFeatures] = React.useState("");
  const [name, possibleName] = React.useState("");
  const [catBehavior, behavior] = React.useState("");
  const [age, ageEstimate] = React.useState("");
  const [comments, additionalComments] = React.useState("");
  const [id, catID] = React.useState("");
  const colors = ["", "Orange", "Brown", "Black", "White"];
  const scale = ["", "1", "2", "3", "4", "5"];
  const types = ["", "Stray", "Feral"];
  const conditions = ["", "Healthy", "Needs medical attention"];
  const eyeColors = ["", "Brown","Green","Blue","Black","Yellow","Orange","Hazel","Mixed"];
  const times = ["", " months", " years"];

  const [colorSelected, colorSelection] = useState("");
  const [eyeColorSelected, eyeColorSelection] = useState("");
  const [conditionSelected, conditionSelection] = useState("");
  const [typeSelected, typeSelection] = useState("");
  const [friendlinessSelected, friendlinessSelection] = useState("");
  const [timeSelected, timeSelection] = useState("");

  
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      year + '/' + month + '/' + date + '/' + hours + ':' + min + ':' + sec
    );
  }, []);
  
  return (
    
    <SafeAreaView>
        <ScrollView>
        <Text style={styles.text}>Cat Form</Text>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
        <Text style={{ fontSize: 15, fontStyle: "italic"}}> fields are required</Text>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Cat ID</Text>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={catID}
            value={id} />

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

        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Color</Text>
            <Text style={{ fontSize: 20, color: "red", fontWeight: "normal"}}> *</Text>
          </View>
            <SelectDropdown
              data={colors}
              onSelect={(selectedItem: any, index: any) =>{
               colorSelection(selectedItem);
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
                conditionSelection(selectedItem);
                console.log(conditionSelected)
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />



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
          

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Age Estimate</Text>
          <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={ageEstimate}
            value={age} 
            
            />
          <SelectDropdown
              data={times}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                timeSelection(selectedItem)
              
              } }
              buttonTextAfterSelection={(selectedItem: any, index: any) => {
                return selectedItem;
              } }
              rowTextForSelection={(item: any, index: any) => {
        
                return item;
              } } 
            />  
            </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>    Type</Text>
          <SelectDropdown
              data={types}
              onSelect={(selectedItem: string, index: any) => {
                console.log(selectedItem, index);
                typeSelection(selectedItem);
                console.log(typeSelected)
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
                eyeColorSelection(selectedItem);
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
                friendlinessSelection(selectedItem);
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
            style={styles.multiLine}
            onChangeText={additionalComments}
            value={comments} 
            
            />
          
        
          <Button
            title="Submit"
            color="#8b0000"
            onPress={() => {
              if (!id.trim() || !content.trim() || !catLocation.trim() || !colorSelected.trim()  || !conditionSelected.trim()) {
                alert('Please fill out all required fields');
                return;
              }
              
              firebase.database().ref('Cats/' + currentDate).set({
                
               
                media: content,
                location: catLocation,
                uniqueFeatures: features,
            
                possibleName: name,
                behavior: catBehavior,
               
                ageEstimate: age + timeSelected,
                strayOrFeral: typeSelected,
                color: colorSelected,
                condition: conditionSelected,
                eyeColor: eyeColorSelected,
                friendliness: friendlinessSelected,
                additionalComments: comments,
                catID: id
              
              });
             
              
             
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
  multiLine:
  {
    height: 60,
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
    marginBottom: 30,
  }
});

export default CatForm;

