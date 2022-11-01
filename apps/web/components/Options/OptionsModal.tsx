import React, { useContext, useState } from "react";
import { RoomOptions } from "../../types/aliases";
import Modal from "../Modal";
import { SocketContext } from "../Provider/SocketProvider";
import CustomEstimates from "./CustomEstimates";

type Props = {
  close: () => void;
  show: boolean;
};

export default function OptionsModal(props: Props) {
  const { updateRoomOptions } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [updatedOptions, setNewOptions] = useState<RoomOptions>({
    possibleEstimates: [],
  });

  function onSave() {
    if (updatedOptions.possibleEstimates.length === 0) {
      setMessage("You should at least have one estimate option!");
      return;
    }
    setMessage("");
    updateRoomOptions(updatedOptions);
    props.close();
  }

  function updateOptions(newOptions: Partial<RoomOptions>) {
    setNewOptions({ ...updatedOptions, ...newOptions });
  }

  return (
    <Modal
      close={props.close}
      show={props.show}
      onSave={onSave}
      message={message}
    >
      <CustomEstimates updateOptions={updateOptions} />
    </Modal>
  );
}
