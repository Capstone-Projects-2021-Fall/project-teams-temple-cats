import React, { useState, useEffect} from "react";
import { View, Platform, Alert, Modal, StyleSheet, Pressable, Text, SafeAreaView} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Camera} from 'expo-camera'
import CatCamera from "./Camera";

type Props = {
  modalVisible: boolean
  onCloseModal: () => void
  onSetImage: (image: string) => void
}

export default function CatImagePicker (props:Props) {
  const {modalVisible, onCloseModal, onSetImage} = props
  const [camModalVisible, setCamModalVisible] = useState(false);
  /** 
   * This is a function that calls another
  */
  const handleCloseModal = () => {
    onCloseModal()
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleCameraRollOpen = async () => {
    onCloseModal()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      onSetImage(result.uri)
    } 
  };

  const handleCameraOpen = async () => {
    onCloseModal()
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setCamModalVisible(true)
    } else {
      Alert.alert('Access denied')
    } 
  };

  const handleCameraCapture = (data: string) => {
    setCamModalVisible(false)
    onSetImage(data)
  }

  const handleCameraClose = () => {
    setCamModalVisible(false)
  };

  return ( 
  <SafeAreaView>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.modalButton}
              onPress={handleCameraOpen}
            >
              <Text style={styles.textStyle}>From Camera</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={handleCameraRollOpen}
            >
              <Text style={styles.textStyle}>From Camera Roll</Text>
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeTextStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    <Modal
      animationType="slide"
      onRequestClose={() => setCamModalVisible(false)}
      transparent={true}
      visible={camModalVisible}
    >
      <CatCamera startCamera={camModalVisible} onClose={handleCameraClose} onCaptureImage={handleCameraCapture}/>
    </Modal> 
    </SafeAreaView>
   )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    backgroundColor: "#2196F3",
  },
  closeButton: {
    marginTop: 30
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  closeTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});