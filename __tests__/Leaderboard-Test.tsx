import * as React from 'react';
import LeaderboardScreen from '../screens/Leaderboard';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
 it("renders default elements", async () => {
   shallow(<LeaderboardScreen />)
  });

  it('calls actions as expected when pressing buttons', () => {
    const wrapper = shallow(
        <LeaderboardScreen />
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
        child.simulate('press');
    });
});


