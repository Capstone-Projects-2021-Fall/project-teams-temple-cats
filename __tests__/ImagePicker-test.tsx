
import * as React from 'react';
import Account from '../screens/Account';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import ImagePicker from "../components/ImagePicker"


configure({ adapter: new Adapter() });

it("Image picker component renders default elements", async () => {
    const wrapper = shallow(<ImagePicker />)
    expect(wrapper.exists()).toBeTruthy
});

it('All button actions work as expected', () => {
    const wrapper = shallow(
        <ImagePicker/>
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
        child.simulate('press');
    });
});

it("Camera button is correctly labeled", () => {
    const { getAllByText } = render(<ImagePicker/>)
    expect(getAllByText('From Camera').length).toBe(1);
});

it("Camera roll is correctly labeled", () => {
    const { getAllByText } = render(<ImagePicker/>)
    expect(getAllByText('From Camera Roll').length).toBe(1);
});

it("Close is correctly labeled", () => {
    const { getAllByText } = render(<ImagePicker/>)
    expect(getAllByText('Close').length).toBe(1);
});

//Unsure how to mock alert 
//Unsure how to mock functions due to coupling
