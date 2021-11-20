import * as React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import pawUrl from "../screens/Resources"
import pawSevices from "../screens/Resources"

import ResourcesScreen from '../screens/Resources';

configure({ adapter: new Adapter() });


it("Resource component renders default elements", () => {
   const originalError = console.error;
   console.error = jest.fn();
   const wrapper = shallow(<ResourcesScreen />)
   expect(wrapper.exists()).toBeTruthy
   console.error = originalError;
  });

 

