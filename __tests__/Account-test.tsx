import * as React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import Account from '../screens/Account';
import LoginAuthentication from '../components/LoginAuthentication';

import { RootTabScreenProps } from '../types';


it("renders default elements", () => {
    render(<Account/>);
  });

  it("renders correct display element", () => {
     const {getAllByText} = render(<Account/>);
     expect(getAllByText('Account').length).toBe(1);
  });