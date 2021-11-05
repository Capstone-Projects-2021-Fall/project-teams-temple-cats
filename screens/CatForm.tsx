import React, { useContext, useState } from 'react';
import {
  Button, CheckBox, Divider, Text, Icon, Input,
} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { LatLng } from 'react-native-maps';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { add } from 'react-native-reanimated';
import { Cat } from '../types';
import { addCat, addPicture } from '../utils/dbInterface';
import LocationPicker from './LocationPicker';
import CatImagePicker from '../components/ImagePicker';
import { AuthContext } from '../context/FirebaseAuthContext';
import firebase from '../utils/firebase';

export default CatForm = () => {
  const colors = ['Cat Fur Color', 'Orange', 'Brown', 'Black', 'White', 'Grey', 'Mixed'];
  const eyeColors = [
    'Cat Eye Color',
    'Brown',
    'Green',
    'Blue',
    'Black',
    'Yellow',
    'Orange',
    'Hazel',
    'Mixed',
  ];

  const [color, setColor] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [image, setImage] = useState<string>('./assets/images/cat-placeholder-tall.svg');
  const [friendly, setFriendly] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const [kitten, setKitten] = useState(false);
  const [date, setDate] = useState(new Date());
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [cat, setCat]: Cat = useState({
    catID: uuidv4(),
    comments: '',
    name: '',
    color: '',
    eyeColor: '',
    media: '',
    friendly: false,
    healthy: false,
    kitten: false,
    location: '',
    date: '',
    time: '',
    votes: 0,
    accountID: firebase.auth().currentUser?.uid,
  });

  function onLocationPick(coordinate: LatLng) {
    setCat((currentState: Cat) => ({
      ...currentState,
      location: coordinate,
    }));
    setLocationModalVisible(false);
  }

  const handleSetImage = (data: string) => {
    cat.media = data;
    setImage(data);
  };

  const onChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setCat((currentState: Cat) => ({
      ...currentState,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    }));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  async function submitCat() {
    if (cat.media === '' || null) return alert('Add picture to report a cat');
    if (cat.location === '' || null) return alert('Add location to report a cat');
    if (cat.date === '' || null) return alert('Add date to report a cat');
    if (cat.time === '' || null) return alert('Add time to report a cat');

    const response = await fetch(cat.media);
    const blob = await response.blob();

    const uploadTask = firebase
      .storage()
      .ref()
      .child(`${firebase.auth().currentUser?.uid}/${cat.catID}`)
      .put(blob);
    uploadTask
      .then((uploadTaskSnapshot) => {
        // The upload is complete!
        window.alert('Upload complete');

        // In addition, if needed you can get a Download URL, as follows
        return uploadTaskSnapshot.ref.getDownloadURL();
      })
      .then((url) => {
        cat.media = url;
      }).then(() => addCat(cat))
      .catch((err) => { console.log(err); });
    // addCat(cat);
    // return alert('Cat submitted');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal animationType="slide" visible={locationModalVisible}>
          <LocationPicker
            onCancel={() => {
              setLocationModalVisible(false);
            }}
            onConfirm={onLocationPick}
          />
        </Modal>
        <Text h3 h3Style={{ textAlign: 'center' }}> Required Fields </Text>
        <Divider style={{ marginBottom: 12 }} color="#9D2235" />
        {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 250, height: 250, alignSelf: 'center', borderColor: '#9D2235', borderWidth: 5,
          }}
        />
        )}
        <CatImagePicker
          onSetImage={handleSetImage}
          onCloseModal={() => setCameraModalVisible(false)}
          modalVisible={cameraModalVisible}
        />
        <Button
          title="Upload Image"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => setCameraModalVisible(true)}
        />
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, borderWidth: 1, borderColor: 'black', marginBottom: 12,
        }}
        >
          <Text h3 h3Style={{ fontSize: 18 }}>
            {cat.location ? `${cat.location.latitude},${cat.location.longitude}` : 'Set Location'}
          </Text>
          <Icon
            name="crosshairs-gps"
            type="material-community"
            size={22}
          />
        </View>
        <Button
          title="Add Location"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => setLocationModalVisible(true)}
        />
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginBottom: 12,
        }}
        >
          <Text
            h3
            h3Style={{ fontSize: 18 }}
            value={cat.date}
            containerStyle={{
              width: 175,
              borderColor: 'black',
              borderWidth: 1,
            }}
            selectionColor="white"
            placeholder="Enter Date"
            placeholderTextColor="black"
            onPress={showDatepicker}
          >
            {cat.date ? `${cat.date}` : 'Set Date'}
          </Text>
          <Text
            h3
            h3Style={{ fontSize: 18 }}
            value={cat.time}
            containerStyle={{
              width: 175,
            }}
            selectionColor="white"
            placeholder="Enter Date"
            placeholderTextColor="black"
            onPress={showTimepicker}
          >
            {cat.time ? `${cat.time}` : 'Set Time'}
          </Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
        <Button
          title="Submit Cat"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            submitCat();
          }}
        />

        <Text h3 h3Style={{ textAlign: 'center' }}> Additional Fields </Text>
        <Divider style={{ marginBottom: 8 }} color="#9D2235" />
        <View
          style={styles.checkboxes}
        >
          <CheckBox
            containerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            title="Friendly"
            checked={friendly}
            onPress={() => {
              setFriendly(!friendly);
              cat.friendly = !cat.friendly;
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#9D2235"
          />
          <CheckBox
            containerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            title="Healthy"
            checked={healthy}
            onPress={() => {
              setHealthy(!healthy);
              cat.healthy = !cat.healthy;
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#9D2235"
          />
          <CheckBox
            containerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            title="Kitten"
            checked={kitten}
            onPress={() => {
              setKitten(!kitten);
              cat.kitten = !cat.kitten;
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#9D2235"
          />
        </View>
        <View style={styles.pickers}>
          <Picker
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            selectedValue={color}
            onValueChange={(item) => {
              setColor(item);
              cat.color = colors[item];
            }}
          >
            {colors.map((item, index) => <Picker.Item label={item} value={index} key={index} />)}
          </Picker>
          <Picker
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            selectedValue={eyeColor}
            onValueChange={(item) => {
              setEyeColor(item);
              cat.eyeColor = eyeColors[item];
            }}
          >
            {eyeColors.map((item, index) => <Picker.Item label={item} value={index} key={index} />)}
          </Picker>
        </View>
        <Input
          style={styles.nameInput}
          value={cat.name}
          selectionColor="white"
          placeholder="Enter possible name here"
          placeholderTextColor="black"
          onChangeText={(text) => setCat((currentState: Cat) => ({
            ...currentState,
            name: text,
          }))}
        />
        <Input
          style={styles.additionalInput}
          selectionColor="white"
          placeholder="Enter additional information here"
          placeholderTextColor="black"
          value={cat.comments}
          onChangeText={(text) => setCat((currentState: Cat) => ({
            ...currentState,
            comments: text,
          }))}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  additionalInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  checkboxes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  buttonStyle: {
    width: 150,
    padding: 10,
    backgroundColor: '#9D2235',
    borderRadius: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F1F1F1',
  },
  twoPickers: {
    width: 175,
    height: 88,
    backgroundColor: 'transparent',
  },
  twoPickerItems: {
    height: 88,
  },
});
