import { createContext, useReducer } from "react";






type ActionType = {
  type: "LIGHT" | "DARK" | "TOGGLESCREEN" |  "TOGGLE"
  payload?: any
}

type stateType = {
  darkMode: boolean
  fullscreen: boolean
  dispatch?: React.Dispatch<ActionType>
}

const INITIAL_STATE = {
  darkMode: false,
  fullscreen: false,
  dispatch: (value: ActionType ) => {}
}
export const DarkModeContext = createContext(INITIAL_STATE);

const DarkModeReducer = (state: stateType, action: ActionType) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        ...state,
        darkMode: false,
      };
    }
    case "DARK": {
      return {
        ...state,
        darkMode: true,
      };
    }
    case "TOGGLESCREEN": {
      return {
        ...state,
        fullscreen: !state.fullscreen,
      };
    }
    case "TOGGLE": {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    default:
      return state;
  }
};



export const DarkModeContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode,fullscreen: state.fullscreen, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
