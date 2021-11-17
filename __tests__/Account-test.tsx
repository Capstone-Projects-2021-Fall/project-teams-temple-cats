
import * as React from 'react';
import Account from '../screens/Account';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Mod from "../components/Mod"


configure({ adapter: new Adapter() });

describe('Testing Account', () => {

    it("Account component renders default elements", async () => {
        shallow(<Account />)
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

})

describe('Testing Mod', () => {

    it("First mod button renders correct title", () => {
        const { getAllByText } = render(<Mod />);
        expect(getAllByText('Reported Posts').length).toBe(1);
    });

    it("Second mod button renders correct title", () => {
        const { getAllByText } = render(<Mod />);
        expect(getAllByText('Downvoted Posts').length).toBe(1);
    });

})

 //Test to check if mod buttons render if moderator
 //Test that all mod buttons work
 //Testing account buttons possibly through snapshot








