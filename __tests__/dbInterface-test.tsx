import React from 'react';
import { addUser } from '../utils/dbInterface';
import firebase from '../utils/firebase';


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
 
describe('Add User', () => {
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
     
 
    const result = addUser(
      'Jordan Billie',
      'krs8Lf6EXbb9GTBmQlaj4nvx1CA2',
      'bjthaniel3@hotmail.com',
      'https://graph.facebook.com/2544322639045275/picture'
    );

 
   await expect(result).resolves.toEqual("true");
 
    //expect(set).toHaveBeenCalledTimes(1);

 
    // expect(set).toHaveBeenCalledWith({
    //   courseId: 'THE_ROAD_TO_GRAPHQL',
    //   packageId: 'STUDENT',
    //   invoice: {
    //     createdAt: 'TIMESTAMP',
    //     amount: 0,
    //     licensesCount: 1,
    //     currency: 'USD',
    //     paymentType: 'FREE',
    //   },
    // });
    
  });
  
});

