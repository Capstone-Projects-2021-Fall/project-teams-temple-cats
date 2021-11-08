import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
//import * as React from "react";
import React, {useEffect, useState} from "react";
import { StyleSheet,Image, View, TextInput, Text, Button, TouchableOpacity, StatusBar, FlatList, SafeAreaView, Pressable } from "react-native";
import { ListItem, SearchBar} from "react-native-elements";
import MapView from "react-native-maps";
import { Cat } from "../types";
import { Searchbar } from "react-native-paper";
import { Avatar} from "react-native-ui-kitten";

export default function Search () {
  const currentData: Cat[] = [];
  const state = {
    loading: false,      
    data: currentData,      
    error: null,    
  };

  const [search, setSearch] = useState("");
  //const [data, setData] = useState("");
  const [stateVal, setState] = useState(state);
 
  const [catData, setCatData] = useState<Cat[]>([]);
  const [results, setResults] = useState<Cat[]>([]);

  

useEffect(() => {
  setState({ loading: true, data: [], error: null } );
  fetch(
    `https://temple-cats-default-rtdb.firebaseio.com/Cats.json`
    ).then(res => res.json())
    .then(res => {
      setState({
        data: res.results,          
        error: res.error || null,          
        loading: false,
      });        
        currentData.push(res)
        setResults([...currentData]);
       // setFilteredDataSource([...currentData]);
      //  setMasterDataSource([...currentData]);
        console.log(typeof(results));
    })
    .catch((err) => { console.log(err)
      //setState({ ... error: err  });  
    });
  
});

  const searchFilterFunction = text => {    
  const newData = results.filter(item => {      
    const itemData = `${item.name.toUpperCase()}   
    ${item.name.toUpperCase()} ${item.color.toUpperCase()}`;
    
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });
  
    setState({ loading: false, error: null, data: newData });  
};

  return ( 
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{left: -190, position: 'absolute', top: -5, width: "90%", borderColor: "black",flexDirection: 'row', alignItems: "center"}}>
      <Searchbar
          placeholder="Search for cats here"
          onChangeText={(text) => searchFilterFunction(text)}
            
          value={search} onPressIn={undefined} onPressOut={undefined}               
      />     
      <View style={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList          
          data={stateVal.data}          
          renderItem={({ item }) => ( 
            <ListItem              
              leftAvatar={{ source: { uri: item.media } }}         
              title={`${item.name} ${item.color}`}  
              subtitle={item.name}                           
              avatar={{ uri: item.media }}   
              containerStyle={{ borderBottomWidth: 0 }} 
            />          
          )}          
        keyExtractor={item => item.catID}  
        ItemSeparatorComponent={this.renderSeparator} 
        ListHeaderComponent={this.renderHeader}                             
        />            
    </View>
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