import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Announcement, Cat, Badge, User, AnnouncementFeeder, CommentType,
} from '../types';

const root = firebase.database().ref();
let reference;

export function addAnnouncement(announcement: Announcement) {
  firebase
    .database()
    .ref()
    .child(`Announcements/general/${announcement.announcementID}`)
    .set(announcement);
}

export function addAnnouncementFeeder(announcement: AnnouncementFeeder) {
  firebase
    .database()
    .ref()
    .child(`Announcements/feeder/${announcement.announcementID}`)
    .set(announcement);
}

export function addBadge(badge: Badge, id: User['accountID'], badgeType: String ) {
  firebase
    .database()
    .ref()
    .child(`Accounts/${id}/points/badges/${badgeType}`)
    .set(true);
}

export function addCat(cat: Cat) {
  firebase
    .database()
    .ref()
    .child(`Cats/${cat.catID}`)
    .set(cat);
}

export async function removeCat(cat: Cat) { 
  firebase
    .database()
    .ref()
    .child(`Cats/${cat.catID}`)
    .remove();

  firebase
    .storage()
    .refFromURL(cat.media)
    .delete();

  await addPoints(-5, cat.accountID);
  Object.values(cat.commentList ?? {}).forEach(async (comment) => {
    switch (comment.type) {
      case CommentType.FoodWater:
        await addPoints(-20, comment.accountID);
        break;
      case CommentType.Microchip:
        await addPoints(-50, comment.accountID);
        break;
      case CommentType.Neuter:
        await addPoints(-200, comment.accountID);
        break;
      case CommentType.Shelter:
        await addPoints(-200, comment.accountID);
        break;
      case CommentType.Foster:
        await addPoints(-200, comment.accountID);
        break;
      case CommentType.Return:
        await addPoints(-300, comment.accountID);
        break;
    }
  });
}

export async function addPicture(cat: Cat) {
  const response = await fetch(cat.media);
  const blob = await response.blob();

  firebase
    .storage()
    .ref()
    .child(`${firebase.auth().currentUser?.uid}/${cat.catID}`)
    .put(blob);
}

export function addUser(name: User['displayName'], id: User['accountID'], email: User['email'], photo: User['photo']) {
  firebase
    .database()
    .ref()
    .child(`Accounts/${id}`)
    .set({
      display: name,
      accountID: id,
      email,
      photo,
      posts: 0,
      modStatus: 1,
      banStatus: false,
    });

  firebase
    .database()
    .ref()
    .child(`Accounts/${id}/points`)
    .set({
      userName: name,
      highScore: 0,
      email: email,
      photo: photo,
      badges: {
        modBadge: false,
        firstCommentBadge: false,
        catRescuerBadge: false,
        feedingStationAttendeeBadge: false,
        firstCatPostedBadge: false,
        hundredPointsBadge: false,
        thousandPointsBadge: false,
      }
    });
    
    return "true"
}

export async function addPoints(points: number, accountID: string | undefined) {
  const currentPoints = await firebase
    .database()
    .ref()
    .child(`Accounts/${accountID}/points/highScore`)
    .get();
  const set = firebase
    .database()
    .ref()
    .child(`Accounts/${accountID}/points/highScore`)
    .set(currentPoints.val() + points);
  return set;
}


