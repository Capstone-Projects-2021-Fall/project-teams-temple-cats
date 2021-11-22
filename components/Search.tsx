import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, FlatList, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Cat } from '../types';
/**
 * Function that queries the database for matching terms.
 * @component
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function Search({ mapViewRef }) {
  const catsRef = firebase.database().ref().child('Cats/');

  const [search, setSearch] = useState(''); // Stores the user's query
  const [catData, setCatData] = useState<Cat[]>([]); // Stores Cat data that is fetched from Firebase
  const [data, setData] = useState<Cat[]>([]); // Stores the new data array to be rendered once the user types something in the search bar
  const [healthyCats, setHealthyCats] = React.useState<Cat[]>([]);
  const [unHealthyCats, setUnhealthyCats] = React.useState<Cat[]>([]);
  const [kittens, setKittens] = React.useState<Cat[]>([]);
  const [notKittens, setNotKittens] = React.useState<Cat[]>([]);
  const [friendlyCats, setFriendlyCats] = React.useState<Cat[]>([]);
  const [notFriendlyCats, setNotFriendlyCats] = React.useState<Cat[]>([]);
  const [catComments, setCatComments] = React.useState<Cat[]>([]);
  const [catValues, setValues] = React.useState<Cat[]>([]);
  const [catDate, setCatDate] = React.useState<Cat[]>([]);
  const [currentDate, setCurrentDate] = React.useState('');
  /* Fetches data asynchronously from firebase to store in catData(Cat[]) hook array after it was first pushed to currentData (Cat[]) so that it can be traversed within the search function by
filtering search bar text input to see if any of the input matches any element within the data array. */

  useEffect(() => {
    const date = new Date().getDate(); // Current Date
    const month = new Date().getMonth() + 1; // Current Month
    const year = new Date().getFullYear(); // Current Year
    const hours = new Date().getHours(); // Current Hours
    const min = new Date().getMinutes(); // Current Minutes
    const sec = new Date().getSeconds(); // Current Seconds

    setCurrentDate(
      `${month}/${date}/${year}/`, // + hours + ':' + min + ':' + sec,
    );

    catsRef.orderByChild('date').on('value', (snapshot) => {
      const newState: Cat[] = [];
      snapshot.forEach((child) => {
        newState.push({ ...child.val() });
        setCatDate([...newState]);
      });
    });
    catsRef.on('value', (snapshot) => {
      const newState: Cat[] = [];
      snapshot.forEach((child) => {
        newState.push({ ...child.val() });
        setCatData([...newState]);
      });
    });
    catsRef.orderByChild('comments').on('value', (snapshot) => {
      const newState: Cat[] = [];
      snapshot.forEach((child) => {
        newState.push({ ...child.val() });
        setCatComments([...newState]);
      });
    });
    catsRef.orderByValue().on('value', (snapshot) => {
      const newState: Cat[] = [];
      snapshot.forEach((child) => {
        newState.push({ ...child.val() });
        setValues([...newState]);
      });
    });
    catsRef
      .orderByChild('healthy')
      .equalTo(false)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setUnhealthyCats([...newState]);
        });
      });
    catsRef
      .orderByChild('healthy')
      .equalTo(true)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setHealthyCats([...newState]);
        });
      });
    catsRef
      .orderByChild('kitten')
      .equalTo(false)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setNotKittens([...newState]);
        });
      });
    catsRef
      .orderByChild('kitten')
      .equalTo(true)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setKittens([...newState]);
        });
      });
    catsRef
      .orderByChild('friendly')
      .equalTo(true)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setFriendlyCats([...newState]);
        });
      });
    catsRef
      .orderByChild('friendly')
      .equalTo(false)
      .on('value', (snapshot) => {
        const newState: Cat[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setNotFriendlyCats([...newState]);
        });
      });
  }, []);

  function unhealthy(text) {
    const newData = unHealthyCats.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      const itemData = `${item.name}`;
      return itemData;
    });
    setSearch(text);
    setData(newData);
  }
  function healthy(text) {
    const newData = healthyCats.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      const itemData = `${item.name}`;
      return itemData;
    });
    setSearch(text);
    setData(newData);
  }
  function kitten(text) {
    const newData = kittens.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      const itemData = `${item.name}`;
      return itemData;
    });
    setSearch(text);
    setData(newData);
  }
  function cat(text) {
    const newData = notKittens.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      const itemData = `${item.name}`;
      return itemData;
    });
    setSearch(text);
    setData(newData);
  }
  function friendly(text) {
    const newData = friendlyCats.filter((item) => {
      const itemData = `${item.name}`;
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      if (text.length > 0) {
        return itemData;
      }
    });
    setData(newData);
  }
  function unfriendly(text) {
    const newData = notFriendlyCats.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
      const itemData = `${item.name}`;
      return itemData;
    });
    setSearch(text);
    setData(newData);
  }
  function comments(text) {
    const newData = catComments.filter((item) => {
      if (item.comments.length > 0) {
        if (item.name.length == 0) {
          const itemData = 'Unknown';
          return itemData;
        }
        const itemData = `${item.name}`;
        return itemData;
      }
    });
    setSearch(text);
    setData(newData);
  }
  function unknownName(text) {
    const newData = catData.filter((item) => {
      if (item.name.length == 0) {
        const itemData = 'Unknown';
        return itemData;
      }
    });
    setSearch(text);
    setData(newData);
  }
  function recent(text) {
    const newData = catDate.filter((item) => {
      const split = item.date.toString().split('/');
      // console.log(split[1])
      const newDate = split[1];
      const splitCurrent = currentDate.split('/');
      const currentDate2 = splitCurrent[1];
      // console.log(currentDate)
      const newMonth = split[0];

      const currentMonth = splitCurrent[0];
      // console.log(currentDate)
      const difMonth = Number(currentMonth) - Number(newMonth);
      const dif = Number(currentDate2) - Number(newDate);
      // console.log(dif)
      if (difMonth == 0) {
        if (dif <= 10) {
          if (item.name.length == 0) {
            const itemData = 'Unknown';
            return itemData;
          }
          const itemData = `${item.name}`;
          return itemData;
        }
      }
    });
    setSearch(text);
    setData(newData);
  }
  function recentMonth(text) {
    const newData = catDate.filter((item) => {
      const split = item.date.toString().split('/');
      // console.log(split[1])
      const newMonth = split[0];
      const splitCurrent = currentDate.split('/');
      const currentMonth = splitCurrent[0];
      // console.log(currentDate)
      const dif = Number(currentMonth) - Number(newMonth);
      if (dif == 1) {
        // current date: 12/6/2021, cat date could be: 11/6/2021
        // console.log(dif)
        if (item.name.length == 0) {
          const itemData = 'Unknown';
          return itemData;
        }
        const itemData = `${item.name}`;
        return itemData;
      }
    });
    setSearch(text);
    setData(newData);
  }

  /* This function will iterate through the entire catData hook array containing the Cat data from Firebase. While it traverses through
  each element (Cat[]), itemData (String) will read through each element and check if it contains the user input. The setData() (Cat[]) hook
  will initialize newData (Cat[]) as the new data to be rendered by the flatlist when the user enters text within the search bar. */

  function searchFilterFunction(text) {
    if (
      text == 'Unhealthy' ||
      text == 'unhealthy' ||
      text == 'Needs help' ||
      text == 'unhealthy cats' ||
      text == 'Needs medical help' ||
      text == 'Critical condition'
    ) {
      unhealthy(text);
    } else if (text == 'healthy' || text == 'Healthy' || text == 'good condition') {
      healthy(text);
    } else if (text == 'kittens' || text == 'Kittens' || text == 'kitten' || text == 'Kitten') {
      kitten(text);
    } else if (text == 'Adult' || text == 'older cats' || text == 'adult cats' || text == 'Old') {
      cat(text);
    } else if (text == 'Friendly' || text == 'friendly' || text == 'Kind' || text == 'Nice' || text == 'nice') {
      friendly(text);
    } else if (text == 'Unfriendly' || text == 'unfriendly' || text == 'mean' || text == 'Mean') {
      unfriendly(text);
    } else if (
      text == 'additional' ||
      text == 'Additional' ||
      text == 'Additional info' ||
      text == 'additional info' ||
      text == 'Additional information' ||
      text == 'additional information'
    ) {
      comments(text);
    } else if (text == 'unknown' || text == 'Unknown') {
      unknownName(text);
    } else if (text == 'recent' || text == 'Recent') {
      recent(text);
    } else if (
      text == 'recent monthly' ||
      text == 'Recent monthly' ||
      text == 'month' ||
      text == 'Month' ||
      text == 'monthly' ||
      text == 'Monthly'
    ) {
      recentMonth(text);
    } else if (text.length > 0) {
      const newData = catValues.filter((item) => {
        if (item.comments.length > 0) {
          const itemData = `${item.comments}`;
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        if (item.color.length > 0) {
          const itemData = `${item.color}`;
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        if (item.eyeColor.length > 0) {
          const itemData = `${item.eyeColor}`;
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        const itemData = `${item.name}`;
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else if (text.length == 0) {
      setData(text);
    }
    setSearch(text);
  }

  // Renders when the app renders so that the user can type something in
  function renderHeader() {
    return (
      <Searchbar
        style={{ borderColor: 'black', borderWidth: 2 }}
        placeholder="Search for cats here..."
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
