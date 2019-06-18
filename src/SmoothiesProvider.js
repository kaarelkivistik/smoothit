import React, { createContext, useContext } from "react";

const SmoothiesContext = createContext();

const SmoothiesProvider = ({ refreshSmoothies, ...props }) => (
  <SmoothiesContext.Provider value={refreshSmoothies} {...props} />
);

export const useRefreshSmoothies = () => useContext(SmoothiesContext);

export default SmoothiesProvider;
