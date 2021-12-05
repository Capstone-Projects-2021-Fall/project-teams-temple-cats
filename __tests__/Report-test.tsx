
import * as React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Mod from "../components/Mod"
import Report from '../components/Report';
import { TextInput } from 'react-native-gesture-handler';


configure({ adapter: new Adapter() });

describe('Testing Report', () => {

    it("Report component renders default elements", async () => {
        const wrapper = shallow(<Report />)
        expect(wrapper.exists()).toBeTruthy
    });

})

//Unsure how to mock text change
// it("onChange param is the same value as the input element's value property", () => {
//     const mockFn = jest.fn();
//     const input = shallow(Report<TextInput
//         value=""
//         placeholder=""
//         onChangeText={mockFn} />);

//     input.find('input').simulate('change', { target: { value: 'matched' } });
//     expect(mockFn.mock.calls[0][0]).toBe('matched');
// });

 //Snapshot test for placeholder
 //Snapshot test for enter reason for displaying this post is displayed



