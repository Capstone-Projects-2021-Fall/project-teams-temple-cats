import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, TextInput, Button, TouchableOpacity, StatusBar, FlatList, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import MapView from "react-native-maps";





export default function Search () {
  const catsRef = firebase.database().ref().child("Cats/");
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const cats: any[] = [];

  useEffect(() => {
    catsRef.on("child_added", async () => {
     const res = await fetch(
      "https://temple-cats-default-rtdb.firebaseio.com/Cats.json"
    );
    res
      .json()
      .then((res) => {
        //console.log(res);
        cats.push(res);
        //console.log(cats)
       // searchData(search)
      })
      .catch((err) => console.log(err));
    });
  }, []);
  

  function searchData(text: string) {
    return(cats.find((element)=> {
      alert(element.text);
      return element.text === text;
    })
    
    )
    
  }

  return ( 
  <SafeAreaView style={{ flex: 1 }}>
  <View style={{left: -210, position: 'absolute', top: -5, width: '100%', flexDirection: 'row'}}>
   
   <TextInput
       style={{
       flex: 1,
       borderRadius: 10,
       margin: 10,
       color: '#000',
       borderColor: '#666',
       backgroundColor: '#FFF',
       borderWidth: 1,
       height: 45,
       paddingHorizontal: 10,
       fontSize: 18,
     }}
     placeholder={'Search for cats here'}
     placeholderTextColor={'#666'}

     onChangeText={setSearch} value={search}
    
   />
   <TouchableOpacity onPress={() => searchData(search)} activeOpacity={0.5}>
        <View style={{left: -8,top: 15, backgroundColor: "white"}}>
          <Ionicons name="search" size={32} color="black"/>
        </View>
   </TouchableOpacity>
  

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

<View style={styles.container}>
  <Searchbar
				placeholder="Search"
				onChangeText={(text) => {
					setInput(text);
				}}
				value={input}
			/>
		</View>
	);
//first paper code


















<View style= {{backgroundColor: '#fff', width: 1, height: 40}}>
  </View>
 


 <View style={{ position: 'absolute', top: -5, width: '100%', flexDirection: 'row'}}>

        <TextInput
            style={{
            flex: 1,
            borderRadius: 10,
            margin: 10,
            color: '#000',
            borderColor: '#666',
            backgroundColor: '#FFF',
            borderWidth: 1,
            height: 45,
            paddingHorizontal: 10,
            fontSize: 18,
        }}
        placeholder={'Search'}
        placeholderTextColor={'#666'}
        />
        <Button onPress={ () => console.log("hello") } title="">
            <Icon
                name="Search"
                color='#000'
                size={14}
            />
        </Button>
        
    </View>






 //<MapView loadingEnabled={true} style={styles.map} />
  <View style={{ position: 'absolute', top: -5, width: '100%', flexDirection: 'row'}}>
   
    <TextInput
      style={{
        flex: 1,
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
      }}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
     <Button onPress={ () => this.onSubmit(this.state.searchText) }>
        <Image source={ require('../images/searchImage.png') } style={ { width: 50, height: 50 } } />
    </Button>
  </View>
*/