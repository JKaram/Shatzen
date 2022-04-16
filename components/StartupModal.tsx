import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { useSockets } from "./provider/SocketProvider";
type Props = {
  show: boolean;
  toggle: Function;
};
export default function MyModal(props: Props) {
  const { show, toggle } = props;
  const { addUser } = useSockets();
  const [name, setName] = useState("");

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-start m-8"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white z-20 rounded px-8 py-4  border-2 ">
          <Dialog.Title className="text-lg font-bold">Willkommen</Dialog.Title>
          <Dialog.Description>Hey can you give me your name</Dialog.Description>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="shadow-sm py-2 px-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-400 rounded"
              placeholder="Michael Scott"
            />
          </div>
          <div>
            <button
              disabled={!name}
              className="mt-2 disabled:bg-gray-100 "
              onClick={() => {
                addUser(name);
                toggle();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
