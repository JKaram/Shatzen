import { Dialog } from "@headlessui/react";
import Button from "./Button";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  close: () => void;
  onSave: () => void;
  show: boolean;
  message?: string | string[];
};

export default function Modal(props: Props) {
  return (
    <Dialog open={props.show} className="" onClose={props.close}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0.5,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
      </motion.div>
      <Dialog.Panel className="fixed border-2 sm:border-black inset-0 bg-white sm:rounded-md h-screen overflow-auto  m-auto max-w-2xl flex flex-col">
        <Dialog.Title className="p-2 text-2xl">OPTIONS</Dialog.Title>
        <div className="p-2 flex-grow">{props.children}</div>
        <div className="text-red-500 text-center">{props.message}</div>
        <div className="flex flex-col space-y-1 p-2">
          <Button onClick={props.onSave}>Save</Button>
          <Button className="" variant="secondary" onClick={props.close}>
            Cancel
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
