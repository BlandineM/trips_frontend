import React from "react";
import Homepage from "./components/Homepage";
import Plage from "./components/Plage";
import Randonnee from "./components/Randonnee";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/plage" component={Plage} />
        <Route path="/randonnee" component={Randonnee} />
      </Switch>
    </div>
  );
}

export default App;
