import React, { useCallback, useState } from "react";
import { fetchFromCatalogApi, usePromise } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";

const App = () => {
  const getSmoothiesContent = useCallback(() => getSmoothies().then(response => response.content), []);
  const smoothies = usePromise(getSmoothiesContent, []);

  const [selectedSmoothieId, setSelectedSmoothieId] = useState(null);
  const clearSelectedSmoothieId = useCallback(() => setSelectedSmoothieId(null), []);

  return (
    <>
      <ul>
        {smoothies.map(smoothie => (
          <SmoothieListItem
            key={smoothie.id}
            smoothie={smoothie}
            isActive={selectedSmoothieId === smoothie.id}
            onClick={setSelectedSmoothieId}
          />
        ))}
      </ul>

      <hr />

      {selectedSmoothieId !== null && (
        <SmoothieDetailView smoothieId={selectedSmoothieId} onClose={clearSelectedSmoothieId} />
      )}
    </>
  );
};

const getSmoothies = () => fetchFromCatalogApi("/smoothies");

const SmoothieListItem = ({ smoothie, isActive, onClick }) => (
  <li style={{ cursor: "pointer", fontWeight: isActive ? "bold" : "normal" }} onClick={() => onClick(smoothie.id)}>
    {smoothie.name}
  </li>
);

export default App;
