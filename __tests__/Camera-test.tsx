import * as React from 'react';
import Camera from '../components/Camera'
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Mod from "../components/Mod"

configure({ adapter: new Adapter()});

describe('Testing Camera', () => {

    it("Camera component renders default elements", async () => {
        const wrapper = shallow(<Camera />)
        expect(wrapper.exists()).toBeTruthy
    });

    it('All touchable functionalities work as expected', () => {
        const wrapper = shallow(
            <Camera />
        );
        const render = wrapper.dive();
        render.find('TouchableOpacity').forEach(child => {
            child.simulate('press');
        });
    });

})