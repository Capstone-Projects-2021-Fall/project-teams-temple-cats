/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LatLng } from 'react-native-maps';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Announcements: undefined;
  CatForm: undefined;
  Facebook: undefined;
  Settings: undefined;
  Rewards: undefined;
  NotFound: undefined;
  Cat: {cat: Cat};
  FeedingStations: {title: String, info: any};
  ReportedPosts: undefined;
  DownvotedPosts: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Resources: undefined;
  Leaderboard: undefined;
  Account: undefined;
  Facebook: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Report = {
  reportID: string;
  catID: string;
  accountID: string;
  reason: string;
};

export type Comment = {
  commentID: string;
  content: string;
  accountID: string;
  reports: Report[];
};

export type Announcement = {
  AnnouncementID: string;
  Time: Date;
  Content: string;
  Type: string;
  AccountID: string;
};

export type Account = {
  accountID: string;
  modStatus: boolean;
  banned: boolean;
  points: number;
};

export type FeedingStation = {
  StationID: string;
  Media: string;
  Comments: string;
};

export type Cat = {
  catID: string;
  media: string;
  name: string;
  color: string;
  eyeColor: string;
  kitten: boolean;
  healthy: boolean;
  friendly: boolean;
  comments: string;
  location: LatLng;
  date: Date;
  time: Date;
  votes: number;
  accountID: string;
  commentList: Comment[];
  reports: Report[];
};

export type FeedingStations = {
 title: String;
 info: String;
 latitude: any,
 longitude: any,
 street: String,
};



export type User = {
  displayName: string | null | undefined;
  accountID: string | undefined;
  email: string | null | undefined;
  photo: string | null | undefined;
  points: 0;
  posts: 0;
  modStatus: 1 | 2 | 3; // user, feeder, moderator
  banStatus: true | false;
};
