import {
  useState,
  useEffect,
  useReducer,
  createContext,
  Dispatch,
} from "react";
import { common } from "./reducers/common";

// initial state
const initialState = {
  user: { name: "sunao" },
  minTopValue: 500,
  regMobileSuccess: true,
  createHomeSuccess: true,
};

// { state: any; dispatch: Dispatch<any>

interface IContext {
  state: any;
  dispatch: Dispatch<any>;
}

// create context
const Context = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
});

// combine reducer function
const combineReducers =
  (...reducers: any) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(combineReducers(common), initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
