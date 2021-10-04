/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

/**
 * Linking options for the navigation function of the app
 * @constant {LinkingOptions<RootStackParamList>}
 */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'Home',
            },
          },
          Resources: {
            screens: {
              Resources: 'Resources',
            },
          },
          Leaderboard: {
            screens: {
              Leaderboard: 'Leaderboard',
            },
          },
          Account: {
            screens: {
              Account: 'Account',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
