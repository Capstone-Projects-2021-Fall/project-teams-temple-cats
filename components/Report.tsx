import * as React from 'react';
import { useState } from 'react';
import { Text, Button, Modal, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View } from '../components/Themed';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    height: 180,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
});
/**
 * Function for generating a cat report.
 * @component
 * @returns {JSX.Element} JSx element for reporting a cat.
 */
export default function Report() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Button title="Report" onPress={toggleModalVisibility} />
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text> Enter reason for reporting this post: </Text>
            <TextInput
              placeholder="Enter why you're reporting this post..."
              value={inputValue}
              style={styles.textInput}
              onChangeText={(value) => setInputValue(value)}
            />
            <Button title="Submit" onPress={toggleModalVisibility} />
            <Button title="Close" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
