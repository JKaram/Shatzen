import React, { useContext, useState } from "react";
import { PossibleEstimates } from "../../types/aliases";
import Modal from "../Modal";
import { SocketContext } from "../Provider/SocketProvider";
import CustomEstimates from "./CustomEstimates";

export default function OptionsModal() {
  const { updateRoomOptions } = useContext(SocketContext);
  const [updatedOptions, setNewOptions] = useState({ possibleEstimates: [] });

  function onSave() {
    updateRoomOptions(updatedOptions);
  }

  function updateOptions(
    newOptions: Record<"possibleEstimates", PossibleEstimates>
  ) {
    setNewOptions(newOptions);
  }

  return (
    <Modal onSave={onSave}>
      <CustomEstimates updateOptions={updateOptions} />
    </Modal>
  );
}
