//import firebase from "firebase";
import firebase from "../utils/firebase";
import React from "react";
import { AuthContext } from "../context/FirebaseAuthContext";
import CatType from "../types/CatType";
import "firebase/database";


//const user = React.useContext(AuthContext);
const db = firebase.database().ref("Posts/");

class CatFormService {
  getAll() {
    return db;
  }

  create(tutorial: CatType) {
    return db.push(tutorial);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new CatFormService();