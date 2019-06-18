import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { fetchFromCatalogApi } from "./shared";
import SmoothieForm from "./SmoothieForm";
import { useRefreshSmoothies } from "./SmoothiesProvider";

const NewSmoothieView = ({ history }) => {
  const refresh = useRefreshSmoothies();

  const onSave = useCallback(
    async value => {
      try {
        const newSmoothie = await createSmoothie(value);
        await refresh();
        history.replace(`/smoothies/${newSmoothie.id}`);
      } catch (e) {
        alert("Uh-oh! There was a problem creating your smoothie. Maybe try again?");
      }
    },
    [history, refresh]
  );

  return (
    <SmoothieForm
      defaultValue={{
        name: "A brand new smoothie",
        description: "Fill me in",
        instructions: "Fill me in",
        smoothieComponents: []
      }}
      onSave={onSave}
    />
  );
};

const createSmoothie = value =>
  fetchFromCatalogApi("/smoothies", {
    method: "POST",
    body: value
  });

export default withRouter(NewSmoothieView);
