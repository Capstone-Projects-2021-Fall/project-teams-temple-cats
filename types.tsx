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
  Badges: undefined;
  CatForm: undefined;
  Facebook: undefined;
  BugReporting: undefined;
  CreateAnnouncement: { announcement: Announcement};
  UserRank: undefined;
  Rewards: undefined;
  NotFound: undefined;
  Cat: { cat: Cat };
  User: { user: User };
  FeedingStations: { feedingStation: FeedingStations };
  ReportedPosts: undefined;
  DownvotedPosts: undefined;
  ModeratorRequests: undefined;
  ScoringInfo: undefined;
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

export type Badge = {
  modBadge: boolean;
  firstCommentBadge: boolean;
  catRescuerBadge: boolean;
  feedingStationAttendeeBadge: boolean;
  firstCatPostedBadge: boolean;
  hundredPointsBadge: boolean;
  thousandPointsBadge: boolean;
};

export type Report = {
  reportID: string;
  catID: string;
  accountID: string;
  reason: string;
};
export type Application = {
  applicationID: string;
  accountID: string;
  reason1: string;
  reason2: string;
  reason3: string;
  votes: Number;
  date: Date, 
  time: Date,
};

export type ReportList = {
  [key: string]: Report;
};

export type Comment = {
  commentID: string;
  content: string;
  accountID: string;
  reports: ReportList;
  votes: number;
  type: CommentType;
};

export enum CommentType {
  Comment = 'Just a comment!',
  FoodWater = 'Gave this cat food/water',
  Microchip = 'Took cat to get scanned for a microchip',
  Neuter = 'Trap/neuter/returned this cat',
  Shelter = 'Took this cat to a no-kill shelter',
  Foster = 'Fostering this cat',
  Return = 'Returned this cat to it\'s owner',
  Station = 'Completed feeding station request',
}

export type CommentList = {
  [key: string]: Comment;
};

export type Announcement = {
  announcementID: string;
  time: Date;
  content: string;
  subject: string;
  accountID: string;
};

export type AnnouncementFeeder = {
  announcementID: string;
  time: Date;
  content: string;
  subject: string;
  accountID: string;
};

export type Account = {
  accountID: string;
  modStatus: boolean;
  banned: boolean;
  points: number;
  Application: {applicationID: {accountID: string, applicationID: string, name: String, reason1: String, reason2: String, reason3: String, votes: Number, date: Date, time: Date} }
};

export type FeedingStation = {
  StationID: string;
  Media: string;
  Comments: CommentList;
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
  commentList: CommentList;
  reports: ReportList;
};

export type FeedingStations = {
  title: String;
  info: String;
  latitude: any;
  longitude: any;
  street: String;
  commentList: CommentList;
};

export type User = {
  displayName: string | null | undefined;
  accountID: string | undefined;
  email: string | null | undefined;
  photo: string | null | undefined;
  badges: true | false;
  points: 0;
  posts: 0;
  modStatus: 1 | 2 | 3; // user, feeder, moderator
  banStatus: true | false;
};


