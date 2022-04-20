import { Dialog } from "@headlessui/react";
import { useState } from "react";
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
        className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-start mt-8"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />
        <div className="bg-white z-20 rounded px-8 py-4 w-full md:w-1/2 mx-2 transition-all border-2 ">
          <Dialog.Title className="text-2xl font-bold text-center">Welcome 👋</Dialog.Title>
          <Dialog.Description className="mt-4">Please enter your name</Dialog.Description>

          <form className="">
            <fieldset>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="shadow-sm py-2 px-1  block w-full sm:text-sm border-gray-400 rounded"
                placeholder="Michael Scott"
              />
            </fieldset>

            <button
              type="submit"
              disabled={!name}
              className="mt-2 disabled:bg-gray-100 "
              onClick={() => {
                addUser(name);
                toggle();
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
