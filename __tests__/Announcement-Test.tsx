import * as React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import ModalScreen from '../screens/AnnouncementsModal';

it("renders default elements", () => {
    render(<ModalScreen/>);
  });

  it("renders correct display element", () => {
     const {getAllByText} = render(<ModalScreen/>);
     expect(getAllByText('Announcements are going to be built in here').length).toBe(1);
  });

  //Annoucements to be merged with Christine's PR

  
