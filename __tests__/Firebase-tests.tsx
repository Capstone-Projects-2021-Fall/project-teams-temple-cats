describe('Firebase', () => {

    afterEach(() => {
        jest.resetModules();
      });

test('firebase initializeApp called with firebase environment variables', () => {
    const firebase = require('firebase');
    jest.mock('firebase');

    const env = process.env;
    process.env = {
      REACT_APP_FIREBASE_KEY: 'key',
      REACT_APP_FIREBASE_DOMAIN: 'domain',
      REACT_APP_FIREBASE_DATABASE: 'database',
      REACT_APP_FIREBASE_PROJECT_ID: 'project',
      REACT_APP_FIREBASE_STORAGE_BUCKET: 'bucket',
      REACT_APP_FIREBASE_SENDER_ID: 'sender',
      REACT_APP_EXTRA_KEY: 'extra',
    };

    const expectedConfig = {
        apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
        authDomain: "temple-cats.firebaseapp.com",
        databaseURL: "https://temple-cats-default-rtdb.firebaseio.com",
        projectId: "temple-cats",
        storageBucket: "temple-cats.appspot.com",
        messagingSenderId: "645364453008",
        appId: "1:645364453008:web:e2b6afd21de03516ccd215",
        measurementId: "G-PTQHR7RT4M"
      };

    let mockInitializeApp = jest.fn();
    firebase.initializeApp = mockInitializeApp;
    firebase.apps = [];

    require('../utils/firebase');
    expect(mockInitializeApp.mock.calls[0][0]).toEqual(expectedConfig);

    process.env = env;
  });


});
