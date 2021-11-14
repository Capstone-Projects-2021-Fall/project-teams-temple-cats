import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Comment } from '../types';

/**
 * Function for rendering comments.
 * @param props: Comment
 * @returns {JSX.Element} JSX render of a Comment
 */

export default function CommentComponent(props: Comment) {
  const { accountID, content, commentID, reports } = props.comment;
  console.log(props);
  return (
    <View style={styles.comment}>
      <Text
        h3
        h3Style={{ fontSize: 18 }}
        containerStyle={{
          width: 150,
          borderColor: 'black',
          borderWidth: 1,
        }}
        selectionColor="black"
      >
        {`${content}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
});
