import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Announcement, Cat, Pin, User,
} from '../types';

const root = firebase.database().ref();
let reference;

/**
 * Adds an announcement to the database. To be used by moderators creating announcements.
 * @param {Announcement} announcement Announcement to be added
 * @throws Throws an exception if there was a problem in communicating with firebase. Catches exception with a message saying 'There was a problem reaching the database while adding an announcement. Please check your internet connection or try again later.'
 */
export function addAnnouncement(announcement: Announcement) {
  firebase
    .database()
    .ref()
    .child(`Announcements/${announcement.announcementID}`)
    .set(announcement);
}

/**
 * Adds a new cat to the database. To be used when posting a new cat.
 * @param {Cat} cat Cat to be added
 * @throws Throws an exception if there was a problem in communicating with firebase. Catches exception with a message saying 'There was a problem reaching the database while adding a new cat. Please check your internet connection or try again later.'
 */
export function addCat(cat: Cat) {
  firebase
    .database()
    .ref()
    .child(`Cats/${cat.catID}`)
    .set(cat);
}

/**
 * Uploads a cat picture to storage. To be used when posted a new cat.
 * @param {Cat} cat Cat with picture to be uploaded to storage
 * @throws Throws an exception if there was a problem in communicating with firebase. Catches exception with a message saying 'There was a problem reaching the database while uploading a cat's media. Please check your internet connection or try again later.'
 */
export async function addPicture(cat: Cat) {
  const response = await fetch(cat.media);
  const blob = await response.blob();

  firebase
    .storage()
    .ref()
    .child(`${firebase.auth().currentUser?.uid}/${cat.catID}`)
    .put(blob);
}

/**
 * Adds a new user to the database. To be used during authentication.
 * @param {string} name Name of new user
 * @param {string} id Unique id of new user
 * @param {string} email Email of new user
 * @param {string} photo URI of photo of new user
 * @throws Throws an exception if there was a problem in communicating with firebase. Catches exception with a message saying 'There was a problem reaching the database while authentication a new user. Please check your internet connection or try again later.'
 */
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

    return "true"

}
