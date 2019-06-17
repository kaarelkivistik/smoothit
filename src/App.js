import React, { useState, useEffect } from "react";
import { fetchFromCatalogApi } from "./shared";

const App = () => {
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    getSmoothies().then(response => setSmoothies(response.content));
  }, []);

  return (
    <ul>
      {smoothies.map(smoothie => (
        <Smoothie key={smoothie.id} smoothie={smoothie} />
      ))}
    </ul>
  );
};

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const Smoothie = ({ smoothie }) => <li>{smoothie.name}</li>;

export default App;
