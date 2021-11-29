import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Announcement, Cat, Badge, User,
} from '../types';

const root = firebase.database().ref();
let reference;

export function addAnnouncement(announcement: Announcement) {
  firebase
    .database()
    .ref()
    .child(`Announcements/${announcement.announcementID}`)
    .set(announcement);
}

export function addBadge(badge: Badge, id: User['accountID'], badgeType: String ) {
  firebase
    .database()
    .ref()
    .child(`Accounts/${id}`)
    .child(`Badges/${badgeType}`)
    .set(badge);
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

export function addUser(name: User['displayName'], id: User['accountID'], email: User['email'], badges: User['badges'], photo: User['photo']) {
  firebase
    .database()
    .ref()
    .child(`Accounts/${id}`)
    .set({
      display: name,
      accountID: id,
      email,
      badges,
      photo,
      posts: 0,
      modStatus: 1,
      banStatus: false,
    });

    return "true"

}
