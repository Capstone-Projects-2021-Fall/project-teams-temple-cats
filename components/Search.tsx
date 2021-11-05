import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, TextInput, Button, TouchableOpacity, StatusBar, FlatList, SafeAreaView } from "react-native";
import { SearchBar} from "react-native-elements";
import MapView from "react-native-maps";
import { Cat } from "../types";
import { Searchbar } from "react-native-paper";
import { Avatar} from "react-native-ui-kitten";

export default function Search () {
  
  const catsRef = firebase.database().ref().child("Cats/");
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const newState: Cat[] = [];
 // const cats: any[] = [];
  const [cats, setCats] = useState<Cat[]>([]);
  const currentData: Cat[] = [];
  const [catData, setCatData] = useState<Cat[]>([]);
  const [searchTimer, setSearchTimer] = useState(null);
///
const [input, setInput] = useState("");
const [results, setResults] = useState<Cat[]>([]);
//const [searchTimer, setSearchTimer] = useState(null);
  const state = {
  loading: false,
  data: [],
  page: 1,
  seed: 1,
  error: null
}
///
  
async function fetchData() {
  const res = await fetch(
      `https://temple-cats-default-rtdb.firebaseio.com/Cats.json`
  );
  res
      .json()
      .then((res) => {
          setResults(res);
          console.log(res);
      })
      .catch((err) => console.log(err));
}


  function searchData(text) {
    catsRef.on("child_added", async (snapshot) => {
      snapshot.forEach(function(data) {
       
        currentData.push(data.val());
        setCatData([...currentData])
        //console.log(catData)
     });
     });
     if(catData.includes(text)){
      alert("Cat found!")
    }
    else{
      alert("Cat not found.")
    }
   };


  return ( 
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{left: -185, position: 'absolute', top: -5, width: "90%", flexDirection: 'row', alignItems: "center"}}>
    <Searchbar
          placeholder="Search"
          onChangeText={(text) => {
            if (searchTimer) {
              clearTimeout(searchTimer);
            }
            setInput(text);
            setSearchTimer(
              setTimeout(() => {
                fetchData();
                searchData(text);
              }, 2000)
            );
          } }
          value={input} onPressIn={undefined} onPressOut={undefined}            
          />          
      

    <FlatList
		  data={results}
		  renderItem={({item}) => (
		  <View style={styles.container}>
       <Text>{item.color}</Text>
			 <Text>{item.name}</Text>
		  </View>
		)}
		keyExtractor={(item) => "" + item.catID}
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
      justifyContent: "center",
  },
  
  itemStyle: {
    padding: 10,
  }
});
/* 
//up to date flatlist
<FlatList
  data={state.data}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => alert('Item pressed!')}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center'
        }}>
        <Avatar
          source={{ uri: item.picture.thumbnail }}
          size='giant'
          style={{ marginRight: 16 }}
        />
        <Text
          category='s1'
          style={{
            color: '#000'
          }}>{`${item.name.first} ${item.name.last}`}</Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.email}
  ItemSeparatorComponent={this.renderSeparator}
  ListFooterComponent={this.renderFooter}
/>





<FlatList
        data={results}
        renderItem={({ item }) => (
            <View>
                <Text>{item.title.rendered}</Text>
                      <Text>{item.excerpt.rendered}</Text>
                </View>
        )}
        keyExtractor={(item) => "" + item.id}
      /> */