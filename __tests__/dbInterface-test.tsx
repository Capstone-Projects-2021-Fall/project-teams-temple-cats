import firebase from '../utils/firebase';

// const firebase = require('@firebase/testing')
// const admin = require('firebase-admin')

import { addUser } from '../utils/dbInterface';

// const projectId = 'test';
// process.env.GCLOUD_PROJECT = projectId;
// process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
// let app = admin.initializeApp();

// const firebaseConfig = {
//   apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
//   authDomain: "temple-cats.firebaseapp.com",
//   databaseURL: "https://temple-cats-default-rtdb.firebaseio.com",
//   projectId: "temple-cats",
//   storageBucket: "temple-cats.appspot.com",
//   messagingSenderId: "645364453008",
//   appId: "1:645364453008:web:e2b6afd21de03516ccd215",
//   measurementId: "G-PTQHR7RT4M"
// };

// if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

let db = firebase.database();
db.useEmulator('localhost', 9000);

jest.mock('../utils/firebase', () => {
  const set = jest.fn();
  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});
 
describe('DB Interface', () => {
  it('Adds a user', async () => {
    const set = firebase
      .database()
      .ref()
      .child(`Accounts/krs8Lf6EXbb9GTBmQlaj4nvx1CA2`)
      .set({
        display: 'Jordan Billie',
        accountID: 'krs8Lf6EXbb9GTBmQlaj4nvx1CA2',
        email: 'bjthaniel3@hotmail.com',
        photo: 'https://graph.facebook.com/2544322639045275/picture',
        posts: 0,
        modStatus: 1,
        banStatus: false,
      });
     
    // const result = addUser(
    //   'Jordan Billie',
    //   'krs8Lf6EXbb9GTBmQlaj4nvx1CA2',
    //   'bjthaniel3@hotmail.com',
    //   'https://graph.facebook.com/2544322639045275/picture'
    // );
 
   await expect(set).resolves.toEqual("true");    
  });
});

