import React, { useCallback } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieForm from "./SmoothieForm";
import { useRefreshSmoothies } from "./SmoothiesProvider";

const SmoothieDetailView = ({ smoothieId, history }) => {
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

  const onDelete = useCallback(async () => {
    try {
      await deleteSmoothie(smoothieId);
      await refresh();
      history.replace("/");
    } catch (e) {
      alert("Could not delete the smoothie. Maybe try again?");
    }
  }, [smoothieId, history, refresh]);

  if (!smoothie) return null;

  return <SmoothieForm defaultValue={smoothie} onSave={onSave} onDelete={onDelete} />;
};

const getSmoothie = id => fetchFromCatalogApi(`/smoothies/${id}`);

const updateSmoothie = smoothie =>
  fetchFromCatalogApi("/smoothies", {
    method: "PUT",
    body: smoothie
  });

const deleteSmoothie = smoothieId =>
  fetchFromCatalogApi(`/smoothies/${smoothieId}`, {
    method: "DELETE"
  });

export default SmoothieDetailView;
