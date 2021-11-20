import * as React from 'react';
import LeaderboardScreen from '../screens/Leaderboard';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Leaderboard from '../screens/Leaderboard';
import Button from '../screens/Leaderboard';

configure({ adapter: new Adapter() });

describe('Testing Leaderboard', () => {

 it("Leaderboard component renders all default elements", async () => {
  const wrapper = shallow(<LeaderboardScreen />)
  expect(wrapper.exists()).toBeTruthy
  });

  it('All leaderboard buttons work as expected', () => {
    const wrapper = shallow(
        <LeaderboardScreen />
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
        child.simulate('press');
    });
});

it('Leaderboard components render interactive board', () => {
    const wrapper = shallow(<LeaderboardScreen/>);
    expect(wrapper.find(Leaderboard)).toBeDefined();
  });

})

 

