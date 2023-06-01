import { HashRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import SignUp from "./components/SignUp";
import Home from "./Home";
import Profile from "./components/Profile";

interface IRouter {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: IRouter) {
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
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
