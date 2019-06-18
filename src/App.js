import React, { useCallback } from "react";
import { Switch } from "react-router";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import NewSmoothieView from "./NewSmoothieView";
import { fetchFromCatalogApi, useRefreshablePromise } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";
import SmoothiesProvider from "./SmoothiesProvider";

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
          <Route path="/smoothies/:smoothieId" component={SmoothieDetailRoute} />
        </Switch>
      </SmoothiesProvider>
    </BrowserRouter>
  );
};

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const SmoothieListItem = ({ smoothie }) => (
  <li>
    <NavLink to={`/smoothies/${smoothie.id}`}>{smoothie.name}</NavLink>
  </li>
);

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
