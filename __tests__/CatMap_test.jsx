import * as React from 'react';
import CatMap from '../components/CatMap'
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MapView from '../components/CatMap'

configure({ adapter: new Adapter() });
 it("renders default elements", async () => {
   shallow(<MapView />)
  });