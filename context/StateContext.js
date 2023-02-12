import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
const Context = createContext();
const StateContext = ({ children }) => {
  const [locationID, setLocationID] = useState("324469");
  return (
    <Context.Provider
      value={{
        setLocationID,
        locationID,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
