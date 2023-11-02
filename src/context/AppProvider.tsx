import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  Dispatch,
  useContext,
} from "react";

import { Contact, ContactAction } from "./contact/interface";
import { contactReducer } from "./contact/reducer";

export type State = {
  contact: Contact[] | null;
};

const initialState = {
  contact: [],
};

type AppData = State;
type AppAction = ContactAction;

function appDataReducer(state: AppData, action: AppAction): AppData {
  return {
    contact: contactReducer(state.contact, action as ContactAction),
  };
}

const AppContext = createContext<{
  state: AppData;
  dispatch: Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  useEffect(() => {
    localStorage.setItem("phone-book", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export { useAppContext, AppContextProvider };
