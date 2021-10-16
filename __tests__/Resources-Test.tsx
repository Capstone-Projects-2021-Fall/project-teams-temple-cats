import * as React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import ResourcesScreen from '../screens/Resources';
import { RootTabScreenProps } from '../types';


it("renders default elements", () => {
    render(<ResourcesScreen/>);
  });

  it("renders correct display element", () => {
     const {getAllByText} = render(<ResourcesScreen/>);
     expect(getAllByText('Resources').length).toBe(1);
  });