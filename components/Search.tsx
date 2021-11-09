import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import React, {useEffect, useState} from "react";
import { StyleSheet, ActivityIndicator, Image, View, TextInput, Text, Button, TouchableOpacity, StatusBar, FlatList, SafeAreaView, Pressable } from "react-native";
import { ListItem, SearchBar, Avatar} from "react-native-elements";
import MapView from "react-native-maps";
import { Cat } from "../types";
import { Searchbar } from "react-native-paper";
//import { Avatar} from "react-native-ui-kitten";
import { placeholder } from "@babel/types";

export default function Search () {
  const currentData: Cat[] = [];
  const catsRef = firebase.database().ref().child("Cats/");
  const [search, setSearch] = useState("");
  const [names, setCatNames] = useState([""]);
  const [catData, setCatData] = useState<Cat[]>([]); //Stores Cat data that is fetched from Firebase
  //const [results, setResults] = useState<Cat[]>([]); 

  
//Fetches data asynchronously from firebase to store in the results(Cat[]) so that it can be traversed within the search function by
//filtering search bar text input to see if any of the input matches any element within the data array.
/*useEffect(() => {
  
    catsRef.on("child_added", async (snapshot) => {
    
      snapshot.forEach(function(data) {
        
        currentData.push(data.val());
        setCatData([...currentData])
    });
  });
  }, []);*/
  useEffect(() => {
    catsRef.on("child_added", async (snapshot) => {
      const picUri = await firebase
        .storage()
        .ref()
        .child(snapshot.val().accountID + "/" + snapshot.val().catID + "/")
        .getDownloadURL();
      currentData.push({ ...snapshot.val(), media: picUri });

      setCatData([...currentData]);
    });
  }, []);

 
 /* fetch(
    `https://temple-cats-default-rtdb.firebaseio.com/Cats.json`
    ).then(res => res.json())
    .then(res => {
       
        currentData.push(res)
        setResults([...currentData]);
        // console.log(currentData);
    })
    .catch((err) => { console.log(err)  
    });
  */
  //});
//}
  //This function will iterate through the entire results(Cat[]) array containing the Cat data from Firebase. While it traverses through 
  //each element (Cat[]), another variable (defined as String) will store this element and then be used to initialize the data
  //setData(newData) (setData (String, Cat names (item.name)), newData (Cat Name (String))). After it iterates through the results array, it will 
  //traverse through the data array (array of strings), then it will check if the user input (text) matches elements within the data array.
  
  function searchFilterFunction(text){ 
    console.log(catData)

    if(catData.includes(text)){
      return catData.indexOf(text) > -1;   
    } 
    else{
      alert("Search not found");
      return;
    }
  }
   
    
//RECOMMENDED: add timer to not make it check the SearchFilterFunction every time a letter is entered
function renderHeader(){
  return (
     <Searchbar
          placeholder="Search for cats here"
          onChangeText={(text) => {searchFilterFunction(text)
          setSearch(text)}}
          autoCorrect={false}
          value={search} onPressIn={true} onPressOut={true}               
      />     
  );
};

var renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
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
          data={catData}          
          renderItem={({ item }) => ( 
       //Right now this flatlist renders with the search bar even when the search bar is empty, but this should 
       //only appear when the text is changed within the search bar.
           
              <>
              
              <Image
                style={{left: 10, width: 40, height: 40, borderWidth: 4, borderColor: 'rgba(160, 28, 52, 0.75)', borderRadius: 7 }}
                source={{ uri: item.media }} /><Text style={styles.listItem}>{item.name}</Text></>
        
           
          )}          
        keyExtractor={item => item.catID}  
        ItemSeparatorComponent={renderSeparator} 
        //Changed renderHeader() to be a function to allow the user to change text in search bar.
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
    width: 280,
    paddingTop: 8,
    paddingBottom: 5,
    marginLeft: 275,
    top: -37,
    flexDirection: "row",
    left: -220,
    backgroundColor: "white",
    borderColor: "grey",
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
/* 

 <Searchbar
          placeholder="Search for cats here"
          onChangeText={(text) => searchFilterFunction(text)}
            
          value={search} onPressIn={undefined} onPressOut={undefined}               
      />     
 <ListItem   
                               
            title={item.name}  
            subtitle={item.name}                           
            avatar={{ uri: item.media }}   
            containerStyle={{ borderBottomWidth: 0 }} 
          />      


 <View style={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
 // </View>



<View style={{backgroundColor: "red", height: 10, width: 0, right: 460, borderColor: "black"}}>


//{catData.map(item => <Text style={styles.listItem}>{catData[1]}</Text>)}

*/