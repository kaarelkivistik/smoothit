import React from "react";
import { fetchFromCatalogApi } from "./shared";
import SmoothieForm from "./SmoothieForm";

const NewSmoothieView = () => (
  <SmoothieForm
    defaultValue={{
      name: "A brand new smoothie",
      description: "Fill me in",
      instructions: "Fill me in",
      smoothieComponents: []
    }}
    onSave={createSmoothie}
  />
);

const createSmoothie = value =>
  fetchFromCatalogApi("/smoothies", {
    method: "POST",
    body: value
  });

export default NewSmoothieView;
