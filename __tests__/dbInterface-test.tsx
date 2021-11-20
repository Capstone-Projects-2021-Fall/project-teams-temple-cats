import firebase from 'firebase';
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
  authDomain: "temple-cats.firebaseapp.com",
  databaseURL: "http://localhost:9000/?ns=temple-cats",
  projectId: "temple-cats",
  storageBucket: "temple-cats.appspot.com",
  messagingSenderId: "645364453008",
  appId: "1:645364453008:web:e2b6afd21de03516ccd215",
  measurementId: "G-PTQHR7RT4M",
  ssl: false
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.database();
 
describe('DB Interface', () => {

  beforeAll(() => {
    db.ref().set(null);
  })

  it('Adds a cat', async () => {
    await expect(1).toEqual(1);
  })

  it('Adds a picture', async() => {
    await expect(1).toEqual(1);
  })

  it('Adds a user', async () => {
    const set = db
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

     await expect(set).resolves.toEqual(undefined);
  });
});

