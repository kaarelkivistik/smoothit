import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";

const SmoothieDetailView = ({ smoothieId }) => {
  const getActiveSmoothie = useCallback(() => getSmoothie(smoothieId), [smoothieId]);
  const smoothie = usePromise(getActiveSmoothie);

  return <pre>{JSON.stringify(smoothie, null, 2)}</pre>;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);

export default SmoothieDetailView;
