import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageHome from "./pages/PageHome";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PageHome} />
      </Switch>
    </Router>
  );
};

export default Routes;
