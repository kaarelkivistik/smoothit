import React, { useState, useEffect } from "react";
import { fetchFromCatalogApi } from "./shared";

const App = () => {
  const [smoothies, setSmoothies] = useState();

  useEffect(() => {
    getSmoothies().then(response => setSmoothies(response));
  }, []);

  return <pre>{JSON.stringify(smoothies, null, 2)}</pre>;
};

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

export default App;
