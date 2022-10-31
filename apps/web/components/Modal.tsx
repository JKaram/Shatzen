import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  onSave: () => void;
};

export default function Modal(props: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} className="" onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0">
        <Dialog.Panel className="bg-white min-h-screen flex flex-col">
          <Dialog.Title className="p-2 text-2xl">OPTIONS</Dialog.Title>
          <div className="p-2 flex-grow">{props.children}</div>
          <div className="flex flex-col space-y-1 p-2">
            <Button onClick={props.onSave}>Save</Button>
            <Button
              className=""
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
