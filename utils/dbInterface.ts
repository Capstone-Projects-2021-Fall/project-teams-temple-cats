import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Announcement, Cat, Badge, User, AnnouncementFeeder,
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


