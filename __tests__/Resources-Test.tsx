import * as React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import ResourcesScreen from '../screens/Resources';
import { RootTabScreenProps } from '../types';
import urlPaws from '../screens/Resources'


it("renders default elements", () => {
   const originalError = console.error;
   console.error = jest.fn();
   render(<ResourcesScreen/>);
   console.error = originalError;
  });

  



