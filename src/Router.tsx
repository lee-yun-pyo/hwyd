import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
