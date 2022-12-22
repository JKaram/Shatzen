import {
  Calculations,
  PossibleEstimates,
  Status,
  User,
} from "../types/aliases";

type Action =
  | { type: "UPDATE_USER"; payload: User }
  | { type: "UPDATE_CALCULATIONS"; payload: Calculations }
  | { type: "UPDATE_USERS"; payload: User[] }
  | { type: "SET_ROOM_ID"; payload: string }
  | { type: "UPDATE_STATUS"; payload: Status }
  | { type: "UPDATE_ESTIMATE_OPTIONS"; payload: PossibleEstimates }
  | { type: "RESET" };

export type AppState = {
  calculations: Calculations;
  estimateOptions: PossibleEstimates;
  roomId: string | null;
  roomStatus: Status;
  user: User | undefined;
  users: User[];
};

export const APP_STATE: AppState = {
  calculations: { average: null, mode: null },
  estimateOptions: [],
  roomId: null,
  roomStatus: "estimating",
  user: undefined,
  users: [],
};

export const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_CALCULATIONS":
      return {
        ...state,
        calculations: action.payload,
      };
    case "SET_ROOM_ID":
      return {
        ...state,
        roomId: action.payload,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        roomStatus: action.payload,
      };
    case "UPDATE_ESTIMATE_OPTIONS":
      return {
        ...state,
        estimateOptions: action.payload,
      };
    case "RESET": {
      return APP_STATE;
    }
    default:
      return state;
  }
};
