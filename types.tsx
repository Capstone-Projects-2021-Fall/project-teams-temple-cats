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
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Resources: undefined;
  Leaderboard: undefined;
  Account: undefined;
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
  AccountID: string;
  ModStatus: boolean;
  Banned: boolean;
  Points: number;
};

export type Pin = {
  PinID: string;
  Location: LatLng;
  Time: Date;
  Votes: number;
  AccountID: string;
};

export type FeedingStation = {
  StationID: string;
  Media: string;
  Comments: string;
  PinID: string;
};

export type Cat = {
  CatID: string;
  Media: string;
  Features: string;
  Name: string;
  Color: string;
  Age: number;
  Condition: string;
  Friendly: number;
  Comments: string;
  Eye: string;
  PinID: string;
};
