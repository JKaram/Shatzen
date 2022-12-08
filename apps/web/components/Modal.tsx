import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  close: () => void;
  onSave: () => void;
  show: boolean;
  message?: string | string[];
  cbOnClose?: () => void;
};

export default function Modal(props: Props) {
  function onClose() {
    props.close();
    props.cbOnClose && props.cbOnClose();
  }

  return (
    <Dialog className="" open={props.show} onClose={onClose}>
      <div className="fixed inset-0 z-30 bg-black/30" aria-hidden="true" />
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 50,
            x: -100,
          },
          animate: {
            opacity: 1,
            x: 0,
          },
        }}
        className="fixed inset-x-0 inset-y-0 z-30 flex items-center justify-center"
      >
        <Dialog.Panel className="flex flex-col max-w-2xl p-2 m-auto overflow-y-auto bg-white border-2 border-black rounded-lg shadow-base">
          <Dialog.Title className="text-2xl font-bold">OPTIONS</Dialog.Title>
          <div className="p-4">{props.children}</div>
          <div className="sticky bottom-0 flex flex-col justify-end flex-grow w-full gap-1 pt-1 bg-white ">
            <div className="text-center text-red-500">{props.message}</div>
            <Button className="w-full" onClick={props.onSave}>
              Save
            </Button>
            <Button className="w-full" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
