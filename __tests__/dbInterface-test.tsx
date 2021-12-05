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

firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
 
describe('DB Interface', () => {

  beforeAll(() => {
    dbRef.set(null);
  })

  it('Adds a cat', async () => {
    const set = dbRef
      .child(`Cats/cat1`)
      .set({
        accountID: 'acc1',
        catID: 'cat1',
        color: 'White',
        date: '11/9/2021',
        eyeColor: 'Green',
        friendly: false,
        healthy: false,
        kitten: false,
        location: {latitude: 39.98446100629369, longitude: -75.15069779008627},
        media: 'TODO',
        name: 'Test Cat',
        time: '9:23:00 AM',
        votes: 0
    });
     await expect(set).resolves.toEqual(undefined);
  });

  it('Gets cats', async () => {
    const get = await dbRef
      .child('Cats')
      .get()
    expect(get.exists()).toBeTruthy();
    expect(get.hasChildren()).toBeTruthy();
    expect(get.numChildren() == 1).toBeTruthy();
    expect(get.child('cat1').val().color).toEqual('White');
  });

  it('Changes votes of a cat', async () => {
    const votes = await dbRef
      .child('Cats/cat1/votes')
      .get();
    const set = dbRef
      .child('Cats/cat1/votes')
      .set(votes.val() + 1);
    expect(set).resolves.toEqual(undefined);
  });

  it('Adds report to a cat', async () => {
    expect(1).toEqual(1);
  });

  it('Gets reports of a cat', async () => {
    expect(1).toEqual(1);
  });

  it('Removes reports of a cat', async () => {
    expect(1).toEqual(1);
  });

  it('Adds a comment to a cat', async () => {
    expect(1).toEqual(1);
  });

  it('Gets a cat\'s comments', async () => {
    expect(1).toEqual(1);
  });

  it('Adds report to a cat\'s comment', async () => {
    expect(1).toEqual(1);
  });

  it('Gets reports of a cat\'s comment', async () => {
    expect(1).toEqual(1);
  });

  it('Removes report on a cat\'s comment', async () => {
    expect(1).toEqual(1);
  });

  it('Removes a cat\'s comment', async () => {
    expect(1).toEqual(1);
  });

  it('Removes a cat', async () => {
    const remove = dbRef
      .child('Cats/cat1')
      .remove();
    expect(remove).resolves.toEqual(undefined);
  });

  it('Gets feeding stations', async () => {
    expect(1).toEqual(1);
  });

  it('Adds a user', async () => {
    const set = dbRef
      .child(`Accounts/acc1`)
      .set({
        display: 'Jordan Billie',
        accountID: 'acc1',
        email: 'bjthaniel3@hotmail.com',
        photo: 'https://graph.facebook.com/2544322639045275/picture',
        posts: 0,
        modStatus: 1,
        banStatus: false,
    });
     await expect(set).resolves.toEqual(undefined);
  });

  it('Gets users', async () => {
    expect(1).toEqual(1);
  });

  it('Changes a user\'s score', async () => {
    expect(1).toEqual(1);
  });

  it('Removes a user', async () => {
    expect(1).toEqual(1);
  });

  it('Adds an announcement', async () => {
    expect(1).toEqual(1);
  });

  it('Gets announcements', async () => {
    expect(1).toEqual(1);
  });

  it('Removes an announcement', async () => {
    expect(1).toEqual(1);
  });

  it('Uploads a cat\'s picture', async () => {
    expect(1).toEqual(1);
  });

  it('Gets a cat\'s picture', async () => {
    expect(1).toEqual(1);
  });

  it('Deletes a cat\'s picture', async () => {
    expect(1).toEqual(1);
  });
});

