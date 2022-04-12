import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { NameInput } from "./input";
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
      <Dialog open={show} onClose={() => toggle()} className="fixed z-10 inset-0 overflow-y-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded max-w-sm mx-auto">
          <Dialog.Title>Welcome</Dialog.Title>
          <Dialog.Description>Hey can you give me your name</Dialog.Description>
          <div>
            <label htmlFor="name" className="sr-only">
              Email
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Michael Scott"
            />
            <button
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
