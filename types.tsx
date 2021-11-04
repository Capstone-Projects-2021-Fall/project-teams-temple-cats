/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LatLng } from "react-native-maps";

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
  FeedingStationModal: {title: String};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Resources: undefined;
  Leaderboard: undefined;
  Account: undefined;
  Facebook: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type Report = {
  ReportID: string;
  CommentID: string;
  PinID: string;
  AccountID: string;
};

export type Comment = {
  CommentID: string;
  Type: string;
  Media: string;
  Content: string;
  PinID: string;
  AccountID: string;
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
  PinID: string;
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
  time: Date;
  votes: number;
  accountID: string;
};

export type User = {
  displayName: string | null | undefined;
  accountID: string | undefined;
  email: string | null | undefined;
  photo: string | null | undefined;
  points: 0,
  posts: 0,
  modStatus: true | false,
  banStatus: true | false,
};
