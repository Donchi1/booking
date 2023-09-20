import React, { createContext, useReducer } from "react";

type SearchActions = {
  type: "NEW_SEARCH" | "CHANGE_DATE" | "RESET_SEARCH";
  payload?: any; 
}


type stateType = {
  city: undefined,
  destination: undefined,
  dates: [{endDate: Date, startDate: Date}],
  options: {
    adult: number,
    children: number,
    room: number,
  },
 dispatch?: React.Dispatch<SearchActions>
}

const INITIAL_STATE = {
  city: undefined,
  destination: undefined,
  dates: [{endDate: new Date(), startDate: new Date()}],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
  dispatch: (value:SearchActions) => {}
};



export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state:stateType, action: SearchActions) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
      case "CHANGE_DATE":
        return {...state, dates:action.payload}
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};



















