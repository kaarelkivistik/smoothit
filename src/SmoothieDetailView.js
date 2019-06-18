import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieForm from "./SmoothieForm";

const SmoothieDetailView = ({ smoothieId }) => {
  const getActiveSmoothie = useCallback(() => getSmoothie(smoothieId), [smoothieId]);
  const smoothie = usePromise(getActiveSmoothie);

  if (!smoothie) return null;

  return <SmoothieForm defaultValue={smoothie} onSave={updateSmoothie} />;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);
const updateSmoothie = smoothie =>
  fetchFromCatalogApi("/smoothies", {
    method: "PUT",
    body: smoothie
  });

export default SmoothieDetailView;
