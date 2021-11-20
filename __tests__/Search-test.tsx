import * as React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Search from '../components/Search';


configure({ adapter: new Adapter() });

describe('Testing Search', () => {

    it("Search component renders default elements", async () => {
        const wrapper = shallow(<Search />)
        expect(wrapper.exists()).toBeTruthy
    });

   
    //Search bar renders
    //Snapshot for placeholder
    //Snapshot for seperator

})