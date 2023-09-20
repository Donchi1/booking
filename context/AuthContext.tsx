import axios from "@/hooks/axios";
import React, { createContext, useEffect, useReducer } from "react";
import Loader from "@/components/loader/loader";
import { UserType } from "@/pages/admin/utils/types";

type AuthActions = {
  type: "FETCHING" | "FETCHING_ERROR" | "GET_CURRENT_USER" | "LOGIN_SUCCESS" | "LOGOUT";
  payload?: any; 
}


type stateType = {
  user: UserType | null | undefined,
  loading: boolean,
  dispatch: React.Dispatch<AuthActions>
  
}

const INITIAL_STATE : stateType = {
  user: null,
  loading: true,
  dispatch: (value: AuthActions) => {}
};




export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state:stateType, action:AuthActions) => {
  switch (action.type) {
    
    case "FETCHING":
      return {
        ...state,
        loading: true
      };
    case "FETCHING_ERROR":
      return {
        ...state,
        loading: false
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,  
        loading: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload, 
        loading: false    
      };
   
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }:{children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const id = localStorage.getItem("userId") || null
 


  useEffect(() => {
  const getUser = async() => {
    dispatch({type: "FETCHING"})
    try{
    const res = await axios.get(`/api/routes/users/getuser/${id}`)
  
    dispatch({type: "GET_CURRENT_USER", payload: res.data.user})
    
  }catch(error){
      dispatch({type: "FETCHING_ERROR"})
    }
  }
  getUser()
   }, [id])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        dispatch 
      }}
    >
      {state.loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
