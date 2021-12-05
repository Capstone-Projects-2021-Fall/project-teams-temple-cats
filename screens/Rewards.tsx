import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ImageBackground, SafeAreaView, View, ScrollView, Text, Modal, Dimensions,
} from 'react-native';
import {
  Card, Button, Icon, Input,
} from 'react-native-elements';
import ConfettiCannon from 'react-native-confetti-cannon';

/**
 * Function that renders the screen for cashing in points for rewards.
 * @component
 * @returns {JSX.Element} JSX element of the rewards modal screen
 */

const { width } = Dimensions.get('window');
export default function Rewards() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [launchConfetti, setLaunchConfetti] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  /**
   * Plays an animation to launch confetti
   * @constant {{uri: string}}
   */
  const handleLaunchConfetti = () => {
    setLaunchConfetti(false);
    setTimeout(() => {
      setLaunchConfetti(true);
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('../assets/images/rewards_ombre.jpeg')} resizeMode="cover" style={styles.backgroundImage}>
          <Card>
            <Card.Image style={styles.pointContainer} source={require('../assets/images/rewards.jpg')}>
              <View style={styles.pointInfo}>
                <Text style={styles.text}> 1,000 Points</Text>
              </View>
            </Card.Image>
          </Card>
          <Card>
            <Card.Title>Temple Cats Tee-Shirt</Card.Title>
            <Card.Divider />
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              1000 Points
            </Text>
            <Card.Image style={{ height: 310, marginBottom: 20 }} source={require('../assets/images/shirt.jpeg')} />
            <View>
              <Button
                icon={<Icon name="redeem" color="#ffffff" />}
                buttonStyle={{
                  marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: 40, backgroundColor: '#8B0000',
                }}
                title="Redeem"
                onPress={() => {
                  handleLaunchConfetti();
                  toggleModalVisibility();
                }}
              />
              <Modal
                animationType="slide"
                transparent
                visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}
              >
                <View style={styles.viewWrapper}>
                  <View style={styles.modalView}>
                    <Text style={styles.reportHeader}> Enter your shipping address</Text>
                    <Input
                      style={styles.textInput}
                      selectionColor="black"
                      placeholder="Enter name"
                      placeholderTextColor="black"
                    />
                    <Input
                      style={styles.additionalInput}
                      selectionColor="black"
                      placeholder="Enter address"
                      placeholderTextColor="black"
                    />
                    <Button
                      title="Submit"
                      buttonStyle={styles.buttonStyle}
                      onPress={() => {
                        toggleModalVisibility();
                        handleLaunchConfetti();
                      }}
                    />
                    <Button title="Close" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
                  </View>
                </View>
              </Modal>
            </View>
          </Card>
          <Card>
            <Card.Title>Temple Cats Magnet</Card.Title>
            <Card.Divider />
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              500 Points
            </Text>
            <Card.Image style={{ height: 200, marginBottom: 20 }} source={require('../assets/images/carMag.jpeg')} />
            <Button
              icon={<Icon name="redeem" color="#ffffff" />}
              buttonStyle={{
                marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: 40, backgroundColor: '#8B0000',
              }}
              title="Redeem"
              onPress={handleLaunchConfetti}
            />
          </Card>
          {launchConfetti && (
            <ConfettiCannon
              count={200}
              origin={{ x: -100, y: 0 }}
            />
          )}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  pointInfo: {
    borderRadius: 40,
    backgroundColor: '#8b0000',
    padding: 20,
  },
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#8B0000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  additionalInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 7,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 400,
    width: width * 0.8,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
