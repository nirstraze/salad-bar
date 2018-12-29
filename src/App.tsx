import * as React from "react";

import { StageContainer } from "./components/stage-container";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">       
        <div className="store-header">Salad Bar</div>
        <StageContainer />
      </div>
    );
  }
}

export default App;
