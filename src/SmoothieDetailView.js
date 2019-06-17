import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieForm from "./SmoothieForm";

const SmoothieDetailView = ({ smoothieId }) => {
  const getActiveSmoothie = useCallback(() => getSmoothie(smoothieId), [smoothieId]);
  const smoothie = usePromise(getActiveSmoothie);

  if (!smoothie) return null;

  return <SmoothieForm defaultValue={smoothie} />;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);

export default SmoothieDetailView;
