import firebase from "firebase";
import ITutorialData from "../types/Cat-type"

const db = firebase.ref("/");

class TutorialDataService {
  getAll() {
    return db;
  }

  create(tutorial: ITutorialData) {
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

export default new TutorialDataService();