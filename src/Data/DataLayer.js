import React, { createContext, useContext, useReducer } from "react";

// Creating the context
export const DataLayerContext = createContext();

// DataLayer component
export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

// Custom hook to use the context value
export const useDataLayerValue = () => useContext(DataLayerContext);
