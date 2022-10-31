import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { SocketContext } from "../Provider/SocketProvider";
import CustomEstimates from "./CustomEstimates";

export default function OptionsModal() {
  const { estimateOptions } = useContext(SocketContext);
  const [updatedOptions, setNewOptions] = useState({});

  function onSave() {
    console.log(updatedOptions);
  }

  function updateOptions(newOptions: Record<string, any>) {
    setNewOptions({ ...updatedOptions, newOptions });
  }

  return (
    <Modal onSave={onSave}>
      <CustomEstimates updateOptions={updateOptions} />
    </Modal>
  );
}
