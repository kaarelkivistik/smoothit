import React, { useCallback } from "react";
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
        </ul>

        <hr />

        <Route
          path="/smoothies/:smoothieId"
          render={props => <SmoothieDetailView smoothieId={Number(props.match.params.smoothieId)} />}
        />
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

export default App;
