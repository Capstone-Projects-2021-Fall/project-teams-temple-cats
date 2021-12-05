import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * Function that renders the screen for bug reporting.
 * @component
 * @returns {JSX.Element} JSX element of the bug reporting screen
 */
export default function BugReporting() {
  return (
    <WebView
      style={styles.feedbackWebView}
      originWhitelist={['*']}
      incognito
      source={{
        html: '<html><body><script type="text/javascript" src="https://templecats.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-x8fh9u/b/3/9edb822e6c4db3635f27806476c088cb/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=9701a96d"></script></body></html>',
      }}
    />
  );
}

const styles = StyleSheet.create({
  feedbackWebView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
