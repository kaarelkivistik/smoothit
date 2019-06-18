import React, { useCallback } from "react";
import { Switch } from "react-router";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";

const App = () => {
  const getSmoothiesContent = useCallback(() => getSmoothies().then(response => response.content), []);
  const smoothies = usePromise(getSmoothiesContent, []);

  return (
    <BrowserRouter>
      <>
        <ul>
          {smoothies.map(smoothie => (
            <SmoothieListItem key={smoothie.id} smoothie={smoothie} />
          ))}
          <NewSmoothieListItem />
        </ul>

        <hr />

        <Switch>
          <Route path="/smoothies/:smoothieId" component={SmoothieDetailRoute} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const SmoothieListItem = ({ smoothie }) => (
  <li>
    <NavLink to={`/smoothies/${smoothie.id}`}>{smoothie.name}</NavLink>
  </li>
);

const SmoothieDetailRoute = ({ match }) => {
  const id = Number(match.params.smoothieId);

  return <SmoothieDetailView key={id} smoothieId={id} />;
};

export default App;
