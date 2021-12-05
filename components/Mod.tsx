import * as React from 'react';
import { Button } from 'react-native';

export default function Mod(props: {
  onReportedPostsPress: () => void;
  onDownvotedPostsPress: () => void;
  onModAppsPress: () => void;
}) {
  return (
    <>
      <Button
        color="#8b0000"
        title="Reported Posts"
        onPress={props.onReportedPostsPress}
      />
      <Button
        color="#8b0000"
        title="Downvoted Posts"
        onPress={props.onDownvotedPostsPress}
      />
      <Button
        color="#8b0000"
        title="Moderator Applications"
        onPress={props.onModAppsPress}
      />
    </>

  );
}
