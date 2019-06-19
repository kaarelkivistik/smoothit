import React, { useCallback } from "react";
import { matchPath, Switch, withRouter } from "react-router";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import NewSmoothieView from "./NewSmoothieView";
import { fetchFromCatalogApi, useRefreshablePromise } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";
import SmoothiesProvider, { useRefreshSmoothies } from "./SmoothiesProvider";

const App = () => {
  const getSmoothiesContent = useCallback(() => getSmoothies().then(response => response.content), []);
  const [smoothies, refreshSmoothies] = useRefreshablePromise(getSmoothiesContent, []);

  return (
    <BrowserRouter>
      <SmoothiesProvider refreshSmoothies={refreshSmoothies}>
        <ul>
          {smoothies.map(smoothie => (
            <SmoothieListItem key={smoothie.id} smoothie={smoothie} />
          ))}
          <NewSmoothieListItem />
        </ul>

        <hr />

        <Switch>
          <Route path="/smoothies/new" component={NewSmoothieView} />
          <Route {...smoothieDetailRouteProps} component={SmoothieDetailRoute} />
        </Switch>
      </SmoothiesProvider>
    </BrowserRouter>
  );
};

const smoothieDetailRouteProps = { path: "/smoothies/:smoothieId" };

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const SmoothieListItem = withRouter(({ smoothie, location, history }) => {
  const refresh = useRefreshSmoothies();
  
  const deleteThisSmoothie = useCallback(async () => {
    await deleteSmoothie(smoothie.id);
    await refresh();

    const match = matchPath(location.pathname, smoothieDetailRouteProps);
    if (match && smoothie.id === Number(match.params.smoothieId)) history.replace("/");
  }, [smoothie, location, history, refresh]);

  return (
    <li>
      <NavLink to={`/smoothies/${smoothie.id}`}>{smoothie.name}</NavLink>{" "}
      <button type="button" onClick={deleteThisSmoothie}>
        delete
      </button>
    </li>
  );
});

const deleteSmoothie = smoothieId =>
  fetchFromCatalogApi(`/smoothies/${smoothieId}`, {
    method: "DELETE"
  });

const NewSmoothieListItem = () => (
  <li>
    <NavLink to="/smoothies/new">
      <i>Create a smoothie</i>
    </NavLink>
  </li>
);

const SmoothieDetailRoute = ({ match }) => {
  const id = Number(match.params.smoothieId);

  return <SmoothieDetailView key={id} smoothieId={id} />;
};

export default App;
