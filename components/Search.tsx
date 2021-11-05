import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
//import * as React from "react";
import React, {useEffect, useState} from "react";
import {StyleSheet,Image, View, TextInput, Text, Button, TouchableOpacity, StatusBar, FlatList, SafeAreaView, Pressable } from "react-native";
import { SearchBar} from "react-native-elements";
import MapView from "react-native-maps";
import { Cat } from "../types";
import { Searchbar } from "react-native-paper";
import { Avatar} from "react-native-ui-kitten";

export default function Search () {
  const [filteredDataSource, setFilteredDataSource] = useState<Cat[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<Cat[]>([]);
  const catsRef = firebase.database().ref().child("Cats/");
  const [search, setSearch] = useState("");
  //const [data, setData] = useState("");

  const currentData: Cat[] = [];
  const [catData, setCatData] = useState<Cat[]>([]);
  //const [searchTimer, setSearchTimer] = useState(null);
///
//const [input, setInput] = useState("");
const [results, setResults] = useState<Cat[]>([]);//supposed to use this


useEffect(() => {
  fetchData()
  //searchData()
}, []);

async function fetchData() {
  const res = await fetch(
    `https://temple-cats-default-rtdb.firebaseio.com/Cats.json`
);
res
    .json()
    .then((res) => {
        currentData.push(res)
        setResults([...currentData]);
        setFilteredDataSource([...currentData]);
        setMasterDataSource([...currentData]);
        //console.log(typeof(masterDataSource));
    })
    .catch((err) => console.log(err));
}


  function searchData() {

    catsRef.on("child_added", async (snapshot) => {
      snapshot.forEach(function(data) {
       
        currentData.push(data.val());
        setCatData([...currentData])
        setResults([...currentData]);
        setFilteredDataSource([...currentData]);
        setMasterDataSource([...currentData]);
       // console.log(typeof(masterDataSource));
       // console.log(data.val())
     });
     });
     //for(let i = 0; i < catData.length; i++){
     //  if(catData.includes(text))
    // }
   //  if(catData.includes(text)){
   //   alert("Cat found!")
  //  }
   // else{
   //   alert("Cat not found.")
     // console.log(catData)
  //  }
   };

   const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      //console.log(masterDataSource)
      const newData = masterDataSource.filter(
        function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.name}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item: { id: string; title: string; }) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return ( 
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{left: -190, position: 'absolute', top: -5, width: "90%", borderColor: "black",flexDirection: 'row', alignItems: "center"}}>
      <Searchbar
          placeholder="Search for cats here"
          onChangeText={(text) => {
            searchFilterFunction(text)
           // setInput(text);
           // searchData(text);
            
          } } value={search} onPressIn={undefined} onPressOut={undefined}               
      />     
      
      <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
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
    width: 280,
    paddingTop: 8,
    paddingBottom: 20,
    marginLeft: 275,
    top: 29,
    flexDirection: "row",
    left: -135,
    backgroundColor: "white",
    borderColor: "black",
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
    marginBottom: 10,
  },
});
/* 
<View style={{backgroundColor: "red", height: 10, width: 0, right: 460, borderColor: "black"}}>


//{catData.map(item => <Text style={styles.listItem}>{catData[1]}</Text>)}

*/