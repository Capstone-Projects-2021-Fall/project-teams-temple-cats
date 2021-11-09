import firebase from "firebase";
import React, {useEffect, useState} from "react";
import { StyleSheet, Image, View, Text, FlatList, SafeAreaView, ScrollView } from "react-native";
import {SearchBar} from "react-native-elements";
import { Cat } from "../types";
import { Searchbar } from "react-native-paper";


export default function Search () {
  const currentData: Cat[] = []; //Used to initialize catData
  const catsRef = firebase.database().ref().child("Cats/");
  const [search, setSearch] = useState(""); //Stores the user's query
  const [catData, setCatData] = useState<Cat[]>([]); //Stores Cat data that is fetched from Firebase
  const [data, setData] = useState<Cat[]>([]); //Stores the new data array to be rendered once the user types something in the search bar
  
/*Fetches data asynchronously from firebase to store in catData(Cat[]) hook array after it was first pushed to currentData (Cat[]) so that it can be traversed within the search function by
filtering search bar text input to see if any of the input matches any element within the data array. */

  useEffect(() => {
    catsRef.on("child_added", async (snapshot) => {

      currentData.push({ ...snapshot.val() });
      setCatData([...currentData]);
    });
  }, []);

 
  /*This function will iterate through the entire catData hook array containing the Cat data from Firebase. While it traverses through 
  each element (Cat[]), itemData (String) will read through each element and check if it contains the user input. The setData() (Cat[]) hook
  will initialize newData (Cat[]) as the new data to be rendered by the flatlist when the user enters text within the search bar. */
  
  function searchFilterFunction(text){ 
  
    let newData = catData.filter(item => {
    const itemData = `${item.name}`;
    const textData = text;
    if(text.length > 0 ){
      return itemData.indexOf(textData) > -1;
    }
    });
  
    setSearch(text);
    setData(newData);
  }
   //Renders when the app renders so that the user can type something in
function renderHeader(){
  return (
     <Searchbar
          style={{borderColor: "black", borderWidth: 2}}
          placeholder="Search for cats here"
          onChangeText={(text) => {searchFilterFunction(text)}}
          autoCorrect={false}
          value={search} onPressIn={true} onPressOut={true}               
      />     
  );
};
//Used to separate Cat data elements that come up during the user's search
var renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: 20,
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};

  return ( 
  <SafeAreaView style={{ flex: 1 }}>
    
    <View style={{left: -190, position: 'absolute', top: -5, width: "90%", borderColor: "black",flexDirection: 'row', alignItems: "center"}}>
   
    
      
        <FlatList      
        //Flatlist renders when new data is pulled from the user's search query that comes from the renderHeader() function.    
          data={data}          
          renderItem={({ item }) => ( 
  
              <View style={{backgroundColor: "white"}}>
                <Image
                  style={{ left: 10, top: 6, width: 40, height: 40, borderWidth: 4, borderColor: 'rgba(160, 28, 52, 0.75)', borderRadius: 7 }}
                  source={{ uri: item.media }} /><Text style={styles.listItem}>{item.name ? item.name : 'Unknown' }</Text>
              </View>
           
          )}          
        keyExtractor={item => item.catID}  
        ItemSeparatorComponent={renderSeparator} 
        //renderHeader() is a function to allow the user to dynamically change text in search bar.
        ListHeaderComponent={renderHeader()}                             
        />            
   
   </View>
  
 </SafeAreaView>
);  
}

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
  },
  listItem: {
    alignItems: "center",
    width: 230,
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 275,
    top: -30,
    flexDirection: "row",
    left: -220,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1
  },
  itemStyle: {
    padding: 10,
  },
  listImageContainer: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: "row",
    backgroundColor: "white"
  },
  pawsServicesList: {
    marginBottom: 5
  },
});