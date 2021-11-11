import * as React from 'react';
import { useState } from 'react';
import { Button, SafeAreaView, Modal, StyleSheet, TextInput, Dimensions } from "react-native";
import { View } from "../components/Themed";
import { StatusBar } from "expo-status-bar";  

const { width } = Dimensions.get("window");

type Props = {
  modalVisible: boolean
  onCloseModal: () => void
}

export default function Reporter(props:Props) {
  const {modalVisible, onCloseModal} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);

return (
  <SafeAreaView style={styles.screen}>
    <StatusBar style="auto" />
      <Button title="" onPress={toggleModalVisibility} />
        <Modal animationType="slide" 
                transparent visible={isModalVisible} 
                presentationStyle="overFullScreen" 
                onDismiss={toggleModalVisibility}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <TextInput placeholder="Enter something..." 
                          value={inputValue} style={styles.textInput} 
                          onChangeText={(value) => setInputValue(value)} />
                <Button title="Close" onPress={toggleModalVisibility} />
            </View>
          </View>
        </Modal>
  </SafeAreaView>
);
}}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
          { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
},
});
