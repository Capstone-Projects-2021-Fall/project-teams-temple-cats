import * as React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import LeaderboardScreen from '../screens/Leaderboard';
import { RootTabScreenProps } from '../types';


it("renders default elements", () => {
    render(<LeaderboardScreen/>);
  });

  it("renders correct display element", () => {
     const {getAllByText} = render(<LeaderboardScreen/>);
     expect(getAllByText('Leaderboard').length).toBe(1);
  });