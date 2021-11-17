import * as React from 'react';
import CatMap from '../components/CatMap'
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
 it("renders default elements", async () => {
   shallow(<CatMap />)
  });