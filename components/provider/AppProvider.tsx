import { AppStatus } from "../../types/aliases";
import React, { createContext, useState } from "react";

type Values = {
  appStatus: AppStatus;
  changeAppStatus: (status: AppStatus) => void;
};
const initalValues: Values = {
  appStatus: "loading",
  changeAppStatus: () => {},
};

export const AppContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

export default function AppProvider(props: Props) {
  const { children } = props;
  const [appStatus, setAppStatus] = useState(initalValues.appStatus);

  const changeAppStatus = (status: AppStatus) => setAppStatus(status);

  return (
    <AppContext.Provider
      value={{
        appStatus: appStatus,
        changeAppStatus: changeAppStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
