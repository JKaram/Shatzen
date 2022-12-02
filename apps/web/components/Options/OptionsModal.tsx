import React, { useContext, useState } from "react";
import { Config } from "../../types/aliases";
import Modal from "../Modal";
import { SocketContext } from "../../providers/SocketProvider";
import CustomEstimates from "./CustomEstimates";

type Props = {
  close: () => void;
  show: boolean;
};

export default function OptionsModal(props: Props) {
  const { updateRoomOptions } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [updatedConfigOptions, setNewConfigOptions] = useState<Config>({
    possibleEstimates: [],
  });

  function onSave() {
    if (updatedConfigOptions.possibleEstimates.length === 0) {
      setMessage("You should at least have one estimate option!");
      return;
    }
    setMessage("");
    updateRoomOptions(updatedConfigOptions);
    props.close();
  }

  function updateConfig(newConfigOptions: Partial<Config>) {
    setNewConfigOptions({ ...updatedConfigOptions, ...newConfigOptions });
  }

  return (
    <Modal
      close={props.close}
      show={props.show}
      onSave={onSave}
      message={message}
      cbOnClose={() => setMessage("")}
    >
      <h2 className="mb-1 text-xl font-semibold">Room Options</h2>
      <CustomEstimates updateConfig={updateConfig} />
    </Modal>
  );
}
