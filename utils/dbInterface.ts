import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Announcement, Cat, Badge, User, AnnouncementFeeder, CommentType,
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

export async function sendPushNotificationWithWord(array: string[], name: String) {

  for (let i = 0; i < array.length; i++) {

    const message = {
      to: array[i],
      sound: 'default',
      title: 'Temple Cats',
      body: 'Comment has been submitted on Cat: ' + name,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}

export async function sendPushNotificationWithWordReport(array: string[], name: String) {

  for (let i = 0; i < array.length; i++) {

    const message = {
      to: array[i],
      sound: 'default',
      title: 'Temple Cats',
      body: 'A report has been made on Cat '  + name,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}

export async function sendPushNotification(array: string[], bodyText: string) {

  for (let i = 0; i < array.length; i++) {

    const message = {
      to: array[i],
      sound: 'default',
      title: 'Temple Cats',
      body: bodyText,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}


