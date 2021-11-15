import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, FlatList, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Cat } from '../types';

export default function Search({ mapViewRef }) {
  const currentData: Cat[] = []; // Used to initialize catData
  const catsRef = firebase.database().ref().child('Cats/');
  const [search, setSearch] = useState(''); // Stores the user's query
  const [catData, setCatData] = useState<Cat[]>([]); // Stores Cat data that is fetched from Firebase
  const [data, setData] = useState<Cat[]>([]); // Stores the new data array to be rendered once the user types something in the search bar

  /* Fetches data asynchronously from firebase to store in catData(Cat[]) hook array after it was first pushed to currentData (Cat[]) so that it can be traversed within the search function by
filtering search bar text input to see if any of the input matches any element within the data array. */

  useEffect(() => {
    catsRef.on('child_added', async (snapshot) => {
      currentData.push({ ...snapshot.val() });
      setCatData([...currentData]);
    });
  }, []);

  /* This function will iterate through the entire catData hook array containing the Cat data from Firebase. While it traverses through
  each element (Cat[]), itemData (String) will read through each element and check if it contains the user input. The setData() (Cat[]) hook
  will initialize newData (Cat[]) as the new data to be rendered by the flatlist when the user enters text within the search bar. */

  function searchFilterFunction(text) {
    const newData = catData.filter((item) => {
      const itemData = `${item.name}`;
      const textData = text;
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });

    setSearch(text);
    setData(newData);
  }
  // Renders when the app renders so that the user can type something in
  function renderHeader() {
    return (
      <Searchbar
        style={{ borderColor: 'black', borderWidth: 2 }}
        placeholder="Search for cats here"
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        autoCorrect={false}
        value={search}
        onPressIn
        onPressOut
      />
    );
  }
  // Used to separate Cat data elements that come up during the user's search
  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: 20,
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );

  function goToCat(lat, lng) {
    mapViewRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },

      1000,
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          left: -190,
          position: 'absolute',
          top: -5,
          width: '90%',
          borderColor: 'black',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FlatList
          // Flatlist renders when new data is pulled from the user's search query that comes from the renderHeader() function.
          data={data}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'white', paddingBottom: -10 }}>
              <TouchableOpacity
                onPress={() => {
                  goToCat(item.location.latitude, item.location.longitude);
                }}
              >
                <Image
                  style={{
                    left: 10,
                    top: 6,
                    width: 40,
                    height: 40,
                    borderWidth: 4,
                    borderColor: 'rgba(160, 28, 52, 0.75)',
                    borderRadius: 7,
                  }}
                  source={{ uri: item.media }}
                />
                <Text style={styles.listItem}> {item.name ? item.name : 'Unknown'}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.catID}
          ItemSeparatorComponent={renderSeparator}
          // renderHeader() is a function to allow the user to dynamically change text in search bar.
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    fontSize: 17,
    fontWeight: 'bold',
    width: 220,
    paddingTop: 1,
    paddingBottom: -2,
    marginLeft: 275,
    top: -30,
    flexDirection: 'row',
    left: -220,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemStyle: {
    padding: 10,
  },
  listImageContainer: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  pawsServicesList: {
    marginBottom: 5,
  },
});
