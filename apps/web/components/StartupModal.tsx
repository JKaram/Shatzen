import { Dialog } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { useState } from "react";

type Props = {
  show: boolean;
  toggle: Function;
  room: string;
};

export default function MyModal(props: Props) {
  const { show, toggle } = props;
  const [name, setName] = useState("");
  const [, setCookie] = useCookies(["name"]);

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        className="fixed inset-0 z-10 flex items-start justify-center mt-8 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />
        <div className="z-20 w-full px-8 py-4 mx-2 transition-all bg-white border-2 rounded md:w-1/2 ">
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
                className="block w-full px-1 py-2 border-gray-400 rounded shadow-sm sm:text-sm"
                placeholder="Michael Scott"
              />
            </fieldset>

            <button
              type="submit"
              disabled={!name}
              className="mt-2 disabled:bg-gray-100 "
              onClick={() => {
                setCookie("name", name);
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
