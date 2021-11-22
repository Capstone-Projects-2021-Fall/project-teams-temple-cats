import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Modal, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Application, Report } from '../types';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';


const { width } = Dimensions.get('window');

export default function ApplyforMods() {

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');


  const [application, setApplication]: Application = useState({
    name: firebase.auth().currentUser?.displayName,
    applicationID: '',
    accountID: firebase.auth().currentUser?.uid,
    reason: '',
    votes: 0
  });

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
    setApplication((currentState: Application) => ({
      ...currentState,
      applicationID: `${uuidv4()}`,
    }));
  };

  return (
    <View>
      <Button
        buttonStyle={styles.applyForModStyle}
        title="Apply for Moderator"
        titleStyle={{
          color: "#8B0000",
          fontSize: 19,
        }}
        onPress={toggleModalVisibility} />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>{'\n'}Moderator Application{'\n'}</Text>
            <Input
              style={styles.textInput}
              selectionColor="white"
              placeholder="Enter why you want to be a moderator..."
              value={application.reason}
              placeholderTextColor="black"
              onChangeText={(text) => setApplication((currentState: Application) => ({
                ...currentState,
                reason: text,
              }))}
            />
            <Button title="Submit Application"
              buttonStyle={styles.buttonStyle}
              onPress={() => {
                toggleModalVisibility();
                
                firebase.database().ref().child(`Application/${application.applicationID}`).on('value', function (snapshot) {
                  setData(snapshot.val());
                });

              if(data === null){
                firebase.database().ref().child(`Application/${application.applicationID}`).set(application)
                }
                else{
                  alert("Application has already been submitted")
                }
              }}
            />
            <Button title="Close"
              buttonStyle={styles.buttonStyle}
              onPress={toggleModalVisibility}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 90,
    borderRadius: 40,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  applyForModStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 90,
    borderRadius: 40,
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  scrollView: {
    height: 160,
    backgroundColor: '#8B0000',
  },
  
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 300,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    fontSize: 15,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  }, 

  titleText: {
    fontSize: 20,
  }

});

