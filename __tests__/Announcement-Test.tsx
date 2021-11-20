import * as React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Announcements from '../screens/AnnouncementsModal';
configure({ adapter: new Adapter() });

describe('Testing Annoucements', () => {

    it("Announcements component renders default elements", async () => {
        const wrapper = shallow(<Announcements />)
        expect(wrapper.exists()).toBeTruthy
    });
    //Snapshot for placeholder
    //Snapshot for seperator

})
  
