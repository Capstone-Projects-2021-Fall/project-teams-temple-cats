import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent} from '@testing-library/react-native';
import Navigation from "../navigation/index";
import CatForm from "../screens/CatForm";
import { Alert } from 'react-native';



//Check to make sure it has all the correct fields
//Check to make sure that the data is being uploaded
//Check that error message and activity returns when a field is not fully filled out 


it("renders default elements", () => {
  render(<CatForm/>);
});

//Add test id element to make it work

it('shows error message when all boxes are not filled out',() => {
  jest.spyOn(Alert, 'alert');
  const {getByTestId} = render(<CatForm/>);
  fireEvent.press(getByTestId("Submit.Button"));
  expect(Alert.alert).toHaveBeenCalledWith("Please fill out all required fields");

});


describe('Testing react navigation', () => {
    test('renders the title of form', async () => {
      const component = (
          <CatForm />
      );
      const { findByText } = render(component);
      const header = await findByText('Cat Form');
    });

  });

  
