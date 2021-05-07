import React, { useReducer, useContext, createContext } from "react";
import { StorageKeys } from "configs";

const initialState = {
  modeTheme: process.env.REACT_APP_THEME,
  language: process.env.REACT_APP_LANGUAGE,
  setModeTheme: () => {},
  setLanguage: () => {}
};

const GlobalContext = createContext(initialState);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_MODE_THEME": {
      localStorage.setItem(StorageKeys.DARK_MODE, JSON.stringify(payload));
      return {
        ...state,
        modeTheme: payload
      };
    }
    case "SET_LANGUAGE": {
      return {
        ...state,
        language: payload
      };
    }
    default:
      return state;
  }
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _handleSetModeTheme = mode => {
    dispatch({
      type: "SET_MODE_THEME",
      payload: mode
    });
  };

  const _handleChangeLanguage = language => {
    dispatch({
      type: "SET_LANGUAGE",
      payload: language
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setModeTheme: _handleSetModeTheme,
        setLanguage: _handleChangeLanguage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalContext };
