
import { Cat } from '../types';
import { User } from '../types'


describe('Cat Types User', () => {
    it('Correct cat properties are being passed', async () => {
        const cat: Cat = ({
            catID: "test",
            comments: 'test',
            name: 'test',
            color: 'test',
            eyeColor: 'test',
            media: 'test',
            friendly: false,
            healthy: false,
            kitten: false,
            location: {latitude: 39, longitude: -75},
            date: new Date(),
            time: new Date(),
            votes: 0,
            accountID: 'test',
          });

          expect(cat).toEqual(expect.objectContaining({
            catID: expect.any(String),
            comments: expect.any(String),
            name: expect.any(String),
            color: expect.any(String),
            eyeColor: expect.any(String),
            media: expect.any(String),
            friendly: expect.any(Boolean),
            healthy: expect.any(Boolean),
            kitten: expect.any(Boolean),
            date: expect.any(Date),
            time: expect.any(Date),
            votes: expect.any(Number),
            accountID: expect.any(String),
          }));

          for(const i in cat){
            expect(cat[i]).not.toEqual('')
        }
        
    });

    it('Cat properties contain incorrect values', async () => {
        const cat: Cat = ({
            catID: "",
            comments: '',
            name: '',
            color: '',
            eyeColor: '',
            media: '',
            friendly: null,
            healthy: null,
            kitten: null,
            location: {latitude: 39, longitude: -75},
            date: new Date(),
            time: new Date(),
            votes: 0,
            accountID: 'test',
          });

          expect(cat).not.toEqual(expect.objectContaining({
            catID: expect.any(String),
            comments: expect.any(String),
            name: expect.any(String),
            color: expect.any(String),
            eyeColor: expect.any(String),
            media: expect.any(String),
            friendly: expect.any(Boolean),
            healthy: expect.any(Boolean),
            kitten: expect.any(Boolean),
            date: expect.any(Date),
            time: expect.any(Date),
            votes: expect.any(Number),
            accountID: expect.any(String),
          }));
        });


    it('Correct user properties are being passed', async () => {

        const user: User = ({
            displayName: "test",
            accountID: 'test',
            email: 'test',
            photo: 'test',
            points: 0,
            posts: 0,
            modStatus: 1,
            banStatus: false,
          });

          expect(user).toEqual(expect.objectContaining({
            displayName: expect.any(String),
            accountID: expect.any(String),
            email: expect.any(String),
            photo: expect.any(String),
            points: expect.any(Number),
            posts: expect.any(Number),
            modStatus: expect.any(Number),
            banStatus: expect.any(Boolean),
          }));

          for(const i in user){
            expect(user[i]).not.toEqual('')
        }

    });


    it('User properties contain incorrect values', async () => {

        const user: User = ({
            displayName: null,
            accountID: '',
            email: null,
            photo: null,
            points: 0,
            posts: 0,
            modStatus: 1,
            banStatus: false,
          });

          expect(user).not.toEqual(expect.objectContaining({
            displayName: expect.any(String),
            accountID: expect.any(String),
            email: expect.any(String),
            photo: expect.any(String),
            points: expect.any(Number),
            posts: expect.any(Number),
            modStatus: expect.any(Number),
            banStatus: expect.any(Boolean),
          }))

    });
    
  });
