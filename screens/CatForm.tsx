import firebase from "firebase";
import React, { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView, StyleSheet, TextInput ,Text, ScrollView, StatusBar, Button, View, useColorScheme } from "react-native";
import CatImagePicker from "../components/ImagePicker"
import Camera from "../components/Camera"

const CatForm = () => {

  const [content, media] = React.useState("");
  const [catLocation, location] = React.useState("");
  const [features, uniqueFeatures] = React.useState("");
  const [name, possibleName] = React.useState("");
  const [catBehavior, behavior] = React.useState("");
  const [age, ageEstimate] = React.useState("");
  const [comments, additionalComments] = React.useState("");
  const [id, catID] = React.useState("");
  const colors = ["Orange", "Brown", "Black", "White", "Gray", "Tri-Colored"];
  const scale = ["1", "2", "3", "4", "5"];
  const types = ["Stray", "Feral"];
  const conditions = ["Healthy", "Needs medical attention"];
  const eyeColors = ["Brown","Green","Blue","Black","Yellow","Orange","Hazel","Mixed"];
  const times = [" months", " years"];

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
  
  const colorScheme = useColorScheme();

 // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeTextStyle =
    colorScheme === 'light' ? styles.lightInput : styles.darkInput;


  return (
    
    <SafeAreaView>
        <ScrollView>
        <Text style={styles.text}>Cat Form</Text>
        
        <Text style={styles.text2}> *
          <Text style={[styles.text3, themeTextStyle]}> fields are required</Text>
        </Text>
        
        <Text style={[styles.text4, themeTextStyle]}>    Cat ID
          <Text style={styles.text2}> *</Text>
        </Text>
         
        <TextInput
          style={styles.input}
          onChangeText={catID}
          value={id} 
          />

        <Text style={[styles.text4, themeTextStyle]}>    Media
          <Text style={styles.text2}> *</Text>
        </Text>
        <CatImagePicker/>
          <Camera/>
        
          
        <Text style={[styles.text4, themeTextStyle]}>    Location
          <Text style={styles.text2}> *</Text>
        </Text>
          
      <TextInput
          style={styles.input}
          onChangeText={location}
          value={catLocation} 
      />

        <Text style={[styles.text4, themeTextStyle]}>    Color
          <Text style={styles.text2}> *</Text>
        </Text>
            
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

          <Text style={[styles.text4, themeTextStyle]}>    Condition
            <Text style={styles.text2}> *</Text>
          </Text>
          
          
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



          <Text style={[styles.text4, themeTextStyle]}>    Unique Features</Text>
          <TextInput
            style={styles.input}
            onChangeText={uniqueFeatures}
            value={features} />
          <Text style={[styles.text4, themeTextStyle]}>    Possible Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={possibleName}
            value={name} />
          <Text style={[styles.text4, themeTextStyle]}>    Behavior</Text>
          <TextInput
            style={styles.input}
            onChangeText={behavior}
            value={catBehavior} />
          

          <Text style={[styles.text4, themeTextStyle]}>    Age Estimate</Text>
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
          <Text style={[styles.text4, themeTextStyle]}>    Type</Text>
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
         
          <Text style={[styles.text4, themeTextStyle]}>    Eye Color</Text>
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
         
          <Text style={[styles.text4, themeTextStyle]}>    Friendliness</Text>
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
         
          <Text style={[styles.text4, themeTextStyle]}>    Additional Comments</Text>
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
    color: "black",
    backgroundColor: "white"
  },
  lightInput:{
    color: "black"
  },
  darkInput:{
    color: "white"
  },
  multiLine:
  {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
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
  },

  text2:{
    fontSize: 20,
    color: "red",
    fontWeight: "normal",
  },

  text3:{
    fontSize: 15,
    fontStyle: "italic" 
 },
  text4:{
    fontSize: 20, 
    fontWeight: "bold"
  }
});

export default CatForm;

