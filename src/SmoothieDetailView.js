import React, { useEffect, useState } from "react";
import { fetchFromCatalogApi } from "./shared";

const SmoothieDetailView = ({ smoothieId }) => {
  const [smoothie, setSmoothie] = useState();

  useEffect(() => {
    getSmoothie(smoothieId).then(response => setSmoothie(response));
  }, [smoothieId]);

  return <pre>{JSON.stringify(smoothie, null, 2)}</pre>;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);

export default SmoothieDetailView;
