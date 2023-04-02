import { HashRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
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
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
