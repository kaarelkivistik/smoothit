import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieForm from "./SmoothieForm";
import { useRefreshSmoothies } from "./SmoothiesProvider";

const SmoothieDetailView = ({ smoothieId }) => {
  const getActiveSmoothie = useCallback(() => getSmoothie(smoothieId), [smoothieId]);
  const smoothie = usePromise(getActiveSmoothie);

  const refresh = useRefreshSmoothies();

  const onSave = useCallback(
    async value => {
      try {
        await updateSmoothie(value);
        refresh();
      } catch (e) {
        alert("Could not update your smoothie. Maybe try again?");
      }
    },
    [refresh]
  );

  if (!smoothie) return null;

  return <SmoothieForm defaultValue={smoothie} onSave={onSave} />;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);
const updateSmoothie = smoothie =>
  fetchFromCatalogApi("/smoothies", {
    method: "PUT",
    body: smoothie
  });

export default SmoothieDetailView;
