import { HashRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import SignUp from "./components/SignUp";
import Home from "./Home";

interface IRouter {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: IRouter) {
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <Route path="/">
            <Home />
          </Route>
        ) : (
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
