import React, { createContext, useContext, useState } from "react";
import OptionsModal from "../components/Options/OptionsModal";

const initalValues = {
  open: () => undefined,
  close: () => undefined,
};

export const ModalContext = createContext(initalValues);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  function closeOptions() {
    setShow(false);
  }

  function openOptions() {
    setShow(true);
  }

  return (
    <ModalContext.Provider value={{ open: openOptions, close: closeOptions }}>
      {children}
      <OptionsModal show={show} close={closeOptions} />
    </ModalContext.Provider>
  );
};
