import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {StyleSheet, View, TextInput, Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import MapView from "react-native-maps";


export default function Search () {
  return ( 
  
    <View style={{position: 'absolute', top: -5, width: '100%', flexDirection: 'row'}}>
   
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
      <TouchableOpacity onPress={() => alert('Hello, world!')} activeOpacity={0.5}>
        
        <View style={{left: -8,top: 15, backgroundColor: "white"}}>
        <Ionicons name="search" size={32} color="black"/>
        </View>
       
      </TouchableOpacity>
    </View>
   
  )
}


/*
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