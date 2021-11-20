import * as React from 'react';
import CatForm from "../screens/CatForm";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CatImagePicker from "../screens/CatForm";

configure({ adapter: new Adapter() });
 it("renders default elements", async () => {
   shallow(<CatForm />)
  });


  
