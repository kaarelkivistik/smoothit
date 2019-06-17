import React, { useCallback, useEffect, useState } from "react";
import { fetchFromCatalogApi } from "./shared";
import SmoothieDetailView from "./SmoothieDetailView";

const App = () => {
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    getSmoothies().then(response => setSmoothies(response.content));
  }, []);

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
