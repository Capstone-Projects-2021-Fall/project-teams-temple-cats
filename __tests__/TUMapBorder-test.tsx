import React from 'react';
import renderer, { act } from 'react-test-renderer';

import TUMapBorder from '../components/TUMapBorder';

//Error is logging after snapshot test is finished to test coordinates, not sure why

// act(() => {

// it('Correct map border coordinates are rendered', () => {
//   const tree = renderer.create(<TUMapBorder />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// });

// Unsure how to test map border color 