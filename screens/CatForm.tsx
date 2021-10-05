import React from "react";
import { SafeAreaView, StyleSheet, TextInput ,Text} from "react-native";

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <Text style={styles.text}>Cat Form</Text>
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Color</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text style={{ fontSize: 20, fontWeight:"bold" }}>    Size</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#8b0000",
    marginBottom: 50,
  },
 
});

export default UselessTextInput;