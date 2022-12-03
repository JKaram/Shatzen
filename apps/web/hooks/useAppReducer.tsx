import { useReducer } from "react";
import { appReducer, APP_STATE } from "../reducers/appReducer";

const useAppReducer = () => useReducer(appReducer, APP_STATE);

export default useAppReducer;
