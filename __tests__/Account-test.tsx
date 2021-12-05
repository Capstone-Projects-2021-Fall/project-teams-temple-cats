
import * as React from 'react';
import Account from '../screens/Account';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Mod from "../components/Mod"


configure({ adapter: new Adapter() });

describe('Testing Account', () => {

    it("Account component renders default elements", async () => {
        const wrapper = shallow(<Account />)
        expect(wrapper.exists()).toBeTruthy
    });

    it('All button actions work as expected', () => {
        const wrapper = shallow(
            <Account />
        );
        const render = wrapper.dive();
        render.find('TouchableOpacity').forEach(child => {
            child.simulate('press');
        });
    });

 
    it("Sign out button renders correct title", () => {
        const { getAllByText } = render(<Account />);
        expect(getAllByText('Sign Out').length).toBe(1);
    });

})

describe('Testing Mod', () => {

    it("Moderator button for reported posts is correctly labeled", () => {
        const { getAllByText } = render(<Mod />);
        expect(getAllByText('Reported Posts').length).toBe(1);
    });

    it("Moderator button for downvoted posts is correctly labeled", () => {
        const { getAllByText } = render(<Mod />);
        expect(getAllByText('Downvoted Posts').length).toBe(1);
    });

    //Moderator buttons are rendered if user is a moderator. Not sure how to mock due to coupling

})

 








