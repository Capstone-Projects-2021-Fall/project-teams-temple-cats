import * as React from 'react';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import Mod from "../components/Mod"
import Search from '../components/Report';
import { TextInput } from 'react-native-gesture-handler';
import Searchbar from "../components/Search"


configure({ adapter: new Adapter() });

describe('Testing Search', () => {

    it("Search component renders default elements", async () => {
        const wrapper = shallow(<Search />)
        expect(wrapper.exists()).toBeTruthy
    });

    it("Searchbar renders", async () => {
        const wrapper = shallow(<Searchbar />)
        expect(wrapper.exists()).toBeTruthy
    });

    //Snapshot for placeholder
    //Snapshot for seperator

})