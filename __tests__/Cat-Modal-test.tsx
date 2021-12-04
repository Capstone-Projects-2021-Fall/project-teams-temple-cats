
import * as React from 'react';
import Account from '../screens/Account';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react-native';
import CatModal from "../screens/CatModal"


//configure({ adapter: new Adapter() });

//Unsure how to solve route.params issue

// it("Image picker component renders default elements", async () => {
//     const wrapper = shallow(<CatModal />)
//     expect(wrapper.exists()).toBeTruthy
// });

// it('All button actions work as expected', () => {
//     const wrapper = shallow(
//         <CatModal/>
//     );
//     const render = wrapper.dive();
//     render.find('TouchableOpacity').forEach(child => {
//         child.simulate('press');
//     });
// });

// it("Report button is correctly labeled", () => {
//     const { getAllByText } = render(<CatModal/>)
//     expect(getAllByText('Report').length).toBe(1);
// });

// it("Date sighted is labeled correctly", () => {
//     const { getAllByText } = render(<CatModal/>)
//     expect(getAllByText('Report').length).toBe(1);
// });

// it("Delete is labeled correctly", () => {
//     const { getAllByText } = render(<CatModal/>)
//     expect(getAllByText('Report').length).toBe(1);
// });


//Unsure how to mock moderator functionalities

