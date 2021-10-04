import { Component } from "react";
import CatDataService from "../services/CatFormService";
import Tutorial from "./Form";
import CatType from '../types/CatType';
import React from "react";

type Props = {};

type State = {
  tutorials: Array<CatType>,
  currentTutorial: CatType | null,
  currentIndex: number
};

export default class CatList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    CatDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    CatDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items: any) {
    let tutorials = new Array<CatType>();

    items.forEach((item: any) => {
      let key = item.key;
      let data = item.val();
      tutorials.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      tutorials: tutorials,
    });
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial: CatType, index: number) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    CatDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {  const { tutorials, currentTutorial, currentIndex } = this.state;

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={this.removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial
            tutorial={currentTutorial}
            refreshList={this.refreshList}
          />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  ); }
}